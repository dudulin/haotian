/* 工具函数 */

// 1. 判断对象类型   checkType([],'array')  --- true
function checkType(obj, type) {
    return Object.prototype.toString.call(obj).toLocaleLowerCase().includes(type.toLocaleLowerCase())
}

//2. 日期格式 format(fmt:'yyyy年MM月dd日HH时mm分SS秒',date:new Date())  ---
function format({ fmt = 'yyyy-MM-dd', date = new Date() }) {
    date = checkType(date, 'date') ? date : new Date(date)
    var o = {
        "M+": date.getMonth() + 1,                 //月份 
        "d+": date.getDate(),                    //日 
        "H+": date.getHours(),                   //小时 
        "m+": date.getMinutes(),                 //分 
        "S+": date.getSeconds()                 //秒 
        // "q+": Math.floor((date.getMonth() + 3) / 3), //季度 
        // "S": date.getMilliseconds()             //毫秒 
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
}

export default {
    format,
    checkType
}