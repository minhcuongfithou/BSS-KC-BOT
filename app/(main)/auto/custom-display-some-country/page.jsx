'use client'
import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter, useParams, usePathname } from 'next/navigation';
import '@/app/styles/checkbox.css';
import { ArrowLeft } from 'lucide-react';
import { useUser } from '@/app/context/UserContext';
import Toast from '@/app/components/Toast';
const listCountry = [
    {
        "label": "Afghanistan",
        "value": "AF"
    },
    {
        "label": "Aland Islands",
        "value": "AX"
    },
    {
        "label": "Albania",
        "value": "AL"
    },
    {
        "label": "Algeria",
        "value": "DZ"
    },
    {
        "label": "Andorra",
        "value": "AD"
    },
    {
        "label": "Angola",
        "value": "AO"
    },
    {
        "label": "Anguilla",
        "value": "AI"
    },
    {
        "label": "Antigua & Barbuda",
        "value": "AG"
    },
    {
        "label": "Argentina",
        "value": "AR"
    },
    {
        "label": "Armenia",
        "value": "AM"
    },
    {
        "label": "Aruba",
        "value": "AW"
    },
    {
        "label": "Ascension Island",
        "value": "AC"
    },
    {
        "label": "Australia",
        "value": "AU"
    },
    {
        "label": "Austria",
        "value": "AT"
    },
    {
        "label": "Azerbaijan",
        "value": "AZ"
    },
    {
        "label": "Bahamas",
        "value": "BS"
    },
    {
        "label": "Bahrain",
        "value": "BH"
    },
    {
        "label": "Bangladesh",
        "value": "BD"
    },
    {
        "label": "Barbados",
        "value": "BB"
    },
    {
        "label": "Belarus",
        "value": "BY"
    },
    {
        "label": "Belgium",
        "value": "BE"
    },
    {
        "label": "Belize",
        "value": "BZ"
    },
    {
        "label": "Benin",
        "value": "BJ"
    },
    {
        "label": "Bermuda",
        "value": "BM"
    },
    {
        "label": "Bhutan",
        "value": "BT"
    },
    {
        "label": "Bolivia",
        "value": "BO"
    },
    {
        "label": "Bosnia & Herzegovina",
        "value": "BA"
    },
    {
        "label": "Botswana",
        "value": "BW"
    },
    {
        "label": "Bouvet Island",
        "value": "BV"
    },
    {
        "label": "Brazil",
        "value": "BR"
    },
    {
        "label": "British Indian Ocean Territory",
        "value": "IO"
    },
    {
        "label": "British Virgin Islands",
        "value": "VG"
    },
    {
        "label": "Brunei",
        "value": "BN"
    },
    {
        "label": "Bulgaria",
        "value": "BG"
    },
    {
        "label": "Burkina Faso",
        "value": "BF"
    },
    {
        "label": "Burundi",
        "value": "BI"
    },
    {
        "label": "Cambodia",
        "value": "KH"
    },
    {
        "label": "Cameroon",
        "value": "CM"
    },
    {
        "label": "Canada",
        "value": "CA"
    },
    {
        "label": "Cape Verde",
        "value": "CV"
    },
    {
        "label": "Caribbean Netherlands",
        "value": "BQ"
    },
    {
        "label": "Cayman Islands",
        "value": "KY"
    },
    {
        "label": "Central African Republic",
        "value": "CF"
    },
    {
        "label": "Chad",
        "value": "TD"
    },
    {
        "label": "Chile",
        "value": "CL"
    },
    {
        "label": "China",
        "value": "CN"
    },
    {
        "label": "Christmas Island",
        "value": "CX"
    },
    {
        "label": "Cocos (Keeling) Islands",
        "value": "CC"
    },
    {
        "label": "Colombia",
        "value": "CO"
    },
    {
        "label": "Comoros",
        "value": "KM"
    },
    {
        "label": "Congo - Brazzaville",
        "value": "CG"
    },
    {
        "label": "Congo - Kinshasa",
        "value": "CD"
    },
    {
        "label": "Cook Islands",
        "value": "CK"
    },
    {
        "label": "Costa Rica",
        "value": "CR"
    },
    {
        "label": "Côte d'Ivoire",
        "value": "CI"
    },
    {
        "label": "Croatia",
        "value": "HR"
    },
    {
        "label": "Cuba",
        "value": "CU"
    },
    {
        "label": "Curaçao",
        "value": "CW"
    },
    {
        "label": "Cyprus",
        "value": "CY"
    },
    {
        "label": "Czechia",
        "value": "CZ"
    },
    {
        "label": "Denmark",
        "value": "DK"
    },
    {
        "label": "Djibouti",
        "value": "DJ"
    },
    {
        "label": "Dominica",
        "value": "DM"
    },
    {
        "label": "Dominican Republic",
        "value": "DO"
    },
    {
        "label": "Ecuador",
        "value": "EC"
    },
    {
        "label": "Egypt",
        "value": "EG"
    },
    {
        "label": "El Salvador",
        "value": "SV"
    },
    {
        "label": "Equatorial Guinea",
        "value": "GQ"
    },
    {
        "label": "Eritrea",
        "value": "ER"
    },
    {
        "label": "Estonia",
        "value": "EE"
    },
    {
        "label": "Eswatini",
        "value": "SZ"
    },
    {
        "label": "Ethiopia",
        "value": "ET"
    },
    {
        "label": "Falkland Islands",
        "value": "FK"
    },
    {
        "label": "Faroe Islands",
        "value": "FO"
    },
    {
        "label": "Fiji",
        "value": "FJ"
    },
    {
        "label": "Finland",
        "value": "FI"
    },
    {
        "label": "France",
        "value": "FR"
    },
    {
        "label": "French Guiana",
        "value": "GF"
    },
    {
        "label": "French Polynesia",
        "value": "PF"
    },
    {
        "label": "French Southern Territories",
        "value": "TF"
    },
    {
        "label": "Gabon",
        "value": "GA"
    },
    {
        "label": "Gambia",
        "value": "GM"
    },
    {
        "label": "Georgia",
        "value": "GE"
    },
    {
        "label": "Germany",
        "value": "DE"
    },
    {
        "label": "Ghana",
        "value": "GH"
    },
    {
        "label": "Gibraltar",
        "value": "GI"
    },
    {
        "label": "Greece",
        "value": "GR"
    },
    {
        "label": "Greenland",
        "value": "GL"
    },
    {
        "label": "Grenada",
        "value": "GD"
    },
    {
        "label": "Guadeloupe",
        "value": "GP"
    },
    {
        "label": "Guam",
        "value": "GU"
    },
    {
        "label": "Guatemala",
        "value": "GT"
    },
    {
        "label": "Guernsey",
        "value": "GG"
    },
    {
        "label": "Guinea",
        "value": "GN"
    },
    {
        "label": "Guinea-Bissau",
        "value": "GW"
    },
    {
        "label": "Guyana",
        "value": "GY"
    },
    {
        "label": "Haiti",
        "value": "HT"
    },
    {
        "label": "Heard & McDonald Islands",
        "value": "HM"
    },
    {
        "label": "Honduras",
        "value": "HN"
    },
    {
        "label": "Hong Kong SAR",
        "value": "HK"
    },
    {
        "label": "Hungary",
        "value": "HU"
    },
    {
        "label": "Iceland",
        "value": "IS"
    },
    {
        "label": "India",
        "value": "IN"
    },
    {
        "label": "Indonesia",
        "value": "ID"
    },
    {
        "label": "Iran",
        "value": "IR"
    },
    {
        "label": "Iraq",
        "value": "IQ"
    },
    {
        "label": "Ireland",
        "value": "IE"
    },
    {
        "label": "Isle of Man",
        "value": "IM"
    },
    {
        "label": "Israel",
        "value": "IL"
    },
    {
        "label": "Italy",
        "value": "IT"
    },
    {
        "label": "Jamaica",
        "value": "JM"
    },
    {
        "label": "Japan",
        "value": "JP"
    },
    {
        "label": "Jersey",
        "value": "JE"
    },
    {
        "label": "Jordan",
        "value": "JO"
    },
    {
        "label": "Kazakhstan",
        "value": "KZ"
    },
    {
        "label": "Kenya",
        "value": "KE"
    },
    {
        "label": "Kiribati",
        "value": "KI"
    },
    {
        "label": "Kosovo",
        "value": "XK"
    },
    {
        "label": "Kuwait",
        "value": "KW"
    },
    {
        "label": "Kyrgyzstan",
        "value": "KG"
    },
    {
        "label": "Laos",
        "value": "LA"
    },
    {
        "label": "Latvia",
        "value": "LV"
    },
    {
        "label": "Lebanon",
        "value": "LB"
    },
    {
        "label": "Lesotho",
        "value": "LS"
    },
    {
        "label": "Liberia",
        "value": "LR"
    },
    {
        "label": "Libya",
        "value": "LY"
    },
    {
        "label": "Liechtenstein",
        "value": "LI"
    },
    {
        "label": "Lithuania",
        "value": "LT"
    },
    {
        "label": "Luxembourg",
        "value": "LU"
    },
    {
        "label": "Macao SAR China",
        "value": "MO"
    },
    {
        "label": "Madagascar",
        "value": "MG"
    },
    {
        "label": "Malawi",
        "value": "MW"
    },
    {
        "label": "Malaysia",
        "value": "MY"
    },
    {
        "label": "Maldives",
        "value": "MV"
    },
    {
        "label": "Mali",
        "value": "ML"
    },
    {
        "label": "Malta",
        "value": "MT"
    },
    {
        "label": "Martinique",
        "value": "MQ"
    },
    {
        "label": "Mauritania",
        "value": "MR"
    },
    {
        "label": "Mauritius",
        "value": "MU"
    },
    {
        "label": "Mayotte",
        "value": "YT"
    },
    {
        "label": "Mexico",
        "value": "MX"
    },
    {
        "label": "Moldova",
        "value": "MD"
    },
    {
        "label": "Monaco",
        "value": "MC"
    },
    {
        "label": "Mongolia",
        "value": "MN"
    },
    {
        "label": "Montenegro",
        "value": "ME"
    },
    {
        "label": "Montserrat",
        "value": "MS"
    },
    {
        "label": "Morocco",
        "value": "MA"
    },
    {
        "label": "Mozambique",
        "value": "MZ"
    },
    {
        "label": "Myanmar (Burma)",
        "value": "MM"
    },
    {
        "label": "Namibia",
        "value": "NA"
    },
    {
        "label": "Nauru",
        "value": "NR"
    },
    {
        "label": "Nepal",
        "value": "NP"
    },
    {
        "label": "Netherlands",
        "value": "NL"
    },
    {
        "label": "Netherlands Antilles",
        "value": "AN"
    },
    {
        "label": "New Caledonia",
        "value": "NC"
    },
    {
        "label": "New Zealand",
        "value": "NZ"
    },
    {
        "label": "Nicaragua",
        "value": "NI"
    },
    {
        "label": "Niger",
        "value": "NE"
    },
    {
        "label": "Nigeria",
        "value": "NG"
    },
    {
        "label": "Niue",
        "value": "NU"
    },
    {
        "label": "Norfolk Island",
        "value": "NF"
    },
    {
        "label": "North Korea",
        "value": "KP"
    },
    {
        "label": "North Macedonia",
        "value": "MK"
    },
    {
        "label": "Norway",
        "value": "NO"
    },
    {
        "label": "Oman",
        "value": "OM"
    },
    {
        "label": "Pakistan",
        "value": "PK"
    },
    {
        "label": "Palestinian Territories",
        "value": "PS"
    },
    {
        "label": "Panama",
        "value": "PA"
    },
    {
        "label": "Papua New Guinea",
        "value": "PG"
    },
    {
        "label": "Paraguay",
        "value": "PY"
    },
    {
        "label": "Peru",
        "value": "PE"
    },
    {
        "label": "Philippines",
        "value": "PH"
    },
    {
        "label": "Pitcairn Islands",
        "value": "PN"
    },
    {
        "label": "Poland",
        "value": "PL"
    },
    {
        "label": "Portugal",
        "value": "PT"
    },
    {
        "label": "Qatar",
        "value": "QA"
    },
    {
        "label": "Reunion",
        "value": "RE"
    },
    {
        "label": "Romania",
        "value": "RO"
    },
    {
        "label": "Russia",
        "value": "RU"
    },
    {
        "label": "Rwanda",
        "value": "RW"
    },
    {
        "label": "Samoa",
        "value": "WS"
    },
    {
        "label": "San Marino",
        "value": "SM"
    },
    {
        "label": "Sao Tome And Principe",
        "value": "ST"
    },
    {
        "label": "Saudi Arabia",
        "value": "SA"
    },
    {
        "label": "Senegal",
        "value": "SN"
    },
    {
        "label": "Serbia",
        "value": "RS"
    },
    {
        "label": "Seychelles",
        "value": "SC"
    },
    {
        "label": "Sierra Leone",
        "value": "SL"
    },
    {
        "label": "Singapore",
        "value": "SG"
    },
    {
        "label": "Sint Maarten",
        "value": "SX"
    },
    {
        "label": "Slovakia",
        "value": "SK"
    },
    {
        "label": "Slovenia",
        "value": "SI"
    },
    {
        "label": "Solomon Islands",
        "value": "SB"
    },
    {
        "label": "Somalia",
        "value": "SO"
    },
    {
        "label": "South Africa",
        "value": "ZA"
    },
    {
        "label": "South Georgia & South Sandwich Islands",
        "value": "GS"
    },
    {
        "label": "South Korea",
        "value": "KR"
    },
    {
        "label": "South Sudan",
        "value": "SS"
    },
    {
        "label": "Spain",
        "value": "ES"
    },
    {
        "label": "Sri Lanka",
        "value": "LK"
    },
    {
        "label": "St. Barthélemy",
        "value": "BL"
    },
    {
        "label": "St. Helena",
        "value": "SH"
    },
    {
        "label": "St. Kitts & Nevis",
        "value": "KN"
    },
    {
        "label": "St. Lucia",
        "value": "LC"
    },
    {
        "label": "St. Martin",
        "value": "MF"
    },
    {
        "label": "St. Pierre & Miquelon",
        "value": "PM"
    },
    {
        "label": "St. Vincent & Grenadines",
        "value": "VC"
    },
    {
        "label": "Sudan",
        "value": "SD"
    },
    {
        "label": "Suriname",
        "value": "SR"
    },
    {
        "label": "Svalbard & Jan Mayen",
        "value": "SJ"
    },
    {
        "label": "Sweden",
        "value": "SE"
    },
    {
        "label": "Switzerland",
        "value": "CH"
    },
    {
        "label": "Syria",
        "value": "SY"
    },
    {
        "label": "Taiwan",
        "value": "TW"
    },
    {
        "label": "Tajikistan",
        "value": "TJ"
    },
    {
        "label": "Tanzania",
        "value": "TZ"
    },
    {
        "label": "Thailand",
        "value": "TH"
    },
    {
        "label": "Timor-Leste",
        "value": "TL"
    },
    {
        "label": "Togo",
        "value": "TG"
    },
    {
        "label": "Tokelau",
        "value": "TK"
    },
    {
        "label": "Tonga",
        "value": "TO"
    },
    {
        "label": "Trinidad & Tobago",
        "value": "TT"
    },
    {
        "label": "Tristan da Cunha",
        "value": "TA"
    },
    {
        "label": "Tunisia",
        "value": "TN"
    },
    {
        "label": "Turkey",
        "value": "TR"
    },
    {
        "label": "Turkmenistan",
        "value": "TM"
    },
    {
        "label": "Turks & Caicos Islands",
        "value": "TC"
    },
    {
        "label": "Tuvalu",
        "value": "TV"
    },
    {
        "label": "U.S. Outlying Islands",
        "value": "UM"
    },
    {
        "label": "Uganda",
        "value": "UG"
    },
    {
        "label": "Ukraine",
        "value": "UA"
    },
    {
        "label": "United Arab Emirates",
        "value": "AE"
    },
    {
        "label": "United Kingdom",
        "value": "GB"
    },
    {
        "label": "United States",
        "value": "US"
    },
    {
        "label": "Uruguay",
        "value": "UY"
    },
    {
        "label": "Uzbekistan",
        "value": "UZ"
    },
    {
        "label": "Vanuatu",
        "value": "VU"
    },
    {
        "label": "Vatican City",
        "value": "VA"
    },
    {
        "label": "Venezuela",
        "value": "VE"
    },
    {
        "label": "Vietnam",
        "value": "VN"
    },
    {
        "label": "Wallis & Futuna",
        "value": "WF"
    },
    {
        "label": "Western Sahara",
        "value": "EH"
    },
    {
        "label": "Yemen",
        "value": "YE"
    },
    {
        "label": "Zambia",
        "value": "ZM"
    },
    {
        "label": "Zimbabwe",
        "value": "ZW"
    }
]

