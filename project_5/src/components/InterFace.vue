<template>
  <div>
    <el-checkbox :indeterminate="ui.indeterminate" v-model="ui.checkAll" @change="btnAll">全选</el-checkbox>
    <div style="margin: 15px 0;"></div>
    <el-checkbox-group v-model="checked" @change="btnCheckBox">
      <el-checkbox v-for="i in config" :label="i.title" :key="i.title">{{ i.title }}</el-checkbox>
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
        indeterminate: true,
        checkAll: false
      },
      // checked: ['pb入参不重复', '数据源地址', '命名空间', 'pb出参不重复'], // 已经勾选内容
      checked: ['基础配置对比'], // 已经勾选内容
      config: [{ // 所有的配置参数
        title: '数据源地址', // 标题
        path: 'fserverAddressId' // 路径
      }, {
        title: '命名空间',
        path: 'protobufConfig.namespace'
      },
      {
        title: 'pb入参不重复',
        path: 'protobufConfig.protobufRequestConfig.reqParams'
      }, {
        title: 'pb出参不重复',
        path: 'protobufConfig.protobufResponseConfig.bodyParams'
      },
      {
        title: 'pb入参没空在值',
        path: 'protobufConfig.protobufRequestConfig.reqParams'
      }, {
        title: 'pb出参没空值',
        path: 'protobufConfig.protobufResponseConfig.bodyParams'
      },
      {
        title: '基础配置对比',
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
      config2 = config2.filter(i => i.title !== '基础配置对比')
      config2.forEach(i => {
        let arr = i.path.split('.')
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
      let configArray = []
      let pathStr = ''
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

          if (trueValue.fprotocol === '0') { // Relay
            configArray = configArray.concat(createArr(['错误信息编码', 'Requesttype', '路由格式字符串', '路由参数', '是否加密']))
          } else if (trueValue.fprotocol === '1') { // Http
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
          } else if (trueValue.fprotocol === '2') { // relay-protobuf
            configArray = configArray.concat(createArr(['Requesttype', '消息体名称']))
          } else if (trueValue.fprotocol === '3' || trueValue.fprotocol === '5') { // FIT网关 | 金融网关-Http
            configArray = configArray.concat(['错误信息编码', 'CGI', '路由格式字符串', '路由参数', '是否加密'])
          } else if (trueValue.fprotocol === '4' || trueValue.fprotocol === '6') { // Fable-PB | 金融网关-Fable-PB | FIT网关-金融网关-Fable-PB
            configArray = configArray.concat(['错误信息编码', '路由格式字符串', '路由参数', '命名空间', '服务接口名称', '消息体名称'])
          } else if (trueValue.fprotocol === '7') { // Fable-PB | 金融网关-Fable-PB | FIT网关-金融网关-Fable-PB
            configArray = configArray.concat(['错误信息编码', '路由格式字符串', '路由参数', '命名空间', 'Requesttype', 'cgiName', '消息体名称'])
          }
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
          'cgiName': 'protobufConfig.cgiName'
        }
        let array = arr.map(i => {
          return {
            title: i,
            path: dict[i],
            alert: '',
            judgment: '' // ''  | mustDiff
          }
        })
        return array
      }
      return configArray
    },
    messageReset(tableData, trueValue, testValue) {
      tableData.forEach(i => {
        // judgment: '' // mustSame   | mustDiff | waring
        let message = '正常'
        let type = 'info'
        let abnormalStr = `${i.title}: \n测试数据和线上数据对比异常`
        let config = {}
        switch (i.title) {
          case 'pb入参不重复':
            config = this.changPb(i, trueValue, testValue)
            type = config.type
            message = config.message
            break
          case 'pb出参不重复':
            config = this.changPb(i, trueValue, testValue)
            type = config.type
            message = config.message
            break
          case 'pb入参没空在值':
            config = this.changPb(i, trueValue, testValue, 'null')
            type = config.type
            message = config.message
            break
          case 'pb出参没空值':
            config = this.changPb(i, trueValue, testValue, 'null')
            type = config.type
            message = config.message
            break
          default:
            switch (i.judgment) {
              case '': // 相同就正常
                if (String(i.testValue) !== String(i.trueValue)) {
                  message = abnormalStr
                  type = 'danger'
                }
                break
              case 'mustDiff': // 必须不同
                if (String(i.testValue) === String(i.trueValue)) {
                  message = abnormalStr
                  type = 'danger'
                }
                break
              case 'waring': // 无论结果 都会告警
                message = i.alert
                type = 'danger'
                break
              default:
                debugger
                break
            }
            break
        }
        i.message = message
        i.type = type

        try {
          i.testValue = i.testValue.join(',')
          i.trueValue = i.trueValue.join(',')
        } catch (error) { }
        i.testValue = typeof i.testValue === 'boolean' ? i.testValue ? '是' : '否' : i.testValue
        i.trueValue = typeof i.trueValue === 'boolean' ? i.trueValue ? '是' : '否' : i.trueValue
      })
      return tableData
    },
    changPb(i, trueValue, testValue, key) {
      let message = '正常'
      let type = 'info'
      let arr = this.checkRepace(i.testValue, [], []) // 测试环境数据
      let arr2 = this.checkRepace(i.trueValue, [], []) // 线上环境数据
      let errorValue = []
      let errorValue2 = []
      if (key === 'null') { // 没有空值
        errorValue = arr.filter(item => {
          return item.errorValue2.length
        })
        errorValue2 = arr2.filter(item => {
          return item.errorValue2.length
        })
      } else { // 不重复
        errorValue = arr.filter(item => {
          return item.errorValue.length
        })
        errorValue2 = arr.filter(item => {
          return item.errorValue.length
        })
      }
      i.testValue = i.testValue.map(item => { return item.name })
      i.trueValue = i.trueValue.map(item => { return item.name })
      if (errorValue.length) {
        message = '测试环境 \n \n'
        type = 'danger'
        errorValue.forEach(item => {
          let path = item.path.length ? item.path.join('>') + '下的' : '层级一'
          let str = ''
          if (key === 'null') {
            str = item.errorValue2.length ? path + '有空值 \n' : ''
          } else {
            str = item.errorValue.length ? path + item.errorValue.join(',') + '值重复 \n' : ''
          }
          message += str
        })
      }

      if (errorValue2.length) {
        message += ' \n \n 线上 \n \n'
        type = 'danger'
        errorValue2.forEach(item => {
          let path = item.path.length ? item.path.join('>') + '下的' : '层级一'
          let str = ''
          if (key === 'null') {
            str = item.errorValue2.length ? path + '有空值 \n' : ''
          } else {
            str = item.errorValue.length ? path + item.errorValue.join(',') + '值重复 \n' : ''
          }
          message += str
        })
      }
      if (trueValue.fprotocol !== '2' && trueValue.fprotocol !== '4') {
        i.trueValue = '协议不是 relay-protobuf 或 Fable-PB'
      }
      if (testValue.fprotocol !== '2' && testValue.fprotocol !== '4') {
        i.testValue = '协议不是 relay-protobuf 或 Fable-PB'
      }
      return {
        type,
        message
      }
    },
    checkRepace(data, box = [], path = []) {
      let arr = []
      let obj = {
        path: [],
        errorValue: [],
        errorValue2: []
      }
      data.forEach(i => {
        if (i.name) {
          if (arr.includes(i.name)) {
            if (!obj.errorValue.includes(i.name)) {
              obj.errorValue.push(i.name)
            }
          } else {
            arr.push(i.name)
          }
        }
        if (!i.type || !i.label || !i.name || !i.num || !i.encode) {
          obj.errorValue2.push('有空值')
        }
        if (i.type === 'message') {
          let path2 = path.map(i => { return i })
          path2.push(i.name)
          let box2 = this.checkRepace(i.value, box, path2)
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
