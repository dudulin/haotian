<template>
  <div id="app">

    <!-- 弹窗配置 start ========================================================  -->
    <el-dialog title="数据源配置" :visible.sync="dialogVisible" width="80%">
      <!-- 内容  start ----------------------------------   -->
      <el-form :inline="true" :model="formInline">
        <el-tabs type="border-card" v-model="tabActive">
          <el-tab-pane label="接口配置表" name="tab1">
            <el-collapse v-model="activeNames" class="paddingTop">
              <el-collapse-item title="基础配置" name="1" class="color2">
                <div class="flexBox">
                  <div class="itemLeft">
                    <el-form-item label="通用配置">
                    </el-form-item>
                  </div>
                  <div class="itemRight">
                    <el-form-item label="id">
                      <el-input v-model="formInline.tab1.input1"></el-input>
                    </el-form-item>
                    <el-form-item label="数据源接口名称">
                      <el-input v-model="formInline.tab1.input1"></el-input>
                    </el-form-item>
                    <el-form-item label="数据源接口说明">
                      <el-input v-model="formInline.tab1.input1"></el-input>
                    </el-form-item>
                    <el-form-item label="数据源地址">
                      <el-select v-model="formInline.tab1.select1">
                        <el-option label="解密" value="1"> </el-option>
                        <el-option label="加密" value="2"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="编码:">
                      <el-radio-group v-model="formInline.tab1.radio1">
                        <el-radio label="GB2312">GB2312</el-radio>
                        <el-radio label="UTF-8">UTF-8</el-radio>
                        <el-radio label="GBK">GBK</el-radio>
                      </el-radio-group>
                    </el-form-item>
                    <el-form-item label="字符编码:">
                      <el-radio-group v-model="formInline.tab1.radio1">
                        <el-radio label="GB2312">GB2312</el-radio>
                        <el-radio label="UTF-8">UTF-8</el-radio>
                        <el-radio label="GBK">GBK</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </div>
                </div>
              </el-collapse-item>
              <el-collapse-item title="协议定制" name="2" class="color1">
                <div class="flexBox">
                  <div class="itemLeft">
                    <el-form-item label="协议定制">
                    </el-form-item>
                  </div>
                  <div class="itemRight">
                    <el-form-item label="解析方式">
                      <el-select v-model="modelArr[0]">
                        <el-option v-for="i in selectArr" :key="i.value" :label="i.label" :value="i.value"> </el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="协议">
                      <el-select v-model="modelArr[2]" placeholder="请选择">
                        <el-option key="0" label="Relay" value="0"></el-option>
                        <el-option key="1" label="Http" value="1"></el-option>
                        <el-option key="2" label="relay-protobuf" value="2"></el-option>
                        <el-option key="3" label="FIT网关" value="3"></el-option>
                        <el-option key="4" label="Fable-PB" value="4"></el-option>
                        <el-option key="5" label="金融网关-Http" value="5"></el-option>
                        <el-option key="6" label="金融网关-Fable-PB" value="6"></el-option>
                        <el-option key="7" label="FIT网关-金融网关-Fable-PB" value="7"></el-option>
                        <el-option key="8" label="Lotus-Relay-URL" value="8"></el-option>
                        <el-option key="9" label="Lotus-Fable-PB" value="9"></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                </div>
                <!-- <div class="flexBox">
                  <div class="itemLeft">
                    <el-form-item label="协议定制">
                    </el-form-item>
                  </div>
                  <div class="itemRight">
                    <el-form-item label="xxxx">
                      <el-input v-model="formInline.tab1.input1"></el-input>
                    </el-form-item>
                  </div>
                </div> -->
              </el-collapse-item>
              <el-collapse-item title="审计日志配置" name="4" class="color2">
                <div class="flexBox">
                  <div class="itemLeft">
                    <el-form-item label="入参配置">
                    </el-form-item>
                  </div>
                  <div class="itemRight">
                    <el-form-item label="接口参数名称:">
                      <el-input v-model="formInline.tab1.input1"></el-input>
                    </el-form-item>
                    <el-form-item label="审计参数名称:">
                      <el-input v-model="formInline.tab1.input1"></el-input>
                    </el-form-item>
                    <el-button icon="el-icon-plus" circle></el-button>
                    <el-button icon="el-icon-delete" circle></el-button>
                  </div>
                </div>
                <hr />
                <div class="flexBox">
                  <div class="itemLeft">
                    <el-form-item label="出参配置">
                    </el-form-item>
                  </div>
                  <div class="itemRight">
                    <el-form-item label="接口参数名称:">
                      <el-input v-model="formInline.tab1.input1"></el-input>
                    </el-form-item>
                    <el-form-item label="审计参数名称:">
                      <el-input v-model="formInline.tab1.input1"></el-input>
                    </el-form-item>
                    <el-button icon="el-icon-plus" circle></el-button>
                    <el-button icon="el-icon-delete" circle></el-button>
                  </div>
                </div>
                <hr />
                <div class="flexBox">
                  <div class="itemLeft">
                    <el-form-item label="错误信息">
                    </el-form-item>
                  </div>
                  <div class="itemRight">
                    <el-form-item label="错误信息编码:">
                      <el-radio-group v-model="formInline.tab1.radio1">
                        <el-radio label="GB2312">GB2312</el-radio>
                        <el-radio label="UTF-8">UTF-8</el-radio>
                        <el-radio label="GBK">GBK</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </div>
                </div>

              </el-collapse-item>
            </el-collapse>

          </el-tab-pane>
          <el-tab-pane label="入参配置表" name="tab2">
            <el-collapse v-model="activeNames" class="paddingTop">
              <el-collapse-item title="基础配置" name="1" class="color2">
                <div class="flexBox">
                  <div class="itemLeft">
                    <el-form-item label="入参信息">
                    </el-form-item>
                  </div>
                  <div class="itemRight">
                    <el-form-item label="参数名称:">
                      <el-input v-model="formInline.tab1.input1"></el-input>
                    </el-form-item>
                    <el-form-item label="参数文本描述:">
                      <el-input v-model="formInline.tab1.input1"></el-input>
                    </el-form-item>
                    <el-button icon="el-icon-plus" circle></el-button>
                    <el-button icon="el-icon-delete" circle></el-button>
                  </div>
                </div>
              </el-collapse-item>
              <el-collapse-item title="兼容配置" name="2" class="color1">
                <div class="flexBox">
                  <div class="itemLeft">
                    <el-form-item label="协议定制">
                    </el-form-item>
                  </div>
                  <div class="itemRight">
                    <el-form-item label="解析方式">
                      <el-select v-model="modelArr[0]">
                        <el-option v-for="i in selectArr" :key="i.value" :label="i.label" :value="i.value"> </el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="协议">
                      <el-select v-model="modelArr[2]" placeholder="请选择">
                        <el-option key="0" label="Relay" value="0"></el-option>
                        <el-option key="1" label="Http" value="1"></el-option>
                        <el-option key="2" label="relay-protobuf" value="2"></el-option>
                        <el-option key="3" label="FIT网关" value="3"></el-option>
                        <el-option key="4" label="Fable-PB" value="4"></el-option>
                        <el-option key="5" label="金融网关-Http" value="5"></el-option>
                        <el-option key="6" label="金融网关-Fable-PB" value="6"></el-option>
                        <el-option key="7" label="FIT网关-金融网关-Fable-PB" value="7"></el-option>
                        <el-option key="8" label="Lotus-Relay-URL" value="8"></el-option>
                        <el-option key="9" label="Lotus-Fable-PB" value="9"></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                </div>

              </el-collapse-item>
              <el-collapse-item title="高级配置" name="3" class="color2">
                <div class="flexBox">
                  <div class="itemLeft">
                    <el-form-item label="入参配置">
                    </el-form-item>
                  </div>
                  <div class="itemRight">
                    <el-form-item label="接口参数名称:">
                      <el-input v-model="formInline.tab1.input1"></el-input>
                    </el-form-item>
                    <el-form-item label="审计参数名称:">
                      <el-input v-model="formInline.tab1.input1"></el-input>
                    </el-form-item>
                    <el-button icon="el-icon-plus" circle></el-button>
                    <el-button icon="el-icon-delete" circle></el-button>
                  </div>
                </div>
                <hr />
                <div class="flexBox">
                  <div class="itemLeft">
                    <el-form-item label="出参配置">
                    </el-form-item>
                  </div>
                  <div class="itemRight">
                    <el-form-item label="接口参数名称:">
                      <el-input v-model="formInline.tab1.input1"></el-input>
                    </el-form-item>
                    <el-form-item label="审计参数名称:">
                      <el-input v-model="formInline.tab1.input1"></el-input>
                    </el-form-item>
                    <el-button icon="el-icon-plus" circle></el-button>
                    <el-button icon="el-icon-delete" circle></el-button>
                  </div>
                </div>
                <hr />
                <div class="flexBox">
                  <div class="itemLeft">
                    <el-form-item label="错误信息">
                    </el-form-item>
                  </div>
                  <div class="itemRight">
                    <el-form-item label="错误信息编码:">
                      <el-radio-group v-model="formInline.tab1.radio1">
                        <el-radio label="GB2312">GB2312</el-radio>
                        <el-radio label="UTF-8">UTF-8</el-radio>
                        <el-radio label="GBK">GBK</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </div>
                </div>

              </el-collapse-item>
            </el-collapse>

          </el-tab-pane>
          <el-tab-pane label="出参配置表" name="tab3">

          </el-tab-pane>
        </el-tabs>
      </el-form>
      <!-- 内容  end ----------------------------------   -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 弹窗配置 end ========================================================  -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabActive: 'tab1',
      modelArr: [],
      activeNames: ['2'],
      selectArr: [
        {
          label: 'xml',
          value: '0'
        },
        {
          label: 'json_relay_row_n',
          value: '1'
        },
        {
          label: 'single',
          value: '2'
        },
        {
          label: 'batch_data_field_n',
          value: '3'
        },
        {
          label: 'batch_data_row_n',
          value: '4'
        },
        {
          label: 'part_xml_recinfo_equals_xml',
          value: '5'
        },
        {
          label: 'json_object',
          value: '6'
        },
        {
          label: 'batch_data_row_info',
          value: '7'
        }
      ],
      formInline: {
        selectStr: 'exFxBalanceAdjustmentGetCosUploadURL-特殊业务--境内购付汇平台调账单列表查询接口',
        tab1: {
          input1: '',
          input2: '',
          input3: '',
          input4: '',
          input5: '',
          input6: '',
          input7: '',
          input8: '',
          switch1: false,
          switch2: false,
          switch3: false,
          switch4: false,
          switch5: false,
          switch6: false,
          switch7: false,
          radio1: 'UTF-8',
          input9: '',
          switch8: false,
          switch9: false,
          input10: '',
          switch10: false,
          switch11: false,
          input11: ''
        },
        tab2: {
          select1: '',
          input1: '',
          input4: '测试',
          input5: 'aaa',
          switch1: false,
          switch2: false,
          switch3: false,
          switch4: false,
          switch5: false,
          switch6: false,
          switch7: false,
          switch8: false,
          switch9: false,
          input2: ''
        },
        tab3: {
          input1: '返回数据',
          input2: 'parent',
          switch1: false,
          switch2: false,
          switch3: false,
          switch4: false,
          switch5: false,
          switch6: false,
          switch7: false
        }
      },
      dialogVisible: true,
      tableForm: [
        {
          label: 'ID',
          data: 'data1',
          width: 'a'
        },
        {
          label: '数据源唯一标识',
          data: 'data2',
          width: 'a'
        },
        {
          label: '数据源名称',
          data: 'data3',
          width: 'a'
        },
        {
          label: '数据源描述',
          data: 'data4',
          width: 'a'
        },
        {
          label: '所属分类',
          data: 'data5',
          width: 'a'
        },
        {
          label: '创建人',
          data: 'data6',
          width: 'a'
        },
        {
          label: '创建时间',
          data: 'data7',
          width: 'a'
        },
        {
          label: '修改人',
          data: 'data8',
          width: 'a'
        },
        {
          label: '修改时间',
          data: 'data9',
          width: 'a'
        },
        {
          label: '编辑',
          data: 'data10',
          width: 'a'
        }
      ],
      tableData: [
        {
          data1: '534',
          data2: 'exentRecordBOPAppovalLog',
          data3: 'exentRecordBOPAppovalLog',
          data4: '境外特殊业务--外汇平台生成 COS 下载链接接口',
          data5: '特殊业务',
          data6: 'xxxx',
          data7: '2022-08-01 15:35:35',
          data8: 'yyyy',
          data9: '022-08-01 15:35:42'
        },
        {
          data1: '22',
          data2: 'exentRecordBOP222dalLog',
          data3: 'exentRecordBOP222dalLog',
          data4: '境外特殊业务接口',
          data5: '特殊业务',
          data6: 'abc',
          data7: '2022-08-01 15:35:35',
          data8: 'ddd',
          data9: '022-08-01 15:35:42'
        }
      ]
    }
  },
  created() {
    for (let i = 0; i < 50; i++) {
      this.modelArr.push('')
    }
  }
}
</script>

