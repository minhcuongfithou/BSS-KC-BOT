import MattermostWSBot from './mattermostBot.js';
import dotenv from 'dotenv';
dotenv.config();

const bot = new MattermostWSBot({
  token: process.env.MATTERMOST_TOKEN,
  wsUrl: process.env.MATTERMOST_WS_URL,
  apiUrl: process.env.MATTERMOST_API_URL,
  botUserId: process.env.BOT_USER_ID,
  botUsername: process.env.BOT_USERNAME,
  channelId: process.env.CHANNEL_ID,
  apiMMPost: process.env.API_MM_POST,
  apiMMVahu: process.env.API_MM_VAHU
});

bot.run();

console.log('Bot server started...');
