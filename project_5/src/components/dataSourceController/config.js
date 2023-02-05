
/* 待确认：unsure    警告：warning  正常： normal */
// let demo = {
//   title: 'xxxx',
//   judgment: 'normal',
//   property: 'xxxx',
//   arrayConfig: {
//     itemKey: 'xxxx',
//     hasItem: () => { return false },
//     itmeConfig: [
//       { prop: 'name', title: '参数名称' },
//       { prop: 'text', title: '文本描述' },
//       { prop: 'aa.bb', title: '个人信息' }
//     ]
//   },
//   row: []
// }
let config = [
  {
    title: '接口配置表',
    judgment: 'normal',
    property: '',
    row: [
      {
        title: '返回数据类型',
        judgment: 'normal',
        property: 'settingWrapper.apiSetting.resultDataType',
        row: []
      },
      {
        title: '层级定位',
        judgment: 'normal',
        property: 'settingWrapper.apiSetting.layerSetting.isLayer',
        row: [{
          title: '解析层级',
          judgment: 'normal',
          property: 'settingWrapper.apiSetting.layerSetting.layerValue',
          row: []
        }]
      },
      {
        title: '组合配置',
        judgment: 'normal',
        property: '',
        row: [
          {
            title: '序号',
            judgment: 'normal',
            property: 'settingWrapper.apiSetting.sequence',
            row: []
          },
          {
            title: '别名',
            judgment: 'normal',
            property: 'settingWrapper.apiSetting.alias',
            row: []
          }
        ]
      },
      {
        title: '开启条件判断',
        judgment: 'normal',
        property: 'settingWrapper.apiSetting.conditionSetting.isCondition',
        row: [{
          title: '参数',
          judgment: 'normal',
          property: 'settingWrapper.apiSetting.conditionSetting.conditionList',
          arrayConfig: {
            hasItem(i) { return false },
            itmeConfig: [
              { prop: 'paramName', title: '参数名称' },
              { prop: 'conditionOperateType', title: '条件操作项' },
              { prop: 'conditionOperateValue', title: '条件操作值' },
              { prop: 'triggerOperateType', title: '满足条件触发' }
            ]
          }
        }]
      },
      {
        title: '批量配置',
        judgment: 'normal',
        property: 'settingWrapper.apiSetting.batchSetting.isBatchCall',
        row: [
          {
            title: '批量调用字段',
            judgment: 'normal',
            property: 'settingWrapper.apiSetting.batchSetting.batchParamName'
          },
          {
            title: '是否2个批量',
            judgment: 'normal',
            property: 'settingWrapper.apiSetting.batchSetting.splitArr'
          },
          {
            title: '分割符号',
            judgment: 'normal',
            property: 'settingWrapper.apiSetting.batchSetting.splitSymbols'
          },
          {
            title: '分割属性名称',
            judgment: 'normal',
            property: 'settingWrapper.apiSetting.batchSetting.splitParamNames'
          },
          {
            title: '忽略错误提示',
            judgment: 'normal',
            property: 'settingWrapper.apiSetting.batchSetting.isIgnoreErrorTip'
          },
          {
            title: '最大长度限制',
            judgment: 'normal',
            property: 'settingWrapper.apiSetting.batchSetting.maxLengthLimit'
          }
        ]
      },
      {
        title: '密钥系统签名',
        judgment: 'normal',
        property: 'settingWrapper.apiSetting.keySysSignSetting.isKeySysSign',
        row: [
          {
            title: '签名参数名称',
            judgment: 'normal',
            property: 'settingWrapper.apiSetting.keySysSignSetting.signParamName'
          },
          {
            title: '系统KeyId',
            judgment: 'normal',
            property: 'settingWrapper.apiSetting.keySysSignSetting.keyId'
          },
          {
            title: '算法版本',
            judgment: 'normal',
            property: 'settingWrapper.apiSetting.keySysSignSetting.encAlgo'
          },
          {
            title: '序号',
            judgment: 'normal',
            property: 'settingWrapper.apiSetting.keySysSignSetting.keySeq'
          },
          {
            title: '使用标准国密',
            judgment: 'normal',
            property: 'settingWrapper.apiSetting.keySysSignSetting.isUseStd'
          },
          {
            title: '编码',
            judgment: 'normal',
            property: 'settingWrapper.apiSetting.keySysSignSetting.charset'
          },
          {
            title: '签名规则',
            judgment: 'normal',
            property: 'settingWrapper.apiSetting.keySysSignSetting.signRule'
          },
          {
            title: '去空',
            judgment: 'normal',
            property: 'settingWrapper.apiSetting.keySysSignSetting.trimSpace'
          },
          {
            title: '添加时间戳',
            judgment: 'normal',
            property: 'settingWrapper.apiSetting.keySysSignSetting.addTimestamp'
          },
          {
            title: '时间戳名称',
            judgment: 'normal',
            property: 'settingWrapper.apiSetting.keySysSignSetting.timestampName'
          },
          {
            title: '时间戳长度',
            judgment: 'normal',
            property: 'settingWrapper.apiSetting.keySysSignSetting.timestampSize'
          }
        ]
      },
      {
        title: '密钥验证签名',
        judgment: 'normal',
        property: 'settingWrapper.apiSetting.validSignSetting.isKeySysValidSign',
        row: [
          {
            title: '签名参数名称',
            judgment: 'normal',
            property: 'settingWrapper.apiSetting.validSignSetting.signParamName'
          },
          {
            title: '系统KeyId',
            judgment: 'normal',
            property: 'settingWrapper.apiSetting.validSignSetting.keyId'
          },
          {
            title: '算法版本',
            judgment: 'normal',
            property: 'settingWrapper.apiSetting.validSignSetting.encAlgo'
          },
          {
            title: '签名规则',
            judgment: 'normal',
            property: 'settingWrapper.apiSetting.validSignSetting.signRule'
          },
          {
            title: '去空',
            judgment: 'normal',
            property: 'settingWrapper.apiSetting.validSignSetting.trimSpace'
          },
          {
            title: '添加时间戳',
            judgment: 'normal',
            property: 'settingWrapper.apiSetting.validSignSetting.addTimestamp'
          },
          {
            title: '时间戳名称',
            judgment: 'normal',
            property: 'settingWrapper.apiSetting.validSignSetting.timestampName'
          },
          {
            title: '时间戳长度',
            judgment: 'normal',
            property: 'settingWrapper.apiSetting.validSignSetting.timestampSize'
          }
        ]
      }
    ]
  },
  {
    title: '入参配置',
    judgment: 'normal',
    property: '',
    row: [
      {
        title: '参数',
        judgment: 'normal',
        property: 'settingWrapper.requestSetting.requestParamList',
        arrayConfig: {
          hasItem(i) { return false },
          itmeConfig: [
            { prop: 'isShow', title: '是否显示' },
            { prop: 'transeferParam.isTransfer', title: '字典转义' },
            { prop: 'transeferParam.dictRepositoryName', title: '字典仓库' },
            { prop: 'transeferParam.isMoreTransfer', title: '多重转义' },
            { prop: 'productParam.isProduct', title: '乘积' },
            { prop: 'productParam.productMultiplier', title: '乘积倍数' },
            { prop: 'xxx', title: 'yyyy' },
            { prop: 'xxx', title: 'yyyy' },
            { prop: 'xxx', title: 'yyyy' },
            { prop: 'xxx', title: 'yyyy' },
            { prop: 'xxx', title: 'yyyy' },
            { prop: 'xxx', title: 'yyyy' },
            { prop: 'xxx', title: 'yyyy' },
            { prop: 'xxx', title: 'yyyy' },
            { prop: 'xxx', title: 'yyyy' },
            { prop: 'xxx', title: 'yyyy' },
            { prop: 'xxx', title: 'yyyy' },
            { prop: 'xxx', title: 'yyyy' },
            { prop: 'xxx', title: 'yyyy' },
          ]
        }
      }
    ]
  }
]

function getTableConfig(data) {
  return config
}

export default getTableConfig
