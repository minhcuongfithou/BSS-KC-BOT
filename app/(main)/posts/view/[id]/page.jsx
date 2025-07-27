'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import LoadingSpinner from '@/app/components/LoadingSpinner';
import { ArrowLeft, Check, Copy, Settings } from 'lucide-react';
import '@/app/styles/preview-post.css'

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
            return `<pre><div class="code-block"><button class="copy-btn"><svg xmlns="http://www.w3.org/2000/svg" class="icon-copy" width="20" height="20" viewBox="0 0 24 24"fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg></button><div class="code">${escapeHtmlInCodeBlocks(code.trim())}</div></div></pre>`;
        })
        .replace(/\[quote\]([\s\S]*?)\[\/quote\]/gi, (_, group1) => {
            return `<blockquote>${group1.trim().replace(/\n/g, '<br>')}</blockquote>`;
        })
        .replace(/\n/g, '<br>');
    text = parseBBCodeWithTable(text);
    return text;
};

function escapeHtmlInCodeBlocks(text) {
    const escapeHtml = (str) =>
        str
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');

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

export default function ViewPostPage() {
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState({ title: '', content: '', author: '', type: 'note' });

    const router = useRouter();
    const params = useParams();
    const { id } = params;

    const initialFormRef = useRef();

    useEffect(() => {
        document.addEventListener('click', e => {
            if (e.target.classList.contains("copy-btn")) {
                const codeEl = document.querySelector('.code-block .code');
                const text = codeEl?.innerText || codeEl?.textContent || '';
                if (text) {
                    const btn = document.querySelector('.copy-btn');
                    navigator.clipboard.writeText(text).then(() => {
                        btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="icon-check" width="20" height="20" viewBox="0 0 24 24"fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12" /></svg>';
                        setTimeout(() => {
                            btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="icon-copy" width="20" height="20" viewBox="0 0 24 24"fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>';
                        }, 1000);
                    });
                }
            }
        });

        return () => {
            document.onclick = null;
        };
    }, []);

    useEffect(() => {
        fetch(`/api/bot/post/${id}`)
            .then(res => res.json())
            .then(data => {
                const cleanData = {
                    title: data.title || '',
                    content: data.content || '',
                    author: data.author || '',
                    type: data.type || '',
                };
                setForm(cleanData);
                initialFormRef.current = cleanData;
            })
            .catch(err => {
                console.error('Fetch error:', err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [id]);

    if (loading) return <LoadingSpinner />

    return <div className="container">
        <h1> <span
            onClick={() => router.back()}
            className="back-text"> <ArrowLeft size={27} /> </span> <Settings size={27} /> SOLUTION</h1>
        <h3>{form.title}</h3>
        <i>By {form.author}</i>
        <div className="preview-post" dangerouslySetInnerHTML={{ __html: parseBBCode(form.content) }}>
        </div>
    </div>
}
