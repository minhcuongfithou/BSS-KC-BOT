'use client'
import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useRouter, useParams, usePathname } from 'next/navigation';
import '@/app/styles/radio.css';
import '@/app/styles/badge.css';
import { ArrowLeft } from 'lucide-react';
import Toast from '@/app/components/Toast';

const dataLanguage = {
    GB: {
        labelPass: 'Confirm Password',
        emptyPass: 'Please confirm your password',
        incorrectPass: 'Passwords do not match'
    },
    DE: {
        labelPass: 'Passwort bestätigen',
        emptyPass: 'Bitte bestätigen Sie Ihr Passwort',
        incorrectPass: 'Passwörter stimmen nicht überein'
    },
    IT: {
        labelPass: 'Conferma password',
        emptyPass: 'Per favore conferma la tua password',
        incorrectPass: 'Le password non corrispondono'
    }
}

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

function detectLanguage(inputObj, langMap) {
    for (const [langCode, langObj] of Object.entries(langMap)) {
        const isMatch = Object.keys(inputObj).every(
            key => inputObj[key] === langObj[key]
        );
        if (isMatch) return langCode;
    }
    return null;
}
const isValidShopifyDomain = (domain) => {
    return typeof domain === 'string' && domain.endsWith('.myshopify.com') && !domain.startsWith('httpF');
};

export default function CustomConfirmPasswordPage() {
    const pathname = usePathname();
    const actionVahu = pathname.split('/').pop();

    const [isSubmit, setIsSubmit] = useState(false);
    const [form, setForm] = useState(formDefault);
    const initialFormRef = useRef(formDefault);
    const [isFormChanged, setIsFormChanged] = useState(false);
    const router = useRouter();
    const [toastKey, setToastKey] = useState(0);
    const [toastMessage, setToastMessage] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [loadingDomain, setLoadingDomain] = useState(false);
    // Check domain khong bi thay doi thi moi call api
    const prevDomain = useRef('');
    // const initialFormRef = useRef(formDefault);
    useEffect(() => {
        // Gán domain ban đầu khi component mount
        prevDomain.current = form.domain;
    }, []);
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

    const showToastMessage = useCallback((message) => {
        setToastMessage(message);
        setShowToast(false);
        setToastKey(prev => prev + 1);
        setShowToast(true);
    }, []);

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
                showToastMessage('Có lỗi xảy ra, vui lòng kiểm tra lại hoặc liên hệ nhà phát triển');
            }
            showToastMessage('Cập nhật thông tin thành công');
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

    const handleDomainBlur = async (e) => {
        const currentDomain = form.domain.trim();
        const oldDomain = prevDomain.current.trim();
        prevDomain.current = currentDomain;
        console.log(prevDomain.current)
        console.log(currentDomain)
        if(!isValidShopifyDomain(currentDomain)) {
            showToastMessage('Domain không hợp lệ');
            return;
        }
        if (currentDomain === oldDomain || currentDomain.trim().length === 0) return;
        setLoadingDomain(true);
        try {
            const query = new URLSearchParams(form).toString();
            const res = await fetch(`/api/auto/${actionVahu}?${query}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });
            await new Promise((resolve) => setTimeout(resolve, 2000));
            if (!res.ok) {
                showToastMessage('Không có thông tin, nhưng bạn có thể tạo mới');
                setForm((prev) => ({
                    ...prev,
                    page: '',
                    language: ''
                }));
            } else {
                showToastMessage('Đã có thông tin trước đó, nhưng bạn có thể sửa đổi');
                const resReponse = await res.json();
                setForm((prev) => ({
                    ...prev,
                    page: resReponse.params[1],
                    language: detectLanguage(resReponse.params[0], dataLanguage)
                }));
                console.log(resReponse)
            }
        } catch (err) {
            console.log(err)
            throw new Error("Server Error");
        } finally {
            setLoadingDomain(false);
        }
    };

    return (
        <><div className="container">
            <form onSubmit={handleSubmit}>
                <h1 className="title-vahu">
                    <span onClick={() => router.back()} className="back-text"> <ArrowLeft size={27} /> </span>
                    <span>Thêm confirm password ở Registration Form</span>
                </h1>
                <p className="label">
                    1. Hãy điền thông tin domain khách hàng
                </p>

                <div className="input-with-spinner">
                    <input
                        className="mb-10"
                        type="text"
                        placeholder="ex: dev-cuong-nm-store.myshopify.com"
                        value={form.domain}
                        onChange={(e) =>
                            setForm((prev) => ({ ...prev, domain: e.target.value }))
                        }
                        onBlur={handleDomainBlur}
                    />
                    {loadingDomain && (
                        <div className="spinner-inline">
                            <span className="dot"></span>
                            <span className="dot"></span>
                            <span className="dot"></span>
                        </div>
                    )}
                </div>
                <div className={(loadingDomain || form.domain.trim().length === 0 || prevDomain.current.trim().length === 0 || !isValidShopifyDomain(form.domain)) ? 'disabled' : ''}>
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
                </div>

                <br />
                <div className="text-center">
                    <button
                        className="btn btn-primary"
                        type="submit"
                        disabled={!isFormChanged || isSubmit || loadingDomain || !isValidShopifyDomain(form.domain)}
                    >
                        Custom
                    </button>
                </div>
            </form>
        </div>
            {showToast && <Toast key={toastKey} show={true} message={toastMessage} />}
        </>
    );

}