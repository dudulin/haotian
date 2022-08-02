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
import config from './pageConfig.js'
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
      checked: ['页面组件校验', '含有test'], // 已经勾选内容
      config: [
        { // 所有的配置参数
          title: '页面组件校验'
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
    checkRepace(trueValue, testValue, pathBox) {
      let box = []
      trueValue.forEach((i, index) => {
        let i2 = testValue[index]
        let config = []
        if (i.type) { // 是组件
          config = this.findConfig(i.type)
          if (!config) {
            return
          }
          if (config.getBox) {
            box = box.concat(config.getBox(i, i2, pathBox))
          }
        }
      })
      return box
    },
    resetData() {
      let trueValue = []
      let testValue = []
      try {
        trueValue = JSON.parse(this.trueValue)
      } catch (error) {
        this.$notify.error({
          title: '错误',
          message: '线上环境导入数据有误'
        })
        return
      }
      try {
        testValue = JSON.parse(this.testValue)
      } catch (error) {
        this.$notify.error({
          title: '错误',
          message: '测试环境导入数据有误'
        })
        return
      }
      let tableData = this.checkRepace(trueValue, testValue, [])
      tableData = this.checkType(tableData)
      return tableData
    },
    checkType(data) {
      data.forEach(i => {
        let message = '正常'
        let type = 'info'
        switch (i.judgment) {
          case 'mustDiff': // 必须不同
            if (String(i.testValue) === String(i.trueValue)) {
              message = '错误'
              type = 'danger'
            }
            break
          case 'unsure': // 无论结果 都会告警
            if (String(i.testValue) === String(i.trueValue)) {
              message = '警告'
            } else {
              message = '待确认'
            }
            type = 'danger'
            break
          default: // 相同就正常
            if (String(i.testValue) !== String(i.trueValue)) {
              message = '错误'
              type = 'danger'
            }
            break
        }
        i.trueValue = this.changeValue(i.trueValue)
        i.testValue = this.changeValue(i.testValue)

        console.log(i, 222222)
        if (i.option) { // 转义功能
          i.trueValue = i.option[i.trueValue]
          i.testValue = i.option[i.testValue]
        }
        if (i.children && i.children.length) {
          i.children = this.checkType(i.children)
          if (!i.children.every(item => { return item.type === 'info' })) {
            message = '待确认'
            type = 'danger'
          }
        }
        i.type = type
        i.normal = i.type === 'info'
        i.message = message
      })
      return data
    },
    changeValue(data) {
      let data2 = ''
      data2 = data === 'true' ? true : data
      data2 = data === 'false' ? false : data

      switch (Object.prototype.toString.call(data)) {
        case '[object Array]':
          data2 = data.map(item => {
            return JSON.stringify(item)
          }).join(',')
          break
        case '[object Boolean]':
          data2 = data ? '是' : '否'
          break
        case '[object String]':
          data2 = !data ? '---------' : data
          break
        case '[object Undefined]':
          data2 = '======='
          break
        default:
          break
      }
      return data2
    },
    getworkOrder() {
      let demo = {
        title: '是否选择工单',
        prop: 'workOrder',
        option: {
          1: '系统签入工单',
          2: '自选工单',
          3: '关联工单'
        }
      }
      return demo
    },
    getCondition() {
      let demo = {
        key: 'name',
        prop: 'condition',
        title: '数据库',
        arrayConfig: {
          name: '数据库名',
          property: '属性',
          require: '是否必须'
        }
      }
      return demo
    },
    getProp(data, propArr) {
      let value = null
      let arr = propArr.split('.')
      arr.forEach((i, index) => {
        if (!index) {
          value = data[i]
        } else {
          value = value[i]
        }
      })
      return value
    },
    getDemo() {
      let random = Math.floor(Math.random() * 1000)
      let random2 = Math.floor(Math.random() * 1000)
      let demo = {
        id: `${random}_${random2}`,
        title: '',
        message: '',
        key: '',
        path: '',
        children: [],
        testValue: '',
        trueValue: '',
        normal: true,
        type: 'info'
      }
      return demo
    },
    getDemoBase(title, pathBox) {
      let demo = this.getDemo()
      demo.title = title
      let path = pathBox.length ? pathBox.join('>') + '>' + title : title
      demo.path = path
      return demo
    },
    getChildren(i, i2, arr) {
      let box = []
      arr.forEach(item => {
        let demo2 = this.getDemo()
        demo2.title = item.title
        demo2.judgment = item.judgment
        demo2.path = item.prop
        demo2.option = item.option
        demo2.trueValue = this.getProp(i, item.prop)
        demo2.testValue = this.getProp(i2, item.prop)
        if (item.arrayConfig) { // 数组类型
          demo2.tableData = this.getArray(i[item.prop], i2[item.prop], item)
        }
        box.push(demo2)
      })
      return box
    },
    getArray(trueValue, testValue, item) {
      let array = []
      trueValue.forEach((cc, index2) => {
        let cc2 = testValue[index2]
        let demo3 = this.getDemo()
        demo3.key = cc[item.key]
        demo3.path = item.prop
        for (let [key, value] of Object.entries(item.arrayConfig)) {
          try {
            // eslint-disable-next-line
            cc[key]
          } catch (error) {
            demo3.testValue = `${cc2[item.key]}错误：测试多的数据`
          }
          try {
            if (cc[key] !== cc2[key]) {
              demo3.trueValue += `${value}错误：${cc[key]}`
              demo3.testValue += `${value}错误：${cc2[key]}`
            }
          } catch (error) {
            demo3.trueValue = `${cc[item.key]}线上多的数据`
          }
        }
        if (!demo3.trueValue && !demo3.testValue) {
          demo3.trueValue = '一致'
          demo3.testValue = '一致'
          demo3.type = 'info'
          demo3.normal = true
        } else {
          demo3.type = 'danger'
          demo3.normal = false
        }
        array.push(demo3)
      })
      return array
    },
    checkHasChildren(trueValue, testValue, pathBox, key) {
      let box = []
      if (trueValue && trueValue.length) {
        pathBox.push(key)
        box = this.checkRepace(trueValue, testValue, pathBox)
      }
      return box
    },
    findConfig(key) { // 获取组件对应配置
      const that = this
      let box = config.getConfig(key, that)
      return box
    }
  }
}
</script>
