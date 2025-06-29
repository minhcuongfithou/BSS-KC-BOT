{
	domain: "dev-cuong-nm-store.myshopify.com",
	actionId: ObjectId('685fa57d5fa008b0f94c294d'),
    author: "KC"
}

{
  "name": "Cái này là KC đang test",
  "coreJs": "(() => { console.log(123); })();",
  "listAction": "custom:cart/showSubtotalPrice",
  "listFilter": ""
}
==========================

const customCountryList = (...data) => {
  const defaultCountries = data[0];
  const countryList = #countryList#;
  return defaultCountries.filter(country => countryList.includes(country.value));
}

window.BSS_B2B.addFilter('custom:rf/country', customCountryList);

Custom country RF chỉ show 1 vài giá trị
custom-display-some-country
showSubtotal

====================


function translateCountry() {
    const lang = '#lang#';
    switch (lang) {
        case 'DE':
            return [
                { "label": "Afghanistan", "value": "AF" },
                { "label": "Ägypten", "value": "EG" },
                { "label": "Åland", "value": "AX" },
                { "label": "Albanien", "value": "AL" },
                { "label": "Algerien", "value": "DZ" },
                { "label": "Amerikanisch-Ozeanien", "value": "UM" },
                { "label": "Amerikanische Jungferninseln", "value": "VI" },
                { "label": "Andorra", "value": "AD" },
                { "label": "Angola", "value": "AO" },
                { "label": "Anguilla", "value": "AI" },
                { "label": "Antarktis", "value": "AQ" },
                { "label": "Antigua und Barbuda", "value": "AG" },
                { "label": "Äquatorialguinea", "value": "GQ" },
                { "label": "Argentinien", "value": "AR" },
                { "label": "Armenien", "value": "AM" },
                { "label": "Aruba", "value": "AW" },
                { "label": "Aserbaidschan", "value": "AZ" },
                { "label": "Äthiopien", "value": "ET" },
                { "label": "Australien", "value": "AU" },
                { "label": "Bahamas", "value": "BS" },
                { "label": "Bahrain", "value": "BH" },
                { "label": "Bangladesch", "value": "BD" },
                { "label": "Barbados", "value": "BB" },
                { "label": "Belarus", "value": "BY" },
                { "label": "Belgien", "value": "BE" },
                { "label": "Belize", "value": "BZ" },
                { "label": "Benin", "value": "BJ" },
                { "label": "Bermuda", "value": "BM" },
                { "label": "Bhutan", "value": "BT" },
                { "label": "Bolivien", "value": "BO" },
                { "label": "Bonaire, Sint Eustatius und Saba", "value": "BQ" },
                { "label": "Bosnien und Herzegowina", "value": "BA" },
                { "label": "Botswana", "value": "BW" },
                { "label": "Bouvetinsel", "value": "BV" },
                { "label": "Brasilien", "value": "BR" },
                { "label": "Britische Jungferninseln", "value": "VG" },
                { "label": "Britisches Territorium im Indischen Ozean", "value": "IO" },
                { "label": "Brunei Darussalam", "value": "BN" },
                { "label": "Bulgarien", "value": "BG" },
                { "label": "Burkina Faso", "value": "BF" },
                { "label": "Burundi", "value": "BI" },
                { "label": "Chile", "value": "CL" },
                { "label": "China", "value": "CN" },
                { "label": "Cookinseln", "value": "CK" },
                { "label": "Costa Rica", "value": "CR" },
                { "label": "Curaçao", "value": "CW" },
                { "label": "Dänemark", "value": "DK" },
                { "label": "Deutschland", "value": "DE" },
                { "label": "Dominica", "value": "DM" },
                { "label": "Dominikanische Republik", "value": "DO" },
                { "label": "Dschibuti", "value": "DJ" },
                { "label": "Ecuador", "value": "EC" },
                { "label": "El Salvador", "value": "SV" },
                { "label": "Eritrea", "value": "ER" },
                { "label": "Estland", "value": "EE" },
                { "label": "Eswatini", "value": "SZ" },
                { "label": "Falklandinseln", "value": "FK" },
                { "label": "Färöer", "value": "FO" },
                { "label": "Fidschi", "value": "FJ" },
                { "label": "Finnland", "value": "FI" },
                { "label": "Frankreich", "value": "FR" },
                { "label": "Französisch-Guayana", "value": "GF" },
                { "label": "Französisch-Polynesien", "value": "PF" },
                { "label": "Französische Süd- und Antarktisgebiete", "value": "TF" },
                { "label": "Gabun", "value": "GA" },
                { "label": "Gambia", "value": "GM" },
                { "label": "Georgien", "value": "GE" },
                { "label": "Ghana", "value": "GH" },
                { "label": "Gibraltar", "value": "GI" },
                { "label": "Grenada", "value": "GD" },
                { "label": "Griechenland", "value": "GR" },
                { "label": "Grönland", "value": "GL" },
                { "label": "Guadeloupe", "value": "GP" },
                { "label": "Guam", "value": "GU" },
                { "label": "Guatemala", "value": "GT" },
                { "label": "Guernsey", "value": "GG" },
                { "label": "Guinea", "value": "GN" },
                { "label": "Guinea-Bissau", "value": "GW" },
                { "label": "Guyana", "value": "GY" },
                { "label": "Haiti", "value": "HT" },
                { "label": "Honduras", "value": "HN" },
                { "label": "Hongkong", "value": "HK" },
                { "label": "Indien", "value": "IN" },
                { "label": "Indonesien", "value": "ID" },
                { "label": "Irak", "value": "IQ" },
                { "label": "Iran", "value": "IR" },
                { "label": "Irland", "value": "IE" },
                { "label": "Island", "value": "IS" },
                { "label": "Israel", "value": "IL" },
                { "label": "Italien", "value": "IT" },
                { "label": "Jamaika", "value": "JM" },
                { "label": "Japan", "value": "JP" },
                { "label": "Jordanien", "value": "JO" },
                { "label": "Kambodscha", "value": "KH" },
                { "label": "Kamerun", "value": "CM" },
                { "label": "Kanada", "value": "CA" },
                { "label": "Kasachstan", "value": "KZ" },
                { "label": "Kenia", "value": "KE" },
                { "label": "Kiribati", "value": "KI" },
                { "label": "Kolumbien", "value": "CO" },
                { "label": "Komoren", "value": "KM" },
                { "label": "Kongo (Brazzaville)", "value": "CG" },
                { "label": "Kongo (Kinshasa)", "value": "CD" },
                { "label": "Kroatien", "value": "HR" },
                { "label": "Kuba", "value": "CU" },
                { "label": "Kuwait", "value": "KW" },
                { "label": "Laos", "value": "LA" },
                { "label": "Lesotho", "value": "LS" },
                { "label": "Lettland", "value": "LV" },
                { "label": "Libanon", "value": "LB" },
                { "label": "Liberia", "value": "LR" },
                { "label": "Libyen", "value": "LY" },
                { "label": "Liechtenstein", "value": "LI" },
                { "label": "Litauen", "value": "LT" },
                { "label": "Luxemburg", "value": "LU" },
                { "label": "Macau", "value": "MO" },
                { "label": "Madagaskar", "value": "MG" },
                { "label": "Malawi", "value": "MW" },
                { "label": "Malaysia", "value": "MY" },
                { "label": "Malediven", "value": "MV" },
                { "label": "Mali", "value": "ML" },
                { "label": "Malta", "value": "MT" },
                { "label": "Marokko", "value": "MA" },
                { "label": "Marshallinseln", "value": "MH" },
                { "label": "Mauretanien", "value": "MR" },
                { "label": "Mauritius", "value": "MU" },
                { "label": "Mayotte", "value": "YT" },
                { "label": "Mexiko", "value": "MX" },
                { "label": "Mikronesien", "value": "FM" },
                { "label": "Moldawien", "value": "MD" },
                { "label": "Monaco", "value": "MC" },
                { "label": "Mongolei", "value": "MN" },
                { "label": "Montenegro", "value": "ME" },
                { "label": "Montserrat", "value": "MS" },
                { "label": "Mosambik", "value": "MZ" },
                { "label": "Myanmar", "value": "MM" },
                { "label": "Namibia", "value": "NA" },
                { "label": "Nauru", "value": "NR" },
                { "label": "Nepal", "value": "NP" },
                { "label": "Neukaledonien", "value": "NC" },
                { "label": "Neuseeland", "value": "NZ" },
                { "label": "Nicaragua", "value": "NI" },
                { "label": "Niederlande", "value": "NL" },
                { "label": "Niger", "value": "NE" },
                { "label": "Nigeria", "value": "NG" },
                { "label": "Niue", "value": "NU" },
                { "label": "Nordmazedonien", "value": "MK" },
                { "label": "Norfolkinsel", "value": "NF" },
                { "label": "Norwegen", "value": "NO" },
                { "label": "Oman", "value": "OM" },
                { "label": "Österreich", "value": "AT" },
                { "label": "Pakistan", "value": "PK" },
                { "label": "Palau", "value": "PW" },
                { "label": "Palästina", "value": "PS" },
                { "label": "Panama", "value": "PA" },
                { "label": "Papua-Neuguinea", "value": "PG" },
                { "label": "Paraguay", "value": "PY" },
                { "label": "Peru", "value": "PE" },
                { "label": "Philippinen", "value": "PH" },
                { "label": "Pitcairninseln", "value": "PN" },
                { "label": "Polen", "value": "PL" },
                { "label": "Portugal", "value": "PT" },
                { "label": "Puerto Rico", "value": "PR" },
                { "label": "Réunion", "value": "RE" },
                { "label": "Ruanda", "value": "RW" },
                { "label": "Rumänien", "value": "RO" },
                { "label": "Russland", "value": "RU" },
                { "label": "Salomonen", "value": "SB" },
                { "label": "Sambia", "value": "ZM" },
                { "label": "Samoa", "value": "WS" },
                { "label": "San Marino", "value": "SM" },
                { "label": "São Tomé und Príncipe", "value": "ST" },
                { "label": "Saudi-Arabien", "value": "SA" },
                { "label": "Schweden", "value": "SE" },
                { "label": "Schweiz", "value": "CH" },
                { "label": "Senegal", "value": "SN" },
                { "label": "Serbien", "value": "RS" },
                { "label": "Seychellen", "value": "SC" },
                { "label": "Sierra Leone", "value": "SL" },
                { "label": "Simbabwe", "value": "ZW" },
                { "label": "Singapur", "value": "SG" },
                { "label": "Sint Maarten", "value": "SX" },
                { "label": "Slowakei", "value": "SK" },
                { "label": "Slowenien", "value": "SI" },
                { "label": "Somalia", "value": "SO" },
                { "label": "Spanien", "value": "ES" },
                { "label": "Sri Lanka", "value": "LK" },
                { "label": "St. Barthélemy", "value": "BL" },
                { "label": "St. Helena", "value": "SH" },
                { "label": "St. Kitts und Nevis", "value": "KN" },
                { "label": "St. Lucia", "value": "LC" },
                { "label": "St. Martin", "value": "MF" },
                { "label": "St. Pierre und Miquelon", "value": "PM" },
                { "label": "St. Vincent und die Grenadinen", "value": "VC" },
                { "label": "Südafrika", "value": "ZA" },
                { "label": "Sudan", "value": "SD" },
                { "label": "Südsudan", "value": "SS" },
                { "label": "Suriname", "value": "SR" },
                { "label": "Syrien", "value": "SY" },
                { "label": "Tadschikistan", "value": "TJ" },
                { "label": "Taiwan", "value": "TW" },
                { "label": "Tansania", "value": "TZ" },
                { "label": "Thailand", "value": "TH" },
                { "label": "Timor-Leste", "value": "TL" },
                { "label": "Togo", "value": "TG" },
                { "label": "Tokelau", "value": "TK" },
                { "label": "Tonga", "value": "TO" },
                { "label": "Trinidad und Tobago", "value": "TT" },
                { "label": "Tschad", "value": "TD" },
                { "label": "Tschechien", "value": "CZ" },
                { "label": "Tunesien", "value": "TN" },
                { "label": "Türkei", "value": "TR" },
                { "label": "Turkmenistan", "value": "TM" },
                { "label": "Tuvalu", "value": "TV" },
                { "label": "Uganda", "value": "UG" },
                { "label": "Ukraine", "value": "UA" },
                { "label": "Ungarn", "value": "HU" },
                { "label": "Uruguay", "value": "UY" },
                { "label": "Usbekistan", "value": "UZ" },
                { "label": "Vanuatu", "value": "VU" },
                { "label": "Vatikanstadt", "value": "VA" },
                { "label": "Venezuela", "value": "VE" },
                { "label": "Vereinigte Arabische Emirate", "value": "AE" },
                { "label": "Vereinigte Staaten", "value": "US" },
                { "label": "Vietnam", "value": "VN" },
                { "label": "Wallis und Futuna", "value": "WF" },
                { "label": "Weißrussland", "value": "BY" },
                { "label": "Westsahara", "value": "EH" },
                { "label": "Zentralafrikanische Republik", "value": "CF" },
                { "label": "Zypern", "value": "CY" }
            ]
        default:
            return [
                { "label": "Afghanistan", "value": "AF" },
                { "label": "Aland Islands", "value": "AX" },
                { "label": "Albania", "value": "AL" },
                { "label": "Algeria", "value": "DZ" },
                { "label": "Andorra", "value": "AD" },
                { "label": "Angola", "value": "AO" },
                { "label": "Anguilla", "value": "AI" },
                { "label": "Antigua & Barbuda", "value": "AG" },
                { "label": "Argentina", "value": "AR" },
                { "label": "Armenia", "value": "AM" },
                { "label": "Aruba", "value": "AW" },
                { "label": "Ascension Island", "value": "AC" },
                { "label": "Australia", "value": "AU" },
                { "label": "Austria", "value": "AT" },
                { "label": "Azerbaijan", "value": "AZ" },
                { "label": "Bahamas", "value": "BS" },
                { "label": "Bahrain", "value": "BH" },
                { "label": "Bangladesh", "value": "BD" },
                { "label": "Barbados", "value": "BB" },
                { "label": "Belarus", "value": "BY" },
                { "label": "Belgium", "value": "BE" },
                { "label": "Belize", "value": "BZ" },
                { "label": "Benin", "value": "BJ" },
                { "label": "Bermuda", "value": "BM" },
                { "label": "Bhutan", "value": "BT" },
                { "label": "Bolivia", "value": "BO" },
                { "label": "Bosnia & Herzegovina", "value": "BA" },
                { "label": "Botswana", "value": "BW" },
                { "label": "Bouvet Island", "value": "BV" },
                { "label": "Brazil", "value": "BR" },
                { "label": "British Indian Ocean Territory", "value": "IO" },
                { "label": "British Virgin Islands", "value": "VG" },
                { "label": "Brunei", "value": "BN" },
                { "label": "Bulgaria", "value": "BG" },
                { "label": "Burkina Faso", "value": "BF" },
                { "label": "Burundi", "value": "BI" },
                { "label": "Cambodia", "value": "KH" },
                { "label": "Cameroon", "value": "CM" },
                { "label": "Canada", "value": "CA" },
                { "label": "Cape Verde", "value": "CV" },
                { "label": "Caribbean Netherlands", "value": "BQ" },
                { "label": "Cayman Islands", "value": "KY" },
                { "label": "Central African Republic", "value": "CF" },
                { "label": "Chad", "value": "TD" },
                { "label": "Chile", "value": "CL" },
                { "label": "China", "value": "CN" },
                { "label": "Christmas Island", "value": "CX" },
                { "label": "Cocos (Keeling) Islands", "value": "CC" },
                { "label": "Colombia", "value": "CO" },
                { "label": "Comoros", "value": "KM" },
                { "label": "Congo - Brazzaville", "value": "CG" },
                { "label": "Congo - Kinshasa", "value": "CD" },
                { "label": "Cook Islands", "value": "CK" },
                { "label": "Costa Rica", "value": "CR" },
                { "label": "Côte d'Ivoire", "value": "CI" },
                { "label": "Croatia", "value": "HR" },
                { "label": "Cuba", "value": "CU" },
                { "label": "Curaçao", "value": "CW" },
                { "label": "Cyprus", "value": "CY" },
                { "label": "Czechia", "value": "CZ" },
                { "label": "Denmark", "value": "DK" },
                { "label": "Djibouti", "value": "DJ" },
                { "label": "Dominica", "value": "DM" },
                { "label": "Dominican Republic", "value": "DO" },
                { "label": "Ecuador", "value": "EC" },
                { "label": "Egypt", "value": "EG" },
                { "label": "El Salvador", "value": "SV" },
                { "label": "Equatorial Guinea", "value": "GQ" },
                { "label": "Eritrea", "value": "ER" },
                { "label": "Estonia", "value": "EE" },
                { "label": "Eswatini", "value": "SZ" },
                { "label": "Ethiopia", "value": "ET" },
                { "label": "Falkland Islands", "value": "FK" },
                { "label": "Faroe Islands", "value": "FO" },
                { "label": "Fiji", "value": "FJ" },
                { "label": "Finland", "value": "FI" },
                { "label": "France", "value": "FR" },
                { "label": "French Guiana", "value": "GF" },
                { "label": "French Polynesia", "value": "PF" },
                { "label": "French Southern Territories", "value": "TF" },
                { "label": "Gabon", "value": "GA" },
                { "label": "Gambia", "value": "GM" },
                { "label": "Georgia", "value": "GE" },
                { "label": "Germany", "value": "DE" },
                { "label": "Ghana", "value": "GH" },
                { "label": "Gibraltar", "value": "GI" },
                { "label": "Greece", "value": "GR" },
                { "label": "Greenland", "value": "GL" },
                { "label": "Grenada", "value": "GD" },
                { "label": "Guadeloupe", "value": "GP" },
                { "label": "Guam", "value": "GU" },
                { "label": "Guatemala", "value": "GT" },
                { "label": "Guernsey", "value": "GG" },
                { "label": "Guinea", "value": "GN" },
                { "label": "Guinea-Bissau", "value": "GW" },
                { "label": "Guyana", "value": "GY" },
                { "label": "Haiti", "value": "HT" },
                { "label": "Heard & McDonald Islands", "value": "HM" },
                { "label": "Honduras", "value": "HN" },
                { "label": "Hong Kong SAR", "value": "HK" },
                { "label": "Hungary", "value": "HU" },
                { "label": "Iceland", "value": "IS" },
                { "label": "India", "value": "IN" },
                { "label": "Indonesia", "value": "ID" },
                { "label": "Iran", "value": "IR" },
                { "label": "Iraq", "value": "IQ" },
                { "label": "Ireland", "value": "IE" },
                { "label": "Isle of Man", "value": "IM" },
                { "label": "Israel", "value": "IL" },
                { "label": "Italy", "value": "IT" },
                { "label": "Jamaica", "value": "JM" },
                { "label": "Japan", "value": "JP" },
                { "label": "Jersey", "value": "JE" },
                { "label": "Jordan", "value": "JO" },
                { "label": "Kazakhstan", "value": "KZ" },
                { "label": "Kenya", "value": "KE" },
                { "label": "Kiribati", "value": "KI" },
                { "label": "Kosovo", "value": "XK" },
                { "label": "Kuwait", "value": "KW" },
                { "label": "Kyrgyzstan", "value": "KG" },
                { "label": "Laos", "value": "LA" },
                { "label": "Latvia", "value": "LV" },
                { "label": "Lebanon", "value": "LB" },
                { "label": "Lesotho", "value": "LS" },
                { "label": "Liberia", "value": "LR" },
                { "label": "Libya", "value": "LY" },
                { "label": "Liechtenstein", "value": "LI" },
                { "label": "Lithuania", "value": "LT" },
                { "label": "Luxembourg", "value": "LU" },
                { "label": "Macao SAR China", "value": "MO" },
                { "label": "Madagascar", "value": "MG" },
                { "label": "Malawi", "value": "MW" },
                { "label": "Malaysia", "value": "MY" },
                { "label": "Maldives", "value": "MV" },
                { "label": "Mali", "value": "ML" },
                { "label": "Malta", "value": "MT" },
                { "label": "Martinique", "value": "MQ" },
                { "label": "Mauritania", "value": "MR" },
                { "label": "Mauritius", "value": "MU" },
                { "label": "Mayotte", "value": "YT" },
                { "label": "Mexico", "value": "MX" },
                { "label": "Moldova", "value": "MD" },
                { "label": "Monaco", "value": "MC" },
                { "label": "Mongolia", "value": "MN" },
                { "label": "Montenegro", "value": "ME" },
                { "label": "Montserrat", "value": "MS" },
                { "label": "Morocco", "value": "MA" },
                { "label": "Mozambique", "value": "MZ" },
                { "label": "Myanmar (Burma)", "value": "MM" },
                { "label": "Namibia", "value": "NA" },
                { "label": "Nauru", "value": "NR" },
                { "label": "Nepal", "value": "NP" },
                { "label": "Netherlands", "value": "NL" },
                { "label": "Netherlands Antilles", "value": "AN" },
                { "label": "New Caledonia", "value": "NC" },
                { "label": "New Zealand", "value": "NZ" },
                { "label": "Nicaragua", "value": "NI" },
                { "label": "Niger", "value": "NE" },
                { "label": "Nigeria", "value": "NG" },
                { "label": "Niue", "value": "NU" },
                { "label": "Norfolk Island", "value": "NF" },
                { "label": "North Korea", "value": "KP" },
                { "label": "North Macedonia", "value": "MK" },
                { "label": "Norway", "value": "NO" },
                { "label": "Oman", "value": "OM" },
                { "label": "Pakistan", "value": "PK" },
                { "label": "Palestinian Territories", "value": "PS" },
                { "label": "Panama", "value": "PA" },
                { "label": "Papua New Guinea", "value": "PG" },
                { "label": "Paraguay", "value": "PY" },
                { "label": "Peru", "value": "PE" },
                { "label": "Philippines", "value": "PH" },
                { "label": "Pitcairn Islands", "value": "PN" },
                { "label": "Poland", "value": "PL" },
                { "label": "Portugal", "value": "PT" },
                { "label": "Qatar", "value": "QA" },
                { "label": "Reunion", "value": "RE" },
                { "label": "Romania", "value": "RO" },
                { "label": "Russia", "value": "RU" },
                { "label": "Rwanda", "value": "RW" },
                { "label": "Samoa", "value": "WS" },
                { "label": "San Marino", "value": "SM" },
                { "label": "Sao Tome And Principe", "value": "ST" },
                { "label": "Saudi Arabia", "value": "SA" },
                { "label": "Senegal", "value": "SN" },
                { "label": "Serbia", "value": "RS" },
                { "label": "Seychelles", "value": "SC" },
                { "label": "Sierra Leone", "value": "SL" },
                { "label": "Singapore", "value": "SG" },
                { "label": "Sint Maarten", "value": "SX" },
                { "label": "Slovakia", "value": "SK" },
                { "label": "Slovenia", "value": "SI" },
                { "label": "Solomon Islands", "value": "SB" },
                { "label": "Somalia", "value": "SO" },
                { "label": "South Africa", "value": "ZA" },
                { "label": "South Georgia & South Sandwich Islands", "value": "GS" },
                { "label": "South Korea", "value": "KR" },
                { "label": "South Sudan", "value": "SS" },
                { "label": "Spain", "value": "ES" },
                { "label": "Sri Lanka", "value": "LK" },
                { "label": "St. Barthélemy", "value": "BL" },
                { "label": "St. Helena", "value": "SH" },
                { "label": "St. Kitts & Nevis", "value": "KN" },
                { "label": "St. Lucia", "value": "LC" },
                { "label": "St. Martin", "value": "MF" },
                { "label": "St. Pierre & Miquelon", "value": "PM" },
                { "label": "St. Vincent & Grenadines", "value": "VC" },
                { "label": "Sudan", "value": "SD" },
                { "label": "Suriname", "value": "SR" },
                { "label": "Svalbard & Jan Mayen", "value": "SJ" },
                { "label": "Sweden", "value": "SE" },
                { "label": "Switzerland", "value": "CH" },
                { "label": "Syria", "value": "SY" },
                { "label": "Taiwan", "value": "TW" },
                { "label": "Tajikistan", "value": "TJ" },
                { "label": "Tanzania", "value": "TZ" },
                { "label": "Thailand", "value": "TH" },
                { "label": "Timor-Leste", "value": "TL" },
                { "label": "Togo", "value": "TG" },
                { "label": "Tokelau", "value": "TK" },
                { "label": "Tonga", "value": "TO" },
                { "label": "Trinidad & Tobago", "value": "TT" },
                { "label": "Tristan da Cunha", "value": "TA" },
                { "label": "Tunisia", "value": "TN" },
                { "label": "Turkey", "value": "TR" },
                { "label": "Turkmenistan", "value": "TM" },
                { "label": "Turks & Caicos Islands", "value": "TC" },
                { "label": "Tuvalu", "value": "TV" },
                { "label": "U.S. Outlying Islands", "value": "UM" },
                { "label": "Uganda", "value": "UG" },
                { "label": "Ukraine", "value": "UA" },
                { "label": "United Arab Emirates", "value": "AE" },
                { "label": "United Kingdom", "value": "GB" },
                { "label": "United States", "value": "US" },
                { "label": "Uruguay", "value": "UY" },
                { "label": "Uzbekistan", "value": "UZ" },
                { "label": "Vanuatu", "value": "VU" },
                { "label": "Vatican City", "value": "VA" },
                { "label": "Venezuela", "value": "VE" },
                { "label": "Vietnam", "value": "VN" },
                { "label": "Wallis & Futuna", "value": "WF" },
                { "label": "Western Sahara", "value": "EH" },
                { "label": "Yemen", "value": "YE" },
                { "label": "Zambia", "value": "ZM" },
                { "label": "Zimbabwe", "value": "ZW" }
            ];
    }
}

