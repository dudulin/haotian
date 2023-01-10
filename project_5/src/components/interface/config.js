let config = [
  {
    title: '入参配置表',
    judgment: 'normal',
    memo: '说明的内容',
    isArray: false,
    property: '',
    itmeKey: '',
    row: [
      {
        title: '入参',
        judgment: 'normal', /* 待确认：unsure    警告：warning  正常： normal */
        isArray: true,
        property: 'frequestParam.inputParams',
        itmeKey: 'items',
        hasItem: 'hasItems',
        itemConfig: [
          { prop: 'name', title: '参数名称' },
          { prop: 'text', title: '文本描述' },
          { prop: 'sendAuthLogParam.isSendAuthLog', title: '上报审计' },
          { prop: 'sendAuthLogParam.paramName', title: '审计参数' }
        ],
        row: []
      }
    ]
  }
]

function getTableConfig(data) {
  console.log(data, 'data')
  return config
}

export default getTableConfig
