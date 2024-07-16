import { Session, SessionRepository, SessionStatus } from '../base.js';

export class InMemorSessionInfoRepository implements SessionRepository {
  private readonly activeSessions: Map<string, Session>;

  constructor() {
    this.activeSessions = new Map();
  }

  async saveSession(sessionInfo: Session): Promise<void> {
    if (sessionInfo.status === SessionStatus.INACTIVE) {
      if (this.activeSessions.has(sessionInfo.userId)) {
        this.activeSessions.delete(sessionInfo.userId);
      }
    } else if (sessionInfo.status === SessionStatus.ACTIVE) {
      this.activeSessions.set(sessionInfo.userId, sessionInfo);
    } else {
      throw new Error(
        `SessionInfoStatus not recognized: ${sessionInfo.status}`,
      );
    }
  }

  getActiveSession(userId: string): Promise<Session | undefined> {
    return Promise.resolve(this.activeSessions.get(userId));
  }
}
