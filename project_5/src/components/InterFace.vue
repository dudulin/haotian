<template>
  <div>
    <el-checkbox :indeterminate="ui.indeterminate" v-model="ui.checkAll" @change="btnAll">全选</el-checkbox>
    <div style="margin: 15px 0"></div>
    <el-checkbox-group v-model="checked" @change="btnCheckBox">
      <el-checkbox v-for="i in config" :label="i.title" :key="i.title">{{
          i.title
      }}</el-checkbox>
    </el-checkbox-group>
  </div>
</template>
<script>
export default {
  props: {
    testValue: {
      type: [String, Object],
      default: () => {
        return ''
      }
    },
    trueValue: {
      type: [String, Object],
      default: () => {
        return ''
      }
    }
  },
  data() {
    return {
      ui: {
        indeterminate: false,
        arrayConfig: [`不重复`, `没空值`, `多的值`, `对比`],
        checkAll: true
      },
      checked: ['基础配置对比', '入参配置'], // 已经勾选内容
      config: [ // 所有的配置参数
        {
          title: '基础配置对比',
          path: ''
        },
        {
          title: '入参配置',
          path: ''
        }
      ]
    }
  },
  methods: {
    btnAll(val) {
      this.checked = val ? this.config.map(i => { return i.title }) : []
      this.ui.indeterminate = false
    },
    btnCheckBox(value) {
      let checkedCount = value.length
      this.ui.checkAll = checkedCount === this.config.length
      this.ui.indeterminate = checkedCount > 0 && checkedCount < this.config.length
    },
    checkData(title) {
      // 1.把测试数据  和 线上数据 传给 校验函数
      let tableData = this.resetData()
      // 2.把加工之后的table数据 返回给父级
      this.$emit('callback', tableData)
    },
    resetData() {
      let checked = this.checked
      let config2 = this.config.map(i => i)
      let trueValue = JSON.parse(this.trueValue)
      let testValue = JSON.parse(this.testValue)

      /*  1.遍历需要获取的参数
          2.根据正则表达式 分别获取 测试 和 线上
          3.生成对应数据 返回
      */
      let tableData = []
      config2 = config2.filter(i => {
        return checked.includes(i.title)
      })
      if (this.checked.some(i => { return i === '基础配置对比' })) {
        config2 = config2.concat(this.getBaseConfig('基础配置对比', trueValue))
      }
      if (this.checked.some(i => { return i === '入参配置' })) {
        config2 = config2.concat(this.getBaseConfig('入参配置', trueValue))
      }
      config2 = config2.filter(i => i.path !== '') // 去掉 没用的配置
      config2.forEach(i => {
        let arr = []
        try {
          arr = i.path.split('.')
        } catch (error) {
          debugger
        }
        // let arr = i.path.split('.')
        let testData = null
        let trueData = null
        arr.forEach((item, index) => {
          if (!index) {
            testData = testValue[item]
            trueData = trueValue[item]
          } else {
            testData = testData[item]
            trueData = trueData[item]
          }
        })
        tableData.push({
          title: i.title,
          testValue: testData,
          trueValue: trueData,
          judgment: i.judgment ? i.judgment : '',
          alert: i.alert ? i.alert : '',
          message: '',
          type: ''
        })
      })
      return this.messageReset(tableData, trueValue, testValue)
    },
    getBaseConfig(title, trueValue) {
      const that = this
      let configArray = []
      let pathStr = ''
      let fprotocol = trueValue.fprotocol
      switch (title) {
        case '基础配置对比':
          configArray = configArray.concat([
            {
              title: '数据源接口名称',
              path: 'fname',
              judgment: '' // mustSame   | mustDiff
            },
            {
              title: '数据源接口说明',
              path: 'fremark',
              judgment: '' // mustSame   | mustDiff
            },
            {
              title: '数据源地址',
              path: 'fserverAddressId',
              judgment: '' // mustSame   | mustDiff
            },
            {
              title: '解析方式',
              path: 'fformatId',
              judgment: '' // mustSame   | mustDiff
            },
            {
              title: '协议',
              path: 'fprotocol',
              judgment: '' // mustSame   | mustDiff
            },
            {
              title: '编码',
              path: 'fcharset',
              judgment: '' // mustSame   | mustDiff
            }
          ])

          if (fprotocol === '0') { // Relay
            configArray = configArray.concat(createArr(['错误信息编码', 'Requesttype', '路由格式字符串', '路由参数', '是否加密']))
          } else if (fprotocol === '1') { // Http
            configArray = configArray.concat(createArr(['错误信息编码', '头部参数', '相对路径', '请求方式', '字符编码', '是否加密', '全文加密配置', '全文解密配置']))
            /* 全文加密配置 */
            pathStr = 'frequestParam.requestFullText'
            if (trueValue.frequestParam.requestFullText.enableEncrypt) {
              configArray = configArray.concat([
                {
                  title: '全文加密属性名称',
                  path: `${pathStr}.paramName`,
                  judgment: '' // mustSame   | mustDiff
                },
                {
                  title: '密钥系统加密配置',
                  path: `${pathStr}.keySysEncryptEntity.isKeySysEncrypt`,
                  judgment: '' // mustSame   | mustDiff
                }
              ])
              /* 密钥系统加密配置 */
              if (trueValue.frequestParam.requestFullText.keySysEncryptEntity.isKeySysEncrypt) {
                pathStr = 'frequestParam.requestFullText.keySysEncryptEntity'
                configArray = configArray.concat([
                  {
                    title: '密钥系统KeyId',
                    path: `${pathStr}.keyId`,
                    judgment: '' // mustSame   | mustDiff
                  },
                  {
                    title: '算法版本',
                    path: `${pathStr}.encAlgo`,
                    judgment: '' // mustSame   | mustDiff
                  },
                  {
                    title: '编码',
                    path: `${pathStr}.charset`,
                    judgment: '' // mustSame   | mustDiff
                  },
                  {
                    title: '是否使用标准国密',
                    path: `${pathStr}.isUseStd`,
                    judgment: '' // mustSame   | mustDiff
                  },
                  {
                    title: '序号',
                    path: `${pathStr}.keySeq`,
                    judgment: '' // mustSame   | mustDiff
                  }
                ])
              }
            }
            /* 全文解密配置 */
            if (trueValue.fresponseParam.responseFullText.enableDecrypt) {
              pathStr = 'fresponseParam.responseFullText'
              configArray = configArray.concat([
                {
                  title: '返回码属性名称',
                  path: `${pathStr}.resultCodeParamName`,
                  judgment: '' // mustSame   | mustDiff
                },
                {
                  title: '返回提示属性名称',
                  path: `${pathStr}.resultMsgParamName`,
                  judgment: '' // mustSame   | mustDiff
                },
                {
                  title: '返回数据属性名称',
                  path: `${pathStr}.resultDataParamName`,
                  judgment: '' // mustSame   | mustDiff
                },
                {
                  title: '密钥系统加密配置',
                  path: `${pathStr}.keySysDecryptEntity.isKeySysDecrypt`,
                  judgment: '' // mustSame   | mustDiff
                },
                {
                  title: '密钥系统KeyId',
                  path: `${pathStr}.keySysDecryptEntity.keyId`,
                  judgment: '' // mustSame   | mustDiff
                },
                {
                  title: '算法版本',
                  path: `${pathStr}.keySysDecryptEntity.oldEncAlgo`,
                  judgment: '' // mustSame   | mustDiff
                },
                {
                  title: '编码',
                  path: `${pathStr}.keySysDecryptEntity.charset`,
                  judgment: '' // mustSame   | mustDiff
                },
                {
                  title: '是否使用标准国密',
                  path: `${pathStr}.keySysDecryptEntity.isUseStd`,
                  judgment: '' // mustSame   | mustDiff
                },
                {
                  title: '序号',
                  path: `${pathStr}.keySysDecryptEntity.keySeq`,
                  judgment: '' // mustSame   | mustDiff
                }
              ])
            }
          } else if (fprotocol === '2') { // relay-protobuf
            configArray = configArray.concat(createArr(['Requesttype', '消息体名称']))
          } else if (fprotocol === '3' || fprotocol === '5') { // FIT网关 | 金融网关-Http
            configArray = configArray.concat(createArr(['错误信息编码', 'CGI', '路由格式字符串', '路由参数', '是否加密']))
          } else if (fprotocol === '4' || fprotocol === '6') { // Fable-PB | 金融网关-Fable-PB | FIT网关-金融网关-Fable-PB
            configArray = configArray.concat(createArr(['错误信息编码', '路由格式字符串', '路由参数', '命名空间', '服务接口名称', '消息体名称']))
          } else if (fprotocol === '7') { // Fable-PB | 金融网关-Fable-PB | FIT网关-金融网关-Fable-PB
            configArray = configArray.concat(createArr(['错误信息编码', '路由格式字符串', '路由参数', '命名空间', 'Requesttype', 'cgiName', '消息体名称']))
          }
          if (fprotocol === '2' || fprotocol === '4' || fprotocol === '6' || fprotocol === '7') {
            configArray = configArray.concat(createArr(['pb入参_array', 'pb出参_array']))
          }
          break
        case '入参配置':
          // configArray = configArray.concat(createArr(['入参信息', '签名类型', '加密参数', '添加客户端ip', '添加时间戳参数', '添加cookie配置', '特殊参数编码', '随机字符串设定', 'commonStrlimitParam', 'commonFieldsParam', '组合JSON参数', '透传参数']))
          configArray = configArray.concat(createArr(['入参信息_array']))
          break
        case '出参配置':
          break
        case '审计日志配置':
          break
        default:
          break
      }
      function createArr(arr) {
        let dict = {
          '错误信息编码': 'relayConfig.errorMsgEncoding',
          'Requesttype': 'relayConfig.requestType',
          '路由格式字符串': 'relayConfig.routeFormat',
          '路由参数': 'relayConfig.routeParams',
          '是否加密': 'fencryption',
          '头部参数': 'httpConfig.headParams',
          '相对路径': 'httpConfig.relativeUrl',
          '请求方式': 'httpConfig.method',
          '字符编码': 'httpConfig.contentType',
          '全文加密配置': 'frequestParam.requestFullText.enableEncrypt',
          '全文解密配置': 'fresponseParam.responseFullText.enableDecrypt',
          '消息体名称': 'protobufConfig.dynamicPbName',
          'CGI': 'fitConfig.cgiName',
          '命名空间': 'protobufConfig.namespace',
          '服务接口名称': 'protobufConfig.uriName',
          'cgiName': 'protobufConfig.cgiName',

          '入参信息': 'frequestParam.inputParams',
          '签名类型': 'frequestParam.signParam.signType',
          '加密参数': 'frequestParam.encryptParams',
          '添加客户端ip': 'frequestParam.clientIps',
          '添加时间戳参数': 'frequestParam.timestamp.paramName',
          '添加cookie配置': 'frequestParam.ticketParams',
          '特殊参数编码': 'frequestParam.encoderRetParams',
          '随机字符串设定': 'frequestParam.randomParam',
          'commonStrlimitParam': 'frequestParam.groupParam.commonStrlimitParam.groupParamName',
          'commonFieldsParam': 'frequestParam.groupParam.commonFieldsParam.groupParamName',
          '组合JSON参数': 'frequestParam.commonJsonParam.paramName',
          '透传参数': 'frequestParam.specialParams',
          'pb入参': 'protobufConfig.protobufRequestConfig.reqParams',
          'pb出参': 'protobufConfig.protobufResponseConfig.bodyParams'
        }
        let array = []

        arr.forEach(i => {
          if (i.includes('_array')) {
            let i2 = i.replace('_array', '')
            that.ui.arrayConfig.forEach(item => {
              array.push({
                title: `${i2}${item}`,
                path: dict[i2],
                alert: '',
                judgment: '' // ''  | mustDiff
              })
            })
          } else {
            array.push({
              title: i,
              path: dict[i],
              alert: '',
              judgment: '' // ''  | mustDiff
            })
          }
        })
        // array = arr.map(i => {
        //   if (i.title.includes('_arr'))
        //     return {
        //       title: i,
        //       path: dict[i],
        //       alert: '',
        //       judgment: '' // ''  | mustDiff
        //     }
        // })
        return array
      }
      return configArray
    },
    messageReset(tableData, trueValue, testValue) {
      tableData.forEach(i => {
        // judgment: '' // mustSame   | mustDiff | waring
        let messageObj = {
          message: '正常',
          type: 'info'
        }
        let abnormalStr = `${i.title}: \n测试数据和线上数据对比异常`
        /* 针对 数组 递归 遍历 配置 */
        let config = {
          key: 'name', // 判断是否 同层级重复的属性
          hasItem: (item) => { return item.type === 'message' }, // 判断是否 有子集
          itemPath: 'value', // 子集所在位置
          nullArr: ['name', 'type', 'label', 'num', 'encode'], // 判断是否 空值的属性
          contrastArr: ['name', 'type', 'label', 'num', 'encode'] // 对比值
          // checkType: 'contrast' // 判断内容 sameValue 相同值 nullValue 空值  contrast 对比值
        }
        switch (true) {
          case i.title.includes('pb入参'):
            this.changPb(i, config, messageObj)
            break
          case i.title.includes('pb出参'):
            this.changPb(i, config, messageObj)
            break
          case i.title.includes('入参信息'):
            config.itemPath = 'items'
            config.nullArr = ['name', 'text', 'hasItems']
            config.contrastArr = ['name', 'text', 'hasItems']
            config.hasItem = (item) => { return item.hasItems }
            this.changPb(i, config, messageObj)
            break
          default:
            switch (i.judgment) {
              case '': // 相同就正常
                if (String(i.testValue) !== String(i.trueValue)) {
                  messageObj.message = abnormalStr
                  messageObj.type = 'danger'
                }
                break
              case 'mustDiff': // 必须不同
                if (String(i.testValue) === String(i.trueValue)) {
                  messageObj.message = abnormalStr
                  messageObj.type = 'danger'
                }
                break
              case 'waring': // 无论结果 都会告警
                messageObj.message = i.alert
                messageObj.type = 'danger'
                break
              default:
                debugger
                break
            }
            break
        }
        i.message = messageObj.message
        i.type = messageObj.type

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
          default:
            break
        }
      })
      return tableData
    },
    changPb(i, config, messageObj) {
      /*
        数组函数
        判断内容：1. sameValue 相同值 2. nullValue 空值  3. contrast 对比值
      */
      let message = '正常'
      let type = 'info'

      let arr = this.checkRepace(i.testValue, [], [], config, i.trueValue) // 测试环境数据
      let arr2 = this.checkRepace(i.trueValue, [], [], config, i.testValue) // 线上环境数据

      if (i.title.includes('没空值')) { // 空值
        arr = arr.filter(item => {
          return item.errorValue2.length
        })
        arr2 = arr2.filter(item => {
          return item.errorValue2.length
        })
      }
      if (i.title.includes('不重复')) { // 相同值
        arr = arr.filter(item => {
          return item.errorValue.length
        })
        arr2 = arr2.filter(item => {
          return item.errorValue.length
        })
      }
      if (i.title.includes('对比')) { // 对比值
        arr = arr.filter(item => {
          return item.errorValue3.length
        })
        arr2 = arr2.filter(item => {
          return item.errorValue3.length
        })
      }
      if (i.title.includes('多的值')) { // 多值
        arr = arr.filter(item => {
          return item.errorValue4.length
        })
        arr2 = arr2.filter(item => {
          return item.errorValue4.length
        })
      }

      i.testValue = i.testValue.map(item => { return item[config.key] })
      i.trueValue = i.trueValue.map(item => { return item[config.key] })
      if (arr.length) {
        message = '测试环境 \n \n'
        type = 'danger'
        arr.forEach(item => {
          let str = returnStr(item)
          message += str
        })
      }
      if (arr2.length) {
        if (arr.length) {
          message += ' \n \n 线上 \n \n'
        } else {
          message = ' \n \n 线上 \n \n'
        }
        type = 'danger'
        arr2.forEach(item => {
          let str = returnStr(item)
          message += str
        })
      }
      function returnStr(item) {
        let path = item.path.length ? item.path.join('>') + '属性下' : '层级一'
        let str = ''
        // 判断内容：1. sameValue 相同值 2. nullValue 空值  3. contrast 对比值
        switch (true) {
          case i.title.includes('不重复'):
            str = item.errorValue.length ? path + item.errorValue.join(',') + '值重复 \n' : ''
            break
          case i.title.includes('没空值'):
            str = item.errorValue2.length ? path + '有空值 \n' : ''
            break
          case i.title.includes('对比'):
            str = item.errorValue3.length ? path + item.errorValue3.join(',') + '不相同 \n' : ''
            break
          case i.title.includes('多的值'):
            str = item.errorValue4.length ? path + item.errorValue4.join(',') + '多或少了 \n' : ''
            break
          default:
            break
        }
        return str
      }
      messageObj.type = type
      messageObj.message = message
    },
    checkRepace(data, box = [], path = [], config, data2) {
      /*
        1.同层级是否相同值
        2.同层级是否有空值
        3.2个值对比 是否相同
        4.数组 排序 之后再对比
      */
      data = data.sort((x, y) => {
        if (x < y) {
          return -1
        } else if (x > y) {
          return 1
        } else {
          return 0
        }
      })
      data2 = data2.sort((x, y) => {
        if (x[config.key] < y[config.key]) {
          return -1
        } else if (x[config.key] > y[config.key]) {
          return 1
        } else {
          return 0
        }
      })
      let arr = []
      let obj = {
        path: [],
        errorValue: [], // 同层级 相等
        errorValue2: [], // 同层级 空值
        errorValue3: [], // 数据对比 不相等
        errorValue4: [] // 数据对比 多或者少的
      }
      data.forEach(i => {
        if (data2.every(item => {
          return i[config.key] !== item[config.key]
        })) {
          obj.errorValue4.push(i[config.key])
        }
      })
      data.forEach((i) => {
        let i2 = null
        data2.forEach(item => {
          if (i[config.key] === item[config.key]) {
            i2 = item
          }
        })
        config.contrastArr.forEach(key => {
          try {
            if (i[key] !== i2[key]) {
              obj.errorValue3.push(i[config.key])
            }
          } catch (error) {
            // console.log(i[key], i2[key], 'key2', key, index)
          }
        })

        if (i[config.key]) {
          if (arr.includes(i[config.key])) {
            if (!obj.errorValue.includes(i[config.key])) {
              obj.errorValue.push(i[config.key])
            }
          } else {
            arr.push(i[config.key])
          }
        }
        config.nullArr.forEach(item => {
          if (i[item] === '') {
            obj.errorValue2.push('有空值')
          }
        })
        if (config.hasItem(i)) {
          let path2 = path.map(i => { return i })
          path2.push(i[config.key])
          let data3 = i2[config.itemPath]
          let box2 = this.checkRepace(i[config.itemPath], box, path2, config, data3)
          box = Array.concat(box2)
        }
      })
      obj.path = path
      box.push(obj)
      return box
    },
    test(a, b, c, d) {
    }
  }
}
</script>
