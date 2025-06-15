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
        apiMMPost,
        apiMMVahu
    }) {
        this.token = token;
        this.wsUrl = wsUrl;
        this.apiUrl = apiUrl;
        this.botUserId = botUserId;
        this.botUsername = botUsername;
        this.targetChannelId = channelId;
        this.API_MM_POST = apiMMPost;
        this.API_MM_VAHU = apiMMVahu;
    }

    async sendMessage(channelId, message = '', rootId = null) {
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
                console.error('Error sending message:', res.data);
            }
        } catch (error) {
            console.error('Error sending message:', error.message);
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
            if (!msg.includes(`@${this.botUsername}`)) return;
            if (userId === this.botUserId) return;

            console.log(`Message from user ${userId}: ${msg}`);
            let question = msg.split(" ").splice(1).join(" ").trim().replace(/\s+/g, ' ');;

            const commands = ["/help", "/vahu", '/solution'];
            const isCommand = commands.some(cmd => question.startsWith(cmd));
            if (isCommand) {
                const command = commands.find(cmd => question.startsWith(cmd));
                const content = question.slice(command.length);
                this.handleCommand(command, content)
                    .then((textRes) => {
                        this.sendMessage(channelId, textRes, rootId);
                    })
                    .catch((err) => {
                        console.error('Error while processing command:', err);
                    });
            } else {
                this.sendMessage(channelId, `Unknown command. Type \`/help\` for instructions.`, rootId);
            }
        }
    }

    run() {
        const connect = () => {
            const ws = new WebSocket(this.wsUrl, {
                headers: {
                    Authorization: `Bearer ${this.token}`
                },
            });

            this.ws = ws;

            ws.on('open', () => {
                console.log('WebSocket connected.');
            });

            ws.on('message', (data) => {
                this.onMessage(data);
            });

            ws.on('error', (error) => {
                console.error('WebSocket error:', error);
            });

            ws.on('close', () => {
                console.log('WebSocket connection closed. Reconnecting in 3 seconds...');
                setTimeout(connect, 3000);
            });

            console.log('Bot is running...');
        };


        connect();
    }

    async handleCommand(command, content) {
        console.log({ command, content })
        switch (command) {
            case '/help':
                return `Available Commands:\n- \`/solution <your solution>\`: Find a solution\n- \`/vahu <domain> [-d] <action> <params>\`: Automatic issue resolution`;

            case '/vahu': {
                const parts = content.trim().split(/\s+/);

                let domain = '';
                let name = '';
                let params = [];
                if (parts[0].includes('-d')) {
                    domain = parts[1];
                    name = parts[2];
                    console.log({ domain, name })
                    try {
                        const response = await axios.delete(this.API_MM_VAHU, {
                            data: {
                                domain,
                                name
                            }
                        });
                        const results = response.data;
                        if (results.success) {
                            return 'Completed';
                        }
                    } catch (error) {
                        console.error('API call error:', error.message);
                    }

                } else {
                    domain = parts[0];
                    name = parts[1];
                    params = parts.slice(2);

                    try {
                        const response = await axios.post(this.API_MM_VAHU, { domain, name, params });
                        const results = response.data;
                        if (results.success) {
                            return 'Completed';
                        }
                    } catch (error) {
                        console.error('API call error:', error.message);
                    }
                }
                return '';
            }

            case '/solution': {
                if (!content) return '⚠️ Please provide the issue title after `/solution [issue title]`.';
                try {
                    const title = content.trim().replace(/\s+/g, ' ');
                    const response = await axios.get(`${this.API_MM_POST}?q=${title}`);
                    const results = response.data;
                    if (results.success) {
                        if (results.data.results.length === 0) {
                            return 'No solution found';
                        } else if (results.data.results.length === 1) {
                            return TextUtils.bbcodeToMarkdown(results.data.results[0]?.content);
                        } else {
                            let reply = 'Similar solutions found:\n';
                            results.data.results.map((title, i) => {
                                reply += `\`${i + 1}\` ${title}\n`;
                            });
                            return TextUtils.bbcodeToMarkdown(reply);
                        }
                    }
                } catch (error) {
                    return `API call error: ${error.message}`;
                }
            }
        }
    }
}


export default MattermostWSBot;