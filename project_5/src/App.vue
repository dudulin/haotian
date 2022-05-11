<template>
  <div id="app">
    <el-row>
      <el-col :span="24" style="text-align:center;margin: 50px 0;">
        <el-button type="primary" style="margin-right:90px;">导入测试环境数据</el-button>
        <el-button type="primary">导入线上环境数据</el-button>
      </el-col>
    </el-row>
    <el-tabs type="border-card" style="width:80vw;margin:0 8vw;">
      <el-tab-pane label="页面">
        <Page></Page>
      </el-tab-pane>
      <el-tab-pane label="数据源接口">
        <interface></interface>
      </el-tab-pane>
    </el-tabs>
    <el-row>
      <el-col :span="24" style="text-align:center;margin: 50px 0;">
        <el-button type="primary">校验数据</el-button>
      </el-col>
    </el-row>
    <el-table :data="tableData" height="250" border style="width: 100%">
      <el-table-column prop="date" label="参数" width="180">
      </el-table-column>
      <el-table-column prop="name" label="测试环境数据" width="180">
      </el-table-column>
      <el-table-column prop="name" label="线上环境数据" width="180">
      </el-table-column>
      <el-table-column prop="address" label="校验结果">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import Interface from './components/InterFace'
import Page from './components/Page'
export default {
  name: 'App',
  components: {
    Interface,
    Page
  },
  data() {
    return {
      tableData: [{
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-08',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-06',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-07',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }]
    }
  }
}
</script>

<style scoped>
#app {
  padding: 30px;
}
</style>>
