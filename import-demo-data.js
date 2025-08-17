const fs = require('fs');

// 读取演示数据
const demoData = require('./demo-data.json');

// 写入到participants.json
fs.writeFileSync('./participants.json', JSON.stringify(demoData, null, 2));

console.log('✅ 演示数据导入成功！');
console.log(`📊 导入了 ${demoData.length} 个参与者`);
console.log('');
console.log('现在可以启动服务器查看效果：');
console.log('npm start');
console.log('');
console.log('然后访问: http://localhost:3000');
