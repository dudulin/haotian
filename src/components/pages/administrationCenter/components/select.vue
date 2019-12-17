<template>
  <div style="display:inline-block;">
    <span class="myLabel">{{title}}</span>
    <el-select style="font-weight:700;" v-model="value" class="hasLabel" clearable placeholder="请选择" @change="selectChange">
      <el-option v-for="item in selectData" :key="item.value" :label="item.label" :value="item.value" ></el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  props: {
    selectData: {
      type: Array,
      default(){
        return []
      }
    },
    title: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    },
    selectChange: {
      type: Function,
      default: () => { debugger }
    }
  },
  created() {
  }
}

</script>

<style lang="stylus">
.myLabel {
  display: inline-block;
  border-radius: 2px 0 0 2px;
  line-height: 40px;
  color: #B5B5B5;
  background-color: #fff;
  padding: 0 9px;
}

.hasLabel {
  width: 150px;
  input {
    border: none !important;
    border-radius: 0 2px 2px 0;
    border-color: transform !important;
    font-weight 700
    font-size 18px
    position: relative;
    top: 1px;
  }
}
</style>