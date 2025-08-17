module.exports = (req, res) => {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.status(200).send(`
    <!DOCTYPE html>
    <html>
    <head>
        <title>抽签系统测试</title>
    </head>
    <body>
        <h1>抽签系统部署测试</h1>
        <p>如果看到这个页面，说明Vercel部署基础功能正常。</p>
        <p>当前时间: ${new Date().toISOString()}</p>
    </body>
    </html>
    `);
};