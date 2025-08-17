module.exports = (req, res) => {
    res.json({
        success: true,
        message: 'Vercel部署测试成功',
        timestamp: new Date().toISOString()
    });
};