window.BSS_B2B.addFilter('custom:rf/country', translateCountry);


Translate country RF và sắp xếp theo alphabet
custom-translate-country

=====================================

(() => {
    const language = {
        en: {
            labelPass: 'Confirm Password',
            emptyPass: 'Please confirm your password',
            incorrectPass: 'Passwords do not match'
        },
        de: {
            labelPass: 'Passwort bestätigen',
            emptyPass: 'Bitte bestätigen Sie Ihr Passwort',
            incorrectPass: 'Passwörter stimmen nicht überein'
        },
        it: {
            labelPass: 'Passwort bestätigen',
            emptyPass: 'Bitte bestätigen Sie Ihr Passwort',
            incorrectPass: 'Passwörter stimmen nicht überein'
        }
    }
    const defaultLang = 'en';
    const isRFPage = ['/pages/bss-form-test'].includes(window.location.pathname)
    if (!isRFPage) return;
    const intervalTime = 100;
    const maxTime = 8000;
    let elapsedTime = 0;

    const intervalId = setInterval(() => {
        const form = document.querySelector(".field-password");

        if (form) {
            setTimeout(() => {
                handleForm();
            }, 50)
            clearInterval(intervalId);
        }

        elapsedTime += intervalTime;

        if (elapsedTime >= maxTime) {
            clearInterval(intervalId);
        }
    }, intervalTime);

    function handleForm() {
        const confirmPasswordHTML = `<div class="bss-b2b-rf-field field-password bss-b2b-grid-col-3" bis_skin_checked="1">
            <label for="password" class="label-field" title="Passwort">${language[defaultLang].labelPass}<span class="required">*</span> </label>
            <div class="password-input" bis_skin_checked="1">
                <input type="password" id="repassword" class="password" name="repassword" placeholder="">
                <div class="show-password show-password-confirm" bis_skin_checked="1"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16"> <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"></path> <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"></path> </svg></div>
                <div class="hide-password hide-password-confirm" style="display: none;" bis_skin_checked="1"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash" viewBox="0 0 16 16"> <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"></path> <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"></path> <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"></path> </svg></div>
            </div>
            <span class="bss-message bss-password-error"></span>
        </div>`;

        document.querySelector(".field-password")?.insertAdjacentHTML("afterEnd", confirmPasswordHTML);
        const form = document.querySelector("form#bss-b2b-register-form")
        const password = document.getElementById("password");
        const confirmPassword = document.getElementById("repassword");
        const messConfirmPass = document.getElementById("repassword")?.closest(".field-password")?.querySelector(".bss-message");
        const showPassConfirm = document.querySelector(".show-password-confirm")
        const hidePassConfirm = document.querySelector(".hide-password-confirm")
        if (!form) return;
        form.addEventListener("submit", async (event) => {
            if (confirmPassword.value.trim().length === 0) {
                confirmPassword.style.setProperty("border-color", "rgb(144, 11, 9)");
                messConfirmPass.style.setProperty("color", "rgb(255,0,0)");
                messConfirmPass.textContent = `${language[defaultLang].emptyPass}`;
                confirmPassword.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });
            }
            if (password.value.trim().length === 0) return;
            if (password.value && confirmPassword.value && password.value !== confirmPassword.value) {
                event.stopImmediatePropagation();
                event.preventDefault();
                event.stopPropagation();

                confirmPassword.style.setProperty("border-color", "rgb(144, 11, 9)");
                messConfirmPass.style.setProperty("color", "rgb(255,0,0)");
                messConfirmPass.textContent = `${language[defaultLang].incorrectPass}`;
                confirmPassword.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });
            } else {
                confirmPassword.removeAttribute("style");
                messConfirmPass.innerHTML = "";
            }
        }, true);

        confirmPassword.addEventListener("keyup", () => {
            confirmPassword.removeAttribute("style");
            if (messConfirmPass) {
                messConfirmPass.innerHTML = "";
            }
        });
        confirmPassword.addEventListener("change", () => {
            confirmPassword.removeAttribute("style");
            if (messConfirmPass) {
                messConfirmPass.innerHTML = "";
            }
        });

        showPassConfirm.addEventListener("click", e => {
            confirmPassword.setAttribute("type", "text");
            showPassConfirm.style.display = "none";
            hidePassConfirm.style.display = "flex";
        });

        hidePassConfirm.addEventListener("click", e => {
            confirmPassword.setAttribute("type", "password");
            hidePassConfirm.style.display = "none";
            showPassConfirm.style.display = "flex";
        });
    }
})();

Custom confirm password RF
custom-confirm-password

==============

