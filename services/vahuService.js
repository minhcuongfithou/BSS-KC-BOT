import axios from 'axios';
import Token from '../models/Token';
import dotenv from 'dotenv';
import Action from '@/models/Action';
dotenv.config();

// Backend
const createAction = async(body) => {
    const { title, action, callback } = body;
    const hash = Buffer.from(action).toString('base64');
    const newAction = new Action({ callback, title, action, hash });
    await newAction.save();
    return {success: true};
}

const getAllActions = async () => {
    const actions = await Action.find({});
    return actions;
}

// BOT
const getAccessToken = async (serviceName = 'vahu') => {
    try {
        const tokenDoc = await Token.findOne({ service: serviceName }).sort({ updatedAt: -1 });
        if (!tokenDoc) {
            throw new Error(`Token not found for service: ${serviceName}`);
        }
        return tokenDoc.token;
    } catch (err) {
        console.error('Error while retrieving access token:', err.message);
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
            console.warn('Missing set-cookie header in the response');
            return null;
        }
    } catch (error) {
        console.error('Login failed:', error.message);
        return null;
    }
};

const refreshToken = async () => {
    const newToken = await login();
    await Token.findOneAndUpdate(
        { service: 'vahu' },
        { token: newToken },
        { upsert: true, new: true }
    );
    return newToken;
}

const getData = async (token, domain) => {
    const URL_SOLUTION_VAHU = process.env.URL_SOLUTION_VAHU;
    try {
        const response = await axios.get(
            `${URL_SOLUTION_VAHU}${domain}`,
            {
                headers: {
                    'cookie': token,
                    'Referer': `${URL_SOLUTION_VAHU}/${domain}`,
                    'Referrer-Policy': 'strict-origin-when-cross-origin'
                }
            }
        );

        return response.data.message;
    } catch (error) {
        if (error.response && error.response.status === 401) {
            throw new Error('EXPIRED_TOKEN');
        } else {
            throw err;
        }
    }
}

const getContent = async (domain) => {
    let token = await getAccessToken();
    try {
        const data = await getData(token, domain);
        return data;
    } catch (err) {
        if (err.message === 'EXPIRED_TOKEN') {
            try {
                const newToken = await refreshToken();
                const content = await getData(newToken, domain);
                return content;
            } catch (retryErr) {
                return { success: false, error: retryErr };
            }
        }
    }
}

const saveContent = async (domain, type, action, params) => {
    const URL_SOLUTION_VAHU = process.env.URL_SOLUTION_VAHU;

    // const content = "Hello #name#, bạn đến từ #country#. Welcome to #platform#!";
    //  params: [['US, VN'], ['OpenAI']],

    const vahu = await Action.findOne({ action }).lean();
    console.log(vahu)
    let { callback, hash, title } = vahu;

    let contentVahu = await getContent(domain);
    let newContent = "";

    const findHash = contentVahu.includes(hash);
    if (findHash) {
        let split = splitContent(contentVahu);
        split = split.filter(block => {
            return !block.includes(hash)
        })
        contentVahu = split.join("\n");
    }

    if (type === "add") {
        let replaceIndex = 0;
        callback = callback.replace(/#(.*?)#/g, (match) => {
            const replacement = params[replaceIndex];
            replaceIndex++;
            return replacement !== undefined ? replacement : match;
        });
        // callback = `\n\n//#${hash}\n//${title}\n${callback}\n//#${hash}`;
        callback = `\n\n//${hash}\n${callback}\n//${hash}`;
        newContent = `${contentVahu}${callback}`;
    } else {
        newContent = contentVahu;
    }
    const send = async (token, newContent) => {
        console.log({ newContent, URL_SOLUTION_VAHU,  domain, token})

        return axios.post(`${URL_SOLUTION_VAHU}${domain}`, {
            appType: "app_solution",
            content: newContent
        }, {
            headers: {
                'cookie': token,
                'Referer': `${URL_SOLUTION_VAHU}${domain}`,
                'Referrer-Policy': 'strict-origin-when-cross-origin'
            }
        });
    };

    try {
        const token = await getAccessToken();
        const res = await send(token, newContent);

        if (res.data.status === 'success') return { success: true };

        return { success: false };

    } catch (err) {
        if (err.message === 'EXPIRED_TOKEN') {
            try {
                const newToken = await refreshToken();
                const res = await send(newToken, newContent);
                return {
                    success: res.data.status === 'success'
                };
            } catch (retryErr) {
                return { success: false, error: retryErr };
            }
        }

        return { success: false, error: err };
    }
};

const deleteContent = async (domain, name) => {

}

function splitContent(content) {
    const lines = content.trim().split('\n');
    const hookBlocks = [];
    let currentBlock = [];
    let currentTag = null;

    function pushBlock() {
        if (currentBlock.length > 0) {
            hookBlocks.push(currentBlock.join('\n').trim());
            currentBlock = [];
        }
    }

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const trimmed = line.trim();
        const hashtagMatch = trimmed.match(/^\/\/#(\w+)/);

        if (hashtagMatch) {
            const tag = hashtagMatch[1];
            if (currentTag === tag) {
                currentBlock.push(line);
                pushBlock();
                currentTag = null;
            }
            else if (!currentTag) {
                pushBlock();
                currentTag = tag;
                currentBlock.push(line);
            }
            else {
                currentBlock.push(line);
            }
            continue;
        }

        if (currentTag) {
            currentBlock.push(line);
            continue;
        }

        currentBlock.push(line);

        const isHookLine = /window\.BSS_B2B\.(addAction|addFilter)\(/.test(trimmed);
        const isIIFEEnd = /^\}\)\(\);?$/.test(trimmed);

        if (isHookLine || isIIFEEnd) {
            pushBlock();
        }
    }

    pushBlock();

    return hookBlocks;
}
// End BOT

const vahuService = {
    login,
    getContent,
    saveContent,
    deleteContent,
    getAllActions,
    createAction
};

export default vahuService;