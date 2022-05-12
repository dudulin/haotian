<template>
  <div>
    <el-checkbox :indeterminate="isAll" v-model="checkAll" @change="btnAll">全选</el-checkbox>
    <div style="margin: 15px 0;"></div>
    <el-checkbox-group v-model="checkConfig" @change="btnCheckBox">
      <el-checkbox v-for="city in allConfig" :label="city" :key="city">{{ city }}</el-checkbox>
    </el-checkbox-group>
  </div>
</template>
<script>
export default {
  props: {
    testValueCopy: {
      type: [String, Object],
      default: () => {
        return ''
      }
    },
    trueValueCopy: {
      type: [String, Object],
      default: () => {
        return ''
      }
    }
  },
  data() {
    return {
      checkAll: false,
      checkConfig: ['审批流ID', '文件上传路径', '接口名称'],
      allConfig: ['审批流ID', '文件上传路径', '接口名称'],
      isAll: true
    }
  },
  methods: {
    btnAll(val) {
      this.checkConfig = val ? this.allConfig : []
      this.isAll = false
    },
    btnCheckBox(value) {
      let checkedCount = value.length
      this.checkAll = checkedCount === this.allConfig.length
      this.isAll = checkedCount > 0 && checkedCount < this.allConfig.length
    },
    checkData(title) {
      console.log(`执行${title} 数据统计`)
      this.$emit('callback', [15, 54, 6, this.trueValueCopy])
    }
  }
}
</script>
