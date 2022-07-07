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
      console.log(`执行${title} 数据统计`)
      // 1.把测试数据  和 线上数据 传给 校验函数
      let tableData = this.resetData()
      // 2.把加工之后的table数据 返回给父级
      this.$emit('callback', tableData)
    },
    checkRepace(trueValue, testValue, pathBox) {
      let box = []
      trueValue.forEach((i, index) => {
        let random = Math.floor(Math.random() * 1000)
        let i2 = testValue[index]
        let config = []
        if (i.type) { // 是组件
          config = this.findConfig(i.type)
          if (!config) {
            return
          }
          if (config.getBox) {
            box = config.getBox(i, i2, pathBox)
          } else {
            let path = pathBox.length ? pathBox.join('>') + '>' + config.title : config.title
            let demo = {
              id: `${config.title}${index}${random}`,
              message: '',
              path: path,
              children: [],
              testValue: '',
              title: config.title,
              trueValue: '',
              normal: false,
              type: ''
            }

            config.configArr.forEach(item => {
              let trueValue = this.getProp(i, item.propArr)
              let testValue = this.getProp(i2, item.propArr)
              let demo2 = {
                id: `${item.title}${index}${random}${index}`,
                message: '',
                path: item.propArr,
                children: [],
                testValue: testValue,
                title: item.title,
                trueValue: trueValue,
                normal: false,
                type: ''
              }

              let obj = this.checkJudgment(item.judgment, trueValue, testValue)

              demo2.normal = obj.type === 'info'
              demo2.type = obj.type
              demo2.message = obj.message
              demo.children.push(demo2)
              if (Object.prototype.toString.call(trueValue) === '[object Array]') {
                demo2.tableData = []
                trueValue.forEach((cc, index2) => {
                  let key = item.key
                  let cc2 = testValue[index2]

                  let demo3 = {
                    id: `${item.title}${index}${random}${index2}`,
                    message: '',
                    key: cc[key],
                    path: item.propArr,
                    children: [],
                    testValue: '',
                    title: item.title,
                    trueValue: '',
                    normal: false,
                    type: 'danger'
                  }
                  item.configArr.forEach(config => {
                    if (cc[config.propArr] !== cc2[config.propArr]) {
                      demo3.trueValue += `${config.title}错误：${cc[config.propArr]}`
                      demo3.testValue += `${config.title}错误：${cc2[config.propArr]}`
                    }
                  })
                  if (!demo3.trueValue && !demo3.testValue) {
                    demo3.trueValue = '一致'
                    demo3.testValue = '一致'
                    demo3.type = 'info'
                    demo3.normal = true
                  }
                  demo2.tableData.push(demo3)
                })
                let flag = demo2.tableData.some(cc => {
                  return cc.type !== 'info'
                })
                demo2.type = flag ? 'danger' : 'info'
                demo2.normal = !flag
              }
            })
            let flag = demo.children.some(cc => {
              return cc.type !== 'info'
            })
            demo.type = flag ? 'danger' : 'info'
            demo.normal = !flag
            box.push(demo)
            // 判断是否 有 子集 组件
            if (i[config.itemStr] && i[config.itemStr].length) {
              pathBox.push(config.title)
              let box2 = this.checkRepace(i[config.itemStr], i2[config.itemStr], pathBox)
              box = box.concat(box2)
            }
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
      return tableData
    },
    checkJudgment(judgment, trueValue, testValue) {
      let message = '正常'
      let type = 'info'
      switch (judgment) {
        case '': // 相同就正常
          if (String(trueValue) !== String(testValue)) {
            message = '错误'
            type = 'danger'
          }
          break
        case 'mustDiff': // 必须不同
          if (String(trueValue) === String(testValue)) {
            message = '错误'
            type = 'danger'
          }
          break
        case 'unsure': // 无论结果 都会告警
          if (String(trueValue) === String(testValue)) {
            message = '警告'
          } else {
            message = '待确认'
          }
          type = 'danger'
          break
        default:
          break
      }
      return {
        type,
        message
      }
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
        demo2.path = item.prop
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
          if (cc[key] !== cc2[key]) {
            demo3.trueValue += `${value}错误：${cc[key]}`
            demo3.testValue += `${value}错误：${cc2[key]}`
          }
        }
        if (!demo3.trueValue && !demo3.testValue) {
          demo3.trueValue = '一致'
          demo3.testValue = '一致'
          demo3.type = 'info'
          demo3.normal = true
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
