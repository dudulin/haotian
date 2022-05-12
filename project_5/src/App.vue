<template>
  <div id="app" style="width:80vw;margin:0 8vw;">
    <el-row>
      <el-col :span="24" style="text-align:center;margin: 30px 0;">
        <el-button @click="btnTestCopyClick" type="primary">导入测试环境数据</el-button>
        <el-link class="btnMessage" :type="ui.testBtnType" v-if="!!ui.testBtnMessage">{{
            ui.testBtnMessage
        }}
        </el-link>
        <el-button @click="btnTrueCopyClick" type="primary">导入线上环境数据</el-button>
        <el-link class="btnMessage" :type="ui.trueBtnType" v-if="!!ui.trueBtnMessage">{{
            ui.trueBtnMessage
        }}
        </el-link>
      </el-col>
    </el-row>
    <el-dialog title="测试数据" :visible.sync="ui.dialogTestVisible" width="30%">
      <el-input type="textarea" :rows="4" placeholder="请输入内容" v-model.trim="testValueCopy">
      </el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="ui.dialogTestVisible = false">取 消</el-button>
        <el-button type="primary" @click="ui.dialogTestVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="线上数据" :visible.sync="ui.dialogTrueVisible" width="30%">
      <el-input type="textarea" :rows="4" placeholder="请输入内容" v-model.trim="trueValueCopy">
      </el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="ui.dialogTrueVisible = false">取 消</el-button>
        <el-button type="primary" @click="ui.dialogTrueVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-tabs type="border-card" v-model="tabsChoice">
      <el-tab-pane :name="pageKey" label="页面">
        <Page :ref="pageKey" @callback="getData(pageKey)" :testValueCopy="testValueCopy" :trueValueCopy="trueValueCopy">
        </Page>
      </el-tab-pane>
      <el-tab-pane :name="interfaceKey" label="数据源接口">
        <interface :ref="interfaceKey" @callback="getData(interfaceKey)" :testValueCopy="testValueCopy"
          :trueValueCopy="trueValueCopy"></interface>
      </el-tab-pane>
    </el-tabs>
    <el-row>
      <el-col :span="24" style="text-align:center;margin: 50px 0 20px;">
        <el-button type="primary" @click="btnCheckClick">校验数据</el-button>
      </el-col>
    </el-row>

    <div class="tableTitle"><span>页面数据</span>
    </div>
    <el-table :data="tableData" height="250" border v-loading="loading">
      <el-table-column prop="date" label="参数" width="180">
      </el-table-column>
      <el-table-column prop="name" label="测试环境数据">
      </el-table-column>
      <el-table-column prop="name" label="线上环境数据">
      </el-table-column>
      <el-table-column label="校验结果">
        <template slot-scope="scope">
          <el-link :type="scope.row.type">{{ scope.row.address }}</el-link>
        </template>
      </el-table-column>
    </el-table>
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-light">总结：</div>
      </el-col>
    </el-row>
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
      pageKey: 'pageVue', // 多处绑定 命名很容易弄错 统一规划
      interfaceKey: 'interfaceVue',
      ui: { // 影响页面显示的参数 统一放这里
        testBtnType: 'primary', // 按钮下的 文字 状态
        testBtnMessage: '???', // 按钮下的 文字 内容
        trueBtnType: 'success', // 按钮下的 文字 状态
        trueBtnMessage: '??ddd?', // 按钮下的 文字 内容
        dialogTestVisible: false, // 测试数据弹窗 显示隐藏
        dialogTrueVisible: false // 线上数据弹窗 显示隐藏
      },
      testValueCopy: null, // 复制的测试数据
      trueValueCopy: null, // 复制的线上数据
      tabsChoice: 'pageVue', // tabs 选择内容
      loading: false,
      tableData: [{
        date: '审批流ID',
        name: '王小虎',
        type: 'primary',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '文件上传路径',
        name: '王小虎',
        type: 'info',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '接口名称',
        name: '王小虎',
        type: 'warning',
        address: '异常数据'
      }]
    }
  },
  methods: {
    /* 事件函数 名称以 对象+事件 命名 */
    btnCheckClick() { // 校验按钮
      let ui = this.ui
      // 1.校验 数据是否都 复制
      if (!this.testValueCopy) {
        ui.testBtnType = 'warning'
        ui.testBtnMessage = '请导入测试数据'
      }
      if (!this.trueValueCopy) {
        ui.trueBtnType = 'warning'
        ui.trueBtnMessage = '请导入线上数据'
      }
      // 2.复制的数据 是否和 tabs 选择对应
      // 3.数据传给对应 子组件 table 加载 中
      this.loading = true
      switch (this.tabsChoice) {
        case this.pageKey:
          this.$refs[this.pageKey].checkData(this.tabsChoice) // 执行子组件函数
          break
        case this.interfaceKey:
          this.$refs[this.interfaceKey].checkData(this.tabsChoice) // 执行子组件函数
          break

        default:
          break
      }
      console.log(this.tabsChoice, 3333333)
      // 4.数据插入 table  加载完成
      console.log(this.testValueCopy)
    },
    btnTestCopyClick() { // 导入测试数据按钮
      this.ui.dialogTestVisible = true
      this.testValueCopy = null // 清空数据
    },
    btnTrueCopyClick() { // 导入线上数据按钮
      this.ui.dialogTrueVisible = true
      this.trueValueCopy = null // 清空数据
    },
    /* 逻辑函数 名称以 对象目的 命名 */
    getData(title) {
      switch (title) {
        case this.pageKey:

          break
        case this.interfaceKey:

          break

        default:
          break
      }
      this.loading = false
    }
  }

}
</script>

<style scoped>
#app {
  padding: 30px;
}

.tableTitle {
  border-left: 5px solid rgb(64, 158, 255);
  padding-left: 0.5em;
  margin-bottom: 1em;
}

.tableTitle>span {
  color: rgb(13, 170, 197);
  font-weight: 700;
}

.btnMessage {
  position: relative;
  bottom: -30px;
  left: -162px;
  width: 156px;
}
</style>>
