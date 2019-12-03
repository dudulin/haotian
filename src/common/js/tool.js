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
  checkType,
  setCondition: function (that, data, config) {
    let flag = data.flag
    let value = data.value
    let condition = config ? [config] : that.data.condition

    if (condition.length) {
      condition.forEach(item => {
        if (!that.$store.state[that.tabName][item.name]) {
          Vue.set(that.$store.state[that.tabName], item.name, {
            flag: {},
            condition: {}
          })
        }
        let property = item.property
        if (!that.$store.state[that.tabName][item.name].flag) {
          Vue.set(that.$store.state[that.tabName][item.name], 'flag', {})
        }
        if (!that.$store.state[that.tabName][item.name].condition) {
          Vue.set(that.$store.state[that.tabName][item.name], 'condition', {})
        }
        Vue.set(that.$store.state[that.tabName][item.name].flag, property, flag)
        Vue.set(that.$store.state[that.tabName][item.name].condition, property, value)
      })
    }
  },
  rules: {
    check0: (rule, value, callback) => {
      /* 不能为空 */
      let message = ''
      switch (true) {
        case /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value):
          message = '请输入正确的邮箱'
          break
      }
      if (message) {
        callback(new Error(message))
      } else {
        callback()
      }
    },
    check1: (rule, value, callback) => {
      /* 正常字符 */
      let message = ''
      switch (true) {
        case /^1[3456789]\d{9}$/.test(value):
          message = '您输入的电话号码不正确'
          break
      }
      if (message) {
        callback(new Error(message))
      } else {
        callback()
      }
    },
    check2: (rule, value, callback) => {
      /* 正整数 */
      let message = ''
      switch (true) {
        case /^.{0}$/.test(value):
          message = ''
          break
        case !/^\d+$/.test(value):
          message = '只能输入正整数'
          break
        default:
          break
      }
      if (message) {
        callback(new Error(message))
      } else {
        callback()
      }
    },
    check3: (rule, value, callback) => {
      /* 带小数的数字 */
      let message = ''
      switch (true) {
        case /^.{0}$/.test(value):
          message = ''
          break
        case !/^\d+(\.\d+)?$/.test(value):
          message = '只能由数字和小数点构成'
          break
        default:
          break
      }
      if (message) {
        callback(new Error(message))
      } else {
        callback()
      }
    },
    check4: (rule, value, callback) => {
      /* 可以为空 */
      let message = ''
      switch (true) {
        case /^.{0}$/.test(value):
          message = ''
          break
        default:
          break
      }
      if (message) {
        callback(new Error(message))
      } else {
        callback()
      }
    },
    check5: (rule, value, callback) => {
      /* 整数 */
      let message = ''
      switch (true) {
        case !/^-?\d+$/.test(value):
          message = '只能整数'
          break
        default:
          break
      }
      if (message) {
        callback(new Error(message))
      } else {
        callback()
      }
    },
    check6: (rule, value, callback) => {
      /* 检测结尾.proto */
      let message = ''
      let val = value.split('.')
      if (val[val.length - 1] !== 'proto') {
        message = '请以 .proto 结尾'
      }
      if (message) {
        callback(new Error(message))
      } else {
        callback()
      }
    }
  }
}