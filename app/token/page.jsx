'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, Settings } from 'lucide-react';

const formData = {token: ''};

export default function EditPostPage() {
    const [form, setForm] = useState(formData);
    const [isFormChanged, setIsFormChanged] = useState(false);

    const router = useRouter();
    const params = useParams();

    const initialFormRef = useRef(formData);

    useEffect(() => {
        if (!initialFormRef.current) return;
        const fields = ['token'];
        const changed = fields.some(
            (field) => form[field] !== initialFormRef.current[field]
        );
        setIsFormChanged(changed);
    }, [form]);

    const handleUpdate = async () => {
        try {
            const res = await fetch(`/api/token`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });
            if (res.success) router.push('/introduction');
        } catch(e) {

        }
    };

    return <div className="container">
        <h1> <span
            onClick={() => router.back()}
            className="back-text"> <ArrowLeft size={27}/> </span> <Settings size={27}/> TOKEN</h1>
        <form onSubmit={handleUpdate}>
            <input className='mb-10' type="text" placeholder="Token" value={form.token} onChange={e => setForm({ ...form, token: e.target.value })} />
            <button className="btn btn-primary" type="submit" disabled={!isFormChanged}>{'Save'}</button>
        </form>
    </div>
}
