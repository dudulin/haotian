<template>
  <div>
    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
    <div style="margin: 15px 0;"></div>
    <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
      <el-checkbox v-for="city in cities" :label="city" :key="city">{{ city }}</el-checkbox>
    </el-checkbox-group>
  </div>
</template>
<script>
const cityOptions = ['数据源地址', '命名空救', '接口名称']
export default {
  data() {
    return {
      checkAll: false,
      checkedCities: ['数据源地址', '命名空救', '接口名称'],
      cities: cityOptions,
      isIndeterminate: true
    }
  },
  methods: {
    handleCheckAllChange(val) {
      this.checkedCities = val ? cityOptions : []
      this.isIndeterminate = false
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length
      this.checkAll = checkedCount === this.cities.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length
    },
    checkData(title) {
      console.log(`执行${title} 数据统计`)
      this.$emit('pageCallback', [15, 54, 6])
    }
  }
}
</script>
