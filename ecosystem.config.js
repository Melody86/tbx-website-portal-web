const path = require("path");

module.exports = {
  apps: [
    {
      name: "tubaxian-portal",
      cwd: path.join(__dirname),
      script: "pnpm",
      args: "start",
      env: {
        NODE_ENV: "production",
        PORT: "3000",
      },
      instances: 1,
      exec_mode: "fork",
      max_memory_restart: "512M",
      error_file: "logs/err.log",
      out_file: "logs/out.log",
      merge_logs: true,
      autorestart: true,
      watch: false,
    },
  ],
};


