import axios from 'axios';
import Token from '../models/Token';
import dotenv from 'dotenv';
dotenv.config();

const getAccessToken = async (serviceName = 'vahu') => {
    try {
        const tokenDoc = await Token.findOne({ service: serviceName }).sort({ updatedAt: -1 });
        if (!tokenDoc) {
            throw new Error(`Không tìm thấy token cho service: ${serviceName}`);
        }
        return tokenDoc.token;
    } catch (err) {
        console.error('Lỗi khi lấy access token:', err.message);
        return null;
    }
};

const login = async () => {
    try {
        const loginURL = process.env.URL_LOGIN_VAHU;
        const email = process.env.USERNAME_VAHU;
        const password = process.env.PASSWORD_VAHU;

        const response = await axios.post(
            loginURL,
            { email, password },
            {
                headers: {
                    'accept': 'application/json, text/plain, */*',
                    'accept-language': 'en-US,en;q=0.9,vi;q=0.8',
                    'cache-control': 'no-cache',
                    'content-type': 'application/json',
                    'pragma': 'no-cache',
                    'priority': 'u=1, i',
                    'sec-ch-ua': '"Google Chrome";v="137", "Chromium";v="137", "Not/A)Brand";v="24"',
                    'sec-ch-ua-mobile': '?0',
                    'sec-ch-ua-platform': '"Windows"',
                    'sec-fetch-dest': 'empty',
                    'sec-fetch-mode': 'cors',
                    'sec-fetch-site': 'same-origin',
                    'cookie': '_your_cookie_here',
                    'Referer': 'https://tb-support.bsscommerce.com/users/login',
                    'Referrer-Policy': 'strict-origin-when-cross-origin'
                },
                withCredentials: true
            }
        );

        const setCookieHeader = response.headers['set-cookie'];
        if (setCookieHeader && setCookieHeader.length > 0) {
            const accessToken = setCookieHeader[0].split(';')[0];
            console.log({ accessToken });
            return accessToken;
        } else {
            console.warn('Không thấy set-cookie trong response headers');
            return null;
        }
    } catch (error) {
        console.error('Lỗi khi login:', error.message);
        return null;
    }
};

const refreshToken = async () => {
    // call lai login de lay accessToken moi
    const newToken = await login();
    // luu vao data base
    await Token.findOneAndUpdate(
        { service: 'vahu' },
        { token: newToken },
        { upsert: true, new: true }
    );
    // return
    return newToken;
}

const getContent = async (token, domain) => {
    const URL_SOLUTION_VAHU = process.env.URL_SOLUTION_VAHU;
    try {
        const response = await axios.get(
            `${URL_SOLUTION_VAHU}${domain}`,
            {
                headers: {
                    'accept': 'application/json, text/plain, */*',
                    'accept-language': 'en-US,en;q=0.9,vi;q=0.8',
                    'cache-control': 'no-cache',
                    'pragma': 'no-cache',
                    'priority': 'u=1, i',
                    'sec-ch-ua': '"Google Chrome";v="137", "Chromium";v="137", "Not/A)Brand";v="24"',
                    'sec-ch-ua-mobile': '?0',
                    'sec-ch-ua-platform': '"Windows"',
                    'sec-fetch-dest': 'empty',
                    'sec-fetch-mode': 'cors',
                    'sec-fetch-site': 'same-origin',
                    'cookie': token,
                    'Referer': 'https://tb-support.bsscommerce.com/support/app_solution/that-gorilla-brand.myshopify.com',
                    'Referrer-Policy': 'strict-origin-when-cross-origin'
                }
            }
        );

        return response.data.message;
    } catch (error) {
        console.log({error})
        if (error.response && error.response.status === 401) {
            throw new Error('EXPIRED_TOKEN');
        } else {
            throw err;
        }
    }
}

const getData = async(domain) => {
    let token = await getAccessToken();
    try {
        const data = await getContent(token, domain);
        return data;
    } catch (err) {
        if (err.message === 'EXPIRED_TOKEN') {
            const newToken = await refreshToken();
            const content = await getContent(newToken, domain);
            return content;
        } else {
            throw err;
        }
    }
}

const saveContent = async (domain, newContent) => {
    const URL_SOLUTION_VAHU = process.env.URL_SOLUTION_VAHU;
    const token = await getAccessToken();
    try {
        const response = await axios.post(
            `${URL_SOLUTION_VAHU}${domain}`,
            { appType: "app_solution", content: newContent},
            {
                headers: {
                    'accept': 'application/json, text/plain, */*',
                    'accept-language': 'en-US,en;q=0.9,vi;q=0.8',
                    'cache-control': 'no-cache',
                    'pragma': 'no-cache',
                    'priority': 'u=1, i',
                    'sec-ch-ua': '"Google Chrome";v="137", "Chromium";v="137", "Not/A)Brand";v="24"',
                    'sec-ch-ua-mobile': '?0',
                    'sec-ch-ua-platform': '"Windows"',
                    'sec-fetch-dest': 'empty',
                    'sec-fetch-mode': 'cors',
                    'sec-fetch-site': 'same-origin',
                    'cookie': token,
                    'Referer': 'https://tb-support.bsscommerce.com/support/app_solution/that-gorilla-brand.myshopify.com',
                    'Referrer-Policy': 'strict-origin-when-cross-origin'
                }
            }
        );
        if(response.data.status === 'success') {
            return {
                success: true
            };
        }

        return {
            success: false
        }
        
    } catch (error) {
        return {
            success: false,
            error
        }
    }
}


const vahuService = {
    login,
    getData,
    saveContent
};

export default vahuService;