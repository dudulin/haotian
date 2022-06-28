<template>
  <div>
    <div style="margin: 15px 0;"></div>
    <el-row>
      <el-col :span="config.span" v-for="config in configs" :key="config.title">
        {{ config.title }}
        <el-select v-model="config.option" placeholder="请选择" style="width:7em;" @change="selectChange">
          <el-option v-for="(value, key) in selectObj" :key="key" :label="value" :value="key">
          </el-option>
        </el-select>
      </el-col>
    </el-row>
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
      value: 'sure',
      checked: [], // 已经勾选内容
      selectObj: {
        unsure: '待确认',
        sure: '已确认',
        ignore: '不涉及'
      },
      configs: [
        {
          span: 3,
          title: '权限位',
          option: 'unsure'
        },
        {
          span: 4,
          title: '接口名称变更',
          option: 'unsure'
        },
        {
          span: 3,
          title: '审批流ID',
          option: 'unsure'
        },
        {
          span: 3,
          title: '字典',
          option: 'unsure'
        },
        {
          span: 4,
          title: '审批流配置',
          option: 'unsure'
        },
        {
          span: 3,
          title: '新增角色',
          option: 'unsure'
        },
        {
          span: 4,
          title: '系统数据源申请',
          option: 'unsure'
        }
      ]
    }
  },
  methods: {
    selectChange() {
      // 1.把测试数据  和 线上数据 传给 校验函数
      let tableData = this.resetData()
      // 2.把加工之后的table数据 返回给父级
      this.$emit('callback', tableData, true)
    },
    resetData() {
      let tableData = []
      this.configs.forEach(i => {
        let memo = this.selectObj[i.option]
        let obj = {
          title: i.title,
          option: i.option,
          memo: memo
        }
        tableData.push(obj)
      })
      return tableData
    }
  }
}
</script>
