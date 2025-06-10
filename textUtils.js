// import TextUtils from '@/lib/textUtils';

// const markdown = TextUtils.bbcodeToMarkdown('[b]Hello[/b] world');
// console.log(markdown); // **Hello** world


// [list=1]
// [li]Mục 1[/li]
// [li]Mục 2[/li]
// [/list]

export default class TextUtils {
  static stringSimilarity(s1, s2) {
    const words1 = s1.toLowerCase().split(/\s+/);
    const words2 = s2.toLowerCase().split(/\s+/);
    const common = words1.filter(w => words2.includes(w));
    const maxLen = Math.max(words1.length, words2.length);
    return maxLen ? common.length / maxLen : 0;
  }

  static bbcodeToMarkdown(content) {
    if (!content) return '';

    content = content.replace(/\[b\](.*?)\[\/b\]/gi, '**$1**');
    content = content.replace(/\[i\](.*?)\[\/i\]/gi, '*$1*');
    content = content.replace(/\[u\](.*?)\[\/u\]/gi, '__$1__');
    content = content.replace(/\[url=(.*?)\](.*?)\[\/url\]/gi, '[$2]($1)');
    content = content.replace(/\[url\](.*?)\[\/url\]/gi, '<$1>');
    content = content.replace(/\[img\](.*?)\[\/img\]/gi, '![]($1)');
    content = content.replace(/\[code\]([\s\S]*?)\[\/code\]/gi, '```\n$1\n```');
    content = content.replace(/\[h1\](.*?)\[\/h1\]/gi, '# $1');
    content = content.replace(/\[h2\](.*?)\[\/h2\]/gi, '## $1');
    content = content.replace(/\[h3\](.*?)\[\/h3\]/gi, '### $1');

    // quote block
    content = content.replace(/\[quote\]([\s\S]*?)\[\/quote\]/gi, (_, group1) => {
      const lines = group1.trim().split('\n');
      return '\n' + lines.map(line => `> ${line.trim()}`).join('\n') + '\n';
    });

    // li
    content = content.replace(/\[list=1\]([\s\S]*?)\[\/list\]/gi, (_, items) => {
      const lines = items
        .replace(/\[li\](.*?)\[\/li\]/gi, '$1')
        .trim()
        .split('\n')
        .filter(line => line.trim() !== '');

      return lines.map((item, index) => `${index + 1}. ${item.trim()}`).join('\n');
    });

    return content;
  }

  static formatFeedbackAsTable(result) {
    const header = '| ID | USER | FEEDBACK | TIME | COMMENT |\n';
    const divider = '| --- | ----- | -------- | ---- | ------- |\n';
    let rows = '';

    result.forEach((fb, i) => {
      rows += `| ${i + 1} | ${fb.user || ''} | ${fb.content || ''} | ${fb.timestamp || ''} | ${fb.comment || 'N/A'} |\n`;
    });

    return header + divider + rows;
  }
}
