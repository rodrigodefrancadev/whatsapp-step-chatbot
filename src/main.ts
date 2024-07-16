import { Chatbot, SessionRepository, WhatsappClient } from './base.js';
import { InMemorSessionInfoRepository } from './infra/in-memory-session-repository-imp.js';
import { MegaBot } from './bot/index.js';
import { VenomBotRoot } from './venom-bot.js';

console.log('Hello World!');

function createBot(client: WhatsappClient): Chatbot {
  const sessionRepository: SessionRepository =
    new InMemorSessionInfoRepository();
  return new MegaBot(client, sessionRepository);
}

const venomBotRoot = new VenomBotRoot(createBot);
venomBotRoot.startVenombot();
