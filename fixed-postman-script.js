// 修复后的Postman后置脚本
const gangkou = pm.request.body;

// 添加安全检查，确保属性存在且是数组
const turckPortportname = gangkou.turckPort && Array.isArray(gangkou.turckPort) 
    ? gangkou.turckPort.map(turckPort => turckPort.displayNameEn) 
    : [];

const chearanoePortportname = gangkou.chearanoePort && Array.isArray(gangkou.chearanoePort) 
    ? gangkou.chearanoePort.map(chearanoePort => chearanoePort.displayNameEn) 
    : [];

const warehousingPortportname = gangkou.warehousingPort && Array.isArray(gangkou.warehousingPort) 
    ? gangkou.warehousingPort.map(warehousingPort => warehousingPort.displayNameEn) 
    : [];

const portnamee = [...turckPortportname, ...chearanoePortportname, ...warehousingPortportname].join(',');

pm.environment.set("portname", portnamee);

// 添加调试信息
console.log("gangkou对象:", gangkou);
console.log("turckPort:", gangkou.turckPort);
console.log("chearanoePort:", gangkou.chearanoePort);
console.log("warehousingPort:", gangkou.warehousingPort);
console.log("最终portname:", portnamee);
