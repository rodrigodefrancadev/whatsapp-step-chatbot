import venom from 'venom-bot';
import { Chatbot, WhatsappClient } from './base.js';

export class VenomBotRoot {
  constructor(
    private readonly chatbotConstructor: (client: venom.Whatsapp) => Chatbot,
  ) {}

  public startVenombot() {
    venom
      .create({
        session: 'Chatbot',
      })
      .then((client) => this.onClientInit(client))
      .catch((erro) => {
        console.log(erro);
      });
  }

  private onClientInit(client: WhatsappClient) {
    const chatbot = this.chatbotConstructor(client);
    client.onMessage((message) => {
      if (
        message.from === '559884812318@c.us' &&
        message.isGroupMsg === false
      ) {
        chatbot.handleMessage(message);
      }
    });
  }
}
