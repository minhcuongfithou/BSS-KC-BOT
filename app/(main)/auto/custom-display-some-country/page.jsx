'use client'

import '@/app/styles/checkbox.css';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { useUser } from '@/app/context/UserContext';
import Toast from '@/app/components/Toast';
import constants from '@/data/custom-display-some-country/constants.json';

const { listCountry } = constants;

const formDefault = {
    author: '',
    domain: '',
    listCountrySelected: [],
}

const isValidShopifyDomain = (domain) => {
    return typeof domain === 'string' && domain.endsWith('.myshopify.com') && !domain.startsWith('http');
};

export default function CreateVahuPage() {
    const pathname = usePathname();
    const actionVahu = pathname.split('/').pop();
    const [loading, setLoading] = useState(false);
    const [isSubmit, setIsSubmit] = useState(false);
    const [form, setForm] = useState(formDefault);
    console.log(form)
    const initialFormRef = useRef(formDefault);
    const [isFormChanged, setIsFormChanged] = useState(false);
    // const initialFormRef = useRef(formDefault);

    const session = useUser();
    const router = useRouter();
    const [toastKey, setToastKey] = useState(0);
    const [toastMessage, setToastMessage] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [loadingDomain, setLoadingDomain] = useState(false);
    const prevDomain = useRef('');

    useEffect(() => {
        prevDomain.current = form.domain;
    }, []);

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

    // useEffect(() => {
    //     const changed = ['domain', 'listCountrySelected'].some((field) => {
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
    // }, [form]);

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

    const handleDomainBlur = async (e) => {
        const currentDomain = form.domain.trim();
        const oldDomain = prevDomain.current.trim();
        prevDomain.current = currentDomain;
        console.log(prevDomain.current)
        console.log(currentDomain)
        if (!isValidShopifyDomain(currentDomain)) {
            console.log(111)
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
            if (!res.ok) {
                showToastMessage('Unavailable. Create new?');
                setForm((prev) => ({
                    ...prev,
                    listCountrySelected: []
                }));
            } else {
                showToastMessage('Info exists. You can edit.');
                const resReponse = await res.json();
                resReponse.params[0] = resReponse.params[0].replace(/\\"/g, '"');
                setForm((prev) => ({
                    ...prev,
                    listCountrySelected: JSON.parse(`[${resReponse.params[0]}]`)
                }));
            }
        } catch (err) {
            console.log(err)
            throw new Error("Server Error");
        } finally {
            setLoadingDomain(false);
        }
    };

    if (loading) return <></>;

    return (
        <><div className="container">
            <form onSubmit={handleSubmit}>
                <h1 className="title-vahu">
                    <span onClick={() => router.back()} className="back-text"> <ArrowLeft size={27} /> </span>
                    <span>Custom chỉ show một vài quốc gia ở Registration Form</span>
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
                    2. Chọn danh sách các quốc gia sẽ hiển thị
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