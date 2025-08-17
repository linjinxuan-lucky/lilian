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

// 目标列表
const targetList = [
    "FCL",
    "LCL", 
    "Intermodal",
    "Air Freight",
    "Warehousing",
    "Customs Clearance",
    "Truck",
    "SOC Container"
];

// 提取isJcvf为"1"的advantageCode
const extractedCodes = data
    .filter(item => item.isJcvf === "1")
    .map(item => item.advantageCode);

console.log("提取的advantageCode:", extractedCodes);



// 简单数组比较
function simpleArrayComparison(arr1, arr2) {
    return arr1.length === arr2.length && 
           arr1.every(item => arr2.includes(item));
}
// 检查是否相等
const isEqual = simpleArrayComparison(extractedCodes, targetList);
console.log("两个列表是否相等（忽略顺序）:", isEqual);

// 如果需要，可以找出差异
function findDifferences(arr1, arr2) {
    const set1 = new Set(arr1);
    const set2 = new Set(arr2);
    
    const onlyInArr1 = arr1.filter(item => !set2.has(item));
    const onlyInArr2 = arr2.filter(item => !set1.has(item));
    
    return {
        onlyInFirst: onlyInArr1,
        onlyInSecond: onlyInArr2
    };
}

const differences = findDifferences(extractedCodes, targetList);
console.log("只在提取列表中的项目:", differences.onlyInFirst);
console.log("只在目标列表中的项目:", differences.onlyInSecond);

// 输出结果
console.log("\n=== 最终结果 ===");
console.log("提取的advantageCode列表:", extractedCodes);
console.log("目标列表:", targetList);
console.log("是否相等:", isEqual);
