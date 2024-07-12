import venom from 'venom-bot';

export abstract class Step<T> {
  abstract handle(next: (param: T) => void): void;
}

export abstract class Dialog {
  steps: Step<unknown>[];
  currentStepIndex: number;
}

export class Session {
  currentDialog: Dialog;
}

export type WhatsappMessage = venom.Message;
export type WhatsappClient = venom.Whatsapp;

export abstract class Chatbot {
  constructor(protected client: WhatsappClient) {}
  abstract handleMessage(msg: WhatsappMessage): void;
}