<style  scoped>
#app {
  padding: 50px;
}
</style>
<style>
.itemLeft {
  width: 16em;
  border-right: 1px solid #ddd;

}

.itemRight {
  width: 57em;
  padding-left: 3em;
  margin-bottom: 0px;

}

.el-collapse-item__wrap {
  border-bottom: 0;
}

.el-collapse-item__header {
  height: 30px;
}

.el-input {
  width: 12em;
}

.el-input__inner {
  /* width: 10em; */
}

hr {
  border: none;
  background-color: #ddd;
  height: 1px;
}

.paddingLeft {
  padding-left: 3em;
  margin-bottom: 0px;
  display: inline-block;
}

.floatRight {
  padding-left: 3em;
  margin-bottom: -13px;
  width: 57em;
  display: inline-block;
}

.configTitle {
  display: inline-block;
  border-right: 1px solid #ddd;
  padding-left: 15px;
}

.flexBox {
  display: flex;
  flex-direction: row
}

.paddingTop .el-collapse-item__content {
  padding-top: 10px;
}

.paddingTop.el-collapse {
  border-top: none;
}

.width16 {
  width: 16em;
}

.el-form-item__label {
  width: 8em;
  text-align: left;
}

.spanWidth {
  width: 8em;
  white-space: nowrap;
}

.labelWidth .el-form-item__label {
  width: 6em;
}

.el-collapse-item__header {
  font-weight: 700;
}

.el-collapse-item__content {
  padding-bottom: 0px;
  /* padding-top: 10px; */
  /* padding-left: 15px;
  padding-right: 15px; */
}

.color2>div>.el-collapse-item__header {
  background-color: #b7e5eb;
  /* margin-left: -15px; */
  /* margin-right: -15px; */
  padding: 0 15px;
}

.color1>div>.el-collapse-item__header {
  background-color: #63b9df;
  /* margin-left: -15px; */
  /* margin-right: -15px; */
  padding: 0 15px;
}

.padding0.el-tabs--border-card>.el-tabs__content {
  padding: 15px 0px;
}
</style>
