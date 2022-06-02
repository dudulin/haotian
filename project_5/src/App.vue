<template>
  <div id="app" style="width:80vw;margin:0 8vw;">
    <el-row>
      <el-col :span="24" style="text-align:center;margin: 30px 0;">
        <span @click="btnTestCopyClick">
          <el-button type="primary">导入测试环境数据</el-button>
          <el-link class="btnMessage" :type="ui.testBtnType" v-if="!!ui.testBtnMessage">{{
              ui.testBtnMessage | dateFormart('hh:mm:ss')
          }}
          </el-link>
        </span>
        <span @click="btnTrueCopyClick">
          <el-button type="primary">导入线上环境数据</el-button>
          <el-link class="btnMessage" :type="ui.trueBtnType" v-if="!!ui.trueBtnMessage">{{
              ui.trueBtnMessage | dateFormart('hh:mm:ss')
          }}
          </el-link>
        </span>
      </el-col>
    </el-row>
    <el-dialog title="测试数据" :visible.sync="ui.dialogTestVisible" width="30%">
      <el-input type="textarea" :rows="4" placeholder="请输入内容" v-model.trim="dialogTest">
      </el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="ui.dialogTestVisible = false">取 消</el-button>
        <el-button type="primary" @click="btn1">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="线上数据" :visible.sync="ui.dialogTrueVisible" width="30%">
      <el-input type="textarea" :rows="4" placeholder="请输入内容" v-model.trim="dialogTrue">
      </el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="ui.dialogTrueVisible = false">取 消</el-button>
        <el-button type="primary" @click="btn2">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="详情" :visible.sync="ui.dialogDetailVisible" width="80%">
      <el-table :data="tableData2" border style="width: 100%">
        <el-table-column type="index" width="50" label="序号"> </el-table-column>
        <el-table-column prop="key" label="参数名"> </el-table-column>
        <el-table-column prop="path" label="层级"> </el-table-column>
        <el-table-column prop="testValue" label="测试环境"> </el-table-column>
        <el-table-column prop="trueValue" label="线上环境"> </el-table-column>
        <el-table-column prop="type" label="是否异常">
          <template slot-scope="scope">
            <el-link :type="scope.row.type" style="white-space: pre-wrap">{{ scope.row.type | changeType }}</el-link>
          </template>
        </el-table-column>
        <el-table-column label="确认异常">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.normal" inactive-color="#ff4949" active-color="#13ce66" active-text="正常"
              inactive-text="异常"> </el-switch>
          </template>
        </el-table-column>

      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="ui.dialogDetailVisible = false">取 消</el-button>
      </span>
    </el-dialog>
    <el-tabs type="border-card" v-model="tabsChoice">
      <el-tab-pane :name="pageKey" label="页面">
        <Page :ref="pageKey" @callback="getData" :testValue="testValueCopy" :trueValue="trueValueCopy">
        </Page>
      </el-tab-pane>
      <el-tab-pane :name="interfaceKey" label="数据源接口">
        <interface :ref="interfaceKey" @callback="getData" :testValue="testValueCopy" :trueValue="trueValueCopy">
        </interface>
      </el-tab-pane>
    </el-tabs>
    <el-row>
      <el-col :span="24" style="text-align:center;margin: 50px 0 20px;">
        <el-button type="primary" @click="btnCheckClick">校验数据</el-button>
      </el-col>
    </el-row>

    <div class="tableTitle"><span>页面数据</span>
    </div>
    <el-table :data="tableData" border v-loading="loading" header-cell-class-name="sssss"
      :tree-props="{ children: 'children' }" row-key="id">
      <el-table-column type="index" width="50" label="序号"> </el-table-column>
      <el-table-column prop="title" label="参数"> </el-table-column>
      <el-table-column prop="path" label="属性" width="180"> </el-table-column>
      <el-table-column prop="testValue" label="测试环境数据"> </el-table-column>
      <el-table-column prop="trueValue" label="线上环境数据"> </el-table-column>
      <el-table-column label="校验结果" :filters="[{ text: '正常数据', value: 'normal' }, { text: '异常数据', value: 'abnormal' }]"
        :filter-method="filterTag">
        <template slot-scope="scope">
          <el-button v-if="scope.row.tableData" size="mini" :type="scope.row.type" @click="showDetails(scope.row)">详情
          </el-button>
          <el-link v-else :type="scope.row.type" style="white-space: pre-wrap">{{ scope.row.message }}</el-link>
        </template>
      </el-table-column>
      <el-table-column label="确认异常" :key="ui.randomId">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.normal" inactive-color="#ff4949" active-color="#13ce66" active-text="正常"
            inactive-text="异常" @change="random"> </el-switch>
          {{ scope.row.normal }}
        </template>
      </el-table-column>
    </el-table>
    <el-row>
      <el-col :span="24">
        总结：
        <p style="white-space: pre-wrap;word-break: break-all;">{{ ui.summary }}</p>
      </el-col>
    </el-row>
    <a href="http://testvenus.cf.com:8089/admin#/systemDataSource" target="_blank">测试环境--权限位</a>
  </div>
