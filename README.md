# 抽签系统

一个基于Node.js和Express的抽签系统，支持个人信息提交、存储和查询功能。

## 功能特点

- 抽签功能：随机抽签，支持固定位置设置
- 信息提交：姓名和手机号提交表单
- 信息查看：查看所有参与者信息
- 数据管理：添加、更新、删除参与者信息
- 搜索功能：按姓名或手机号搜索
- 统计功能：获取参与者总数

## 技术栈

### 前端
- HTML5 + CSS3 + JavaScript
- 原生JavaScript，无需框架
- 响应式设计
- 现代化UI组件

### 后端
- Node.js + Express.js
- JSON文件数据存储
- RESTful API设计
- CORS支持

## 安装和运行

### 1. 安装依赖
```bash
npm install
```

### 2. 启动服务器
```bash
# 开发模式（自动重启）
npm run dev

# 生产模式
npm start
```

### 3. 访问应用
打开浏览器访问: http://localhost:3000

## 快速部署 (Vercel)

最简单的部署方式是使用Vercel一键部署：

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/your-username/your-repo)

或者按照[详细部署指南](file:///e:/test_demo/chouqian/VERCEL_DEPLOYMENT.md)手动部署。

## 部署选项

### Vercel部署（推荐）

### Railway部署

1. Fork本仓库到您的GitHub账户
2. 访问[Railway](https://railway.app/)并注册/登录
3. 创建新项目并选择此仓库
4. Railway会自动配置环境并部署应用

### Heroku部署

1. Fork本仓库到您的GitHub账户
2. 访问[Heroku](https://heroku.com/)并注册/登录
3. 创建新应用并连接到此仓库
4. 启动部署过程

### 本地部署

```bash
# 克隆仓库
git clone <仓库地址>
cd chouqian

# 安装依赖
npm install

# 启动应用
npm start
```

访问 `http://localhost:3000` 使用应用。

## 环境变量

- `PORT`：服务器端口（默认3000）
- `DATA_FILE`：数据文件路径（默认./participants.json）

## 数据存储

应用使用 `participants.json` 文件存储数据。在生产环境中，建议使用更可靠的数据库解决方案。