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
                return `<pre><div class="code-block">${escapeHtml(code.trim())}</div></pre>`;
            })
            .replace(/\[quote\]([\s\S]*?)\[\/quote\]/gi, (_, group1) => {
                return `<blockquote>${group1.trim().replace(/\n/g, '<br>')}</blockquote>`;
            });
            // .replace(/\n/g, '<br>');
        return text;
    };

    function escapeHtml(html) {
        return html
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    function parseBBCodeWithTable(text) {
        const escapeHtml = (str) =>
            str
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#039;');

        const convertTableBlock = (tableText) => {
            const lines = tableText.trim().split('\n');
            const filteredLines = lines.filter((line) => !/^\|\s*-+/.test(line));

            return `<table>
      ${filteredLines
                    .map((line, index) => {
                        const cells = line.split('|').slice(1, -1).map((c) => c.trim());
                        const tag = index === 0 ? 'th' : 'td';
                        return `<tr>${cells.map((cell) => `<${tag}>${escapeHtml(cell)}</${tag}>`).join('')}</tr>`;
                    })
                    .join('\n')}
    </table>`;
        };

        const tableRegex = /((?:^\|.*\n?){2,})/gm;
        text = text.replace(tableRegex, (match) => {
            return convertTableBlock(match);
        });

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
