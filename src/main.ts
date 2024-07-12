import { TesteBot } from './teste-bot/index.js';
import { VenomBotRoot } from './venom-bot.js';

console.log('Hello World!');
const venomBotRoot = new VenomBotRoot((client) => new TesteBot(client));
venomBotRoot.startVenombot();