</template>

<script>
import Interface from './components/InterFace'
import Page from './components/Page'
export default {
  /* 过滤器 不改变原值 */
  filters: {
    changeStr(str) {
      /* 过滤器把返回值 返回到插值里面 {{}} */
      return str + 456
    },
    changeType(str) {
      return str === 'info' ? '正常' : '异常'
    }
  },
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
        testBtnType: 'warning', // 按钮下的 文字 状态
        testBtnMessage: '请导入数据', // 按钮下的 文字 内容
        trueBtnType: 'warning', // 按钮下的 文字 状态
        trueBtnMessage: '请导入数据', // 按钮下的 文字 内容
        dialogTestVisible: false, // 测试数据弹窗 显示隐藏
        dialogTrueVisible: false, // 线上数据弹窗 显示隐藏
        dialogDetailVisible: false, // 详情弹窗 显示隐藏
        summary: '', // 总结
        randomId: '' // 总结
      },
      dialogTest: null, // 弹窗的测试数据
      dialogTrue: null, // 弹窗的线上数据
      testValueCopy: null, // 复制的测试数据
      trueValueCopy: null, // 复制的线上数据
      tabsChoice: 'pageVue', // tabs 选择内容
      loading: false,
      tableData: [{
        title: '接口名称',
        testValue: ['数据'],
        trueValue: ['数据'],
        message: '这个是提示内容',
        type: 'danger'
      }],
      tableData2: [
        {
          key: 'name',
          path: '层级一',
          title: '接口名称',
          testValue: ['数据类型错误:1;  tag错误:空值'],
          trueValue: ['数据类型错误:3'],
          message: '',
          type: 'danger'
        },
        {
          key: 'name>age',
          path: '层级二',
          title: '接口名称',
          testValue: ['cc'],
          trueValue: ['cc'],
          message: '',
          type: 'danger'
        }
      ]
    }
  },
  methods: {
    /* 事件函数 名称以 对象+事件 命名 */
    btn1() {
      let ui = this.ui
      ui.dialogTestVisible = false
      this.testValueCopy = this.dialogTest
      let now = this.getDate()
      ui.testBtnMessage = `添加时间：${now}`
      ui.testBtnType = 'info'
    },
    btn2() {
      let ui = this.ui
      ui.dialogTrueVisible = false
      this.trueValueCopy = this.dialogTrue
      let now = this.getDate()
      ui.trueBtnMessage = `添加时间：${now}`
      ui.trueBtnType = 'info'
    },
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
      if (!this.trueValueCopy || !this.testValueCopy) {
        return
      }
      if (this.testValueCopy.startsWith('[')) {
        this.tabsChoice = this.pageKey
      } else {
        this.tabsChoice = this.interfaceKey
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
      // 4.数据插入 table  加载完成
    },
    btnTestCopyClick() { // 导入测试数据按钮
      this.dialogTest = ''
      this.ui.dialogTestVisible = true
    },
    btnTrueCopyClick() { // 导入线上数据按钮
      this.dialogTrue = ''
      this.ui.dialogTrueVisible = true
    },
    /* 逻辑函数 名称以 对象目的 命名 */
    getData(data) { // 子组件函数执行之后的回调函数
      this.tableData = data
      let summary = ''
      this.tableData.forEach(i => {
        if (i.type === 'danger' || i.type === 'warning') {
          summary += `${i.message} \n`
        }
      })
      this.ui.summary = summary
      setTimeout(() => {
        this.loading = false
      }, 2)
    },
    getDate() {
      let now = new Date()
      return `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`
    },
    filterTag(value, row) {
      if (value === 'abnormal') {
        return row.type === 'danger' || row.type === 'warning'
      } else {
        return row.type === 'info'
      }
    },
    random() {
      this.ui.randomId = String(Math.random())
    },
    showDetails(row) {
      this.tableData2 = row.tableData
      this.ui.dialogDetailVisible = true
      console.log(row)
    }
  },
  watch: {
    testValueCopy: {
      handler(newVal, oldVal) {
      },
      // 立即处理 进入页面就触发
      immediate: true,
      // 深度监听 属性的变化
      deep: true
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
<style>
.sssss>div>span>i.el-icon-arrow-down {
  font-size: 25px;
  font-weight: 700;
  position: relative;
  top: 4px;
}
</style>
`{"title":"修改","btn":"修改","fname":"test1","fid":540,"fremark":"test1","fserverAddressId":114,"fformatId":10,"fisValid":0,"fprotocol":"4","fcharset":"gb2312","fprotocolValue":"","relayConfig":{"requestType":"","errorMsgEncoding":"gb2312","routeFormat":"","routeParams":""},"httpConfig":{"headParams":"","method":"1","relativeUrl":"","contentType":"1","encode":"","xmlRequestNodes":[{"nodeName":"","paramNameMapping":"","attributesMapping":[],"hasNodes":false,"emptyNoSendFlag":true,"nodes":[{"nodeName":"","paramNameMapping":"","attributesMapping":[],"hasNodes":false,"emptyNoSendFlag":true,"nodes":[]}]}]},"protobufConfig":{"namespace":"test","uriName":"test","dynamicPbName":"test","protobufRequestConfig":{"reqParams":[{"type":"string","label":"optional","name":"a","encode":"gb2312","num":4,"value":[{"type":"bool","label":"optional","name":"","num":1,"encode":"gb2312","value":"","key":"2022-06-01T07:40:56.658Z"}],"key":"2022-06-01T07:40:56.658Z"},{"type":"bool","label":"optional","name":"b","encode":"gb2312","num":"","value":[{"type":"bool","label":"optional","name":"","encode":"gb2312","num":1,"value":""}]},{"type":"bool","label":"optional","name":"c","encode":"gb2312","num":1,"value":[{"type":"bool","label":"optional","name":"","encode":"gb2312","num":1,"value":""}]}]},"protobufResponseConfig":{"bodyParams":[{"type":"bool","label":"optional","name":"c","encode":"gb2312","num":4,"value":[{"type":"bool","label":"optional","name":"","num":1,"encode":"gb2312","value":"","key":"2022-06-01T07:40:56.658Z"}],"key":"2022-06-01T07:40:56.658Z"}]},"routeParams":"","routeFormat":""},"fitConfig":{"cgiName":"","routeFormat":"","routeParams":""},"fencryption":false,"frequestParam":{"requestFullText":{"enableEncrypt":false,"paramName":"","keySysEncryptEntity":{"isKeySysEncrypt":false,"keyId":"","encAlgo":"","charset":"gb2312","keySeq":"","isUseStd":false}},"batchSign":false,"signParam":{"keySysSignSetting":{"isKeySysSign":false,"signParamName":"","keyId":"","encAlgo":"","signRule":"","isUseStd":false,"keySeq":"","charset":"gb2312","trimSpace":false,"addTimestamp":false,"timestampName":"","timestampSize":""},"signType":"2","upperCase":false,"name":"","key":"","signRule":"","trimSpace":false,"charsetEncoding":"","encryptType":"","keyInSort":false},"ticketParams":[{"paramName":"","cookieParam":""}],"signParams":[{"keySysSignSetting":{"isKeySysSign":true,"signParamName":"23","keyId":"23","encAlgo":"23"},"upperCase":false,"name":"23","key":"3","signRule":"3","trimSpace":false,"charsetEncoding":"","encryptType":"","keyInSort":false}],"encryptParams":[{"type":"3","key":"3","paramName":"3","encryptRule":"3","encoding":"utf-8"}],"specialParams":"","clientIps":[""],"randomParam":"","timestamp":{"paramName":"","size":""},"commonJsonParam":{"paramName":"","comboxParams":"","trim":true},"groupParam":{"commonStrlimitParam":{"groupParamName":"","offsetParamName":"","limitParamName":""},"commonFieldsParam":{"groupParamName":"","keepingSpace":false,"inGroupParams":""}},"inputParams":[{"name":"","text":""}],"encoderRetParams":[{"paramName":"","charsetEncoding":"utf-8","decode":false}]},"fresponseParam":{"responseFullText":{"enableDecrypt":false,"resultCodeParamName":"retcode","resultMsgParamName":"retmsg","resultDataParamName":"data","keySysDecryptEntity":{"isKeySysDecrypt":false,"keyId":"","oldEncAlgo":"","charset":"gb2312","keySeq":"","isUseStd":false}},"charsetEncoding":"gb2312","outPutParams":[{"name":"","text":"","defacementParam":{"defacement":false,"reqParamNameMapping":""},"items":[{"name":"","text":"","defacementParam":{"defacement":false,"reqParamNameMapping":""},"key":"2022-06-01T07:40:56.658Z"}],"hasItems":false,"key":"2022-06-01T07:40:56.658Z"}],"validSignSetting":{"trimSpace":false,"addTimestamp":false,"timestampName":"","timestampSize":"","isKeySysValidSign":false,"signParamName":"","keyId":"","encAlgo":"","signRule":""},"decryptParams":[{"type":"2","key":"2","paramName":"2","decryptRule":"2","encoding":"utf-8"}],"specialReturnField":"","encoderRetParams":[{"paramName":"","charsetEncoding":"utf-8","decode":false}],"secondSegmentParam":[{"seqName":"","secondFormatType":"","charset":"gb2312"}],"arrayExpansion":{"type":0,"params":""},"transferToBinary":[{"paramName":"","index":""}]},"auditlog":{"open":false,"auditlogArr":[{"auditlogKey":"","auditlogVal":""}],"newAuditlogArr":[{"auditlogKey":"","auditlogVal":""}]}}`
