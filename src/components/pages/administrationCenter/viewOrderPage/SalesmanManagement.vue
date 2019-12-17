
<template>
  <div class="bigBox">
    <!-- 上 50px -->
    <div class="box">
      <div class="item">
        <el-radio-group v-model="radio" class="radioStyle">
          <el-radio :label="1">国内客户</el-radio>
          <el-radio :label="2">国际客户</el-radio>
        </el-radio-group>
      </div>
      <div class="item">
        <my-select
          title="销售代表"
          :selectData="selectData1"
          :selectChange="selectChange"
          :value="selectValue1"
          style="margin-right:20px;"
        ></my-select>
        <my-select
          title="客户状态"
          :selectData="selectData2"
          :selectChange="selectChange"
          :value="selectValue2"
          style="margin-right:20px;"
        ></my-select>
        <my-select
          title="最近活跃"
          :selectData="selectData3"
          :selectChange="selectChange"
          :value="selectValue3"
        ></my-select>
      </div>
    </div>
    <!-- 中 自适应 -->
    <el-table
      class="myTable"
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%;flex-grow:1;"
      @selection-change="selectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column
        v-for="item in tableConfig"
        :key="item.prop"
        :prop="item.prop"
        :label="item.label"
      ></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="medium" type="primary" @click="tableClick(scope.$index, scope.row)">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 下 50px -->
    <div style="text-align: right;">
      <el-button type="primary" class="bigBtn" @click="btnClick">确定</el-button>
    </div>
  </div>
</template>


<script>
import mySelect from '../components/select'
export default {
  data() {
    return {
      radio: 1,
      tableData: [
        {
          aa1: 'aa1',
          aa2: 'aa2',
          aa3: 'aa3',
          aa4: 'aa4',
          aa5: 'aa5',
          aa6: 'aa6',
          aa7: 'aa7',
          aa8: 'aa8',
          aa9: 'aa9'
        },
        {
          aa1: 'aa1',
          aa2: 'aa2',
          aa3: 'aa3',
          aa4: 'aa4',
          aa5: 'aa5',
          aa6: 'aa6',
          aa7: 'aa7',
          aa8: 'aa8',
          aa9: 'aa9'
        },
        {
          aa1: 'aa1',
          aa2: 'aa2',
          aa3: 'aa3',
          aa4: 'aa4',
          aa5: 'aa5',
          aa6: 'aa6',
          aa7: 'aa7',
          aa8: 'aa8',
          aa9: 'aa9'
        }
      ],
      tableSelectData: [],
      selectData1: [
        {
          value: '0',
          label: '27'
        }, {
          value: '',
          label: 'label'
        }
      ],
      selectData2: [
        {
          value: '0',
          label: '未成交'
        }, {
          value: '',
          label: 'label'
        }
      ],
      selectData3: [
        {
          value: '0',
          label: '一周'
        }, {
          value: '',
          label: 'label'
        }
      ],
      selectValue1: '0',
      selectValue2: '0',
      selectValue3: '0',
      tableConfig: [
        { label: '客户编号', prop: 'aa1' },
        { label: '客户名称', prop: 'aa2' },
        { label: '联系人', prop: 'aa3' },
        { label: '客户地域', prop: 'aa4' },
        { label: '所属行业', prop: 'aa5' },
        { label: '销售代表', prop: 'aa6' },
        { label: '客户状态', prop: 'aa7' },
        { label: '最近电话回访', prop: 'aa8' },
        { label: '最近成交记录', prop: 'aa9' }
      ],
      message1:'gn28881',
      message2:'张三'
    }
  },
  created() {
    console.log(JSON.stringify({ title: '销售员管理', value: 'SalesmanManagement' }))
  },
  methods: {
    selectionChange(val) {
      this.tableSelectData = val;
    },
    selectChange(value) {
      this.selectValue1 = value
    },
    tableClick() {
      console.log(arguments)
    },
    btnClick() {
      let content= `你添加了${this.message1}客户名称为 <span style="color:#3293D7">${this.message2}</span> 的客户 <p style="font-size:30px;line-height:50px;">是否确认添加？</p>`
      this.$confirm(content, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        dangerouslyUseHTMLString:true,
        cancelButtonClass:'bigBtn',
        confirmButtonClass:'bigBtn',
        customClass:'width600',
        center: true
      }).then(() => {
        
      }).catch(() => {
       
      })
    }
  },
  computed: {},
  components: {
    mySelect
  }
}
</script>
<style lang="stylus">
.bigBox {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;

  .myTable {
    background: transparent;

    .el-table__body-wrapper table {
      border-collapse: separate;
      border-spacing: 0 10px;
    }

    thead tr, thead tr th {
      background: transparent;
      border: none;
    }

    .el-checkbox__inner {
      width: 20px;
      height: 20px;
    }

    .el-checkbox__inner::after {
      left: 8px;
      height: 12px;
    }

    .el-checkbox__inner::before {
      top: 8px;
    }
  }

  .radioStyle {
    font-size: 18px;
    line-height: 40px;

    .el-radio__label {
      font-size: 18px;
    }

    .el-radio__inner {
      width: 25px;
      height: 25px;
    }

    .el-radio__inner::after {
      width: 13px;
      height: 13px;
    }
  }

  .box {
    min-height: 90px;
    display: flex;
    justify-content: space-between;

    .item {
      min-height: 30px;
      min-width: 30px;
    }
  }
}
.bigBtn{
  width 158px
  height 55px
}
.width600{
  width 600px
}
</style>