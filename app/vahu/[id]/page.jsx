'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import LoadingSpinner from '@/app/components/LoadingSpinner';
import { ArrowLeft, Settings } from 'lucide-react';

const content = { title: '', action: '', callback: '' };

export default function EditVahuPage() {
    const [loading, setLoading] = useState(true);
    const [isSubmit, setIsSubmit] = useState(false);
    const [form, setForm] = useState(content);
    const [isFormChanged, setIsFormChanged] = useState(false);

    const router = useRouter();
    const params = useParams();
    const { id } = params;

    const initialFormRef = useRef(content);

    useEffect(() => {
        if (loading) return;
        const fields = ['title', 'action', 'callback'];
        const changed = fields.some(
            (field) => form[field] !== initialFormRef.current[field]
        );
        setIsFormChanged(changed);
    }, [form]);

    useEffect(() => {
        fetch(`/api/vahu/${id}`)
            .then(res => res.json())
            .then(data => {
                const cleanData = {
                    title: data.title || '',
                    callback: data.callback || '',
                    action: data.action || '',
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

    const handleUpdate = async () => {
        setIsSubmit(true)
        try {
            const res = await fetch(`/api/vahu/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });
            if (res.ok) router.push('/vahu');
        } finally {
            setIsSubmit(false);
        }
    };

    if (loading) return <LoadingSpinner />

    return <div className="container">

        <h1> <span
            onClick={() => router.back()}
            className="back-text"> <ArrowLeft size={27} /> </span> <Settings size={27} /> VAHU</h1>
        <form onSubmit={handleUpdate}>
            <input className='mb-10' type="text" placeholder="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
            <input className='mb-10' type="text" placeholder="Action" value={form.action} onChange={e => setForm({ ...form, action: e.target.value })} />
            <textarea
                placeholder="Callback"
                className="mb-10"
                value={form.callback}
                onChange={e => setForm({ ...form, callback: e.target.value })}
            />
            <button className="btn btn-primary" type="submit" disabled={!isFormChanged || isSubmit}>{'Edit'}</button>
        </form>
    </div>
}
