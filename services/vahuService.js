import axios from 'axios';
import Token from '../models/Token';
import dotenv from 'dotenv';
import Action from '@/models/Action';
import Handle from '@/models/Handle';
import mongoose from 'mongoose';
import { Handshake, LucideTable2 } from 'lucide-react';
dotenv.config();

// Backend
const createAction = async (body) => {
    try {
        const { name, coreJs, listAction, listFilter } = body;
        // const hash = Buffer.from(action).toString('base64');
        const newAction = new Action({ name, coreJs, listAction, listFilter });
        await newAction.save();
        return { success: true };
    } catch (err) {
        console.log(err)
        return { success: false };
    }
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

const saveContent = async (author, domain, type, action, params) => {
    //  params: [['US, VN'], ['OpenAI']],
    console.log({ author, domain, type, action, params })
    const findAction = await Action.findOne({ name: action }).lean();
    let handles = await Handle.find({ domain, actonId: findAction.id });

    if (type === 'delete' && !handles) return { success: true };
    let deletedAt = (type === 'delete' ? new Date().toISOString() : '');
    const session = await mongoose.startSession();

    try {
        await session.withTransaction(async () => {
            const update = await Handle.findOneAndUpdate({ domain, actionId: findAction._id }, { $set: { params, author, deletedAt } }, { new: true, session, upsert: true }).lean();

            // update lai bien vua update
            handles.map((handle, ind) => {
                if (handle.actionId.equals(findAction._id)) {
                    handles[ind] = update;
                }
            })
            const newContentVahu = await _buildContentVahu(author, domain, handles);

            const ok = await _checkValidContentVahu(domain, newContentVahu);
            if (!ok) throw new Error('reject content');
        });

        console.log('✅ Commit thành công');
    } catch (e) {
        console.log('❌ Rollback:', { e });
        return { success: false }
    } finally {
        await session.endSession();
    }

    return { success: true }
};

const _buildContentVahu = async (author, domain, handles) => {
    let contentVahu = await getContent(domain);
    const hash = 'code automatically generated';
    // remove old code auto
    const pattern = new RegExp(`\/\/ start ${hash}[\\s\\S]*?\/\/ end ${hash}`, 'g');
    contentVahu = contentVahu.replace(pattern, '').trim();
    // end remove old code auto
    let codeHandle = ``;
    let listActionFilter = ``;
    const allAction = new Set();
    const allFilter = new Set();
    await Promise.all(handles.map(async (handle) => {
        const { createdAt, updatedAt, deletedAt } = handle;
        let codeFuncInClass = ``;
        const { params } = handle;
        const action = await Action.findOne({ _id: handle.actionId }).lean();
        if (!action) return;
        let { coreJs, describe, name, listAction, listFilter } = action;
        const className = name.replace(/[^a-zA-Z0-9]+(.)?/g, (_, char) => char ? char.toUpperCase() : '');

        listAction = listAction.filter(action => !(typeof action === 'object' && action !== null && Object.keys(action).length === 0));
        let indexParams = 0;
        if (listAction.length) {
            listAction.forEach(action => {
                const key = Object.keys(action)[0];
                const keyName = key.replace(/[^a-zA-Z0-9]+(.)?/g, (_, char) => char ? char.toUpperCase() : '');
                let callback = Object.values(action)[0];
                // replace variant in calback
                let replaceIndex = 0;
                callback = callback.replace(/#(.*?)#/g, (match) => {
                    const replacement = params[replaceIndex];
                    replaceIndex++;
                    return replacement !== undefined ? replacement : match;
                });
                indexParams = replaceIndex;
                // end replace variant in callback
                if (deletedAt !== '') {
                    allAction.add(key);
                }
                codeFuncInClass += `${keyName}: ${callback},\n`;
            });
        } else {
            console.warn(`listAction is empty`)
        }

        listFilter = listFilter.filter(filter => !(typeof filter === 'object' && filter !== null && Object.keys(filter).length === 0));
        if (listFilter.length) {
            listFilter.forEach(filter => {
                const key = Object.keys(filter)[0];
                const keyName = key.replace(/[^a-zA-Z0-9]+(.)?/g, (_, char) => char ? char.toUpperCase() : '');
                let callback = Object.values(filter)[0];
                // replace variant in callback
                let replaceIndex = 0;
                callback = callback.replace(/#(.*?)#/g, (match) => {
                    const replacement = params[indexParams + replaceIndex];
                    replaceIndex++;
                    return replacement !== undefined ? replacement : match;
                });
                // end replace variant in calback
                if (deletedAt !== '') {
                    allFilter.add(key);
                }
                codeFuncInClass +=
                    `${keyName}: ${callback},\n`;
            })
        } else {
            console.warn(`listFilter is empty`)
        }

        const hashClass = Buffer.from(name).toString('base64');
        if (deletedAt) {
            const describeTask = `${_createCommentBox([`${describe}`, `** Implementer: ${author} **`, `** Created at : ${_formatTimestamp(createdAt)} **`, `** Deleted at : ${_formatTimestamp(deletedAt)} **`])}`;
            codeHandle += `${describeTask}\n`;
        } else {
            const describeTask = `${_createCommentBox([`${describe}`, `** Implementer: ${author} **`, `** Created at : ${_formatTimestamp(createdAt)} **`, `** Updated at : ${_formatTimestamp(updatedAt)} **`])}`;

            codeHandle += `// ${hashClass}
${describeTask}
class ${className} extends BaseAction {
    constructor() {
        super();
        this.handle = {
            coreJS: () => {
            ${_indentMultiline(coreJs, '              ')}
            },
            ${_indentMultiline(codeFuncInClass.trim(), '            ')}
        };
    }
    static { BaseAction.register(this); }
}
// end ${hashClass};\n`
        }
    }));

    for (const key of allAction) {
        const keyFunc = key.replace(/[^a-zA-Z0-9]+(.)?/g, (_, char) => char ? char.toUpperCase() : '');
        listActionFilter += `window.BSS_B2B.addAction('${key}', combine.handle.${keyFunc});\n`;
    }
    for (const key of allFilter) {
        const keyFunc = key.replace(/[^a-zA-Z0-9]+(.)?/g, (_, char) => char ? char.toUpperCase() : '');
        listActionFilter += `window.BSS_B2B.addFilter('${key}', combine.handle.${keyFunc});\n`;
    }

    const codeGenerate = `\n// start ${hash}
class BaseAction {
    constructor() {
        this.handle = {}
    }
    static #registry = new Set();
    static register(sub) {
        if (sub !== BaseAction) this.#registry.add(sub);
    }
    static getSubclasses() {
        return Array.from(this.#registry);
    }
}

class CombinedAction extends BaseAction {
    constructor(...tasks) {
        if (tasks.length === 1 && Array.isArray(tasks[0])) {
            tasks = tasks[0];
        }
        super();

        tasks.forEach(item => {
            const taskInstance =
                typeof item === "function" ? new item() : item;

            for (const [name, fn] of Object.entries(taskInstance.handle)) {
                if (typeof fn !== "function") continue;

                if (this.handle[name]) {
                    const prev = this.handle[name];
                    this.handle[name] = (...args) => {
                        prev(...args);
                        fn(...args);
                    };
                } else {
                    this.handle[name] = fn;
                }
            }
        });
    }
}

${codeHandle}
const subclasses = BaseAction.getSubclasses();
const combine = new CombinedAction(subclasses);
combine.handle.coreJS();

${listActionFilter.trim()}
// end ${hash}`;

    const newContentVahu = contentVahu + codeGenerate;
    console.log({ newContentVahu })
    // console.log(`${codeFuncInClass.trim()}`);
    // return;
    return newContentVahu;
}

