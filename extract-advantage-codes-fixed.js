// 原始数据
const data = [
    {"id":1093039,"version":1,"parentAdvantageCode":"","advantageCode":"Special Container","orderNum":1,"isJcvf":"0","isJcVendor":null},
    {"id":1093335,"version":1,"parentAdvantageCode":"","advantageCode":"FCL","orderNum":2,"isJcvf":"1","isJcVendor":null},
    {"id":1093412,"version":1,"parentAdvantageCode":null,"advantageCode":"Air Freight","orderNum":3,"isJcvf":"1","isJcVendor":null},
    {"id":1093413,"version":1,"parentAdvantageCode":null,"advantageCode":"SOC Container","orderNum":4,"isJcvf":"1","isJcVendor":null},
    {"id":1093414,"version":1,"parentAdvantageCode":null,"advantageCode":"Intermodal","orderNum":5,"isJcvf":"1","isJcVendor":null},
    {"id":1093415,"version":1,"parentAdvantageCode":null,"advantageCode":"LCL","orderNum":6,"isJcvf":"1","isJcVendor":null},
    {"id":1093416,"version":1,"parentAdvantageCode":null,"advantageCode":"Warehousing","orderNum":7,"isJcvf":"1","isJcVendor":null},
    {"id":1093417,"version":1,"parentAdvantageCode":null,"advantageCode":"Truck","orderNum":8,"isJcvf":"1","isJcVendor":null},
    {"id":1093418,"version":1,"parentAdvantageCode":null,"advantageCode":"Customs Clearance","orderNum":9,"isJcvf":"1","isJcVendor":null}
];

// 提取isJcvf为"1"的advantageCode
const extractedCodes = data
    .filter(item => item.isJcvf === "1")
    .map(item => item.advantageCode);

// 方法1：修改目标列表，移除多余的项目
const targetListAdjusted = [
    "FCL",
    "LCL", 
    "Intermodal",
    "Air Freight",
    "Warehousing",
    "Customs Clearance",
    "Truck",
    "SOC Container"
    // 移除了 "Good Service Quality"
];

// 比较两个列表是否相等（忽略顺序）
function areArraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) {
        return false;
    }
    
    // 对两个数组进行排序后比较
    const sortedArr1 = [...arr1].sort();
    const sortedArr2 = [...arr2].sort();
    
    return JSON.stringify(sortedArr1) === JSON.stringify(sortedArr2);
}

// 检查是否相等
const isEqual = areArraysEqual(extractedCodes, targetListAdjusted);

console.log("=== 方法1：调整目标列表 ===");
console.log("提取的advantageCode列表:", extractedCodes);
console.log("调整后的目标列表:", targetListAdjusted);
console.log("是否相等:", isEqual);

// 方法2：使用Set来比较（更简洁的方法）
function areArraysEqualWithSet(arr1, arr2) {
    if (arr1.length !== arr2.length) {
        return false;
    }
    
    const set1 = new Set(arr1);
    const set2 = new Set(arr2);
    
    // 检查两个Set是否相等
    if (set1.size !== set2.size) {
        return false;
    }
    
    for (let item of set1) {
        if (!set2.has(item)) {
            return false;
        }
    }
    
    return true;
}

const isEqualWithSet = areArraysEqualWithSet(extractedCodes, targetListAdjusted);
console.log("\n=== 方法2：使用Set比较 ===");
console.log("使用Set比较是否相等:", isEqualWithSet);

// 方法3：最简单的比较方法
function simpleArrayComparison(arr1, arr2) {
    return arr1.length === arr2.length && 
           arr1.every(item => arr2.includes(item));
}

const isEqualSimple = simpleArrayComparison(extractedCodes, targetListAdjusted);
console.log("\n=== 方法3：简单比较 ===");
console.log("简单比较是否相等:", isEqualSimple);


