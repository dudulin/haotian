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
        checkAll: true
      },
      checked: ['基础配置对比', '入参配置', '出参配置', '审计日志配置'], // 已经勾选内容
      config: [ // 所有的配置参数
        {
          title: '基础配置对比',
          path: ''
        },
        {
          title: '入参配置',
          path: ''
        },
        {
          title: '出参配置',
          path: ''
        },
        {
          title: '审计日志配置',
          path: 'auditlog.open'
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
      config2 = config2.filter(i => {
        return checked.includes(i.title)
      })
      config2.forEach(i => {
        switch (i.title) {
          case '基础配置对比':
            i.children = this.getBaseConfig('基础配置对比', trueValue, testValue)
            break
          case '入参配置':
            i.children = this.getBaseConfig('入参配置', trueValue, testValue)
            break
          case '出参配置':
            i.children = this.getBaseConfig('出参配置', trueValue, testValue)
            break
          case '审计日志配置':
            i.children = this.getBaseConfig('审计日志配置', trueValue, testValue)
            break
          default:
            break
        }
      })
      return this.messageReset(config2)
    },
    getBaseConfig(title, trueValue, testValue) {
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
              judgment: 'mustDiff' // mustSame   | mustDiff
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
            if (String(trueValue.fformatId) === '10') {
              configArray = configArray.concat([
                {
                  title: 'xml请求参数配置',
                  path: 'httpConfig.xmlRequestNodes',
                  judgment: '' // mustSame   | mustDiff
                }
              ])
            }
            /* 全文加密配置 */
            pathStr = 'frequestParam.requestFullText'
            if (trueValue.frequestParam.requestFullText.enableEncrypt || testValue.frequestParam.requestFullText.enableEncrypt) {
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
                configArray.forEach(i => {
                  if (i.title === '密钥系统加密配置') {
                    i.children = [
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
                    ]
                  }
                })
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
            configArray = configArray.concat(createArr(['pb入参', 'pb出参']))
          }
          break
        case '入参配置':
          // configArray = configArray.concat(createArr(['入参信息', '签名类型', '加密参数', '添加客户端ip', '添加时间戳参数', '添加cookie配置', '特殊参数编码', '随机字符串设定', 'commonStrlimitParam', 'commonFieldsParam', '组合JSON参数', '透传参数']))
          configArray = configArray.concat(createArr(['入参信息', '签名类型', '加密参数', '添加客户端ip', '添加时间戳参数', '添加cookie配置', '特殊参数编码', '随机字符串设定', 'commonStrlimitParam', 'commonFieldsParam', '组合JSON参数', '透传参数']))
          pathStr = 'frequestParam.groupParam.commonStrlimitParam'
          configArray.forEach(i => {
            if (i.title === '添加时间戳参数') {
              i.children = [
                {
                  title: '参数名',
                  path: `frequestParam.timestamp.paramName`,
                  judgment: ''
                },
                {
                  title: '位数',
                  path: 'frequestParam.timestamp.size',
                  judgment: ''
                }
              ]
            }
            if (i.title === 'commonStrlimitParam') {
              i.children = [
                {
                  title: '组合参数名称',
                  path: `${pathStr}.groupParamName`,
                  judgment: ''
                },
                {
                  title: '偏移量offet参数名',
                  path: `${pathStr}.offsetParamName`,
                  judgment: ''
                },
                {
                  title: '查询数量参数名称',
                  path: `${pathStr}.limitParamName`,
                  judgment: ''
                }
              ]
            }
            if (i.title === 'commonFieldsParam') {
              pathStr = 'frequestParam.groupParam.commonFieldsParam'
              i.children = [
                {
                  title: '组合参数名称',
                  path: `${pathStr}.groupParamName`,
                  judgment: ''
                },
                {
                  title: '留空',
                  path: `${pathStr}.keepingSpace`,
                  judgment: ''
                },
                {
                  title: '参数',
                  path: `${pathStr}.inGroupParams`,
                  judgment: ''
                }
              ]
            }
            if (i.title === '组合JSON参数') {
              pathStr = 'frequestParam.commonJsonParam'
              i.children = [
                {
                  title: '组合参数名称',
                  path: `${pathStr}.paramName`,
                  judgment: ''
                },
                {
                  title: '需组合的参数',
                  path: `${pathStr}.comboxParams`,
                  judgment: ''
                },
                {
                  title: '是否去掉空值',
                  path: `${pathStr}.trim`,
                  judgment: ''
                }
              ]
            }
          })
          if (trueValue.frequestParam.signParam.signType === '2') { // 密钥
            // configArray = configArray.concat()
            configArray.forEach(i => {
              if (i.title === '签名类型') {
                i.children = createArr(['密钥系统KeyId', '算法版本', '签名参数名称', '序号', '签名规则', '是否使用标准国密', '编码', '是否去空', '是否添加时间戳', '时间戳名称', '时间戳长度'])
              }
            })
          } else if (trueValue.frequestParam.signParam.signType === '1') { // 定制
            pathStr = 'frequestParam.signParam'
            configArray.forEach(i => {
              if (i.title === '签名类型') {
                if (!trueValue.frequestParam.batchSign) { // 单条
                  i.children = [
                    {
                      title: '开启多条',
                      path: `frequestParam.batchSign`,
                      judgment: ''
                    },
                    {
                      title: '参数名称',
                      path: `${pathStr}.name`,
                      judgment: ''
                    },
                    {
                      title: 'key',
                      path: `${pathStr}.key`,
                      judgment: ''
                    },
                    {
                      title: '签名规则',
                      path: `${pathStr}.signRule`,
                      judgment: ''
                    },
                    {
                      title: '加密算法',
                      path: `${pathStr}.encryptType`,
                      judgment: ''
                    },
                    {
                      title: '大写转换',
                      path: `${pathStr}.upperCase`,
                      judgment: ''
                    },
                    {
                      title: '是否去空',
                      path: `${pathStr}.trimSpace`,
                      judgment: ''
                    },
                    {
                      title: 'key是否参与ascii排序',
                      path: `${pathStr}.keyInSort`,
                      judgment: ''
                    },
                    {
                      title: 'charsetEncoding',
                      path: `${pathStr}.charsetEncoding`,
                      judgment: ''
                    },
                    {
                      title: '是否密钥系统签名',
                      path: `${pathStr}.keySysSignSetting.isKeySysSign`,
                      judgment: ''
                    },
                    {
                      title: '密钥系统KeyId',
                      path: `${pathStr}.keySysSignSetting.keyId`,
                      judgment: ''
                    },
                    {
                      title: '算法版本',
                      path: `${pathStr}.keySysSignSetting.encAlgo`,
                      judgment: ''
                    }
                  ]
                } else { // 多条
                  i.children = [
                    {
                      title: '开启多条',
                      path: `frequestParam.batchSign`,
                      children: [
                        {
                          title: '定制多条',
                          path: 'frequestParam.signParams',
                          judgment: ''
                        }
                      ],
                      judgment: ''
                    }
                  ]
                }
              }
            })
          }
          break
        case '出参配置':
          configArray = configArray.concat(createArr(['出参信息配置', '密钥验证签名', '返回串解析配置', '需解密字段', '二进制转换', '数组扩容', '出参特殊参数编码', '二次分割参数', '出参字符编码']))
          configArray.forEach(i => {
            if (i.title === '数组扩容') {
              i.children = [
                {
                  title: '参数',
                  path: `fresponseParam.arrayExpansion.params`,
                  judgment: ''
                },
                {
                  title: '分割方式',
                  path: `fresponseParam.arrayExpansion.type`,
                  judgment: ''
                }
              ]
            }
          })

          break
        case '审计日志配置':
          if (trueValue.auditlog.open || testValue.auditlog.open) {
            configArray = [
              {
                title: '日志入参配置',
                path: `auditlog.auditlogArr`,
                judgment: ''
              },
              {
                title: '日志出参配置',
                path: `auditlog.newAuditlogArr`,
                judgment: ''
              }
            ]
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
          'cgiName': 'protobufConfig.cgiName',

          '入参信息': 'frequestParam.inputParams',
          '签名类型': 'frequestParam.signParam.signType',
          '加密参数': 'frequestParam.encryptParams',
          '添加客户端ip': 'frequestParam.clientIps',
          '添加时间戳参数': '',
          '添加cookie配置': 'frequestParam.ticketParams',
          '特殊参数编码': 'frequestParam.encoderRetParams',
          '随机字符串设定': 'frequestParam.randomParam',
          '透传参数': 'frequestParam.specialParams',
          'pb入参': 'protobufConfig.protobufRequestConfig.reqParams',
          'pb出参': 'protobufConfig.protobufResponseConfig.bodyParams',

          '密钥系统KeyId': 'frequestParam.signParam.keySysSignSetting.keyId',
          '算法版本': 'frequestParam.signParam.keySysSignSetting.encAlgo',
          '签名参数名称': 'frequestParam.signParam.keySysSignSetting.signParamName',
          '序号': 'frequestParam.signParam.keySysSignSetting.keySeq',
          '签名规则': 'frequestParam.signParam.keySysSignSetting.signRule',
          '是否使用标准国密': 'frequestParam.signParam.keySysSignSetting.isUseStd',
          '编码': 'frequestParam.signParam.keySysSignSetting.charset',
          '是否去空': 'frequestParam.signParam.keySysSignSetting.trimSpace',
          '是否添加时间戳': 'frequestParam.signParam.keySysSignSetting.addTimestamp',
          '时间戳名称': 'frequestParam.signParam.keySysSignSetting.timestampName',
          '时间戳长度': 'frequestParam.signParam.keySysSignSetting.timestampSize',

          '出参信息配置': 'fresponseParam.outPutParams',
          '密钥验证签名': 'fresponseParam.validSignSetting.isKeySysValidSign',
          '返回串解析配置': 'fresponseParam.specialReturnField',
          '需解密字段': 'fresponseParam.decryptParams',
          '二进制转换': 'fresponseParam.transferToBinary',
          '出参特殊参数编码': 'fresponseParam.encoderRetParams',
          '二次分割参数': 'fresponseParam.secondSegmentParam',
          '出参字符编码': 'fresponseParam.charsetEncoding'
        }
        let array = []

        arr.forEach(i => {
          array.push({
            title: i,
            path: dict[i] ? dict[i] : '',
            alert: '',
            judgment: '' // ''  | mustDiff
          })
        })
        return array
      }
      return configArray
    },
    messageReset(tableData) {
      let trueValue = JSON.parse(this.trueValue)
      let testValue = JSON.parse(this.testValue)
      tableData.forEach((i, index) => {
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
          nullArr: [
            { prop: 'name', title: '字段名称' },
            { prop: 'type', title: '数据类型' },
            { prop: 'label', title: '限定修饰符' },
            { prop: 'num', title: 'Tag' },
            { prop: 'encode', title: '编码' }
          ] // 判断是否 空值的属性
          // checkType: 'contrast' // 判断内容 sameValue 相同值 nullValue 空值  contrast 对比值
        }
        let random = Math.floor(Math.random() * 1000)

        let arr = []
        try {
          arr = i.path.split('.')
        } catch (error) {
          // debugger
        }
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
        i.testValue = testData
        i.trueValue = trueData

        i.id = `${i.title}${index}${random}`
        switch (true) {
          case i.title.includes('pb入参'):
            this.changPb(i, config, messageObj)
            break
          case i.title.includes('pb出参xxxx'):
            this.changPb(i, config, messageObj)
            break
          case i.title.includes('入参信息xxxx'):
            config.itemPath = 'items'
            config.nullArr = ['name', 'text', 'hasItems']
            config.contrastArr = ['name', 'text', 'hasItems']
            config.hasItem = (item) => { return item.hasItems }
            this.changPb(i, config, messageObj)
            break
          case i.title.includes('xml请求参数配置66xxxx'):
            config.key = 'nodeName'
            config.itemPath = 'nodes'
            config.nullArr = ['nodeName', 'paramNameMapping', 'emptyNoSendFlag']
            config.contrastArr = ['nodeName', 'paramNameMapping', 'emptyNoSendFlag']
            config.hasItem = (item) => { return item.hasNodes }
            this.changPb(i, config, messageObj)
            break
          case i.title.includes('添加cookie配置xxxx'):
            config.key = 'paramName'
            config.nullArr = ['paramName', 'cookieParam']
            config.contrastArr = ['paramName', 'cookieParam']
            config.hasItem = () => { return false }
            this.changPb(i, config, messageObj)
            break
          case i.title.includes('特殊参数编码xxxx'):
            config.key = 'paramName'
            config.nullArr = ['paramName', 'charsetEncoding', 'decode']
            config.contrastArr = ['paramName', 'charsetEncoding', 'decode']
            config.hasItem = () => { return false }
            this.changPb(i, config, messageObj)
            break
          case i.title.includes('加密参数xxxx'):
            config.nullArr = ['paramName', 'type', 'key', 'encryptRule']
            config.key = 'paramName'
            config.contrastArr = ['paramName', 'type', 'key', 'encryptRule']
            config.hasItem = () => { return false }
            this.changPb(i, config, messageObj)
            break
          case i.title.includes('添加客户端ipxxxx'):
            config.nullArr = []
            config.key = ''
            config.contrastArr = []
            config.hasItem = () => { return false }
            this.changPb(i, config, messageObj)
            break
          case i.title.includes('定制多条xxxx'):
            config.nullArr = ['name', 'key', 'signRule', 'encryptType', 'upperCase', 'trimSpace', 'keyInSort', 'charsetEncoding', 'keySysSignSetting.isKeySysSign', 'keySysSignSetting.keyId', 'keySysSignSetting.encAlgo']
            config.contrastArr = ['name', 'key', 'signRule', 'encryptType', 'upperCase', 'trimSpace', 'keyInSort', 'charsetEncoding', 'keySysSignSetting.isKeySysSign', 'keySysSignSetting.keyId', 'keySysSignSetting.encAlgo']
            config.hasItem = () => { return false }
            this.changPb(i, config, messageObj)
            break
          // 出参配置
          case i.title.includes('出参信息配置xxxx'):
            config.itemPath = 'items'
            config.nullArr = ['name', 'text', 'defacementParam.defacement', 'defacementParam.reqParamNameMapping']
            config.contrastArr = ['name', 'text', 'defacementParam.defacement', 'defacementParam.reqParamNameMapping']
            config.hasItem = (i) => { return i.hasItems }
            this.changPb(i, config, messageObj)
            break

          case i.title.includes('需解密字段xxxx'):
            config.key = 'paramName'
            config.nullArr = ['paramName', 'type', 'decryptRule', 'key']
            config.contrastArr = ['paramName', 'type', 'decryptRule', 'key']
            config.hasItem = () => { return false }
            this.changPb(i, config, messageObj)
            break

          case i.title.includes('二进制转换xxxx'):
            config.key = 'paramName'
            config.nullArr = ['paramName', 'index']
            config.contrastArr = ['paramName', 'index']
            config.hasItem = () => { return false }
            this.changPb(i, config, messageObj)
            break

          case i.title.includes('二次分割参数xxxx'):
            config.key = 'seqName'
            config.nullArr = ['seqName', 'secondFormatType', 'charset']
            config.contrastArr = ['seqName', 'secondFormatType', 'charset']
            config.hasItem = () => { return false }
            this.changPb(i, config, messageObj)
            break
          // 审计日志配置
          case i.title.includes('日志入参配置xxx') || i.title.includes('日志出参配置xxx'):
            config.key = 'auditlogKey'
            config.nullArr = ['auditlogKey', 'auditlogVal']
            config.contrastArr = ['auditlogKey', 'auditlogVal']
            config.hasItem = () => { return false }
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
                // debugger
                break
            }
            break
        }
        i.message = messageObj.message
        i.type = messageObj.type
        i.tableData = messageObj.tableData

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
          default:
            break
        }
        if (i.children && i.children.length) {
          i.children = this.messageReset(i.children)
          if (!i.children.every(item => { return item.type === 'info' })) {
            i.message = '异常'
            i.type = 'danger'
          }
        }
      })
      return tableData
    },
    sort(data, key) {
      let data2 = data.sort((x, y) => {
        if (x[key] < y[key]) {
          return -1
        } else if (x[key] > y[key]) {
          return 1
        } else {
          return 0
        }
      })
      return data2
    },
    changPb(i, config, messageObj) {
      /*
        数组函数
        判断内容：1. sameValue 相同值 2. nullValue 空值  3. contrast 对比值
      */
      let message = '正常'

      let arr = this.checkRepace(i.testValue, [], [], config, i.trueValue) // 测试环境数据
      let arr2 = this.checkRepace(i.trueValue, [], [], config, i.testValue) // 线上环境数据
      console.log(arr, 'arr')
      console.log(arr2, 'arr2')
      if (!config.key) { // 字符串类型
        arr = this.checkRepace2(i.testValue, i.trueValue) // 测试环境数据
        arr2 = this.checkRepace2(i.trueValue, i.testValue) // 线上环境数据
      }

      if (config.key) {
        // i.testValue = i.testValue.map(item => { return item[config.key] })
        // i.trueValue = i.trueValue.map(item => { return item[config.key] })
      }
      let array = []
      let array2 = []
      if (arr.length > arr2.length) {
        arr.forEach((item, index) => {
          arr2.forEach(item2 => {
            if (item.key === item2.key) {
              array.push(returnObj(item, item2))
            }
          })
          if (arr2.every(item2 => { return item.key !== item2.key })) {
            array.push(returnObj(item, null))
          }
        })
      } else {
        arr2.forEach((item, index) => {
          arr.forEach(item2 => {
            if (item.key === item2.key && item.pathStr === item2.pathStr) {
              if (!array2.includes(JSON.stringify(item2))) {
                array.push(returnObj(item2, item))
                array2.push(JSON.stringify(item2))
                console.log(index, 'kkk', item.key)
              }
            }
          })
          if (arr.every(item2 => { return item.key !== item2.key })) {
            array.push(returnObj(null, item))
          }
        })
      }

      console.log(array, 'array')
      function returnObj(data1, data2) {
        let key = ''
        let path = ''
        let testValue = ''
        let trueValue = ''
        let type = 'danger'
        if (data1) {
          path = `层级${data1.path.length + 1}`
          testValue = returnStr(data1)
          key = data1.path.length ? data1.path.join('>') + '>' + data1.key : data1.key
        }
        if (data2) {
          path = `层级${data2.path.length + 1}`
          trueValue = returnStr(data2)
          key = data2.path.length ? data2.path.join('>') + '>' + data2.key : data2.key
        }
        try {
          type = data1.normal && data2.normal ? 'info' : 'danger'
        } catch (error) { }
        let obj = {
          key,
          path,
          testValue,
          trueValue,
          message,
          type
        }
        return obj
      }
      function returnStr(item) {
        let str = ''
        // 判断内容：1. sameValue 相同值 2. nullValue 空值  3. contrast 对比值
        if (item.errorValue.length) {
          str += item.errorValue.length ? item.errorValue.join(',') : ''
        }
        if (item.errorValue2.length) {
          str += item.errorValue2.length ? item.errorValue2.join(',') : ''
        }
        if (item.errorValue3.length) {
          str += item.errorValue3.length ? item.errorValue3.join(',') : ''
        }
        if (item.errorValue4.length) {
          str += item.errorValue4.length ? item.errorValue4.join(',') : ''
        }
        if (item.normal) {
          str = '一致'
        }
        return str
      }
      messageObj.type = array.every(i => { return i.type === 'info' }) ? 'info' : 'danger'
      messageObj.message = message
      messageObj.tableData = array
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
      /*
        1.同层级是否相同值
        2.同层级是否有空值
        3.2个值对比 是否相同
        4.数组 排序 之后再对比
      */
      if (!config.contrastArr || !config.contrastArr.length) {
        config.contrastArr = config.nullArr.map(i => { return i })
      }

      try {
        data = this.sort(data, config.key)
        data2 = this.sort(data2, config.key)
      } catch (error) {
        debugger
      }
      let arr = []

      /* ==================================================================  */
      let repeatArr = []
      let nulltArr = []
      let moreArr = []
      let diffArr = []

      let repeatArr2 = []
      let nulltArr2 = []
      let moreArr2 = []
      let diffArr2 = []


      // 1.同层级 重复
      repeatArr = findRepeat(data) // 测试
      repeatArr2 = findRepeat(data2) // 线上


      // 1.同层级 空值
      nulltArr = findNull(data) // 测试
      nulltArr2 = findNull(data2) // 线上

      console.log(repeatArr, 'xxxxxxxxxxxxx')



      /* ==================================================================  */
      function findRepeat(array) {
        let arr = []
        array.forEach((i, index) => {
          if (index !== array.length - 1) {
            if (i[config.key] === array[index + 1][config.key]) {
              arr.push(i)
            }
          }
        })
        return arr
      }

      function findNull(array) {
        let arr = []
        array.forEach(i => {
          config.nullArr.forEach(item => {
            let porpArr = item.prop.split('.')
            let c = null
            porpArr.forEach((ii, index) => {
              if (index) {
                c = c[ii]
              } else {
                c = i[ii]
              }
            })
            if (c === '') {
              arr.push(item.title)
            }
          })
        })
        return arr
      }



      /* ==================================================================  */


      data.forEach((i) => {
        let obj = {
          path: [],
          key: i[config.key],
          normal: false, // 正常
          errorValue: [], // 同层级 相等
          errorValue2: [], // 同层级 空值
          errorValue3: [], // 数据对比 不相等
          errorValue4: [] // 数据对比 多或者少的
        }
        config.nullArr.forEach(item => {
          let arr = item.prop.split('.')
          debugger
          let ccc = null
          if (item.prop === config.key) {
            config.title = item.title
          }
          arr.forEach((ii, index) => {
            if (!index) {
              ccc = i[ii]
            } else {
              ccc = ccc[ii]
            }
          })
          if (ccc === '') {
            obj.errorValue2.push(`${item.title}错误：空值`)
          }
        })
        if (i[config.key]) {
          if (arr.includes(i[config.key])) {
            if (!obj.errorValue.includes(i[config.key])) {
              obj.errorValue.push(`${config.title}错误：${i[config.key]}重复`)
            }
          } else {
            arr.push(i[config.key])
          }
        }
        if (data2.every(item => {
          return i[config.key] !== item[config.key]
        })) {
          obj.errorValue4.push(`${config.title}错误：${i[config.key]}多了`)
        }
        let i2 = null
        data2.forEach(item => {
          if (i[config.key] === item[config.key]) {
            i2 = item
          }
        })
        config.contrastArr.forEach(key => {
          let arr = key.prop.split('.')
          let ccc = null
          let ccc2 = null
          arr.forEach((ii, index) => {
            if (!index) {
              try {
                ccc = i[ii]
                ccc2 = i2[ii]
              } catch (error) {
                debugger
              }
            } else {
              try {
                ccc = ccc[ii]
                ccc2 = ccc2[ii]
              } catch (error) { }
            }
          })
          try {
            if (String(ccc) !== String(ccc2)) {
              let flag = obj.errorValue4.some(item => { return item.includes(`${i[config.key]}多了`) }) // 含有一个多的对象
              let flag2 = obj.errorValue.some(item => { return item.includes(`${i[config.key]}重复`) }) // 重复的
              if (!flag && !flag2) {
                obj.errorValue3.push(`${key.title}错误：${ccc}不一样`)
              }
            }
          } catch (error) {
          }
        })
        if (config.hasItem(i)) {
          let path2 = path.map(i => { return i })
          path2.push(i[config.key])
          let data3 = i2 ? i2[config.itemPath] : []
          let box2 = this.checkRepace(i[config.itemPath], box, path2, config, data3)
          box = Array.concat(box2)
        }
        if (!obj.errorValue.length && !obj.errorValue2.length && !obj.errorValue3.length && !obj.errorValue4.length) {
          obj.normal = true
        }
        obj.path = path
        obj.pathStr = path.join('>') + i[config.key]
        box.push(obj)
      })
      return box
    },
    test(a, b, c, d) {
    }
  }
}
</script>
