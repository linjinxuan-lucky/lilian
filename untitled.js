/**
 * 抽签功能实现 - 固定第五位为刘润泽
 */
class LotteryDrawer {
    constructor(participants) {
        // 初始化参与者列表
        this.originalParticipants = [...participants];
        this.fixedPerson = "刘润泽";
        this.fixedPosition = 4; // 第5位（索引从0开始）
    }

    /**
     * 执行抽签 - 确保刘润泽在第5位
     */
    draw() {
        // 创建可变的参与者副本
        let participants = [...this.originalParticipants];
        
        // 移除固定的人员
        const fixedIndex = participants.indexOf(this.fixedPerson);
        if (fixedIndex !== -1) {
            participants.splice(fixedIndex, 1);
        }
        
        // 随机打乱剩余人员
        this.shuffleArray(participants);
        
        // 确保数组至少有5个元素
        while (participants.length < this.fixedPosition) {
            participants.push("替补人员");
        }
        
        // 在固定位置插入指定人员
        participants.splice(this.fixedPosition, 0, this.fixedPerson);
        
        // 返回前10个结果（或根据需要调整）
        return participants.slice(0, Math.max(10, this.fixedPosition + 1));
    }

    /**
     * Fisher-Yates 洗牌算法 - 确保浏览器兼容性
     */
    shuffleArray(array) {
        // 为旧版浏览器提供兼容性支持
        if (typeof Array.prototype.forEach !== 'function') {
            // 手动实现洗牌逻辑
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                const temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            }
        } else {
            // 现代浏览器使用标准洗牌
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
        }
    }

    /**
     * 添加参与者
     */
    addParticipant(name) {
        if (!this.originalParticipants.includes(name)) {
            this.originalParticipants.push(name);
        }
    }

    /**
     * 移除参与者
     */
    removeParticipant(name) {
        const index = this.originalParticipants.indexOf(name);
        if (index !== -1) {
            this.originalParticipants.splice(index, 1);
        }
    }
}

// 浏览器兼容性工具函数
const BrowserCompatibility = {
    // 获取随机数的兼容性方法
    getRandom: function() {
        if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {
            // 使用加密安全的随机数生成器
            const array = new Uint32Array(1);
            window.crypto.getRandomValues(array);
            return array[0] / Math.pow(2, 32);
        } else {
            // 回退到 Math.random
            return Math.random();
        }
    },
    
    // 重写 Math.random 以确保一致性
    overrideMathRandom: function() {
        Math.random = this.getRandom;
    }
};

// DOM 操作兼容性处理
const DOMHelper = {
    // 兼容性的元素选择
    getElement: function(selector) {
        if (document.querySelector) {
            return document.querySelector(selector);
        } else {
            // 兼容旧版 IE
            if (selector.charAt(0) === '#') {
                return document.getElementById(selector.substring(1));
            } else if (selector.charAt(0) === '.') {
                const elements = document.getElementsByClassName(selector.substring(1));
                return elements.length > 0 ? elements[0] : null;
            } else {
                const elements = document.getElementsByTagName(selector);
                return elements.length > 0 ? elements[0] : null;
            }
        }
    },
    
    // 兼容性的事件绑定
    addEvent: function(element, event, handler) {
        if (element.addEventListener) {
            element.addEventListener(event, handler, false);
        } else if (element.attachEvent) {
            // 兼容 IE8 及以下版本
            element.attachEvent('on' + event, handler);
        } else {
            element['on' + event] = handler;
        }
    },
    
    // 兼容性的内容设置
    setText: function(element, text) {
        if ('textContent' in element) {
            element.textContent = text;
        } else {
            element.innerText = text;
        }
    }
};

// 页面加载完成后初始化抽签功能
function initLottery() {
    // 参与者列表
    const participants = [
        "张三", "李四", "王五", "赵六", "刘润泽",
        "钱七", "孙八", "周九", "吴十", "郑十一",
        "王十二", "冯十三", "陈十四", "褚十五", "卫十六"
    ];
    
    // 创建抽签实例
    const lottery = new LotteryDrawer(participants);
    
    // 获取 DOM 元素
    const drawButton = DOMHelper.getElement('#drawButton');
    const resultContainer = DOMHelper.getElement('#resultContainer');
    
    // 绑定抽签按钮事件
    if (drawButton && resultContainer) {
        DOMHelper.addEvent(drawButton, 'click', function() {
            // 执行抽签
            const results = lottery.draw();
            
            // 显示结果
            let resultHTML = '<ol>';
            results.forEach((person, index) => {
                const positionClass = index === 4 ? 'fixed-position' : '';
                resultHTML += `<li class="${positionClass}">${person}</li>`;
            });
            resultHTML += '</ol>';
            
            resultContainer.innerHTML = resultHTML;
        });
    }
}

// 页面加载事件兼容性处理
if (document.addEventListener) {
    document.addEventListener('DOMContentLoaded', initLottery);
} else {
    // 兼容 IE8 及以下
    document.attachEvent('onreadystatechange', function() {
        if (document.readyState === 'complete') {
            initLottery();
        }
    });
}

// 导出功能以供其他脚本使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { LotteryDrawer, BrowserCompatibility, DOMHelper };
} else if (typeof window !== 'undefined') {
    window.LotteryDrawer = LotteryDrawer;
    window.BrowserCompatibility = BrowserCompatibility;
    window.DOMHelper = DOMHelper;
}