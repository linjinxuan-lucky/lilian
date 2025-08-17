# Vercel部署指南

## 准备工作

### 1. 注册Vercel账户
- 访问 [https://vercel.com/](https://vercel.com/)
- 点击右上角"Sign Up"注册新账户
- 推荐使用GitHub账户注册，便于后续导入项目

### 2. 准备代码仓库
确保您的代码已经推送到GitHub仓库，并包含以下文件：
- [server.js](file:///e:/test_demo/chouqian/server.js) - 应用主文件
- [package.json](file:///e:/test_demo/chouqian/package.json) - 依赖配置
- [vercel.json](file:///e:/test_demo/chouqian/vercel.json) - Vercel配置文件

## 部署步骤

### 步骤1：导入项目
1. 登录Vercel控制台
2. 点击右侧"+ New Project"按钮
3. 在"Import Git Repository"部分，选择您的代码仓库
4. 如果是第一次使用，需要先连接GitHub账户

### 步骤2：配置项目
Vercel会自动识别项目配置：
- **Framework Preset**: Node.js
- **Build and Output Settings**:
  - Build Command: `npm install`
  - Output Directory: (保持默认)
- **Environment Variables**: (可选配置)

### 步骤3：部署项目
1. 点击"Deploy"按钮
2. 等待部署完成（通常需要1-2分钟）
3. 部署成功后会显示分配的URL

## 环境变量配置（可选）

如果需要自定义端口或数据文件路径，可以在Vercel项目设置中配置环境变量：
- `PORT`: 服务器端口（默认由Vercel分配）
- `DATA_FILE`: 数据文件路径（默认为`./participants.json`）

在Vercel控制台中：
1. 进入项目设置 (Project Settings)
2. 选择"Environment Variables"
3. 添加需要的环境变量

## 数据持久化说明

由于Vercel的无服务器架构，文件系统是临时的。这意味着：
- 每次部署后，[participants.json](file:///e:/test_demo/chouqian/participants.json)文件会被重置
- 为获得持久化存储，建议后续迁移到数据库解决方案

## 自定义域名（可选）

1. 在项目设置中选择"Domains"
2. 添加您的自定义域名
3. 按照指引配置DNS记录
4. Vercel会自动处理SSL证书申请

## 监控和日志

Vercel提供了内置的监控和日志功能：
- 在项目仪表板中查看实时访问统计
- 通过"Functions"选项卡查看函数执行日志
- 设置性能监控和错误跟踪

## 故障排除

### 常见问题
1. **部署失败**：
   - 检查依赖是否正确安装
   - 确认[package.json](file:///e:/test_demo/chouqian/package.json)文件格式正确
   - 查看构建日志获取详细错误信息

2. **访问问题**：
   - 确认端口配置正确
   - 检查路由配置是否正确

3. **数据丢失**：
   - 这是Vercel无服务器架构的正常行为
   - 考虑迁移到数据库解决方案