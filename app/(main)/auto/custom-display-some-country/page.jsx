'use client'

import '@/app/styles/checkbox.css';

import { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';

import { useUser } from '@/app/context/UserContext';
import constants from '@/data/custom-display-some-country/constants.json';
import Toast from '@/app/components/Toast';
import { isValidShopifyDomain } from '@/common';

const { listCountry } = constants;

const formDefault = {
    author: '',
    domain: '',
    listCountrySelected: [],
}

export default function CreateVahuPage() {
    const pathname = usePathname();
    const session = useUser();
    const router = useRouter();

    const actionVahu = pathname.split('/').pop();
    const [loading, setLoading] = useState(false);
    const [isSubmit, setIsSubmit] = useState(false);
    const [form, setForm] = useState(formDefault);

    const initialFormRef = useRef(formDefault);
    const [isFormChanged, setIsFormChanged] = useState(false);

    const [isValidDomain, setIsValidDomain] = useState(false);
    const [toastKey, setToastKey] = useState(0);
    const [toastMessage, setToastMessage] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [loadingDomain, setLoadingDomain] = useState(false);
    const prevDomain = useRef('');

    useEffect(() => {
        prevDomain.current = form.domain;
    }, []);

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

    const showToastMessage = useCallback((message) => {
        setToastMessage(message);
        setShowToast(false);
        setToastKey(prev => prev + 1);
        setShowToast(true);
    }, []);


    useEffect(() => {
        const fields = ['domain', 'listCountrySelected'];

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
        try {
            form.author = session?.user?.email;
            form.page = urls.reduce((a, b) => a += `"${b.trim()}",`, '').slice(0, -1);
            console.log(form)
            const res = await fetch(`/api/auto/${actionVahu}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });
            if (!res.ok) {
                showToastMessage('Something went wrong. Contact dev if needed.');
            }
            showToastMessage('Updated successfully.');
        } catch (err) {
            throw new Error("Server Error");
        } finally {
            setIsSubmit(false)
        }
    };

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
            setIsValidDomain(true);
            if (!res.ok) {
                showToastMessage('Unavailable. Create new?');
                setForm((prev) => ({
                    ...prev,
                    page: '',
                    listCountrySelected: ['']
                }));
            } else {
                showToastMessage('Info exists. You can edit');
                const resReponse = await res.json();
                const [listCountrySelected, page] = resReponse.params.split("|");
                setForm((prev) => ({
                    ...prev,
                    page,
                    listCountrySelected: listCountrySelected.replaceAll('"', '').split(",")
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


    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    if (loading) return <></>;
    if (!mounted) return null;
    console.log(form)
    return (
        <><div className="container">
            <form onSubmit={handleSubmit}>
                <h1 className="title-vahu">
                    <span onClick={() => router.back()} className="back-text"> <ArrowLeft size={27} /> </span>
                    <span>Custom display only specific countries in Registration Form</span>
                </h1>
                <p className="label">
                    1. Enter domain
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
                        3. Select countries to display
                    </p>

                    <table className="country-table">
                        <tbody>
                            {Object.entries(
                                listCountry.reduce((groups, country) => {
                                    const firstLetter = country.label.charAt(0).toUpperCase();
                                    if (!groups[firstLetter]) groups[firstLetter] = [];
                                    groups[firstLetter].push(country);
                                    return groups;
                                }, {})
                            ).map(([letter, countries]) => (
                                <tr key={letter}>
                                    <td className="letter-cell">{letter}</td>
                                    <td>
                                        <div className="checkbox-grid">
                                            {countries.map((country) => {
                                                const checked = form.listCountrySelected.includes(country.value);
                                                return (
                                                    <label key={country.value} className="custom-checkbox">
                                                        <input
                                                            type="checkbox"
                                                            name="country"
                                                            value={country.value}
                                                            checked={checked}
                                                            onChange={(e) => {
                                                                const isChecked = e.target.checked;
                                                                setForm((prevForm) => {
                                                                    const selected = prevForm.listCountrySelected;
                                                                    const updated = isChecked
                                                                        ? [...selected, country.value]
                                                                        : selected.filter((val) => val !== country.value);
                                                                    return { ...prevForm, listCountrySelected: updated };
                                                                });
                                                            }}
                                                        />
                                                        <span className="checkmark"></span>
                                                        {country.label}
                                                    </label>
                                                );
                                            })}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
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
            </form >
        </div>
            {showToast && <Toast key={toastKey} show={true} message={toastMessage} />}
        </>
    );

}