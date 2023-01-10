
/* 待确认：unsure    警告：warning  正常： normal */
let demo = {
  title: 'xxxx',
  judgment: 'normal',
  property: 'xxxx',
  arrayConfig: {
    itemKey: 'xxxx',
    hasItem: () => { return false },
    itmeConfig: [
      { prop: 'name', title: '参数名称' },
      { prop: 'text', title: '文本描述' },
      { prop: 'aa.bb', title: '个人信息' }
    ]
  },
  row: []
}
console.log(demo)
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
      }
    ]
  }
]

function getTableConfig(data) {
  return config
}

export default getTableConfig
