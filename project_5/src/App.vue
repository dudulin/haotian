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
    <el-dialog title="确认" :visible.sync="ui.dialogMemoVisible" width="30%">
      <el-input type="textarea" placeholder="请输入确认" v-model="ui.memo" :rows="4" style="margin: 20px 0;"> </el-input>
      <el-button @click="ui.dialogMemoVisible = false">取 消</el-button>
      <el-button type="primary" @click="btn3">确 定</el-button>
    </el-dialog>
    <el-dialog title="详情" :visible.sync="ui.dialogDetailVisible" width="80%">
      <el-table :data="tableData2" border style="width: 100%">
        <el-table-column type="index" width="50" label="序号"> </el-table-column>
        <el-table-column prop="key" label="参数名"> </el-table-column>
        <el-table-column prop="path" label="层级"> </el-table-column>
        <el-table-column prop="testValue" label="测试环境">
          <template slot-scope="scope">
            <el-tooltip v-if="scope.row.testValueStr.length >= 117" effect="light"
              :content="String(scope.row.testValue)" placement="right">
              <p :style="pStyle">
                {{ scope.row.testValueStr }}
              </p>
            </el-tooltip>
            <span v-else>{{ scope.row.testValue }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="trueValue" label="线上环境">
          <template slot-scope="scope">
            <el-tooltip v-if="scope.row.trueValueStr.length >= 117" effect="light"
              :content="String(scope.row.trueValue)" placement="right">
              <p :style="pStyle">
                {{ scope.row.trueValueStr }}
              </p>
            </el-tooltip>
            <span v-else>{{ scope.row.trueValue }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="type" label="是否有问题">
          <template slot-scope="scope">
            <el-link :type="scope.row.type" style="white-space: pre-wrap">{{ scope.row.type | changeType }}</el-link>
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
      <el-tab-pane :name="otherKey" label="其他校验内容">
        <other :ref="otherKey" @callback="getData" :testValue="testValueCopy" :trueValue="trueValueCopy">
        </other>
      </el-tab-pane>
    </el-tabs>
    <el-row>
      <el-col :span="24" style="text-align:center;margin: 50px 0 20px;">
        <el-button type="primary" @click="btnCheckClick">校验数据</el-button>
        <el-button :disabled="!tableData.length" type="primary" @click="excelBtn">导出数据</el-button>
      </el-col>
    </el-row>

    <div class="tableTitle"><span>页面数据</span>
    </div>
    <el-table :data="tableData" border v-loading="loading" header-cell-class-name="sssss"
      :tree-props="{ children: 'children' }" row-key="id">
      <el-table-column type="index" width="50" label="序号"> </el-table-column>
      <el-table-column prop="title" label="参数"> </el-table-column>
      <el-table-column prop="path" label="属性" width="180"> </el-table-column>
      <el-table-column prop="testValue" label="测试环境数据">
        <template slot-scope="scope">
          <el-tooltip v-if="scope.row.testValueStr.length >= 117" effect="light" :content="String(scope.row.testValue)"
            placement="right">
            <p :style="pStyle">
              {{ scope.row.testValueStr }}
            </p>
          </el-tooltip>
          <span v-else>{{ scope.row.testValue }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="trueValue" label="线上环境数据">
        <template slot-scope="scope">
          <el-tooltip v-if="scope.row.trueValueStr.length >= 117" effect="light" :content="String(scope.row.trueValue)"
            placement="right">
            <p :style="pStyle">
              {{ scope.row.trueValueStr }}
            </p>
          </el-tooltip>
          <span v-else>{{ scope.row.trueValue }}</span>
        </template>
      </el-table-column>
      <el-table-column label="校验结果" :filters="[{ text: '正常数据', value: 'normal' }, { text: '异常数据', value: 'abnormal' }]"
        :filter-method="filterTag">
        <template slot-scope="scope">
          <el-button v-if="scope.row.tableData" size="mini" :type="scope.row.type" @click="showDetails(scope.row)">详情
          </el-button>
          <el-link v-else :type="scope.row.type" style="white-space: pre-wrap">{{ scope.row.message }}</el-link>
        </template>
      </el-table-column>
      <el-table-column label="操作" :key="ui.randomId">
        <template slot-scope="scope">
          <!-- <span v-if="scope.row.normal">正常</span> -->
          <el-button v-if="!scope.row.tableData && !scope.row.normal" size="mini"
            :type="scope.row.memo ? 'info' : 'danger'" @click="showDetails2(scope.row)">确认正确
          </el-button>
        </template>
      </el-table-column>
      <el-table-column prop="memo" label="备注"> </el-table-column>
    </el-table>
    <el-row>
      <el-col :span="24">

      </el-col>
    </el-row>
    <el-tooltip class="item" effect="dark" content="回到顶部" placement="top">
      <div @click="dialogUpAndDown(0)" class="iconHover el-backtop"
        style="border-radius:0;right: 100px; bottom: 150px;    box-shadow: 0px 0px 0px 1px #bfb0b0;"><i
          class="el-icon-caret-top"></i></div>
    </el-tooltip>
    <el-tooltip class="item" effect="dark" content="回到底部" placement="bottom">
      <div @click="dialogUpAndDown(40000)" class="iconHover el-backtop"
        style="border-radius:0;right: 100px; bottom: 110px;    box-shadow: 0px 0px 0px 1px #bfb0b0;"><i
          class="el-icon-caret-bottom"></i></div>
    </el-tooltip>
  </div>
</template>

<script>
import Interface from './components/InterFace'
import Page from './components/Page'
import Other from './components/Other'
// import { exportJsonToExcel } from "export2excel"
/* eslint-disable */
import { export_json_to_excel } from '@/vendor/Export2Excel'
export default {
  /* 过滤器 不改变原值 */
  filters: {
    changeStr(str) {
      /* 过滤器把返回值 返回到插值里面 {{}} */
      return str + 456
    },
    changeType(str) {
      return str === 'info' ? '正常' : '错误'
    }
  },
  name: 'App',
  components: {
    Interface,
    Other,
    Page
  },
  computed: {
    pStyle() {
      return `max-height:7em`
    }
  },
  data() {
    return {
      pageKey: 'pageVue', // 多处绑定 命名很容易弄错 统一规划
      interfaceKey: 'interfaceVue',
      otherKey: 'otherVue',
      otherArr: [],
      ui: { // 影响页面显示的参数 统一放这里
        testBtnType: 'warning', // 按钮下的 文字 状态
        testBtnMessage: '请导入数据', // 按钮下的 文字 内容
        trueBtnType: 'warning', // 按钮下的 文字 状态
        trueBtnMessage: '请导入数据', // 按钮下的 文字 内容
        dialogTestVisible: false, // 测试数据弹窗 显示隐藏
        dialogTrueVisible: false, // 线上数据弹窗 显示隐藏
        dialogDetailVisible: false, // 详情弹窗 显示隐藏
        dialogMemoVisible: false,
        memo: '',
        testUrl: 'http://testvenus.cf.com:8089/admin#/',
        trueUrl: 'https://venus.cf.com/admin#/',
        urlArray: [
          {
            title: '权限位',
            path: 'systemDataSource',
            memo: ''
          },
          {
            title: '审批流管理',
            path: 'approval',
            memo: ''
          },
          {
            title: '字典管理',
            path: 'dictionaries',
            memo: ''
          },
          {
            title: '数据源管理',
            path: 'dataSourceController',
            memo: ''
          }
        ],
        randomId: '', // 总结
        randomId2: '' // 总结
      },
      dialogTest: null, // 弹窗的测试数据
      dialogTrue: null, // 弹窗的线上数据
      testValueCopy: null, // 复制的测试数据
      trueValueCopy: null, // 复制的线上数据
      tabsChoice: 'pageVue', // tabs 选择内容
      loading: false,
      tableData: [],
      tableDataBase: [],
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
    dialogUpAndDown(y) {
      window.scrollTo(0, y)
    },
    changeData(data) {
      let arr = []
      data.forEach(i => {
        let i2 = JSON.parse(JSON.stringify(i))
        delete i2.children
        delete i2.tableData
        arr.push(i2)
        if (i.children && i.children.length) {
          let arr2 = this.changeData(i.children)
          arr = arr.concat(arr2)
        }
        if (i.tableData && i.tableData.length) {
          let arr2 = this.changeData(i.tableData)
          arr = arr.concat(arr2)
        }
      })
      return arr
    },
    excelBtn() {
      let data2 = this.changeData(this.tableData)
      let flag2 = data2.some(i => {
        return !i.normal && !i.memo
      })
      if (flag2) {
        this.$notify.error({
          title: '错误',
          message: '请确认全部'
        })
        return
      }
      let flag = this.otherArr.some(i => {
        return i.option === 'unsure'
      })
      if (flag || !this.otherArr.length) {
        this.$notify.error({
          title: '错误',
          message: '请确认 其他校验内容'
        })
        return
      }
      const that = this
      let tableData = this.changeData(that.tableData)
      let tableDataBase = this.changeData(that.tableDataBase)
      let header = ['参数', '属性', '测试环境数据', '线上环境数据', '校验结果', '备注']

      let data = resetTable(tableData)
      data = data.concat(resetTable(['', '']))


      let diffData = tableData.filter((i, index) => {
        return JSON.stringify(i) !== JSON.stringify(tableDataBase[index])
      })
      diffData = resetTable(diffData)

      data = data.concat(diffData)

      data = data.concat(resetTable(['', '']))

      // data = data.concat(resetTable(this.ui.urlArray))

      export_json_to_excel({
        header, // 表头 必填  []
        data: data, // 具体数据 必填  [[], [], ...]
        filename: `${this.dateFormart()}_全部数据`, // 导出文件名 非必填
        autoWidth: false, // 单元格是否要自适应宽度 非必填  true / false
        bookType: 'xlsx' // 导出文件类型 非必填  'xlsx'/'csv'/'txt'等
      })


      function resetTable(data) {
        let fileProp = ['title', 'path', 'testValue', 'trueValue', 'message', 'memo']
        return data.map(i => {
          return fileProp.map(prop => {
            if (typeof i === 'string') {
              return '========'
            } else {
              if (prop === 'title') {
                return i[prop] ? i[prop] : i.key
              } else {
                return i[prop]
              }
            }
          })
        })
      }
    },
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
    btn3() {
      this.random2()
      this.ui.dialogMemoVisible = false
      this.ui.row.memo = this.ui.memo
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
          this.$refs[this.pageKey].checkData() // 执行子组件函数
          break
        case this.interfaceKey:
          this.$refs[this.interfaceKey].checkData() // 执行子组件函数
          break
        default:
          break
      }
      // 4.数据插入 table  加载完成
      this.tableDataBase = this.tableData.map(i => { return JSON.parse(JSON.stringify(i)) })
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
    getData(data, is_other) { // 子组件函数执行之后的回调函数
      if (is_other) {
        this.otherArr = data
      } else {
        this.tableData = this.addValueTitle(data)
        setTimeout(() => {
          this.loading = false
        }, 2)
      }
    },
    addValueTitle(data) {
      data.forEach(i => {
        i.trueValueStr = JSON.stringify(i.trueValue)
        i.trueValueStr = i.trueValueStr !== undefined ? i.trueValueStr : ''

        if (i.trueValueStr.length > 117) {
          i.trueValueStr = i.trueValueStr.substring(0, 111) + '......'
        }
        i.testValueStr = JSON.stringify(i.testValue)
        i.testValueStr = i.testValueStr !== undefined ? i.testValueStr : ''
        if (i.testValueStr.length > 117) {
          i.testValueStr = i.testValueStr.substring(0, 111) + '......'
        }
        if (i.children && i.children.length) {
          i.children = this.addValueTitle(i.children)
        }
        if (i.tableData && i.tableData.length) {
          i.tableData = this.addValueTitle(i.tableData)
        }
      })
      return data
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
    random2() {
      this.ui.randomId2 = String(Math.random())
    },
    showDetails(row) {
      this.tableData2 = row.tableData
      this.ui.dialogDetailVisible = true
    },
    showDetails2(row) {
      this.ui.memo = row.memo ? row.memo : ''
      this.ui.row = row
      this.ui.dialogMemoVisible = true
    },
    dateFormart() {
      let now = new Date()
      let h = now.getHours()
      let m = now.getMinutes()
      let s = now.getSeconds()
      return `${h}时${m}分${s}秒`
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
<style>
.el-tooltip__popper.is-light {
  width: 30%;
}
</style>
