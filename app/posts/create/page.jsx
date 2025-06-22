'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import HTMLEditor from '@/app/components/HTMLEditor';
import { ArrowLeft, Pencil } from 'lucide-react';

export default function EditPostPage() {
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({ title: '', content: '', author: '', type: 'note' });
    const [isFormChanged, setIsFormChanged] = useState(false);

    const router = useRouter();
    const params = useParams();

    const initialFormRef = useRef(form);

    useEffect(() => {
        const fields = ['title', 'content', 'author', 'type'];
        const changed = fields.some(
            (field) => form[field] !== initialFormRef.current[field]
        );
        setIsFormChanged(changed);
    }, [form]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch('/api/bot/post', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });
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

    if (loading) return <></>;

    return <div className='container'>
        <h1> <span
            onClick={() => router.back()}
            className="back-text"> <ArrowLeft size={27}/> </span> <Pencil size={27}/> SOLUTION</h1>
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
            <button className="btn btn-primary" type="submit" disabled={loading || !isFormChanged}>{loading ? 'waiting' : 'Create'}</button>
        </form>
    </div>
}