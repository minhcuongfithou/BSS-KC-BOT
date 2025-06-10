module.exports = {
  apps: [
    {
      name: 'websocket-server',
      script: './server.js',
      watch: false,
      env: {
        NODE_ENV: 'production',
      },
    },
    {
      name: 'next-app',
      script: 'npm',
      args: 'start',
      cwd: './',  // folder next app, nếu root thì giữ nguyên
      watch: false,
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
