'use client';
import '../page.css'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import HTMLEditor from '@/app/components/HTMLEditor';

export default function PostListPage() {
    const [loading, setLoading] = useState(false);
    // const [posts, setPosts] = useState([]);
    const [form, setForm] = useState({ title: '', content: '', author: '', type: 'note' });
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        console.log({form})
        try {
            const res = await fetch('/api/bot/post', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });
            console.log(res)
            if (res.ok) {
                router.push('/posts')
            } else {
                console.log(res)
                alert('Có lỗi xảy ra khi tạo bài viết.');
            }
        } catch (err) {
            console.error(err);
            alert('Lỗi kết nối server!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Thêm mới bài viết</h2>
            <form onSubmit={handleSubmit}>
                <input className='mb-10' type="text" placeholder="Tiêu đề" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
                <input className='mb-10' type="text" placeholder="Tác giả" value={form.author} onChange={e => setForm({ ...form, author: e.target.value })} />
                <HTMLEditor
                    form={form}
                    onChange={(newForm) => {
                        setForm(newForm);
                    }}
                />

                <select className='mb-10' value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
                    <option value="note">Note</option>
                    <option value="solution">Solution</option>
                </select>
                <button className="btn btn-primary" type="submit" disabled={loading}>{loading ? 'waiting' : 'Create'}</button>
            </form>
        </div>
    );
}
