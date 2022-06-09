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
        i.normal = true
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
        function resetNullarr(propArr, titleArr) {
          let arr = propArr.map((i, index) => {
            return {
              prop: i,
              title: titleArr[index]
            }
          })
          return arr
        }

        i.id = `${i.title}${index}${random}`
        switch (true) {
          case i.title.includes('pb入参'):
            this.changPb(i, config, messageObj)
            break
          case i.title.includes('pb出参'):
            this.changPb(i, config, messageObj)
            break
          case i.title.includes('入参信息'):
            config.itemPath = 'items'
            config.nullArr = []
            config.contrastArr = resetNullarr(['name', 'text', 'defacementParam.defacement', 'defacementParam.reqParamNameMapping'], ['参数名称', '参数文本描述', '是否防串包', '请求属性名称映射'])
            config.hasItem = (item) => { return item.hasItems }
            this.changPb(i, config, messageObj)
            break
          case i.title.includes('xml请求参数配置'):
            config.key = 'nodeName'
            config.itemPath = 'nodes'
            config.nullArr = resetNullarr(['nodeName', 'paramNameMapping', 'emptyNoSendFlag'], ['节点名称', '参数名称映射', '为空不传'])
            config.hasItem = (item) => { return item.hasNodes }
            this.changPb(i, config, messageObj)
            break
          case i.title.includes('添加cookie配置'):
            config.key = 'paramName'
            config.nullArr = resetNullarr(['paramName', 'cookieParam'], ['请求参数名', 'cookie参数名'])
            config.hasItem = () => { return false }
            this.changPb(i, config, messageObj)
            break
          case i.title.includes('特殊参数编码'):
            config.key = 'paramName'
            config.nullArr = resetNullarr(['paramName', 'charsetEncoding', 'decode'], ['参数名', '编码方式', 'Decode'])
            config.hasItem = () => { return false }
            this.changPb(i, config, messageObj)
            break
          case i.title.includes('加密参数'):
            config.nullArr = resetNullarr(['paramName', 'type', 'key', 'encryptRule'], ['参数名', '加密类型', 'key', '加密规则'])
            config.key = 'paramName'
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
          case i.title.includes('定制多条'):
            config.nullArr = resetNullarr(['name', 'key', 'signRule', 'encryptType', 'upperCase', 'trimSpace', 'keyInSort', 'charsetEncoding', 'keySysSignSetting.isKeySysSign', 'keySysSignSetting.keyId', 'keySysSignSetting.encAlgo'], ['参数名称', 'key', '签名规则', '加密算法', '大写转换', '是否去空', 'key是否参与ascii排序', 'charsetEncoding', '是否密钥系统签名', '密钥系统KeyId', '算法版本'])
            config.hasItem = () => { return false }
            this.changPb(i, config, messageObj)
            break
          // 出参配置
          case i.title.includes('出参信息配置'):
            config.itemPath = 'items'
            config.nullArr = resetNullarr(['name', 'text', 'defacementParam.defacement', 'defacementParam.reqParamNameMapping'], ['参数名称', '参数文本描述', '是否防串包', '请求属性名称映射'])
            config.hasItem = (i) => { return i.hasItems }
            this.changPb(i, config, messageObj)
            break

          case i.title.includes('需解密字段'):
            config.key = 'paramName'
            config.nullArr = resetNullarr(['paramName', 'type', 'decryptRule', 'key'], ['字段名', '解密类型', '解密规则', 'key'])
            config.hasItem = () => { return false }
            this.changPb(i, config, messageObj)
            break

          case i.title.includes('二进制转换'):
            config.key = 'paramName'
            config.nullArr = resetNullarr(['paramName', 'index'], ['参数名', '二进制位'])
            config.hasItem = () => { return false }
            this.changPb(i, config, messageObj)
            break

          case i.title.includes('二次分割参数'):
            config.key = 'seqName'
            config.nullArr = resetNullarr(['seqName', 'secondFormatType', 'charset'], ['参数名称', '解析格式', '解码方式'])
            config.hasItem = () => { return false }
            this.changPb(i, config, messageObj)
            break
          // 审计日志配置
          case i.title.includes('日志入参配置xxx') || i.title.includes('日志出参配置xxx'):
            config.key = 'auditlogKey'
            config.nullArr = resetNullarr(['auditlogKey', 'auditlogVal'], ['接口参数名称', '审计参数名称'])
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
        if (i.type !== 'info') {
          i.normal = false
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
      // let arr2 = this.checkRepace(i.trueValue, [], [], config, i.testValue) // 线上环境数据
      console.log(arr, 'arr')
      if (!config.key) { // 字符串类型
        arr = this.checkRepace2(i.testValue, i.trueValue) // 测试环境数据
        // arr2 = this.checkRepace2(i.trueValue, i.testValue) // 线上环境数据
      }

      if (config.key) {
        // i.testValue = i.testValue.map(item => { return item[config.key] })
        // i.trueValue = i.trueValue.map(item => { return item[config.key] })
      }
      let array = []
      arr.forEach(i => {
        array.push(returnObj(i))
      })
      console.log(array, 'array')

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
        if (config.hasItem(i)) {
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
                console.log(e, 'error')
              }
            } else {
              try {
                value1 = value1[i]
                value2 = value2[i]
              } catch (e) {
                console.log(e, 'error')
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
        array.forEach((i, index) => {
          if (index !== array.length - 1) {
            if (i[config.key] === array[index + 1][config.key]) {
              arr.push(i)
            }
          }
        })
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
    test(a, b, c, d) {
    }
  }
}
</script>
