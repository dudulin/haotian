



let config = [
  {
    "title": "入参配置表",
    "judgment": "normal",
    "isArray": false,
    "property": "",
    "itmeKey": "",
    "row": [
      {
        "title": "入参",
        "judgment": "normal", /* 待确认：unsure    警告：warning  正常： normal */
        "isArray": true,
        "property": "frequestParam.inputParams",
        "itmeKey": "items",
        "hasItem": "hasItems",
        "itemConfig": [
          { prop: 'name', title: '参数名称' },
          { prop: 'text', title: '文本描述' },
          { prop: 'sendAuthLogParam.isSendAuthLog', title: '上报审计' },
          { prop: 'sendAuthLogParam.paramName', title: '审计参数' }
        ],
        "row": []
      }
    ]
  }
]

let data = {
  "inputParams": [
    {
      "name": "名称1",
      "text": "描述1",
      "hasItems": false,
      "sendAuthLogParam": {
        "isSendAuthLog": true,
        "paramName": "2"
      },
      "items": []
    },
    {
      "name": "aa",
      "text": "a1",
      "sendAuthLogParam": {
        "isSendAuthLog": false,
        "paramName": ""
      },
      "hasItems": false,
      "items": []
    },
    {
      "name": "bb",
      "text": "b1",
      "sendAuthLogParam": {
        "isSendAuthLog": true,
        "paramName": "cc"
      },
      "hasItems": false,
      "items": []
    }
  ],
}
