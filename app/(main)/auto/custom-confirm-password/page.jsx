'use client'

import '@/app/styles/radio.css';
import '@/app/styles/badge.css';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Toast from '@/app/components/Toast';
import constants from '@/data/custom-confirm-password/constants.json';
import { isValidShopifyDomain } from '@/common';

const { dataLanguage, listCountry, formDefault } = constants;

// Hàm này có nhiệm vụ tìm ra phần dịch đang thuộc quốc gia nào
function detectLanguage(inputObj) {
    for (const [langCode, langObj] of Object.entries(dataLanguage)) {
        const isMatch = Object.keys(inputObj).every(
            key => inputObj[key] === langObj[key]
        );
        if (isMatch) return langCode;
    }
    return null;
}

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
    useEffect(() => {
        prevDomain.current = form.domain;
    }, []);

    const showToastMessage = useCallback((message) => {
        setToastMessage(message);
        setShowToast(false);
        setToastKey(prev => prev + 1);
        setShowToast(true);
    }, []);

    // useEffect(() => {
    //     const changed = ['domain', 'language'].some((field) => {
    //         const current = form[field];
    //         const initial = initialFormRef.current[field];

    //         if (Array.isArray(current) && Array.isArray(initial)) {
    //             return (
    //                 current.length !== initial.length ||
    //                 current.some((v, i) => v !== initial[i])
    //             );
    //         }

    //         return current !== initial;
    //     });

    //     setIsFormChanged(changed);
    // }, [form initialFormRef]);

    useEffect(() => {
        const fields = ['domain', 'page', 'language'];
        const changed = fields.some((field) => {
            const current = form[field];
            const initial = initialFormRef.current[field];

            if (Array.isArray(current) && Array.isArray(initial)) {
                return JSON.stringify(current) !== JSON.stringify(initial);
            }

            return current !== initial;
        });

        setIsFormChanged(changed);
    }, [form, initialFormRef.current]);

    const handleSubmit = async (e) => {
        setIsSubmit(true)
        e.preventDefault();
        form.translate = JSON.stringify(dataLanguage[form.language]);
        // form.page = JSON.stringify(form.page);
        console.log(actionVahu)
        try {
            const res = await fetch(`/api/auto/${actionVahu}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });
            if (!res.ok) {
                showToastMessage('An error occurred. Please check again or contact the developer');
            } else {
                showToastMessage('Updated successfully.');
                initialFormRef.current = form;
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

    const handleCheckData = async (e) => {
        const currentDomain = form.domain.trim();
        const oldDomain = prevDomain.current.trim();
        prevDomain.current = currentDomain;
        // console.log(prevDomain.current)
        // console.log(currentDomain)
        if (!isValidShopifyDomain(currentDomain)) {
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
            console.log(res)
            if (!res.ok) {
                showToastMessage('Unavailable. Create new?');
                setForm((prev) => ({
                    ...prev,
                    page: '',
                    language: ''
                }));
            } else {
                showToastMessage('Info exists. You can edit');
                const resReponse = await res.json();
                console.log(resReponse)
                const [ translate, page ] = resReponse.params.split("|");
                setForm((prev) => ({
                    ...prev,
                    page,
                    language: detectLanguage(JSON.parse(translate))
                }));
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


                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <div className="input-with-spinner">
                        <input
                            className="mb-10"
                            type="text"
                            placeholder="ex: dev-cuong-nm-store.myshopify.com"
                            value={form.domain}
                            onChange={(e) =>
                                setForm((prev) => ({ ...prev, domain: e.target.value }))
                            }
                        />
                        {loadingDomain && (
                            <div className="spinner-inline">
                                <span className="dot"></span>
                                <span className="dot"></span>
                                <span className="dot"></span>
                            </div>
                        )}
                    </div>

                    <button type="button" className="btn btn-sm btn-success mb-10 btn-checkdata" onClick={handleCheckData}>Check data</button>
                </div>

                <div className={!isValidShopifyDomain(form.domain) ? 'disabled' : ''}>
                    <p className="label">
                        2. URL form RF
                    </p>

                    <input
                        className="mb-10"
                        type="text"
                        placeholder='ex: "/pages/create-account-wholesale", "/pages/bss-form-test", ...'
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