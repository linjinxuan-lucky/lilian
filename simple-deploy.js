#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('开始部署抽签系统...');

try {
  // 检查Node.js是否安装
  const nodeVersion = execSync('node --version').toString().trim();
  console.log(`Node.js版本: ${nodeVersion}`);
  
  // 检查npm是否可用
  const npmVersion = execSync('npm --version').toString().trim();
  console.log(`npm版本: ${npmVersion}`);
  
  // 安装依赖
  console.log('正在安装依赖...');
  execSync('npm install', { stdio: 'inherit' });
  
  // 检查participants.json是否存在，如果不存在则创建
  const dataFile = path.join(__dirname, 'participants.json');
  if (!fs.existsSync(dataFile)) {
    console.log('创建participants.json文件...');
    fs.writeFileSync(dataFile, '[]');
  }
  
  console.log('部署完成！');
  console.log('');
  console.log('使用以下命令启动应用:');
  console.log('npm start');
  console.log('');
  console.log('或者使用以下命令在开发模式下运行:');
  console.log('npm run dev');
  console.log('');
  console.log('应用将在 http://localhost:3000 上运行');
  
} catch (error) {
  console.error('部署过程中出现错误:', error.message);
  process.exit(1);
}