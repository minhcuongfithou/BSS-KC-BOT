// /lib/action.js

import { db } from './db';  // module tự viết kết nối MongoDB
import TextUtils from './textUtils';  // bạn có thể port hàm bbcode_to_markdown

export async function parseCommand(message) {
  const parts = message.trim().split(/\s+/);
  for (let i = 0; i < parts.length; i++) {
    if (parts[i].startsWith('/')) {
      return {
        command: parts[i].substring(1).toLowerCase(),
        content: parts.slice(i + 1).join(' ').trim(),
      };
    }
  }
  return null;
}

export async function handleCommand({ command, content, channelId, rootId }) {
  switch (command) {
    case 'help':
      return `**📚 Available Commands:**\n- \`/issue <description>\`: Submit the issue you're facing\n- \`/solution <your solution>\`: Submit a solution\n- \`/comment <feedback>\`: Send a comment`;

    case 'issues': {
      const results = await db.searchAllIssues();
      if (!results.length) return '❌ Không tìm thấy issue nào.';
      let reply = '🔎 Danh sách issue:\n';
      results.forEach((issue, i) => {
        reply += `\`${i + 1}\` ${issue.title}\n`;
      });
      return TextUtils.bbcodeToMarkdown(reply);
    }

    case 'issue': {
      if (!content) return '⚠️ Please provide issue content after `/issue`.';
      const results = await db.searchIssues(content);
      if (!results.length) return '❌ Không tìm thấy issue nào gần giống.';
      let reply = '🔎 Các issue gần giống bạn tìm:\n';
      results.forEach((issue, i) => {
        reply += `\`${i + 1}\` ${issue.title}\n`;
      });
      return TextUtils.bbcodeToMarkdown(reply);
    }

    case 'solution': {
      if (!content) return '⚠️ Please provide the issue title after `/solution [issue title]`.';
      const solution = await db.searchSolution(content.trim());
      if (!solution) return '❌ No matching issue found and no suggestions available.';
      return TextUtils.bbcodeToMarkdown(solution);
    }

    case 'comment':
      return `💬 Comment received: _${content}_`;

    default:
      return `❓ Unknown command \`${command}\`. Type \`/help\` for instructions.`;
  }
}
