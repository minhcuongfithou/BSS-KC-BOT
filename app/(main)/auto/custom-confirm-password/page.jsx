'use client'
import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useRouter, useParams, usePathname } from 'next/navigation';
import '@/app/styles/radio.css';
import '@/app/styles/badge.css';
import { ArrowLeft } from 'lucide-react';

const listCountry = [
    {
        "label": "United Kingdom",
        "value": "GB"
    },
    {
        "label": "Germany",
        "value": "DE"
    },
    {
        "label": "Italy",
        "value": "IT"
    }
]

const formDefault = {
    domain: '',
    page: '',
    language: '',
}

export default function CustomConfirmPasswordPage() {
    const pathname = usePathname();
    const actionVahu = pathname.split('/').pop();

    const [isSubmit, setIsSubmit] = useState(false);
    const [form, setForm] = useState(formDefault);
    const initialFormRef = useRef(formDefault);
    const [isFormChanged, setIsFormChanged] = useState(false);
    const router = useRouter();
    // const initialFormRef = useRef(formDefault);

    // const router = useRouter();

    // useEffect(() => {
    //     // fetch(`/api/vahu/${id}`)
    //     //     .then(res => res.json())
    //     //     .then(data => {
    //     //         console.log({ data })
    //     //         const cleanData = {
    //     //             title: data.title || '',
    //     //             callback: data.callback || '',
    //     //             action: data.action || '',
    //     //         };
    //     //         setForm(cleanData);
    //     //         initialFormRef.current = cleanData;
    //     //     })
    //     //     .catch(err => {
    //     //         console.error('Fetch error:', err);
    //     //     })
    //     //     .finally(() => {
    //     //         setLoading(false);
    //     //     });
    // }, []);



    useEffect(() => {
        const changed = ['domain', 'language'].some((field) => {
            const current = form[field];
            const initial = initialFormRef.current[field];

            if (Array.isArray(current) && Array.isArray(initial)) {
                return (
                    current.length !== initial.length ||
                    current.some((v, i) => v !== initial[i])
                );
            }

            return current !== initial;
        });

        setIsFormChanged(changed);
    }, [form]);

    useEffect(() => {
        const fields = ['domain', 'language'];

        const changed = fields.some((field) => {
            const current = form[field];
            const initial = initialFormRef.current[field];

            if (Array.isArray(current) && Array.isArray(initial)) {
                return JSON.stringify(current) !== JSON.stringify(initial);
            }

            return current !== initial;
        });

        setIsFormChanged(changed);
    }, [form]);

    const handleSubmit = async (e) => {
        setIsSubmit(true)
        e.preventDefault();
        console.log(JSON.stringify(form))
        try {
            const res = await fetch(`/api/auto/${actionVahu}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });
            if (!res.ok) {
                throw new Error("Có lỗi xảy ra khi tạo bài viết.");
            }
        } catch (err) {
            throw new Error("Server Error");
        } finally {
            setIsSubmit(false)
        }
    };

    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const handleDomainBlur = async (domain) => {
        if (!domain) return;

        try {
            console.log(123)
            // const res = await fetch(`/api/check-domain?domain=${domain}`);
            // const data = await res.json();
            // console.log('Kết quả kiểm tra domain:', data);
        } catch (err) {
            console.error('Lỗi khi kiểm tra domain:', err);
        }
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <h1 className="title-vahu">
                    <span onClick={() => router.back()} className="back-text"> <ArrowLeft size={27} /> </span>
                    <span>Thêm confirm password ở Registration Form</span>
                </h1>
                <div className="tag-container">
                    <span className="tag-label">Tags:</span>
                    <span className="badge badge-green">Feature</span>
                    <span className="badge badge-red">Bug</span>
                    <span className="badge badge-warning">Custom</span>
                </div>
                <p className="label">
                    1. Hãy điền thông tin domain khách hàng
                </p>

                <input
                    className="mb-10"
                    type="text"
                    placeholder="ex: dev-cuong-nm-store.myshopify.com"
                    value={form.domain}
                    onChange={(e) =>
                        setForm((prev) => ({ ...prev, domain: e.target.value }))
                    }
                    onBlur={() => handleDomainBlur(form.domain)}
                />

                <p className="label">
                    2. URL form RF
                </p>

                <input
                    className="mb-10"
                    type="text"
                    placeholder="ex: /pages/create-account-wholesale"
                    value={form.page}
                    onChange={(e) =>
                        setForm((prev) => ({ ...prev, page: e.target.value }))
                    }
                />

                <p className="label">
                    3. Chọn ngôn ngữ cho label và các báo lỗi khi validate field confirm
                </p>

                <div className="radio-grid">
                    {listCountry.map((country, index) => {
                        const checked = form.language.includes(country.value);
                        return (
                            <label key={country.value} className="custom-radio">
                                <input
                                    type="radio"
                                    name="language"
                                    value={country.value}
                                    checked={form.language === country.value}
                                    onChange={(e) => {
                                        setForm((prevForm) => ({
                                            ...prevForm,
                                            language: e.target.value,
                                        }));
                                    }}
                                />
                                <span className="radiomark"></span>
                                {country.label}
                            </label>

                        );
                    })}
                </div>

                <br />
                <div className="text-center">
                    <button
                        className="btn btn-primary"
                        type="submit"
                        disabled={!isFormChanged || isSubmit}
                    >
                        Custom
                    </button>
                </div>
            </form>
        </div>
    );

}