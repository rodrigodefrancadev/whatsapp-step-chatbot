import venom from 'venom-bot';
import { SessionData } from './session-data.js';

export type JsonPrimative = string | number | boolean | null;
export type JsonArray = Json[];
export type JsonObject = { [key: string]: Json };
export type JsonComposite = JsonArray | JsonObject;
export type Json = JsonPrimative | JsonComposite;

export type WhatsappMessage = venom.Message;
export type WhatsappClient = venom.Whatsapp;

export interface StepActions {
  goToStep(stepIndex: number): Promise<void>;
  goToDialog(dialogKey: string, stepIndex?: number): Promise<void>;
  endSession(): Promise<void>;
  getSession(): Session;
  setSessionData(data: SessionData): Promise<void>;
}
export class Step {
  handle(
    client: WhatsappClient,
    msg: WhatsappMessage,
    actions: StepActions,
  ): void {}
}

export interface Dialog {
  key: string;
  stepConstructors: (typeof Step)[];
}

export enum SessionStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export interface Session {
  userId: string;
  status: SessionStatus;
  dialogKey: string;
  stepIndex: number;
  data: SessionData;
  createdAt: Date;
}

export interface SessionRepository {
  saveSession(sessio: Session): Promise<void>;
  getActiveSession(userId: string): Promise<Session | undefined>;
}

export abstract class Chatbot {
  constructor(protected client: WhatsappClient) {}
  abstract handleMessage(msg: WhatsappMessage): void;
}
