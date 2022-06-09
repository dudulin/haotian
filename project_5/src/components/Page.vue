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
      checked: ['审批流ID', '含有test'], // 已经勾选内容
      config: [
        { // 所有的配置参数
          reg: /"templateId":"(.*?)"/gm, // 获取值的正则表达式
          title: '审批流ID', // 标题
          demo: `"templateId":"518"` // 模板 参考使用
        },
        { // 所有的配置参数
          reg: /testbop|testvenus/gm, // 获取值的正则表达式
          title: '含有test', // 标题
          demo: `"testvenus":"testbop"` // 模板 参考使用
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
      console.log(`执行${title} 数据统计`)
      // 1.把测试数据  和 线上数据 传给 校验函数
      let tableData = this.resetData()
      // 2.把加工之后的table数据 返回给父级
      this.$emit('callback', tableData)
    },
    resetData() {
      let checked = this.checked
      let trueValue = this.trueValue
      let testValue = this.testValue

      /*  1.遍历需要获取的参数
          2.根据正则表达式 分别获取 测试 和 线上
          3.生成对应数据 返回
      */
      let tableData = []
      this.config.forEach(i => {
        if (checked.includes(i.title)) {
          console.log(i.title)
          let testArr = testValue.match(i.reg)
          let trueArr = trueValue.match(i.reg)
          try {
            testArr = testArr.map(str => {
              i.reg.lastIndex = 0
              let c = i.reg.exec(str)
              return c[1]
            })
            trueArr = trueArr.map(str => {
              i.reg.lastIndex = 0
              let c = i.reg.exec(str)
              return c[1]
            })
          } catch (e) { }
          console.log(testArr, trueArr)
          tableData.push({
            title: i.title,
            key: i.title,
            testValue: !testArr ? [] : testArr,
            trueValue: !trueArr ? [] : trueArr,
            message: '',
            type: ''
          })
        }
      })
      return this.messageReset(tableData)
    },
    messageReset(tableData) {
      tableData.forEach(i => {
        let normal = true
        let message = '正常'
        let type = 'info'
        switch (i.title) {
          case '审批流ID':
            normal = i.testValue.every(item => {
              return !i.trueValue.includes(item)
            })
            if (!normal) {
              message = '测试一下效果'
              type = 'danger'
            }
            break
          case '含有test':
            normal = !i.trueValue.length

            if (!normal) {
              message = '线上数据含有test数据'
              type = 'danger'
            }
            break
          default:
            break
        }
        i.message = message
        i.type = type
        i.normal = normal
        i.testValue = i.testValue.join(',')
        i.trueValue = i.trueValue.join(',')
      })
      return tableData
    }
  }
}
</script>
