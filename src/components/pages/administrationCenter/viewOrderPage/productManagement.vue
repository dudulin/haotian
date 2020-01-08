
<template>
  <div class="bigBox">
    <!-- 上 50px -->
    <div class="box">
      <div class="item">
        <el-radio-group v-model="radio" class="radioStyle">
          <el-radio :label="1">无显示</el-radio>
          <el-radio :label="2">滤布</el-radio>
        </el-radio-group>
      </div>
      <div class="item">
        <my-select title="隶属模块" :selectData="selectData1" :selectChange="selectChange" :value="selectValue1" style="margin-right:20px;"></my-select>
        <my-select title="产品子类" :selectData="selectData2" :selectChange="selectChange" :value="selectValue2" style="margin-right:20px;"></my-select>
      </div>
    </div>
    <!-- 中 自适应 -->
    <el-table class="myTable" ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%;flex-grow:1;" @selection-change="selectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="aa1" label="产品编号">
      </el-table-column>
      <el-table-column prop="aa2" label="产品名称">
      </el-table-column>
      <el-table-column prop="aa3" label="产品规格">
      </el-table-column>
      <el-table-column prop="aa4" label="隶属模块">
      </el-table-column>
      <el-table-column prop="aa5" label="产品子类">
      </el-table-column>
      <el-table-column label="产品图片">
        <template slot-scope="scope">
          <img src="../img/1.png" style="width: 60px;" alt="">
        </template>
      </el-table-column>
      <el-table-column prop="aa7" label="变更时间">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="medium" type="primary" @click="showDetail(scope.$index, scope.row)">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 下 50px -->
    <div style="text-align: right;">
      <el-button icon="el-icon-delete" class="bigBtn" @click="btnClick" style="width: 60px;height: 50px;"></el-button>
      <el-button icon="el-icon-circle-plus-outline" class="bigBtn" @click="showDetail" style="width: 60px;height: 50px;"></el-button>
    </div>
    <el-dialog title="收货地址" :visible.sync="dialogFormVisible" style="text-align: left;" :close-on-press-escape="false" :close-on-click-modal="false">
      <el-form ref="form" :model="productManage" label-width="80px">
        <div style="height: 40px;margin-bottom: 22px;line-height: 40px;">
          <span style="font-size: 14px;width: 71px;display: inline-block;padding-left: 11px;">商品编号:</span>22222</div>
        <el-form-item label="商品名称:">
          <el-input v-model="productManage.productName"></el-input>
        </el-form-item>
        <el-form-item label="商品规格:">
          <el-input v-model="productManage.productNorms"></el-input>
        </el-form-item>
        <el-form-item label="隶属模块:">
          <div v-for="(item, index) in productManage.modular" :key="index.toString()" style="margin-bottom: 15px;">
            <el-select v-model="item.modularSelect" placeholder="请选择隶属模块" style="width: 150px;margin-right: 40px;">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
            <el-input v-model="item.modularInput" style="width: 480px;margin-right: 40px;"></el-input>
            <el-button type="primary" @click="addModular">新增</el-button>
          </div>
        </el-form-item>
        <el-form-item label="隶属子类:">
          <div v-for="(item, index) in productManage.children" :key="index.toString()" style="margin-bottom: 15px;">
            <el-select v-model="item.childrenSelect" placeholder="请选择隶属子级" style="width: 150px;margin-right: 40px;">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
            <el-input v-model="item.childrenInput" style="width: 480px;margin-right: 40px;"></el-input>
            <el-button type="primary" @click="addChildren">新增</el-button>
          </div>
        </el-form-item>
        <el-form-item label="所属行业:">
          <div v-for="(item, index) in productManage.industry" :key="index.toString()" style="margin-bottom: 15px;">
            <el-select v-model="item.industrySelect" placeholder="请选择隶属子级" style="width: 150px;margin-right: 40px;">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
            <el-input v-model="item.industryInput" style="width: 480px;margin-right: 40px;"></el-input>
            <el-button type="primary" @click="addIndustry">新增</el-button>
          </div>
        </el-form-item>
        <el-form-item label="产品图片:">
          <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :file-list="fileList" list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
          <el-dialog :visible.sync="showImg" append-to-body>
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>
        <el-form-item label="产品描述:">
          <el-input type="textarea" :rows="2" :cols="70" v-model="productManage.describe"></el-input>
        </el-form-item>
        <el-form-item size="large" style="text-align: right;">
          <el-button type="primary" @click="onSubmit">确认</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>


