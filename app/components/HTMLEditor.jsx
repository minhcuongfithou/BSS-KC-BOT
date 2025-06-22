'use client';
import { useEffect, useState } from 'react';
import '@/app/styles/tab-create-post.css'

export default function HTMLEditor({ form, onChange }) {
    const [activeTab, setActiveTab] = useState('write');
    const [content, setContent] = useState(form ? form.content : '');

    const handleChange = (e) => {
        const newContent = e.target.value;
        setContent(newContent)
        const updatedForm = {
            ...form,
            ['content']: newContent,
        };

        onChange(updatedForm);
    };

    const parseBBCode = (text) => {
        text = text
            .replace(/\[h1\](.*?)\[\/h1\]/gi, '<h1>$1</h1>')
            .replace(/\[h2\](.*?)\[\/h2\]/gi, '<h2>$1</h2>')
            .replace(/\[h3\](.*?)\[\/h3\]/gi, '<h3>$1</h3>')
            .replace(/\[h4\](.*?)\[\/h4\]/gi, '<h4>$1</h4>')
            .replace(/\[h5\](.*?)\[\/h5\]/gi, '<h5>$1</h5>')
            .replace(/\[h6\](.*?)\[\/h6\]/gi, '<h6>$1</h6>')
            .replace(/\[b\](.*?)\[\/b\]/gi, '<strong>$1</strong>')
            .replace(/\[i\](.*?)\[\/i\]/gi, '<em>$1</em>')
            .replace(/\[u\](.*?)\[\/u\]/gi, '<u>$1</u>')
            .replace(/\[url=(.*?)\](.*?)\[\/url\]/gi, '<a href="$1" target="_blank">$2</a>')
            .replace(/\[url\](.*?)\[\/url\]/gi, '<a href="$1" target="_blank">$1</a>')
            .replace(/\[img\](.*?)\[\/img\]/gi, '<img src="$1" alt="image" />')
            .replace(/\[code\]([\s\S]*?)\[\/code\]/gi, (_, code) => {
                return `<pre><div class="code-block">${escapeHtmlInCodeBlocks(code.trim())}</div></pre>`;
            })
            .replace(/\[quote\]([\s\S]*?)\[\/quote\]/gi, (_, group1) => {
                return `<blockquote>${group1.trim().replace(/\n/g, '<br>')}</blockquote>`;
            })
            .replace(/\n/g, '<br>');
        text = parseBBCodeWithTable(text);
        return text;
    };

    function escapeHtmlInCodeBlocks(text) {
        console.log(text)
        const escapeHtml = (str) =>
            str
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#039;');

        console.log(escapeHtml(text))
        return escapeHtml(text);
    };

    function parseBBCodeWithTable(text) {
        const lines = text.split(/\r?<br>/);
        let result = '';
        let i = 0;
        while (i < lines.length) {
            if (/^\|.*\|$/.test(lines[i]) && /^\|\s*[-:| ]+\|$/.test(lines[i + 1] || '')) {
                const headerLine = lines[i];
                const separatorLine = lines[i + 1];
                const bodyLines = [];

                i += 2;
                while (i < lines.length && /^\|.*\|$/.test(lines[i])) {
                    bodyLines.push(lines[i]);
                    i++;
                }

                const headers = headerLine
                    .split('|')
                    .slice(1, -1)
                    .map((h) => `<th>${h.trim()}</th>`)
                    .join('');

                const body = bodyLines
                    .map((line) => {
                        const cells = line
                            .split('|')
                            .slice(1, -1)
                            .map((c) => `<td>${c.trim()}</td>`)
                            .join('');
                        return `<tr>${cells}</tr>`;
                    })
                    .join('\n');
                result += `<table>
                                <thead><tr>${headers}</tr></thead>
                                <tbody>
                                    ${body}
                                </tbody>
                            </table><br>`;
            } else {
                result += lines[i].includes("</pre>") ? lines[i] : lines[i] + '<br>';
                i++;
            }
        }
        return result.trim();
    }




    return (
        <div className="tab-area mb-10">
            <div className="tab-header" role="tablist" aria-label="Editor Tabs">
                <button
                    role="tab"
                    aria-selected={activeTab === "write"}
                    aria-controls="write-panel"
                    id="write-tab"
                    className={`tab-button ${activeTab === "write" ? "active" : ""}`}
                    onClick={() => setActiveTab("write")}
                    type="button"
                >
                    Content
                </button>
                <button
                    role="tab"
                    aria-selected={activeTab === "preview"}
                    aria-controls="preview-panel"
                    id="preview-tab"
                    className={`tab-button ${activeTab === "preview" ? "active" : ""}`}
                    onClick={() => setActiveTab("preview")}
                    type="button"
                >
                    Preview
                </button>
            </div>

            <div
                id="write-panel"
                role="tabpanel"
                aria-labelledby="write-tab"
                hidden={activeTab !== "write"}
                className="tab-panel"
            >
                <textarea
                    placeholder="Write your content here..."
                    className="editor-textarea"
                    value={content}
                    onChange={handleChange}
                />
            </div>

            <div
                id="preview-panel"
                role="tabpanel"
                aria-labelledby="preview-tab"
                hidden={activeTab !== "preview"}
                className="tab-panel"
            >
                <div className="preview-content" dangerouslySetInnerHTML={{ __html: parseBBCode(content) }}>
                </div>
            </div>
        </div>
    );
}
