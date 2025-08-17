module.exports = (req, res) => {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.status(200).send(`
    <!DOCTYPE html>
    <html>
    <head>
        <title>抽签系统测试</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                max-width: 800px;
                margin: 0 auto;
                padding: 20px;
                background-color: #f5f5f5;
            }
            .container {
                background: white;
                padding: 30px;
                border-radius: 8px;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                margin-bottom: 20px;
            }
            .success {
                color: #4CAF50;
            }
            .warning {
                color: #FF9800;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>抽签系统部署测试</h1>
            <p class="success">✓ Vercel部署基础功能正常</p>
            <p>当前时间: ${new Date().toISOString()}</p>
            
            <h2>功能测试</h2>
            <p>请访问以下链接测试完整功能：</p>
            <ul>
                <li><a href="/">主应用页面</a></li>
                <li><a href="/api/test">API测试端点</a></li>
                <li><a href="/api/participants">参与者API</a></li>
            </ul>
            
            <h2>重要说明</h2>
            <p class="warning">⚠ 注意：由于Vercel的无服务器架构限制，数据可能不会持久保存。</p>
            <p>如需生产环境部署，请考虑使用外部数据库解决方案。</p>
        </div>
    </body>
    </html>
    `);
};