<script>
import mySelect from '../components/select'
export default {
  data() {
    return {
      productManage: {
        productName: '',
        productNorms: '',
        modular: [{
          modularSelect: '',
          modularInput: ''
        }],
        children: [{
          childrenSelect: '',
          childrenInput: ''
        }],
        industry: [{
          industrySelect: '',
          industryInput: ''
        }],
        describe: ''
      },
      fileList: [],
      dialogImageUrl: '',
      showImg: false,
      disabled: false,
      dialogFormVisible: false,
      radio: 1,
      tableData: [
        {
          aa1: 'aa1',
          aa2: 'aa2',
          aa3: 'aa3',
          aa4: 'aa4',
          aa5: 'aa5',
          aa6: 'aa6',
          aa7: 'aa7'
        },
        {
          aa1: 'aa1',
          aa2: 'aa2',
          aa3: 'aa3',
          aa4: 'aa4',
          aa5: 'aa5',
          aa6: 'aa6',
          aa7: 'aa7'
        },
        {
          aa1: 'aa1',
          aa2: 'aa2',
          aa3: 'aa3',
          aa4: 'aa4',
          aa5: 'aa5',
          aa6: 'aa6',
          aa7: 'aa7'
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
          value: '1',
          label: '未投标'
        }, {
          value: '2',
          label: '已经中标'
        }, {
          value: '3',
          label: '已经成交'
        }, {
          value: '4',
          label: '流失客户'
        }
      ],
      selectValue1: '0',
      selectValue2: '0',
      message1: 'gn28881',
      message2: '张三'
    }
  },
  created() {
    console.log(JSON.stringify({ title: '销售员管理', value: 'SalesmanManagement' }))
  },
  methods: {
    addModular() {
      this.productManage.modular.push({
        modularSelect: '',
        modularInput: ''
      })
    },
    addChildren() {
      this.productManage.children.push({
        childrenSelect: '',
        childrenInput: ''
      })
    },
    addIndustry() {
      this.productManage.industry.push({
        industrySelect: '',
        industryInput: ''
      })
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.showImg = true;
    },
    handleDownload(file) {
      console.log(file);
    },
    onSubmit() {
      debugger
      console.log(this.productManage);
    },
    selectionChange(val) {
      this.tableSelectData = val;
    },
    selectChange(value) {
      this.selectValue1 = value
    },
    showDetail(index, row) {
      if (row) {
        this.productManage = {
          productName: row.aa1,
          productNorms: row.aa2,
          modular: [{
            modularSelect: '',
            modularInput: row.aa3
          }],
          children: [{
            childrenSelect: '',
            childrenInput: row.aa4
          }],
          industry: [{
            industrySelect: '',
            industryInput: row.aa5
          }],
          describe: row.aa6
        }
      }
      this.dialogFormVisible = true
    },
    btnClick() {
      let content = `你添加了${this.message1}客户名称为 <span style="color:#3293D7">${this.message2}</span> 的客户 <p style="font-size:30px;line-height:50px;">是否确认添加？</p>`
      this.$confirm(content, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        dangerouslyUseHTMLString: true,
        cancelButtonClass: 'bigBtn',
        confirmButtonClass: 'bigBtn',
        customClass: 'width300',
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

.bigBox .el-dialog {
  width: 900px;
}
</style>