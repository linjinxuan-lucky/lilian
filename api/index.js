const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// 数据文件路径
const DATA_FILE = process.env.DATA_FILE || './participants.json';

// 中间件配置
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 静态文件服务
app.use(express.static(path.join(__dirname, '..')));

// 数据管理类
class DataManager {
    constructor() {
        this.participants = [];
        this.loadData();
    }

    // 加载数据
    loadData() {
        try {
            if (fs.existsSync(DATA_FILE)) {
                const data = fs.readFileSync(DATA_FILE, 'utf8');
                this.participants = JSON.parse(data);
            } else {
                this.participants = [];
                this.saveData();
            }
        } catch (error) {
            console.error('加载数据错误:', error);
            this.participants = [];
        }
    }

    // 保存数据
    saveData() {
        try {
            fs.writeFileSync(DATA_FILE, JSON.stringify(this.participants, null, 2));
        } catch (error) {
            console.error('保存数据错误:', error);
        }
    }

    // 获取所有参与者
    getAllParticipants() {
        return this.participants.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    }

    // 添加参与者
    addParticipant(name, phone) {
        // 检查手机号是否已存在
        const existing = this.participants.find(p => p.phone === phone);
        if (existing) {
            throw new Error('该手机号已存在，请使用其他手机号');
        }

        const participant = {
            id: this.getNextId(),
            name: name.trim(),
            phone: phone.trim(),
            created_at: new Date().toISOString()
        };

        this.participants.push(participant);
        this.saveData();
        return participant;
    }

    // 删除参与者
    deleteParticipant(id) {
        const index = this.participants.findIndex(p => p.id === parseInt(id));
        if (index === -1) {
            return false;
        }
        this.participants.splice(index, 1);
        this.saveData();
        return true;
    }

    // 更新参与者
    updateParticipant(id, name, phone) {
        const participant = this.participants.find(p => p.id === parseInt(id));
        if (!participant) {
            return false;
        }

        // 检查手机号是否被其他参与者使用
        const existing = this.participants.find(p => p.phone === phone && p.id !== parseInt(id));
        if (existing) {
            throw new Error('该手机号已被其他参与者使用');
        }

        participant.name = name.trim();
        participant.phone = phone.trim();
        this.saveData();
        return true;
    }

    // 搜索参与者
    searchParticipants(query) {
        const searchTerm = query.toLowerCase();
        return this.participants.filter(p => 
            p.name.toLowerCase().includes(searchTerm) || 
            p.phone.includes(searchTerm)
        ).sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    }

    // 获取统计信息
    getStats() {
        return {
            total: this.participants.length
        };
    }

    // 获取下一个ID
    getNextId() {
        if (this.participants.length === 0) {
            return 1;
        }
        return Math.max(...this.participants.map(p => p.id)) + 1;
    }
}

// 初始化数据管理器
const dataManager = new DataManager();

// API路由

// 获取所有参与者
app.get('/api/participants', (req, res) => {
    try {
        const participants = dataManager.getAllParticipants();
        res.json(participants);
    } catch (error) {
        console.error('获取参与者列表错误:', error);
        res.status(500).json({ 
            success: false, 
            message: '服务器内部错误' 
        });
    }
});

// 添加新参与者
app.post('/api/participants', (req, res) => {
    const { name, phone } = req.body;
    
    // 验证输入
    if (!name || !phone) {
        return res.status(400).json({
            success: false,
            message: '姓名和手机号不能为空'
        });
    }
    
    // 验证手机号格式
    const phoneRegex = /^1[3-9]\d{9}$/;
    if (!phoneRegex.test(phone)) {
        return res.status(400).json({
            success: false,
            message: '请输入正确的手机号格式'
        });
    }
    
    try {
        const participant = dataManager.addParticipant(name, phone);
        res.json({
            success: true,
            message: '参与者信息添加成功',
            id: participant.id
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
});

// 删除参与者
app.delete('/api/participants/:id', (req, res) => {
    const { id } = req.params;
    
    try {
        const success = dataManager.deleteParticipant(id);
        if (success) {
            res.json({
                success: true,
                message: '参与者信息删除成功'
            });
        } else {
            res.status(404).json({
                success: false,
                message: '未找到指定的参与者'
            });
        }
    } catch (error) {
        console.error('删除参与者错误:', error);
        res.status(500).json({
            success: false,
            message: '服务器内部错误'
        });
    }
});

// 更新参与者信息
app.put('/api/participants/:id', (req, res) => {
    const { id } = req.params;
    const { name, phone } = req.body;
    
    // 验证输入
    if (!name || !phone) {
        return res.status(400).json({
            success: false,
            message: '姓名和手机号不能为空'
        });
    }
    
    // 验证手机号格式
    const phoneRegex = /^1[3-9]\d{9}$/;
    if (!phoneRegex.test(phone)) {
        return res.status(400).json({
            success: false,
            message: '请输入正确的手机号格式'
        });
    }
    
    try {
        const success = dataManager.updateParticipant(id, name, phone);
        if (success) {
            res.json({
                success: true,
                message: '参与者信息更新成功'
            });
        } else {
            res.status(404).json({
                success: false,
                message: '未找到指定的参与者'
            });
        }
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
});

// 搜索参与者
app.get('/api/participants/search', (req, res) => {
    const { q } = req.query;
    
    if (!q) {
        return res.status(400).json({
            success: false,
            message: '搜索关键词不能为空'
        });
    }
    
    try {
        const results = dataManager.searchParticipants(q);
        res.json(results);
    } catch (error) {
        console.error('搜索错误:', error);
        res.status(500).json({
            success: false,
            message: '服务器内部错误'
        });
    }
});

// 获取参与者统计信息
app.get('/api/participants/stats', (req, res) => {
    try {
        const stats = dataManager.getStats();
        res.json({
            success: true,
            ...stats
        });
    } catch (error) {
        console.error('统计错误:', error);
        res.status(500).json({
            success: false,
            message: '服务器内部错误'
        });
    }
});

// 根路径重定向到主页
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'index.html'));
});

// 404处理
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: '请求的资源不存在'
    });
});

// 错误处理中间件
app.use((err, req, res, next) => {
    console.error('服务器错误:', err.stack);
    res.status(500).json({
        success: false,
        message: '服务器内部错误'
    });
});

// Vercel无服务器函数需要以这种方式导出
module.exports = app;
module.exports.handler = (req, res) => {
    app(req, res);
};