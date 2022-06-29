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
        let testValueObj = testValue[index]
        let config = []
        if (i.type) { // 是组件
          config = this.findConfig(i.type)
          if (!config) {
            return
          }
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
            let testValue = this.getProp(testValueObj, item.propArr)
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
            let message = '正常'
            let type = 'info'
            switch (item.judgment) {
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
            demo2.normal = type === 'info'
            demo2.type = type
            demo2.message = message
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
            let box2 = this.checkRepace(i[config.itemStr], testValueObj[config.itemStr], pathBox)
            box = box.concat(box2)
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
    findConfig(key) { // 获取组件对应配置
      let config = {}
      switch (key) {
        case 'rowBlock':
          config = {
            title: '横向排列',
            path: 'rowBlock',
            itemStr: 'items',
            configArr: [
              {
                propArr: 'useReduce',
                title: '紧缩模式'
              }
            ]
          }
          break
        case 'isInput':
          config = {
            title: '输入框',
            path: 'isInput',
            itemStr: '',
            configArr: [
              {
                propArr: 'changeUid',
                title: '使用帐号转换工具'
              },
              {
                propArr: 'convertToOrder',
                title: '单号转换工具'
              },
              {
                propArr: 'workOrder',
                title: '选择工单类型'
              },
              {
                propArr: 'linkeFlag',
                title: '关联工单标识'
              },
              {
                propArr: 'useReg',
                title: '使用正则校验'
              },
              {
                propArr: 'moneyChange',
                title: '元转分'
              },
              {
                propArr: 'supportThousands',
                title: '支持千分位'
              },
              {
                propArr: 'label',
                title: '标题'
              },
              {
                propArr: 'defaultValue',
                title: '默认值'
              },
              {
                propArr: 'width',
                title: '输入框宽度'
              },
              {
                propArr: 'maxlength',
                title: '输入长度限制'
              },
              {
                propArr: 'labelWidth',
                title: '标题宽度'
              },
              {
                propArr: 'placeholder',
                title: '提示文字'
              },
              {
                propArr: 'isTextarea',
                title: '使用文本输入框(大)'
              }
            ]
          }
          break
        case 'isRadio':
          config = {
            title: '单选框',
            path: 'isRadio',
            itemStr: '',
            configArr: [
              {
                propArr: 'items',
                key: 'value',
                configArr: [
                  {
                    propArr: 'value',
                    title: '选项'
                  },
                  {
                    propArr: 'label',
                    title: '对应值'
                  }
                ],
                title: '对应选项'
              },
              {
                propArr: 'value',
                title: '默认选中值'
              },
              {
                propArr: 'style',
                title: '标题'
              }
            ]
          }
          break
        case 'tabs':
          config = {
            title: 'Tabs标签页',
            path: 'tabs',
            itemStr: 'items',
            getProp(trueValue, testValue) { // 返回数组 {prop:'label',title:'tab名称',value:'123'}
              // 参数 属性  状态 备注
              // children Array ：参数  属性 测试数据 线上 数据 校验结果  状态  备注
              let arr = []
              let children = []
              data.data.forEach(i => {
                arr.push({
                  prop: 'label',
                  title: 'tab名称',
                  value: i.label,
                  judgment: ''
                })
                if (i.items && i.items.length) {

                }
              })
            },
            getChildren(data) { // 返回数组 传给 demo2

            },
            configArr: [
              {
                propArr: 'data',
                title: 'tab ',
                key: 'label',
                configArr: [
                  {
                    propArr: 'label',
                    title: 'tab名称 '
                  }
                ]
              }
            ]
          }
          break
        case 'ccc':
          config = {
            title: 'demo1111',
            path: 'rowBlock',
            itemStr: '',
            configArr: [
              {
                propArr: 'xxx',
                title: 'xxxx'
              }
            ]
          }
          break
        case '222':
          config = {
            title: 'demo1111',
            path: 'rowBlock',
            itemStr: '',
            configArr: [
              {
                propArr: 'xxx',
                title: 'xxxx'
              }
            ]
          }
          break
        default:
          config = null
          break
      }
      if (config) {
        config.configArr.forEach(i => {
          if (!i.judgment) {
            i.judgment = ''
          }
        })
      }
      return config
    }
  }
}
</script>
