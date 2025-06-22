'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, Pencil } from 'lucide-react';

export default function CreateVahuPage() {
    const [isSubmit, setIsSubmit] = useState(false);
    const [form, setForm] = useState({ title: '', action: '', callback: '' });
    const [isFormChanged, setIsFormChanged] = useState(false);

    const router = useRouter();
    const params = useParams();

    const initialFormRef = useRef(form);

    useEffect(() => {
        const fields = ['title', 'action', 'callback'];
        const changed = fields.some(
            (field) => form[field] !== initialFormRef.current[field]
        );
        setIsFormChanged(changed);
    }, [form]);

    const handleSubmit = async (e) => {
        setIsSubmit(true)
        e.preventDefault();
        try {
            const res = await fetch('/api/vahu', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });
            if (res.ok) {
                router.push('/vahu')
            } else {
                console.log(res)
                alert('Có lỗi xảy ra khi tạo bài viết.');
            }
        } catch (err) {
            console.error(err);
            alert('Lỗi kết nối server!');
        } finally {
            setIsSubmit(false)
        }
    };

    return <div className="container">
        <h1> <span
            onClick={() => router.back()}
            className="back-text"> <ArrowLeft size={27} /> </span> <Pencil size={27} /> VAHU</h1>
        <form onSubmit={handleSubmit}>
            <input className='mb-10' type="text" placeholder="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
            <input className='mb-10' type="text" placeholder="Action name" value={form.action} onChange={e => setForm({ ...form, action: e.target.value })} />
            <textarea
                placeholder="Callback function"
                className="mb-10"
                value={form.callback}
                onChange={e => setForm({ ...form, callback: e.target.value })}
            />
            <button className="btn btn-primary" type="submit" disabled={!isFormChanged || isSubmit}>Create</button>
        </form>
    </div>
}