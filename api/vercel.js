const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const app = express();

// 在Vercel环境中使用/tmp目录
const DATA_FILE = '/tmp/participants.json';

// 中间件配置
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 静态文件服务
app.use(express.static(path.join(__dirname, '..')));

// 检查/tmp目录是否可写
function isWritable() {
    try {
        fs.accessSync('/tmp', fs.constants.W_OK);
        return true;
    } catch (err) {
        return false;
    }
}

// 数据存储（内存中）
let participants = [];

// 初始化数据（尝试从/tmp目录加载）
function initializeData() {
    if (isWritable()) {
        try {
            if (fs.existsSync(DATA_FILE)) {
                const data = fs.readFileSync(DATA_FILE, 'utf8');
                participants = JSON.parse(data);
                console.log('从/tmp目录加载数据成功');
            } else {
                // 创建空数据文件
                fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2));
                console.log('创建新的数据文件');
            }
        } catch (error) {
            console.error('初始化数据时出错:', error);
        }
    } else {
        console.log('无法写入/tmp目录，使用内存存储');
    }
}

// 保存数据
function saveData() {
    if (isWritable()) {
        try {
            fs.writeFileSync(DATA_FILE, JSON.stringify(participants, null, 2));
        } catch (error) {
            console.error('保存数据错误:', error);
        }
    }
}

// 获取所有参与者
function getAllParticipants() {
    return participants.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
}

// 添加参与者
function addParticipant(name, phone) {
    // 检查手机号是否已存在
    const existing = participants.find(p => p.phone === phone);
    if (existing) {
        throw new Error('该手机号已存在，请使用其他手机号');
    }

    const participant = {
        id: getNextId(),
        name: name.trim(),
        phone: phone.trim(),
        created_at: new Date().toISOString()
    };

    participants.push(participant);
    saveData();
    return participant;
}

// 删除参与者
function deleteParticipant(id) {
    const index = participants.findIndex(p => p.id === parseInt(id));
    if (index === -1) {
        return false;
    }
    participants.splice(index, 1);
    saveData();
    return true;
}

// 更新参与者
function updateParticipant(id, name, phone) {
    const participant = participants.find(p => p.id === parseInt(id));
    if (!participant) {
        return false;
    }

    // 检查手机号是否被其他参与者使用
    const existing = participants.find(p => p.phone === phone && p.id !== parseInt(id));
    if (existing) {
        throw new Error('该手机号已被其他参与者使用');
    }

    participant.name = name.trim();
    participant.phone = phone.trim();
    saveData();
    return true;
}

// 搜索参与者
function searchParticipants(query) {
    const searchTerm = query.toLowerCase();
    return participants.filter(p => 
        p.name.toLowerCase().includes(searchTerm) || 
        p.phone.includes(searchTerm)
    ).sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
}

// 获取统计信息
function getStats() {
    return {
        total: participants.length
    };
}

// 获取下一个ID
function getNextId() {
    if (participants.length === 0) {
        return 1;
    }
    return Math.max(...participants.map(p => p.id)) + 1;
}

// 初始化数据
initializeData();

// API路由

// 获取所有参与者
app.get('/api/participants', (req, res) => {
    try {
        const participants = getAllParticipants();
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
        const participant = addParticipant(name, phone);
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
        const success = deleteParticipant(id);
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
        const success = updateParticipant(id, name, phone);
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
        const results = searchParticipants(q);
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
        const stats = getStats();
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

module.exports = app;