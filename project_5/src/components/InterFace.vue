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
        path: 'protobufConfig.protobufResponseConfig.bodyParams'
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
      let trueValue = JSON.parse(this.trueValue)
      let testValue = JSON.parse(this.testValue)

      /*  1.遍历需要获取的参数
          2.根据正则表达式 分别获取 测试 和 线上
          3.生成对应数据 返回
      */
      let tableData = []
      this.config.forEach(i => {
        if (checked.includes(i.title)) {
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
            message: '',
            type: ''
          })
        }
      })
      return this.messageReset(tableData, trueValue, testValue)
    },
    messageReset(tableData, trueValue, testValue) {
      tableData.forEach(i => {
        let normal = true
        let message = '正常'
        let type = 'info'
        let config = {}
        switch (i.title) {
          case '数据源地址':
            normal = i.testValue !== i.trueValue
            if (!normal) {
              message = '数据源地址没有修改'
              type = 'danger'
            }
            break
          case '命名空间':
            normal = i.testValue === i.trueValue
            if (!normal && !!i.testValue & !!i.trueValue) {
              message = '相同系统下的命名空间应该一样'
              type = 'warning'
            }
            if (trueValue.fprotocol !== '6' && trueValue.fprotocol !== '4' && trueValue.fprotocol !== '7') {
              i.trueValue = '协议不是 Fable-PB'
            }
            if (testValue.fprotocol !== '6' && testValue.fprotocol !== '4' && testValue.fprotocol !== '7') {
              i.testValue = '协议不是 Fable-PB'
            }
            break
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
            break
        }
        i.message = message
        i.type = type
        try {
          i.testValue = i.testValue.join(',')
          i.trueValue = i.trueValue.join(',')
        } catch (error) { }
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
