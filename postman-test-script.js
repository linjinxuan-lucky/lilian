const fanhuid = pm.response.json();
const fseaportInfos = fanhuid.data.jcvfVo.seaportInfos.map(seaportInfos => seaportInfos.nameEn);
const portn = fseaportInfos.join(',');
const portname = pm.environment.get("portname");

// 字符串比对，忽略顺序
function compareStringsIgnoreOrder(str1, str2) {
    // 将字符串按逗号分割成数组
    const arr1 = str1.split(',').map(item => item.trim()).filter(item => item !== '');
    const arr2 = str2.split(',').map(item => item.trim()).filter(item => item !== '');
    
    // 检查数组长度是否相等
    if (arr1.length !== arr2.length) {
        return false;
    }
    
    // 对两个数组进行排序后比较
    const sortedArr1 = [...arr1].sort();
    const sortedArr2 = [...arr2].sort();
    
    // 比较排序后的数组
    return JSON.stringify(sortedArr1) === JSON.stringify(sortedArr2);
}

// 使用自定义函数进行断言
const isEqual = compareStringsIgnoreOrder(portn, portname);
pm.expect(isEqual).to.be.true;

// 或者使用更详细的断言方式
pm.test("端口名称比对（忽略顺序）", function() {
    const isEqual = compareStringsIgnoreOrder(portn, portname);
    pm.expect(isEqual).to.be.true;
    
    // 如果测试失败，输出详细信息
    if (!isEqual) {
        const arr1 = portn.split(',').map(item => item.trim()).filter(item => item !== '');
        const arr2 = portname.split(',').map(item => item.trim()).filter(item => item !== '');
        
        console.log("实际端口列表:", arr1);
        console.log("期望端口列表:", arr2);
        
        // 找出差异
        const set1 = new Set(arr1);
        const set2 = new Set(arr2);
        
        const onlyInActual = arr1.filter(item => !set2.has(item));
        const onlyInExpected = arr2.filter(item => !set1.has(item));
        
        if (onlyInActual.length > 0) {
            console.log("只在实际列表中的项目:", onlyInActual);
        }
        if (onlyInExpected.length > 0) {
            console.log("只在期望列表中的项目:", onlyInExpected);
        }
    }
});

// 调试信息
console.log("实际端口字符串:", portn);
console.log("期望端口字符串:", portname);
console.log("比对结果:", compareStringsIgnoreOrder(portn, portname));


