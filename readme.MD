# 安装依赖并构建（首次或更新后）
pnpm install --frozen-lockfile
pnpm build

# 创建日志目录
mkdir -p logs

# 启动 PM2（使用刚添加的配置）
pm2 start ecosystem.config.js

# 保存进程列表（便于重启后自动恢复）
pm2 save

# 设置开机自启（按提示执行生成的命令）
pm2 startup



```nginx
server {
  listen 80;
  server_name your-domain.com;

  location / {
    proxy_pass http://127.0.0.1:3000;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_read_timeout 60s;
  }
}
```