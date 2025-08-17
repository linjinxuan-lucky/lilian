# Vercel部署故障排除指南

## 常见问题及解决方案

### 1. 应用无法访问（404错误）

**问题描述**：访问部署的URL显示"网页似乎有问题，或者可能已永久移动到新的Web地址"

**可能原因及解决方案**：
- **路由配置错误**：检查[vercel.json](file:///e:/test_demo/chouqian/vercel.json)中的路由配置是否正确
- **入口文件问题**：确保API入口文件正确导出Express应用
- **构建失败**：检查Vercel控制台中的构建日志，查看是否有错误
- **文件权限问题**：确保所有文件都有正确的读取权限

### 2. API端点返回500错误

**问题描述**：前端可以访问，但API调用失败

**可能原因及解决方案**：
- **环境变量缺失**：在Vercel项目设置中检查环境变量配置
- **文件权限问题**：Vercel无服务器环境中文件系统是只读的（除了/tmp目录）
- **依赖安装问题**：检查[package.json](file:///e:/test_demo/chouqian/package.json)中的依赖是否正确
- **路径问题**：检查文件路径是否正确，特别是在Windows和Unix系统之间

### 3. 数据丢失问题

**问题描述**：参与者数据在一段时间后消失

**原因说明**：
Vercel的无服务器架构会在函数空闲时终止，文件系统不是持久化的。

**解决方案**：
- 使用外部数据库（如MongoDB、PostgreSQL等）
- 使用外部存储服务（如Firebase、AWS S3等）

### 4. 静态文件无法加载

**问题描述**：CSS样式或前端JavaScript无法加载

**可能原因及解决方案**：
- **静态文件路径错误**：检查静态文件服务配置
- **构建输出问题**：确保静态文件在正确的位置

## 调试步骤

### 1. 检查构建日志
1. 登录Vercel控制台
2. 进入您的项目
3. 点击最近的部署
4. 查看"Build Logs"部分

### 2. 检查函数日志
1. 在Vercel控制台中进入您的项目
2. 点击"Functions"选项卡
3. 查看相关函数的执行日志

### 3. 本地测试
在本地测试Vercel兼容性：

```bash
# 安装Vercel CLI
npm install -g vercel

# 在项目目录中运行
vercel dev
```

## Vercel特定配置说明

### 环境变量
在Vercel项目设置中配置以下环境变量：
- `DATA_FILE`: 数据文件路径（注意Vercel文件系统限制）

### 文件系统限制
- 不能写入除/tmp目录以外的文件系统
- 每个部署都是独立的，文件不会在部署间保持

## 最佳实践

### 1. 数据存储
考虑使用外部数据库替代本地JSON文件：
- MongoDB Atlas（适合文档存储）
- PostgreSQL（适合关系型数据）
- Firebase Realtime Database（适合实时应用）

### 2. 配置管理
使用环境变量管理不同环境的配置：
```javascript
const DATA_FILE = process.env.DATA_FILE || './participants.json';
const PORT = process.env.PORT || 3000;
```

### 3. 错误处理
确保应用有完善的错误处理机制：
```javascript
app.use((err, req, res, next) => {
  console.error('服务器错误:', err.stack);
  res.status(500).json({
    success: false,
    message: '服务器内部错误'
  });
});
```

## 强制重新部署

如果更改了配置但问题仍然存在，尝试强制重新部署：

1. 在Vercel控制台中进入您的项目
2. 点击"Deployments"选项卡
3. 点击"Redeploy"按钮
4. 或者在项目设置中清除构建缓存后重新部署

## 联系支持

如果以上方法都无法解决问题：

1. 在Vercel控制台中点击"Support"
2. 描述您遇到的具体问题
3. 提供相关的错误日志和截图