const _checkValidContentVahu = async (domain, newContentVahu) => {
    const send = async (token, content) => {
        const URL_SOLUTION_VAHU = process.env.URL_SOLUTION_VAHU;
        return axios.post(`${URL_SOLUTION_VAHU}${domain}`, {
            appType: "app_solution",
            content: content
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
        console.log(`123`)
        const res = await send(token, newContentVahu);
        console.log(`OK: ${res.data.status}`)
        if (res.data.status === 'success') {
            return { success: true };
        }

        return { success: false };

    } catch (err) {
        console.log({ err })
        if (err.message === 'EXPIRED_TOKEN') {
            try {
                const newToken = await refreshToken();
                const res = await send(newToken, newContentVahu);
                return {
                    success: res.data.status === 'success'
                };
            } catch (retryErr) {
                return { success: false, error: retryErr };
            }
        }

        return { success: false, error: err };
    }
}
function _indentMultiline(str, indent) {
    return str
        .split('\n')
        .map((line, index) => (index === 0 ? line : indent + line))
        .join('\n');
}

const _createCommentBox = (lines) => {
    const padding = 1;
    const maxLength = Math.max(...lines.map(line => line.length));
    const totalWidth = maxLength + padding * 2;
    const horizontal = '─'.repeat(totalWidth);

    const top = `┌${horizontal}┐`;
    const bottom = `└${horizontal}┘`;

    const content = lines.map(line => {
        const spaces = ' '.repeat(totalWidth - line.length - padding - 1);
        return `│ ${line}${spaces} │`;
    });
    return [
        '/*',
        top,
        ...content,
        bottom,
        '*/'
    ].join('\n');
}

const _formatTimestamp = (ms) => {
    const date = new Date(ms);
    const dd = String(date.getDate()).padStart(2, '0');
    const MM = String(date.getMonth() + 1).padStart(2, '0');
    const yyyy = date.getFullYear();
    const hh = String(date.getHours()).padStart(2, '0');
    const mm = String(date.getMinutes()).padStart(2, '0');

    return `${dd}/${MM}/${yyyy} ${hh}:${mm}`;
}
// End BOT

const vahuService = {
    login,
    getContent,
    saveContent,
    getAllActions,
    createAction
};

export default vahuService;