export default { // 对外暴露参数
  checkArray(obj, configArray) { // 判断对象是否 完整 且 长度不为0
    let demo = {}
    let flag = false
    configArray.forEach((i, index) => {
      try {
        if (index === 0) {
          demo = obj[i]
        } else {
          demo = demo[i]
        }
        if (index === configArray.length - 1) {
          flag = !!demo.length
        }
      } catch (error) {
        console.log('对象false')
      }
    })
    return flag
  },
  changeArray(array, itemKey, callBack) { // 对数组内的 对象进行加工
    array.forEach(i => {
      callBack(i)
      if (i[itemKey] && i[itemKey].length) {
        this.changeArray(i[itemKey], itemKey, callBack)
      }
    })
  },
  getObject(data, arr) {
    let obj = null
    arr.forEach((item, index) => {
      if (!index) {
        obj = data[item]
      } else {
        obj = obj[item]
      }
    })
    return obj
  },
  checkRepace2(data, data2) {
    let obj = {
      path: [],
      pathStr: '',
      errorValue: [], // 同层级 相等
      errorValue2: [], // 同层级 空值
      errorValue3: [], // 数据对比 不相等
      errorValue4: [] // 数据对比 多或者少的
    }
    data = data.sort()
    data2 = data2.sort()
    data.forEach((i, index) => {
      if (i === data[index + 1]) {
        obj.errorValue.push(i)
      }
      if (i === '') {
        obj.errorValue2.push(i)
      }
      if (!data2.includes(i)) {
        obj.errorValue4.push(i)
      }
    })
    return [obj]
  },
  checkRepace(data, box = [], path = [], config, data2) {
    let key = config.key
    const that = this
    config.nullArr.forEach(i => {
      if (i.prop === key) {
        config.title = i.title
      }
    })
    if (!config.contrastArr || !config.contrastArr.length) {
      config.contrastArr = config.nullArr.map(i => { return i })
    }

    try {
      data = this.sort(data, config.key)
      data2 = this.sort(data2, config.key)
    } catch (error) {

    }
    /* ==================================================================  */
    let moreArr = []

    let moreArr2 = []

    // 1.同层级 重复
    let repeatArr2 = findRepeat(data) // 测试
    let repeatArr = findRepeat(data2) // 线上

    // 3.对比多的值
    data.forEach(i => {
      if (data2.every(item => { return item[key] !== i[key] }) && repeatArr2.every(item => { return item[key] !== i[key] })) {
        moreArr2.push(i)
      }
    })
    data2.forEach(i => {
      if (data.every(item => { return item[key] !== i[key] }) && repeatArr.every(item => { return item[key] !== i[key] })) {
        moreArr.push(i)
      }
    })

    /* 线上数据为标准 */
    data2.forEach(i => {
      resetData(i)
    })
    moreArr2.forEach(i => {
      resetData(i, 'test')
    })
    function resetData(i, flag) {
      let obj = {
        path: [], // (i[key])
        key: i[config.key],
        normal: false, // 正常
        repeatArr: [], // 同层级 相等  repeatArr.push(i)
        nulltArr: [], // 同层级 空值 push(item.title)
        diffArr: [], // 数据对比 不相等 ({ title: ii.title, value: value1, value2: value2 })
        moreArr: [], // 数据对比 多或者少的  moreArr.push(i)
        moreArr2: [], // 数据对比 多或者少的  moreArr.push(i)
        repeatArr2: [], // 同层级 相等  repeatArr.push(i)
        nulltArr2: [] // 同层级 空值 push(item.title)
      }
      // let iStr = JSON.stringify(i)
      let i2 = null
      i.title = config.title
      if (flag === 'test') {
        if (repeatArr2.some(item => { return item[key] === i[key] })) {
          obj.repeatArr2.push(i)
        }
        if (moreArr2.some(item => { return item[key] === i[key] })) {
          obj.moreArr2.push(i)
        }
        obj.nulltArr2 = findNull(i)
      } else {
        if (moreArr.some(item => { return item[key] === i[key] })) {
          obj.moreArr.push(i)
        }
        if (repeatArr.some(item => { return item[key] === i[key] })) {
          obj.repeatArr.push(i)
        }
        data.forEach(item => {
          if (item[key] === i[key]) {
            i2 = item
            if (repeatArr2.every(item => { return item[key] !== i[key] })) {
              obj.diffArr = findContrastArr(item, i)
            }
          }
        })
        obj.nulltArr = findNull(i)
      }
      if (i2) {
        obj.nulltArr2 = findNull(i2)
      }
      // 4. 不相同的
      if (config.hasItem && config.hasItem(i)) {
        let path2 = path.map(i => { return i })
        path2.push(i[key])
        let data3 = i2 ? i2[config.itemPath] : []
        let box2 = []
        if (flag === 'test') {
          box2 = that.checkRepace(i[config.itemPath], box, path2, config, data3)
        } else {
          box2 = that.checkRepace(data3, box, path2, config, i[config.itemPath])
        }

        box = Array.concat(box2)
      }
      if (!obj.repeatArr.length && !obj.nulltArr.length && !obj.diffArr.length && !obj.moreArr.length) {
        if (!obj.nulltArr2.length && !obj.moreArr2.length) {
          obj.normal = true
        }
      }
      obj.path = path
      box.push(obj)
    }
    /* ==================================================================  */
    function findContrastArr(item, item2) {
      let box = []
      config.contrastArr.forEach(ii => {
        let arr = ii.prop.split('.')
        let value1 = null
        let value2 = null

        arr.forEach((i, index) => {
          if (!index) {
            try {
              value1 = item[i]
              value2 = item2[i]
            } catch (e) {
              // console.log(e, 'error')
            }
          } else {
            try {
              value1 = value1[i]
              value2 = value2[i]
            } catch (e) {
              // console.log(e, 'error')
            }
          }
        })
        if (String(value1) !== String(value2)) {
          box.push({ title: ii.title, value: value1, value2: value2 })
        }
      })
      return box
    }

    function findRepeat(array) {
      let arr = []
      if (array) {
        array.forEach((i, index) => {
          if (index !== array.length - 1) {
            if (i[config.key] === array[index + 1][config.key]) {
              arr.push(i)
            }
          }
        })
      }
      return arr
    }

    function findNull(i) {
      let arr = []
      config.nullArr.forEach(item => {
        let porpArr = item.prop.split('.')
        let c = null
        porpArr.forEach((ii, index) => {
          if (index) {
            try {
              c = c[ii]
            } catch (e) { }
          } else {
            c = i[ii]
          }
        })
        if (c === '') {
          arr.push(item.title)
        }
      })
      return arr
    }

    /* ==================================================================  */
    return box
  },
  changPb(i, config, messageObj) {
    /*
      数组函数
      判断内容：1. sameValue 相同值 2. nullValue 空值  3. contrast 对比值
    */
    let message = '正常'
    let arr = this.checkRepace(i.testValue, [], [], config, i.trueValue) // 测试环境数据
    if (!config.key) { // 字符串类型
      arr = this.checkRepace2(i.testValue, i.trueValue) // 测试环境数据
    }

    if (config.key) {
      // i.testValue = i.testValue.map(item => { return item[config.key] })
      // i.trueValue = i.trueValue.map(item => { return item[config.key] })
    }
    let array = []
    arr.forEach(i => {
      array.push(returnObj(i))
    })
    function returnObj(item) {
      let normal = item.normal
      let path = `层级${item.path.length + 1}`
      let key = item.path.length ? item.path.join('>') + '>' + item.key : item.key
      let type = normal ? 'info' : 'danger'

      let testValue = ''
      let trueValue = ''
      // 判断内容：1. sameValue 相同值 2. nullValue 空值  3. contrast 对比值
      if (item.repeatArr.length) {
        item.repeatArr.forEach(i => {
          trueValue += `${i.title}错误:数据重复; `
        })
      }
      if (item.repeatArr2.length) {
        item.repeatArr2.forEach(i => {
          testValue += `${i.title}错误:数据重复; `
        })
      }

      if (item.nulltArr.length) {
        item.nulltArr.forEach(i => {
          trueValue += `${i}错误:空值; `
        })
      }
      if (item.nulltArr2.length) {
        item.nulltArr2.forEach(i => {
          testValue += `${i}错误:空值; `
        })
      }
      if (item.diffArr.length) {
        item.diffArr.forEach(i => {
          trueValue += `${i.title}错误:${i.value2}; `
          testValue += `${i.title}错误:${i.value}; `
        })
      }
      if (item.moreArr.length) {
        item.moreArr.forEach(i => {
          trueValue += `错误:线上多的数据; `
        })
      }
      if (item.moreArr2.length) {
        item.moreArr2.forEach(i => {
          testValue += `错误:测试多的数据; `
        })
      }
      if (item.normal) {
        testValue = '一致'
        trueValue = '一致'
      }
      let obj = {
        key,
        path,
        testValue,
        normal,
        trueValue,
        message,
        type
      }
      return obj
    }
    messageObj.type = array.every(i => { return i.type === 'info' }) ? 'info' : 'danger'
    messageObj.message = message
    messageObj.tableData = array
    messageObj.normal = messageObj.type === 'info'
  },
  getArray(item) { // 数组的判断 和显示 方法
    let key = item.arrayConfig.itmeConfig[0].prop
    let nullArr = item.arrayConfig.itmeConfig
    let hasItem = item.arrayConfig.hasItem
    // let trueValue = JSON.parse(JSON.stringify(item.trueValue))
    // let testValue = JSON.parse(JSON.stringify(item.testValue))
    let config = {
      key,
      hasItem,
      itemPath: 'value', // 子集所在位置
      nullArr // 判断是否 空值的属性
    }
    let messageObj = {
      message: '正常',
      type: 'info'
    }

    this.changPb(item, config, messageObj)

    return messageObj
  },
  checkJudgment(item) {
    let i = JSON.parse(JSON.stringify(item))
    let type = 'danger' // 状态
    let message = '正常' // 校验结果

    switch (i.judgment) {
      case '' || 'normal': // 相同就正常
        if (String(i.testValue) !== String(i.trueValue)) {
          message = '错误'
        } else {
          type = 'info'
        }
        break
      case 'warning':
        message = '警告'
        break
      case 'unsure':
        message = '待确认'
        break
      default:
        break
    }
    switch (Object.prototype.toString.call(i.trueValue)) {
      case '[object Array]':
        i.testValue = i.testValue.map(item => {
          return JSON.stringify(item)
        }).join(',')
        i.trueValue = i.trueValue.map(item => {
          return JSON.stringify(item)
        }).join(',')
        break
      case '[object Boolean]':
        i.testValue = i.testValue ? '是' : '否'
        i.trueValue = i.trueValue ? '是' : '否'
        break
      case '[object String]':
        i.testValue = i.testValue ? i.testValue : '---------'
        i.trueValue = i.trueValue ? i.trueValue : '---------'
        break
      case '[object Undefined]':
        i.testValue = '======='
        i.trueValue = '======='
        break
      case '[object Null]':
        i.testValue = '======='
        i.trueValue = '======='
        break
      default:
        break
    }
    i.normal = type === 'info'
    i.message = message
    i.type = type
    return i
  },
  checkType(obj, str) { // 判断对象类型
    let typeStr = Object.prototype.toString.call(obj)
    return typeStr.includes(str)
  },
  resetTitle(arr) {
    return arr.join('>')
  }
}
