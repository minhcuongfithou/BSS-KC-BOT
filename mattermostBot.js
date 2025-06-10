import WebSocket from 'ws';
import axios from 'axios';
import TextUtils from './textUtils.js';

class MattermostWSBot {
    constructor({
        token,
        wsUrl,
        apiUrl,
        botUserId,
        botUsername,
        channelId,
        apiMMPost
    }) {
        this.token = token;
        this.wsUrl = wsUrl;
        this.apiUrl = apiUrl;
        this.botUserId = botUserId;
        this.botUsername = botUsername;
        this.targetChannelId = channelId;
        this.API_MM_POST = apiMMPost;
    }

    async sendMessage(channelId, message, rootId = null) {
        try {
            const payload = {
                channel_id: channelId,
                message: TextUtils.bbcodeToMarkdown(message),
            };
            if (rootId) {
                payload.root_id = rootId;
            }
            const res = await axios.post(
                `${this.apiUrl}/posts`,
                payload, {
                    headers: {
                        Authorization: `Bearer ${this.token}`
                    },
                }
            );
            if (res.status !== 201) {
                console.error('❌ Lỗi khi gửi tin nhắn:', res.data);
            }
        } catch (error) {
            console.error('❌ Lỗi gửi tin nhắn:', error.message);
        }
    }

    onMessage(data) {
        const msgData = JSON.parse(data);
        if (msgData.event === 'posted') {
            const postData = JSON.parse(msgData.data.post);
            const userId = postData.user_id;
            const msg = postData.message;
            const channelId = postData.channel_id;
            const rootId = postData.root_id || postData.id;
            console.log(postData)
            if (!msg.includes(`@${this.botUsername}`)) return;
            if (userId === this.botUserId) return;

            console.log(`📩 Message from user ${userId}: ${msg}`);
            let question = msg.split(" ").splice(1).join(" ");
            let type = question.endsWith("?") ? 'note' : 'solution';
            if(question.endsWith("?")) {
                question = question.replace(/\?$/, '');
            }
             
            const params = { q: question, type };

            axios.get(this.API_MM_POST, { params })
                .then(response => {
                    const {
                        type, results
                    } = response.data;
                    console.log({results})
                    if(type == 'solution') {
                        if (results.length > 1) {
                            let reply = '🔎 Danh sách issue:\n';
                            results.forEach((issue, i) => {
                                reply += `\`${i + 1}\` ${issue.title}\n`;
                            });
                            console.log(TextUtils.bbcodeToMarkdown(reply))
                            this.sendMessage(channelId, reply, rootId);
                        } else {
                            const {
                                content
                            } = results[0];
                            console.log(TextUtils.bbcodeToMarkdown(content))
                            this.sendMessage(channelId, content, rootId);
                        }
                    } else if(type == 'note') {
                        console.log(results)
                        if (results.length > 1) {
                            const titles = results.map((issue) => '`' + issue.title + '`');
                            let options = '';
                            if (titles.length === 1) {
                                options = titles[0];
                            } else {
                                const last = titles.pop();
                                options = `${titles.join(', ')} hay ${last}`;
                            }
                            const reply = `Bạn muốn hỏi về vấn đề ${options}`;
                            this.sendMessage(channelId, reply, rootId);

                        } else if (results.length === 1) {
                            const { content } = results[0];
                            this.sendMessage(channelId, TextUtils.bbcodeToMarkdown(content), rootId);
                        } else {
                            this.sendMessage(channelId, 'Không tìm thấy nội dung phù hợp.', rootId);
                        }
                    } else {
                        this.sendMessage(channelId, 'Không tìm thấy nội dung phù hợp', rootId);
                    }
                })
                .catch(error => {
                    console.error('❌ Lỗi:', error.response?.data || error.message);
                });
        }
    }

    run() {
        const connect = () => {
            const ws = new WebSocket(this.wsUrl, {
                headers: {
                    Authorization: `Bearer ${this.token}`
                },
            });

            this.ws = ws; // Lưu ws ra ngoài nếu cần

            ws.on('open', () => {
                console.log('✅ WebSocket đã kết nối.');
            });

            ws.on('message', (data) => {
                this.onMessage(data);
            });

            ws.on('error', (error) => {
                console.error('Lỗi WebSocket:', error);
            });

            ws.on('close', () => {
                console.log('🔌 Kết nối WebSocket đóng. Tự động kết nối lại sau 3 giây...');
                setTimeout(connect, 3000); // Thử lại sau 3s
            });

            console.log('🚀 Bot đang chạy...');
        };

        connect(); // Khởi động kết nối ban đầu
    }
}

export default MattermostWSBot;