const formDefault = {
    author: '',
    domain: '',
    listCountrySelected: [],
}

// function arrayEqual(arr1, arr2) {
//     if (arr1.length !== arr2.length) return false;
//     return arr1.every((v, i) => v === arr2[i]);
// }

const isValidShopifyDomain = (domain) => {
    return typeof domain === 'string' && domain.endsWith('.myshopify.com') && !domain.startsWith('httpF');
};

export default function CreateVahuPage() {
    const pathname = usePathname();
    const actionVahu = pathname.split('/').pop();
    const [loading, setLoading] = useState(false);
    const [isSubmit, setIsSubmit] = useState(false);
    const [form, setForm] = useState(formDefault);
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
                showToastMessage('Có lỗi xảy ra, vui lòng kiểm tra lại hoặc liên hệ nhà phát triển');
            }
            showToastMessage('Cập nhật thông tin thành công');
        } catch (err) {
            throw new Error("Server Error");
        } finally {
            setIsSubmit(false)
        }
    };

    const handleDomainBlur = async (e) => {
        showToastMessage('Không có thông tin, nhưng bạn có thể tạo mới');
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
                // setForm((prev) => ({
                //     ...prev,
                //     page: resReponse.params[1],
                //     language: detectLanguage(resReponse.params[0], dataLanguage)
                // }));
                console.log(resReponse)
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