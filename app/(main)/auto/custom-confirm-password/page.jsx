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
// end

export default function CustomConfirmPasswordPage() {
    const router = useRouter();
    const pathname = usePathname();
    const actionVahu = pathname.split('/').pop();

    const [isValidDomain, setIsValidDomain] = useState(false);
    const [isSubmit, setIsSubmit] = useState(false);
    const [form, setForm] = useState(formDefault);
    const initialFormRef = useRef(formDefault);
    const [isFormChanged, setIsFormChanged] = useState(false);
    const [toastKey, setToastKey] = useState(0);
    const [toastMessage, setToastMessage] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [loadingDomain, setLoadingDomain] = useState(false);

    // Phục vụ cho việc add nhiều page
    const [urls, setUrls] = useState(['']);

    const handleUrlChange = (index, value) => {
        const newUrls = [...urls];
        newUrls[index] = value;
        setUrls(newUrls);
        setForm((prev) => ({
            ...prev,
            page: urls.reduce((a, b) => a += `"${b.trim()}",`, '').slice(0, -1),
        }));
    };

    const addUrlInput = () => {
        setUrls([...urls, '']);
    };

    const removeUrlInput = (index) => {
        if (urls.length > 1) {
            const newUrls = urls.filter((_, i) => i !== index);
            setUrls(newUrls);
            setForm((prev) => ({
                ...prev,
                page: urls.reduce((a, b) => a += `"${b.trim()}",`, '').slice(0, -1),
            }));
        }
    };
    // end phục vụ cho việc add nhiều page

    // Check domain thay đổi hay không, nếu có thì checkData mới call api
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

    const handleCheckData = async (e) => {
        const currentDomain = form.domain.trim();
        const oldDomain = prevDomain.current.trim();
        prevDomain.current = currentDomain;
        if (!isValidShopifyDomain(currentDomain)) {
            setIsValidDomain(false);
            showToastMessage('Domain không hợp lệ');
            return;
        }
        if (currentDomain === oldDomain || currentDomain.trim().length === 0) return;
        setLoadingDomain(true);
        setUrls(['']);
        try {
            const query = new URLSearchParams(form).toString();
            const res = await fetch(`/api/auto/${actionVahu}?${query}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });
            console.log(res)
            setIsValidDomain(true);
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
                const [translate, page] = resReponse.params.split("|");
                setForm((prev) => ({
                    ...prev,
                    page,
                    language: detectLanguage(JSON.parse(translate))
                }));
                setUrls(page.replaceAll('"', '').split(','));
            }
        } catch (err) {
            console.log(err)
            throw new Error("Server Error");
        } finally {
            setLoadingDomain(false);
        }
    };

    const handleSubmit = async (e) => {
        setIsSubmit(true)
        e.preventDefault();
        form.translate = JSON.stringify(dataLanguage[form.language]);
        form.page = urls.reduce((a, b) => a += `"${b.trim()}",`, '').slice(0, -1)
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

    return (
        <><div className="container">
            <form onSubmit={handleSubmit}>
                <h1 className="title-vahu">
                    <span onClick={() => router.back()} className="back-text"> <ArrowLeft size={27} /> </span>
                    <span>Add confirm password to Registration Form</span>
                </h1>
                <p className="label">
                    1. Enter customer domain
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

                <div className={!isValidDomain ? 'disabled' : ''}>

                    <div className="w-full max-w-md mx-auto mt-4">
                        <p className="label">
                            2. URL(s) for RF
                        </p>
                        {urls.map((url, index) => (
                            <div key={index} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                <input
                                    type="text"
                                    value={url}
                                    onChange={(e) => handleUrlChange(index, e.target.value)}
                                    className="mb-10"
                                />
                                {urls.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeUrlInput(index)}
                                        className="btn btn-danger"
                                    >
                                        Remove
                                    </button>
                                )}

                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={addUrlInput}
                            className="btn btn-success"
                        >
                            Add
                        </button>
                    </div>

                    <p className="label">
                        3. Choose language for labels and validation error messages
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
                        disabled={!isFormChanged || isSubmit || loadingDomain || !isValidDomain}
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