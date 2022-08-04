<template>
  <div id="app">
    <h3 data-v-12bceac4=""
      style="line-height: 3em; color: rgb(64, 158, 255); font-weight: bold; display: inline-block;">
      数据源管理
    </h3>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column v-for="config in tableForm" :key="config.label" :prop="config.data" :label="config.label">
        <template slot-scope="scope">
          <el-button v-if="config.data === 'data10'" size="medium" type="primary" @click="dialogVisible = true">修改
          </el-button>
          <el-button v-if="config.data === 'data10'" size="medium" type="danger" @click="() => { }">删除</el-button>
          <span v-else>{{ scope.row[config.data] }}</span>
        </template>
      </el-table-column>
    </el-table>
    <!-- 弹窗配置 start ========================================================  -->
    <el-dialog title="数据源配置" :visible.sync="dialogVisible" width="80%">
      <!-- 内容  start ----------------------------------   -->
      <el-form :inline="true" :model="formInline">
        <el-form-item label="活数据源接口名称动区域">
          <el-select v-model="formInline.selectStr" style="width:600px">
            <el-option label="exFxBalanceAdjustmentGetCosUploadURL-特殊业务--境内购付汇平台调账单列表查询接口" value="a">
            </el-option>
            <el-option label="bbb" value="bbb"></el-option>
          </el-select>
        </el-form-item>
        <el-tabs type="border-card" v-model="activeName">
          <el-tab-pane label="接口配置表" name="tab1">
            <el-collapse v-model="xx">
              <el-collapse-item title="返回数据类型" name="1">
                <el-form-item label="序号">
                  <el-input v-model="formInline.tab1.input1"></el-input>
                </el-form-item>
                <el-form-item label="别名">
                  <el-input v-model="formInline.tab1.input2"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-switch v-model="formInline.tab1.switch1" active-text="单条" inactive-text="多条">
                  </el-switch>
                </el-form-item>
              </el-collapse-item>
              <el-collapse-item title="层级定位" name="2">
                <el-form-item label="是否多层解析">
                  <el-switch v-model="formInline.tab1.switch2"></el-switch>
                </el-form-item>
                <el-form-item label="解析层级" v-if="formInline.tab1.switch2">
                  <el-input v-model="formInline.tab1.input3"></el-input>
                </el-form-item>
              </el-collapse-item>
              <el-collapse-item title="兼容配置" name="3">
                <el-form-item label="是否密钥系统签名">
                  <el-switch v-model="formInline.tab1.switch3"></el-switch>
                </el-form-item>
                <template v-if="formInline.tab1.switch3">
                  <el-form-item label="签名参数名称">
                    <el-input v-model="formInline.tab1.input4"></el-input>
                  </el-form-item>
                  <el-form-item label="密钥系统KeyId">
                    <el-input v-model="formInline.tab1.input5"></el-input>
                  </el-form-item>
                  <el-form-item label="算法版本">
                    <el-input v-model="formInline.tab1.input6"></el-input>
                  </el-form-item>
                  <el-form-item label="是否使用标准国密">
                    <el-switch v-model="formInline.tab1.switch4"></el-switch>
                  </el-form-item>
                  <el-form-item label="序号">
                    <el-input v-model="formInline.tab1.input7"></el-input>
                  </el-form-item>
                  <el-form-item label="编码:">
                    <el-radio-group v-model="formInline.tab1.radio1">
                      <el-radio label="GB2312">GB2312</el-radio>
                      <el-radio label="UTF-8">UTF-8</el-radio>
                      <el-radio label="GBK">GBK</el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="签名规则">
                    <el-input v-model="formInline.tab1.input8"></el-input>
                  </el-form-item>
                  <el-form-item label="是否去空">
                    <el-switch v-model="formInline.tab1.switch5"></el-switch>
                  </el-form-item>
                  <el-form-item label="是否添加时间戳">
                    <el-switch v-model="formInline.tab1.switch6"></el-switch>
                  </el-form-item>
                </template>
                <hr />

                <el-form-item label="是否密钥验证签名">
                  <el-switch v-model="formInline.tab1.switch7"></el-switch>
                </el-form-item>
                <template v-if="formInline.tab1.switch7">
                  <el-form-item label="签名名称">
                    <el-input v-model="formInline.tab1.input9"></el-input>
                  </el-form-item>
                  <el-form-item label="密钥KeyId">
                    <el-input v-model="formInline.tab1.input9"></el-input>
                  </el-form-item>
                  <el-form-item label="算法版本">
                    <el-input v-model="formInline.tab1.input9"></el-input>
                  </el-form-item>
                  <el-form-item label="签名规则">
                    <el-input v-model="formInline.tab1.input9"></el-input>
                  </el-form-item>

                  <el-form-item label="是否去空">
                    <el-switch v-model="formInline.tab1.switch8"></el-switch>
                  </el-form-item>
                  <el-form-item label="是否添加时间戳">
                    <el-switch v-model="formInline.tab1.switch9"></el-switch>
                  </el-form-item>

                  <template v-if="formInline.tab1.switch9">
                    <el-form-item label="时间戳名称">
                      <el-input v-model="formInline.tab1.input10"></el-input>
                    </el-form-item>
                    <el-form-item label="时间戳长度">
                      <el-input v-model="formInline.tab1.input10"></el-input>
                    </el-form-item>
                  </template>
                </template>
              </el-collapse-item>
              <el-collapse-item title="高级配置" name="4">

                <el-form-item label="开启条件判断">
                  <el-switch v-model="formInline.tab1.switch10"></el-switch>
                </el-form-item>
                <template v-if="formInline.tab1.switch10">
                  <el-form-item label="参数名称">
                    <el-input v-model="formInline.tab1.input11"></el-input>
                  </el-form-item>
                  <el-form-item label="条件操作项">
                    <el-input v-model="formInline.tab1.input11"></el-input>
                  </el-form-item>
                  <el-form-item label="条件操作值">
                    <el-input v-model="formInline.tab1.input11"></el-input>
                  </el-form-item>
                  <el-form-item label="满足条件后触发操作项">
                    <el-input v-model="formInline.tab1.input11"></el-input>
                  </el-form-item>
                  <el-button plain>增加</el-button>
                  <el-button plain>删除</el-button>
                </template>
                <el-form-item label="是否错误码转义">
                  <el-switch v-model="formInline.tab1.switch11"></el-switch>
                </el-form-item>
              </el-collapse-item>
            </el-collapse>

          </el-tab-pane>
          <el-tab-pane label="入参配置" name="tab2">
            <el-form-item label="描述">
              <el-input v-model="formInline.tab2.input4"></el-input>
            </el-form-item>
            <el-form-item label="参数名">
              <el-input v-model="formInline.tab2.input5"></el-input>
            </el-form-item>
            <el-form-item label="是否显示">
              <el-switch v-model="formInline.tab2.switch1"></el-switch>
            </el-form-item>
            <el-collapse v-model="tab2">
              <el-collapse-item title="aaa参数配置" name="1">


                <el-collapse v-model="sss">
                  <el-collapse-item title="基础配置" name="1">
                    <el-form-item label="密钥系统配置">
                      <el-switch v-model="formInline.tab2.switch3"></el-switch>
                    </el-form-item>
                    <template v-if="formInline.tab2.switch3">

                      <el-form-item label="密钥选项">
                        <el-select v-model="formInline.tab2.select1">
                          <el-option label="解密" value="1"> </el-option>
                          <el-option label="加密" value="2"></el-option>
                        </el-select>
                      </el-form-item>

                      <el-form-item label="密钥系统KeyId">
                        <el-input></el-input>
                      </el-form-item>
                      <el-form-item label="算法版本">
                        <el-input></el-input>
                      </el-form-item>

                      <el-form-item label="编码:">
                        <el-radio-group>
                          <el-radio label="GB2312">GB2312</el-radio>
                          <el-radio label="UTF-8">UTF-8</el-radio>
                          <el-radio label="GBK">GBK</el-radio>
                        </el-radio-group>
                      </el-form-item>

                      <el-form-item label="是否使用标准国密">
                        <el-switch v-model="formInline.tab2.switch7"></el-switch>
                      </el-form-item>

                      <el-form-item label="序号" v-if="formInline.tab2.switch7">
                        <el-input></el-input>
                      </el-form-item>
                    </template>

                  </el-collapse-item>
                  <el-collapse-item title="兼容配置" name="2">
                    <el-form-item label="是否定制算法解密">
                      <el-switch v-model="formInline.tab2.switch5"></el-switch>
                    </el-form-item>
                    <template v-if="formInline.tab2.switch5">
                      <el-form-item label="算法类型">
                        <el-input></el-input>
                      </el-form-item>
                      <el-form-item label=" key">
                        <el-input></el-input>
                      </el-form-item>
                      <el-form-item label="解密规则">
                        <el-input></el-input>
                      </el-form-item>
                      <el-form-item label="编码:">
                        <el-radio-group>
                          <el-radio label="GB2312">GB2312</el-radio>
                          <el-radio label="UTF-8">UTF-8</el-radio>
                          <el-radio label="GBK">GBK</el-radio>
                        </el-radio-group>
                      </el-form-item>
                    </template>
                  </el-collapse-item>
                  <el-collapse-item title="高级配置" name="3">
                    <el-form-item label="组合配置">
                      <el-switch v-model="formInline.tab2.switch2"></el-switch>
                    </el-form-item>
                    <template v-if="formInline.tab2.switch2">
                      <el-form-item label="绑定参数">
                        <el-input v-model="formInline.tab2.input2"></el-input>
                      </el-form-item>
                      <el-form-item label="映射返回数据层级">
                        <el-input></el-input>
                      </el-form-item>
                    </template>
                    <br />
                    <el-form-item label="是否关联映射">
                      <el-switch v-model="formInline.tab2.switch6"></el-switch>
                    </el-form-item>
                    <template v-if="formInline.tab2.switch6">
                      <el-form-item label="属性名称映射">
                        <el-input></el-input>
                      </el-form-item>
                      <el-form-item label="是否覆盖属性">
                        <el-switch v-model="formInline.tab2.switch9"></el-switch>
                      </el-form-item>
                    </template>
                    <br />
                  </el-collapse-item>
                </el-collapse>
              </el-collapse-item>
            </el-collapse>
          </el-tab-pane>
          <el-tab-pane label="出参配置" name="tab3">
            <el-form-item label="描述">
              <el-input v-model="formInline.tab3.input1"></el-input>
            </el-form-item>
            <el-form-item label="参数名">
              <el-input v-model="formInline.tab3.input2"></el-input>
            </el-form-item>
            <el-form-item label="是否显示">
              <el-switch v-model="formInline.tab2.switch1"></el-switch>
            </el-form-item>
            <el-button type="primary">展开已配置</el-button>
            <el-button type="primary">展开全部配置</el-button>
            <el-collapse v-model="sss">
              <el-collapse-item title="parent 参数配置" name="1">
                <el-collapse v-model="sss">
                  <el-collapse-item title="基础配置" name="1">
                    <el-form-item label="转义">
                      <el-switch v-model="formInline.tab3.switch1"></el-switch>
                    </el-form-item>
                    <template v-if="formInline.tab3.switch1">
                      <el-form-item label="字典仓库">
                        <el-input></el-input>
                      </el-form-item>
                      <el-form-item label="多重转义">
                        <el-switch></el-switch>
                      </el-form-item>
                    </template>

                    <br />
                    <el-form-item label="乘积">
                      <el-switch v-model="formInline.tab3.switch3"></el-switch>
                    </el-form-item>
                    <template v-if="formInline.tab3.switch3">
                      <el-form-item label="乘积倍数">
                        <el-input></el-input>
                      </el-form-item>
                    </template>
                    <br />
                    <el-form-item label="密钥系统配置">
                      <el-switch v-model="formInline.tab2.switch3"></el-switch>
                    </el-form-item>
                    <template v-if="formInline.tab2.switch3">

                      <el-form-item label="密钥选项">
                        <el-select v-model="formInline.tab2.select1">
                          <el-option label="解密" value="1"> </el-option>
                          <el-option label="加密" value="2"></el-option>
                        </el-select>
                      </el-form-item>

                      <el-form-item label="密钥系统KeyId">
                        <el-input></el-input>
                      </el-form-item>
                      <el-form-item label="算法版本">
                        <el-input></el-input>
                      </el-form-item>

                      <el-form-item label="编码:">
                        <el-radio-group>
                          <el-radio label="GB2312">GB2312</el-radio>
                          <el-radio label="UTF-8">UTF-8</el-radio>
                          <el-radio label="GBK">GBK</el-radio>
                        </el-radio-group>
                      </el-form-item>

                      <el-form-item label="是否使用标准国密">
                        <el-switch v-model="formInline.tab2.switch7"></el-switch>
                      </el-form-item>

                      <el-form-item label="序号" v-if="formInline.tab2.switch7">
                        <el-input></el-input>
                      </el-form-item>
                    </template>

                  </el-collapse-item>
                  <el-collapse-item title="兼容配置" name="2">
                    <el-form-item label="是否定制算法解密">
                      <el-switch v-model="formInline.tab2.switch5"></el-switch>
                    </el-form-item>
                    <template v-if="formInline.tab2.switch5">
                      <el-form-item label="算法类型">
                        <el-input></el-input>
                      </el-form-item>
                      <el-form-item label=" key">
                        <el-input></el-input>
                      </el-form-item>
                      <el-form-item label="解密规则">
                        <el-input></el-input>
                      </el-form-item>
                      <el-form-item label="编码:">
                        <el-radio-group>
                          <el-radio label="GB2312">GB2312</el-radio>
                          <el-radio label="UTF-8">UTF-8</el-radio>
                          <el-radio label="GBK">GBK</el-radio>
                        </el-radio-group>
                      </el-form-item>
                    </template>
                  </el-collapse-item>
                  <el-collapse-item title="高级配置" name="3">
                    <el-form-item label="组合配置">
                      <el-switch v-model="formInline.tab2.switch2"></el-switch>
                    </el-form-item>
                    <template v-if="formInline.tab2.switch2">
                      <el-form-item label="绑定参数">
                        <el-input v-model="formInline.tab2.input2"></el-input>
                      </el-form-item>
                      <el-form-item label="映射返回数据层级">
                        <el-input></el-input>
                      </el-form-item>
                    </template>
                    <br />
                    <el-form-item label="是否关联映射">
                      <el-switch v-model="formInline.tab2.switch6"></el-switch>
                    </el-form-item>
                    <template v-if="formInline.tab2.switch6">
                      <el-form-item label="属性名称映射">
                        <el-input></el-input>
                      </el-form-item>
                      <el-form-item label="是否覆盖属性">
                        <el-switch v-model="formInline.tab2.switch9"></el-switch>
                      </el-form-item>
                    </template>
                    <br />
                    <el-form-item label="是否定制算法解密">
                      <el-switch v-model="formInline.tab2.switch5"></el-switch>
                    </el-form-item>
                    <template v-if="formInline.tab2.switch5">
                      <el-form-item label="算法类型">
                        <el-input></el-input>
                      </el-form-item>
                      <el-form-item label=" key">
                        <el-input></el-input>
                      </el-form-item>
                      <el-form-item label="解密规则">
                        <el-input></el-input>
                      </el-form-item>
                      <el-form-item label="编码:">
                        <el-radio-group>
                          <el-radio label="GB2312">GB2312</el-radio>
                          <el-radio label="UTF-8">UTF-8</el-radio>
                          <el-radio label="GBK">GBK</el-radio>
                        </el-radio-group>
                      </el-form-item>
                    </template>
                    <br />
                    <el-form-item label="敏感数据">
                      <el-switch v-model="formInline.tab3.switch4"></el-switch>
                    </el-form-item>

                    <template v-if="formInline.tab3.switch4">
                      <el-form-item label="开始标识">
                        <el-input></el-input>
                      </el-form-item>
                      <el-form-item label="结束标识">
                        <el-input></el-input>
                      </el-form-item>
                      <el-form-item label="敏感级别">
                        <el-input></el-input>
                      </el-form-item>
                      <el-form-item label="敏感规则">
                        <el-input></el-input>
                      </el-form-item>
                      <el-form-item label="是否开启天眼">
                        <el-switch v-model="formInline.tab3.switch5"></el-switch>
                      </el-form-item>
                    </template>
                  </el-collapse-item>
                </el-collapse>
              </el-collapse-item>
            </el-collapse>
            <el-collapse v-model="sx">
              <el-collapse-item title="parent子集配置" name="1">
                <el-collapse v-model="sx">
                  <el-collapse-item title="parent>ddd 参数配置" name="1">
                    <el-collapse v-model="tab2">
                      <el-collapse-item title="基础配置" name="1">
                        基础配置
                      </el-collapse-item>
                      <el-collapse-item title="兼容配置" name="1">
                        兼容配置
                      </el-collapse-item>
                      <el-collapse-item title="高级配置" name="1">
                        高级配置
                      </el-collapse-item>
                    </el-collapse>
                  </el-collapse-item>
                  <el-collapse-item title="parent>abc 参数配置" name="">
                    <el-collapse v-model="tab2">
                      <el-collapse-item title="基础配置" name="1">
                        基础配置
                      </el-collapse-item>
                      <el-collapse-item title="兼容配置" name="1">
                        兼容配置
                      </el-collapse-item>
                      <el-collapse-item title="高级配置" name="1">
                        高级配置
                      </el-collapse-item>
                    </el-collapse>
                  </el-collapse-item>
                </el-collapse>
              </el-collapse-item>
            </el-collapse>
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
      activeName: 'tab1',
      activeNames: ['1'],
      formInline: {
        selectStr: 'exFxBalanceAdjustmentGetCosUploadURL-特殊业务--境内购付汇平台调账单列表查询接口',
        tab1: {
          input1: 'aa',
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
      dialogVisible: false,
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
  }
}
</script>

<style  scoped>
#app {
  padding: 50px;
}
</style>
