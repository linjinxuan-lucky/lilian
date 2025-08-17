const fetch = require('node-fetch');

const API_BASE = 'http://localhost:3000/api';

async function testAPI() {
    console.log('🧪 开始测试抽签系统API...\n');

    try {
        // 测试1: 获取参与者列表
        console.log('1. 测试获取参与者列表...');
        const response1 = await fetch(`${API_BASE}/participants`);
        const participants = await response1.json();
        console.log(`✅ 成功获取 ${participants.length} 个参与者\n`);

        // 测试2: 添加新参与者
        console.log('2. 测试添加新参与者...');
        const newParticipant = {
            name: '测试用户',
            phone: '13800138001'
        };
        
        const response2 = await fetch(`${API_BASE}/participants`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newParticipant)
        });
        
        const result2 = await response2.json();
        if (result2.success) {
            console.log('✅ 成功添加新参与者');
        } else {
            console.log('❌ 添加参与者失败:', result2.message);
        }
        console.log('');

        // 测试3: 再次获取参与者列表
        console.log('3. 测试获取更新后的参与者列表...');
        const response3 = await fetch(`${API_BASE}/participants`);
        const updatedParticipants = await response3.json();
        console.log(`✅ 现在有 ${updatedParticipants.length} 个参与者\n`);

        // 测试4: 搜索参与者
        console.log('4. 测试搜索功能...');
        const response4 = await fetch(`${API_BASE}/participants/search?q=测试`);
        const searchResults = await response4.json();
        console.log(`✅ 搜索到 ${searchResults.length} 个结果\n`);

        // 测试5: 获取统计信息
        console.log('5. 测试统计功能...');
        const response5 = await fetch(`${API_BASE}/participants/stats`);
        const stats = await response5.json();
        console.log(`✅ 总参与者数: ${stats.total}\n`);

        console.log('🎉 所有测试完成！');

    } catch (error) {
        console.error('❌ 测试失败:', error.message);
    }
}

// 检查服务器是否运行
async function checkServer() {
    try {
        const response = await fetch(`${API_BASE}/participants`);
        if (response.ok) {
            console.log('✅ 服务器运行正常');
            return true;
        }
    } catch (error) {
        console.log('❌ 服务器未运行，请先启动服务器: npm start');
        return false;
    }
}

// 运行测试
async function runTests() {
    const serverRunning = await checkServer();
    if (serverRunning) {
        await testAPI();
    }
}

runTests();
