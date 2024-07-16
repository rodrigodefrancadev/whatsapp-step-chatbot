import {
  Step,
  StepActions,
  WhatsappClient,
  WhatsappMessage,
} from '../../../../base.js';

export class EchoStep0 extends Step {
  async handle(
    client: WhatsappClient,
    msg: WhatsappMessage,
    actions: StepActions,
  ): Promise<void> {
    if (msg.body?.toLocaleLowerCase() === 'sair') {
      await client.sendText(msg.from, 'Tudo bem, até mais!');
      await actions.endSession();
      return;
    }

    const messagesCount = actions.getSession().data.messagesCount;

    await actions.setSessionData({
      messagesCount: messagesCount + 1,
    });

    if (messagesCount === 0) {
      await client.sendText(
        msg.from,
        'Olá, eu sou um bot que repete tudo que você escreve. Digite "sair" para sair.',
      );

      await client.sendText(msg.from, `Sua primeira mensagem foi: ${msg.body}`);

      return;
    }

    await client.sendText(
      msg.from,
      `Essa é sua mensagem de número ${messagesCount}: ` + msg.body,
    );
  }
}
