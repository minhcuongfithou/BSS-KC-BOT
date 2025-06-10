// pages/api/bot/message.js
import { parseCommand, handleCommand } from '@/action';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const { message, channelId, rootId } = req.body;
  if (!message || !channelId) {
    return res.status(400).json({ success: false, message: 'Missing message or channelId' });
  }

  const parsed = await parseCommand(message);
  if (!parsed) {
    return res.status(200).json({ success: true, reply: 'No command found in message.' });
  }

  const reply = await handleCommand({ 
    command: parsed.command, 
    content: parsed.content, 
    channelId, 
    rootId 
  });

  return res.status(200).json({ success: true, reply });
}
