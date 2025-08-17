# 抽签系统部署指南

## 快速开始

### Windows系统一键启动
双击运行 [start-app.bat](file:///e:/test_demo/chouqian/start-app.bat) 文件即可启动应用

### 使用Node.js直接运行
```bash
npm start
```

## 本地部署

### 环境要求
- Node.js >= 14.x
- npm >= 6.x

### 部署步骤

1. 克隆或下载代码到本地
2. 安装依赖：
   ```bash
   npm install
   ```

3. 启动应用：
   ```bash
   npm start
   ```

4. 访问应用：
   打开浏览器访问 `http://localhost:3000`

## Docker部署（需要安装Docker）

### 构建Docker镜像
```bash
docker build -t chouqian-system .
```

### 运行容器
```bash
docker run -d -p 3000:3000 --name chouqian-app chouqian-system
```

访问 `http://localhost:3000` 使用应用

## 环境变量

- `PORT`: 服务器端口，默认为3000
- `DATA_FILE`: 数据文件路径，默认为`./participants.json`

## 数据存储

应用使用 `participants.json` 文件存储数据，确保应用有该文件的读写权限。

## 自动化部署脚本

### 完整部署
```bash
npm run deploy
```

### 简化部署
```bash
npm run simple-deploy
```