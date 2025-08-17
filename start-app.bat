@echo off
echo 正在启动抽签系统...
echo.

REM 检查Node.js是否安装
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo 错误: 未找到Node.js，请先安装Node.js
    pause
    exit /b 1
)

REM 检查依赖是否安装
if not exist "node_modules" (
    echo 正在安装依赖...
    npm install
    if %errorlevel% neq 0 (
        echo 错误: 依赖安装失败
        pause
        exit /b 1
    )
)

REM 检查数据文件
if not exist "participants.json" (
    echo [] > participants.json
    echo 已创建数据文件 participants.json
)

echo.
echo 启动抽签系统...
echo 访问地址: http://localhost:3000
echo 按 Ctrl+C 停止应用
echo.
node server.js