import {
  Chatbot,
  Session,
  SessionRepository,
  SessionStatus,
  StepActions,
  WhatsappClient,
  WhatsappMessage,
} from '../base.js';
import { echoDialog } from './dialogs/echo/index.js';
import { getDialogAndStepConstructor } from './dialogs/index.js';

export class MegaBot extends Chatbot {
  constructor(
    client: WhatsappClient,
    private readonly sessionRepository: SessionRepository,
  ) {
    super(client);
  }

  async handleMessage(msg: WhatsappMessage): Promise<void> {
    const session = await this.findOrCreateSession(msg.from);
    const { StepConstructor } = getDialogAndStepConstructor(
      session.dialogKey,
      session.stepIndex,
    );
    const step = new StepConstructor();
    const actions = this.buildActions(session);
    step.handle(this.client, msg, actions);
  }

  private async findOrCreateSession(userId: string): Promise<Session> {
    let session = await this.sessionRepository.getActiveSession(userId);
    if (!session) {
      return await this.createAndSaveSession(userId);
    }
    return session;
  }

  private async createAndSaveSession(userId: string): Promise<Session> {
    const session: Session = {
      userId,
      status: SessionStatus.ACTIVE,
      dialogKey: echoDialog.key,
      stepIndex: 0,
      data: {
        messagesCount: 0,
      },
      createdAt: new Date(),
    };
    await this.sessionRepository.saveSession(session);
    return session;
  }

  private buildActions(session: Session): StepActions {
    return {
      goToStep: async (stepIndex: number) => {
        session.stepIndex = stepIndex;
        await this.sessionRepository.saveSession(session);
      },
      goToDialog: async (dialogKey: string, stepIndex = 0) => {
        session.dialogKey = dialogKey;
        session.stepIndex = stepIndex;
        await this.sessionRepository.saveSession(session);
      },
      endSession: async () => {
        session.status = SessionStatus.INACTIVE;
        await this.sessionRepository.saveSession(session);
      },
      getSession: () => session,
      setSessionData: async (data) => {
        session.data = data;
        await this.sessionRepository.saveSession(session);
      },
    };
  }
}
