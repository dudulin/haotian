export default {
  getConfig(key, that) {
    let config = {}
    switch (key) {
      case 'rowBlock':
        config = {
          getBox(trueValue, testValue, pathBox) {
            let table = []

            let demo = that.getDemoBase('横向排列', pathBox)

            let arr = [{
              title: '紧缩模式',
              prop: 'useReduce'
            }]
            demo.children = that.getChildren(trueValue, testValue, arr)
            table.push(demo)
            let box = that.checkHasChildren(trueValue.items, testValue.items, pathBox, '横向排列')
            table = table.concat(box)
            return table
          }
        }
        break
      case 'columnBlock':
        config = {
          getBox(trueValue, testValue, pathBox) {
            let table = []

            let demo = that.getDemoBase('纵向排列', pathBox)

            let arr = [{
              title: '紧缩模式',
              prop: 'useReduce'
            }]
            demo.children = that.getChildren(trueValue, testValue, arr)
            table.push(demo)
            let box = that.checkHasChildren(trueValue.items, testValue.items, pathBox, '纵向排列')
            table = table.concat(box)
            return table
          }
        }
        break
      case 'tabs':
        config = {
          title: 'Tabs标签页',
          path: 'tabs',
          itemStr: 'items',
          getBox(trueValue, testValue, pathBox) {
            let table = []

            trueValue.data.forEach((i, index) => {
              let i2 = testValue.data[index]
              let path = pathBox.length ? pathBox.join('>') + '>' + i.label : i.label
              let demo = that.getDemo()
              demo.title = i.label
              demo.path = path

              let arr = [{
                title: '开启权限判断显示功能',
                prop: 'powerPromise'
              }, {
                title: '权限位',
                prop: 'powerPromiseBit'
              }, {
                title: '获取待办条数',
                prop: 'ajaxConfig.has'
              }, {
                title: 'url',
                prop: 'ajaxConfig.url'
              }]

              demo.children = that.getChildren(i, i2, arr)
              table.push(demo)
              let box = that.checkHasChildren(i.items, i2.items, [], i.label)
              table = table.concat(box)
            })
            return table
          }
        }
        break
      case 'isCollapse':
        config = {
          title: '折叠板',
          getBox(trueValue, testValue, pathBox) {
            let table = []
            let demo = that.getDemoBase('折叠板', pathBox)

            let arr = [{
              title: '标题',
              prop: 'title'
            }, {
              title: '默认不展开',
              prop: 'close'
            }]
            demo.children = that.getChildren(trueValue, testValue, arr)
            table.push(demo)

            return table
          }
        }
        break
      case 'format':
        config = {
          title: '格式生成器',
          getBox(trueValue, testValue, pathBox) {
            let table = []
            let demo = that.getDemoBase('格式生成器', pathBox)

            let arr = [{
              title: '描述',
              prop: 'data.format.rule.describe'
            }]
            demo.children = that.getChildren(trueValue, testValue, arr)
            table.push(demo)

            return table
          }
        }
        break
      case 'Dataformat':
        config = {
          title: '多层级数据构建容器',
          getBox(trueValue, testValue, pathBox) {
            let table = []

            return table
          }
        }
        break
      case 'isInput':
        config = {
          getBox(trueValue, testValue, pathBox) {
            let table = []
            // let title = `${trueValue.label ? trueValue.label + '-输入框' : ''}`
            let title = '输入框'
            let demo = that.getDemoBase(title, pathBox)
            let arr = [
              {
                prop: 'changeUid',
                title: '使用帐号转换工具'
              }, {
                prop: 'convertToOrder',
                title: '单号转换工具'
              }, {
                prop: 'workOrder',
                title: '选择工单类型'
              }, {
                prop: 'linkeFlag',
                title: '关联工单标识'
              }, {
                prop: 'useReg',
                title: '使用正则校验'
              }, {
                title: '正则表达式',
                prop: 'reg'
              }, {
                prop: 'moneyChange',
                title: '元转分'
              }, {
                prop: 'supportThousands',
                title: '支持千分位'
              }, {
                prop: 'label',
                title: '标题'
              }, {
                prop: 'defaultValue',
                title: '默认值'
              }, {
                prop: 'width',
                title: '输入框宽度'
              }, {
                prop: 'maxlength',
                // judgment: 'unsure',
                title: '输入长度限制'
              }, {
                prop: 'labelWidth',
                title: '标题宽度'
              }, {
                prop: 'placeholder',
                title: '提示文字'
              }, {
                prop: 'isTextarea',
                title: '使用文本输入框(大)'
              }]
            arr.push(that.getCondition())
            demo.children = that.getChildren(trueValue, testValue, arr)
            table.push(demo)
            return table
          }
        }
        break
      case 'isChangeUid':
        config = {
          title: '帐号转换工具',
          getBox(trueValue, testValue, pathBox) {
            let table = []
            let demo = that.getDemoBase('帐号转换工具', pathBox)

            let arr = [
              {
                title: '使用正则校验',
                prop: 'useReg'
              },
              {
                title: '正则表达式',
                prop: 'reg'
              },
              {
                title: '元转分',
                prop: 'moneyChange'
              },
              {
                title: '支持千分位',
                prop: 'supportThousands'
              },
              {
                title: '标题',
                prop: 'label'
              },
              {
                title: '默认值',
                prop: 'defaultValue'
              },
              {
                title: '提示文字',
                prop: 'placeholder'
              }
            ]
            arr.push(that.getCondition())
            demo.children = that.getChildren(trueValue, testValue, arr)
            table.push(demo)

            return table
          }
        }
        break
      case 'isRowData':
        config = {
          title: '多行数据展示',
          getBox(trueValue, testValue, pathBox) {
            let table = []
            let demo = that.getDemoBase('xxxx', pathBox)

            let arr = [{
              title: '紧缩模式',
              prop: 'useReduce'
            }]
            demo.children = that.getChildren(trueValue, testValue, arr)
            table.push(demo)
            let box = that.checkHasChildren(trueValue.items, testValue.items, pathBox, 'xxxx')
            table = table.concat(box)

            return table
          }
        }
        break
      case 'isLinkman':
        config = {
          title: '人员选择器',
          getBox(trueValue, testValue, pathBox) {
            let table = []
            let demo = that.getDemoBase('xxxx', pathBox)

            let arr = [{
              title: '紧缩模式',
              prop: 'useReduce'
            }]
            demo.children = that.getChildren(trueValue, testValue, arr)
            table.push(demo)
            let box = that.checkHasChildren(trueValue.items, testValue.items, pathBox, 'xxxx')
            table = table.concat(box)

            return table
          }
        }
        break
      case 'isRadio':
        config = {
          getBox(trueValue, testValue, pathBox) {
            let table = []

            let demo = that.getDemoBase('单选框', pathBox)

            let arr = [{
              prop: 'style',
              title: '标题'
            }, {
              prop: 'value',
              title: '默认选中值'
            }, {
              key: 'value',
              prop: 'items',
              title: '对应选项',
              arrayConfig: {
                value: '选项',
                label: '对应值'
              }
            }]
            arr.push(that.getCondition())
            demo.children = that.getChildren(trueValue, testValue, arr)
            table.push(demo)
            return table
          }
        }
        break
      case 'isCurrency':
        config = {
          title: '货币转换',
          getBox(trueValue, testValue, pathBox) {
            let table = []
            let demo = that.getDemoBase('xxxx', pathBox)

            let arr = [{
              title: '紧缩模式',
              prop: 'useReduce'
            }]
            demo.children = that.getChildren(trueValue, testValue, arr)
            table.push(demo)
            let box = that.checkHasChildren(trueValue.items, testValue.items, pathBox, 'xxxx')
            table = table.concat(box)

            return table
          }
        }
        break
      case 'isUpload':
        config = {
          title: '上传按钮',
          getBox(trueValue, testValue, pathBox) {
            let table = []
            let demo = that.getDemoBase('xxxx', pathBox)

            let arr = [{
              title: '紧缩模式',
              prop: 'useReduce'
            }]
            demo.children = that.getChildren(trueValue, testValue, arr)
            table.push(demo)
            let box = that.checkHasChildren(trueValue.items, testValue.items, pathBox, 'xxxx')
            table = table.concat(box)

            return table
          }
        }
        break
      case 'isDateTimePicker':
        config = {
          title: '日期选择器',
          getBox(trueValue, testValue, pathBox) {
            let table = []
            let demo = that.getDemoBase('日期选择器', pathBox)

            let arr = [
              {
                title: '日历显示格式',
                prop: 'format'
              },
              {
                title: '数据存储格式',
                prop: 'dataForm'
              },
              {
                title: '使用时间差',
                prop: 'useJetlag'
              },
              {
                title: '标题',
                prop: 'label'
              }
            ]
            demo.children = that.getChildren(trueValue, testValue, arr)
            table.push(demo)
            return table
          }
        }
        break
      case 'isButton':
        config = {
          title: '按钮',
          getBox(trueValue, testValue, pathBox) {
            let table = []
            let demo = that.getDemoBase('按钮', pathBox)

            let arr = [
              {
                title: '自动关闭弹窗',
                prop: 'autoPopOff'
              },
              {
                title: '剔除空值',
                prop: 'emptyKey'
              },
              {
                title: '自动禁用按钮',
                prop: 'autoDisabled'
              },
              {
                title: '按钮类型',
                prop: 'btnState',
                option: {
                  0: '请求数据按钮',
                  1: '调用弹窗按钮',
                  2: '附带提示按钮'
                }
              }
            ]
            arr.push(that.getworkOrder())
            if (trueValue.btnState === 0) {
              arr.push({
                key: 'url',
                prop: 'data',
                title: '接口配置',
                arrayConfig: {
                  url: '接口唯一标识',
                  conditionName: '查询条件库',
                  resDataName: '返回数据存储库',
                  ajaxType: '请求状态'
                }
              })
            }
            if (trueValue.btnState === 1) {
              let box = that.checkHasChildren(trueValue.items, testValue.items, pathBox, '按钮')
              table = table.concat(box)
            }
            if (trueValue.btnState === 2) {

            }
            demo.children = that.getChildren(trueValue, testValue, arr)
            table.push(demo)
            return table
          }
        }
        break
      case 'isTable':
        config = {
          title: '表格',
          getBox(trueValue, testValue, pathBox) {
            let table = []
            let demo = that.getDemoBase('表格', pathBox)

            let arr = [
              {
                title: '接口唯一标识',
                prop: 'wrapApiUrl',
                judgment: 'unsure'
              },
              {
                title: '渲染数据',
                prop: 'name'
              },
              {
                title: '查询条件库',
                prop: 'ajax_config.request_data'
              },
              {
                title: '列参数设置',
                prop: 'tableFormat',
                key: 'title',
                arrayConfig: {
                  title: '选项',
                  data: '字段名',
                  getThousandth: '金额千分位转换',
                  percentage: '数字百分比展示'
                }
              }
            ]
            arr.push(that.getworkOrder())
            demo.children = that.getChildren(trueValue, testValue, arr)
            table.push(demo)
            let box = that.checkHasChildren(trueValue.getPopBtn, testValue.getPopBtn, pathBox, '表格')
            table = table.concat(box)

            return table
          }
        }
        break
      case 'isCheckbox':
        config = {
          title: '复选框',
          getBox(trueValue, testValue, pathBox) {
            let table = []
            let demo = that.getDemoBase('xxxx', pathBox)

            let arr = [{
              title: '紧缩模式',
              prop: 'useReduce'
            }]
            demo.children = that.getChildren(trueValue, testValue, arr)
            table.push(demo)
            let box = that.checkHasChildren(trueValue.items, testValue.items, pathBox, 'xxxx')
            table = table.concat(box)

            return table
          }
        }
        break
      case 'isSelect':
        config = {
          title: '下拉框',
          getBox(trueValue, testValue, pathBox) {
            let table = []
            let demo = that.getDemoBase('xxxx', pathBox)

            let arr = [{
              title: '紧缩模式',
              prop: 'useReduce'
            }]
            demo.children = that.getChildren(trueValue, testValue, arr)
            table.push(demo)
            let box = that.checkHasChildren(trueValue.items, testValue.items, pathBox, 'xxxx')
            table = table.concat(box)

            return table
          }
        }
        break
      case 'isPairTab':
        config = {
          title: '表格：单条',
          getBox(trueValue, testValue, pathBox) {
            let table = []
            let demo = that.getDemoBase('xxxx', pathBox)

            let arr = [{
              title: '紧缩模式',
              prop: 'useReduce'
            }]
            demo.children = that.getChildren(trueValue, testValue, arr)
            table.push(demo)
            let box = that.checkHasChildren(trueValue.items, testValue.items, pathBox, 'xxxx')
            table = table.concat(box)

            return table
          }
        }
        break
      case 'isImage':
        config = {
          title: '图片',
          getBox(trueValue, testValue, pathBox) {
            let table = []
            let demo = that.getDemoBase('xxxx', pathBox)

            let arr = [{
              title: '紧缩模式',
              prop: 'useReduce'
            }]
            demo.children = that.getChildren(trueValue, testValue, arr)
            table.push(demo)
            let box = that.checkHasChildren(trueValue.items, testValue.items, pathBox, 'xxxx')
            table = table.concat(box)

            return table
          }
        }
        break
      case 'isSpan':
        config = {
          title: '文字信息',
          getBox(trueValue, testValue, pathBox) {
            let table = []
            let demo = that.getDemoBase('xxxx', pathBox)

            let arr = [{
              title: '紧缩模式',
              prop: 'useReduce'
            }]
            demo.children = that.getChildren(trueValue, testValue, arr)
            table.push(demo)
            let box = that.checkHasChildren(trueValue.items, testValue.items, pathBox, 'xxxx')
            table = table.concat(box)

            return table
          }
        }
        break
      case 'isTitle':
        config = {
          title: '标题',
          getBox(trueValue, testValue, pathBox) {
            let table = []
            let demo = that.getDemoBase('xxxx', pathBox)

            let arr = [{
              title: '紧缩模式',
              prop: 'useReduce'
            }]
            demo.children = that.getChildren(trueValue, testValue, arr)
            table.push(demo)
            let box = that.checkHasChildren(trueValue.items, testValue.items, pathBox, 'xxxx')
            table = table.concat(box)

            return table
          }
        }
        break
      case 'isDataComparisonTable':
        config = {
          title: '数据对比表格',
          getBox(trueValue, testValue, pathBox) {
            let table = []
            let demo = that.getDemoBase('xxxx', pathBox)

            let arr = [{
              title: '紧缩模式',
              prop: 'useReduce'
            }]
            demo.children = that.getChildren(trueValue, testValue, arr)
            table.push(demo)
            let box = that.checkHasChildren(trueValue.items, testValue.items, pathBox, 'xxxx')
            table = table.concat(box)

            return table
          }
        }
        break
      case 'isSelectArr':
        config = {
          title: '多选下拉框',
          getBox(trueValue, testValue, pathBox) {
            let table = []
            let demo = that.getDemoBase('xxxx', pathBox)

            let arr = [{
              title: '紧缩模式',
              prop: 'useReduce'
            }]
            demo.children = that.getChildren(trueValue, testValue, arr)
            table.push(demo)
            let box = that.checkHasChildren(trueValue.items, testValue.items, pathBox, 'xxxx')
            table = table.concat(box)

            return table
          }
        }
        break
      case 'isTooltip':
        config = {
          title: '文字提示',
          getBox(trueValue, testValue, pathBox) {
            let table = []
            let demo = that.getDemoBase('xxxx', pathBox)

            let arr = [{
              title: '紧缩模式',
              prop: 'useReduce'
            }]
            demo.children = that.getChildren(trueValue, testValue, arr)
            table.push(demo)
            let box = that.checkHasChildren(trueValue.items, testValue.items, pathBox, 'xxxx')
            table = table.concat(box)

            return table
          }
        }
        break
      case 'isCascader':
        config = {
          title: '级联选择器',
          getBox(trueValue, testValue, pathBox) {
            let table = []
            let demo = that.getDemoBase('xxxx', pathBox)

            let arr = [{
              title: '紧缩模式',
              prop: 'useReduce'
            }]
            demo.children = that.getChildren(trueValue, testValue, arr)
            table.push(demo)
            let box = that.checkHasChildren(trueValue.items, testValue.items, pathBox, 'xxxx')
            table = table.concat(box)

            return table
          }
        }
        break
      case 'isRatifyButton':
        config = {
          title: '审批按钮',
          getBox(trueValue, testValue, pathBox) {
            let table = []
            let demo = that.getDemoBase('xxxx', pathBox)

            let arr = [{
              title: '紧缩模式',
              prop: 'useReduce'
            }]
            demo.children = that.getChildren(trueValue, testValue, arr)
            table.push(demo)
            let box = that.checkHasChildren(trueValue.items, testValue.items, pathBox, 'xxxx')
            table = table.concat(box)

            return table
          }
        }
        break
      case 'isAllyButton':
        config = {
          title: '校验按钮',
          getBox(trueValue, testValue, pathBox) {
            let table = []
            let demo = that.getDemoBase('xxxx', pathBox)

            let arr = [{
              title: '紧缩模式',
              prop: 'useReduce'
            }]
            demo.children = that.getChildren(trueValue, testValue, arr)
            table.push(demo)
            let box = that.checkHasChildren(trueValue.items, testValue.items, pathBox, 'xxxx')
            table = table.concat(box)

            return table
          }
        }
        break
      case 'islinkageSelect':
        config = {
          title: '联行号下拉框',
          getBox(trueValue, testValue, pathBox) {
            let table = []
            let demo = that.getDemoBase('xxxx', pathBox)

            let arr = [{
              title: '紧缩模式',
              prop: 'useReduce'
            }]
            demo.children = that.getChildren(trueValue, testValue, arr)
            table.push(demo)
            let box = that.checkHasChildren(trueValue.items, testValue.items, pathBox, 'xxxx')
            table = table.concat(box)

            return table
          }
        }
        break
      case 'isnewLinkageSelect':
        config = {
          title: 'NEW联行号下拉框',
          getBox(trueValue, testValue, pathBox) {
            let table = []
            let demo = that.getDemoBase('xxxx', pathBox)

            let arr = [{
              title: '紧缩模式',
              prop: 'useReduce'
            }]
            demo.children = that.getChildren(trueValue, testValue, arr)
            table.push(demo)
            let box = that.checkHasChildren(trueValue.items, testValue.items, pathBox, 'xxxx')
            table = table.concat(box)

            return table
          }
        }
        break
      case 'isChart':
        config = {
          title: '图表',
          getBox(trueValue, testValue, pathBox) {
            let table = []
            let demo = that.getDemoBase('xxxx', pathBox)

            let arr = [{
              title: '紧缩模式',
              prop: 'useReduce'
            }]
            demo.children = that.getChildren(trueValue, testValue, arr)
            table.push(demo)
            let box = that.checkHasChildren(trueValue.items, testValue.items, pathBox, 'xxxx')
            table = table.concat(box)

            return table
          }
        }
        break
      case 'isShowMoneyBtn':
        config = {
          title: '小眼睛',
          getBox(trueValue, testValue, pathBox) {
            let table = []
            let demo = that.getDemoBase('xxxx', pathBox)

            let arr = [{
              title: '紧缩模式',
              prop: 'useReduce'
            }]
            demo.children = that.getChildren(trueValue, testValue, arr)
            table.push(demo)
            let box = that.checkHasChildren(trueValue.items, testValue.items, pathBox, 'xxxx')
            table = table.concat(box)

            return table
          }
        }
        break
      case 'isSeparate':
        config = {
          title: '换行',
          getBox(trueValue, testValue, pathBox) {
            let table = []
            let demo = that.getDemoBase('xxxx', pathBox)

            let arr = [{
              title: '紧缩模式',
              prop: 'useReduce'
            }]
            demo.children = that.getChildren(trueValue, testValue, arr)
            table.push(demo)
            let box = that.checkHasChildren(trueValue.items, testValue.items, pathBox, 'xxxx')
            table = table.concat(box)

            return table
          }
        }
        break
      default:
        config = null
        break
    }
    return config
  }
}
