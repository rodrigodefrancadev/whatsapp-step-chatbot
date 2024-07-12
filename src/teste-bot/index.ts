import { Chatbot, WhatsappClient, WhatsappMessage } from '../base.js';

export class TesteBot extends Chatbot {
  constructor(client: WhatsappClient) {
    super(client);
  }

  handleMessage(msg: WhatsappMessage): void {
    console.log('Mensagem Recebida:', msg.body);
    this.client.sendText(msg.from, 'Você disse: ' + msg.body);
  }
}
