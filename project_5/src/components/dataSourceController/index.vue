<template>
  <div> </div>
</template>

<script>
import getTableConfig from './config.js'
import Tools from '../../common/js/tools'
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
      config: [],
      tableDemo: {
        id: '', // 渲染需要
        title: '', // 名称
        message: '', // 校验结果
        normal: '', // 是否异常
        path: '', // 属性路径
        tableData: '', // ？？？
        testValue: '', // 测试数据
        testValueStr: '', // 测试数据--字符串
        trueValue: '', // 线上数据
        trueValueStr: '', // 线上数据--字符串
        type: '', // 校验规则
        children: [] // 子级数据
      },
      box: [],
      baseDemo: {
      }
    }
  },
  methods: {
    checkData(title) { // 第一个执行的函数
      // 1.把测试数据  和 线上数据 传给 校验函数

      let testValue = JSON.parse(this.testValue)
      let trueValue = JSON.parse(this.trueValue)
      testValue = JSON.parse(testValue.fvalue)
      trueValue = JSON.parse(trueValue.fvalue)

      let box = this.getSourceData(testValue.atomDatasourceInterfaceWrapList, [], [], trueValue.atomDatasourceInterfaceWrapList)
      box.forEach(i => {
        i.property = Tools.resetTitle(i.property)
      })
      this.box = box
      this.resetData()

      this.$emit('callback', this.box)
    },
    getSourceData(arr, box = [], path = [], arr2) {
      arr.forEach((i, index) => {
        let obj = {}
        obj.testValue = i
        obj.trueValue = arr2[index]
        obj.property = path.map(item => { return item })
        obj.property.push(i.name)
        box.push(obj)
        if (i.items && i.items.length) {
          let path2 = path.map(i => { return i })
          path2.push(i.name)
          let box2 = this.getSourceData(i.items, [], path2, obj.trueValue.items)
          box = Array.concat(box, box2)
        }
      })
      return box
    },
    resetData() {
      this.box.forEach(i => {
        let config = getTableConfig(this.testValue) // 获取配置规则
        let baseData = this.getTestAndTrue(config, i) // 获取 对应在值
        i.tableData = this.setTableMessage(baseData) // 根据规则 和 对应值  生成 table 数据
      })
    },
    setTableMessage(data) { // 把获取到对应的数据，根据本身的 规则校验
      //   normal: '', // 是否异常
      //   id: '', // 渲染需要
      //   message: '', // 校验结果
      //   tableData: '', // ？？？
      //   children: [] // 子级数据
      // }
      data = data.map((i, index) => {
        if (i.arrayConfig) { // 数组 加工
          let messageObj = Tools.getArray(i)
          i.message = messageObj.message
          i.type = messageObj.type
          i.message = messageObj.message
          i.normal = messageObj.normal
          i.tableData = messageObj.tableData
        } else { // 单个属性 加工
          i = Tools.checkJudgment(i)
        }
        if (i.row && i.row.length) { // 子级 加工
          i.row = this.setTableMessage(i.row)
          i.type = i.row.every(item => { return item.type === 'info' }) ? 'info' : 'danger'
          i.normal = i.type === 'info'
          i.message = i.normal ? '正常' : '待确认'
        }
        let random = Math.random()
        i.id = `${i.title}${index}${random}`
        return i
      })
      return data
    },
    getTestAndTrue(tableData, item) { // 1.全部数据的获取--测试&线上
      let testValue = item.testValue
      let trueValue = item.trueValue

      tableData.forEach(i => {
        // {
        //   title: '', // 名称
        //   path: '', // 属性路径
        //   testValue: '', // 测试数据
        //   trueValue: '', // 线上数据
        //   type: '', // 校验规则
        let propArray = [] // 属性数组
        if (i.property) {
          propArray = i.property.split('.')
        }
        i.testValue = Tools.getObject(testValue, propArray)
        i.trueValue = Tools.getObject(trueValue, propArray)

        if (i.row && i.row.length) { // 子级加工
          i.row = this.getTestAndTrue(i.row, item)
        }
      })
      return tableData
    }
  }
}
</script>
