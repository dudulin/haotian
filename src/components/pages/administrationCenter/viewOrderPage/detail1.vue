
<template>
  <div class="bigBox">
    <!-- 上 50px -->
    <div class="box" style="height:60px">
      <div class="item">订单编号:</div>
      <div class="item">
        <el-button @click="btnClick">返回</el-button>
      </div>
    </div>
    <!-- 中 自适应 -->
    <div style="background:#fff;flex-grow:1;">
      <div class="box1">
        <div style="padding:0 50px;">
          <h1 style="font-size:35px;font-weight:400;line-height:75px;">我们已经听到了你的需求!</h1>
          <h5 style="margin-bottom:20px;">客户代表将在<span class="colorBlue">24小时</span>之内给你回复</h5>
          <el-steps :active="0" align-center class="myStep">
            <el-step title="询盘" class="active" description="2019-09-04 16:23:56"></el-step>
            <el-step title="成交" description></el-step>
            <el-step title="备货中" class="active" description></el-step>
            <el-step title="等待发货" description></el-step>
            <el-step title="已发货" description></el-step>
            <el-step title="售后中" description></el-step>
          </el-steps>
        </div>
      </div>
      <div class="box1">
        <div>
          <ul class="testUl">
            <li>
              <div>
                <p>
                  <b>绍辉</b>
                  <span class="style1">客户代表</span>
                </p>
                <p>
                  <span>电话</span>15672900012
                </p>
                <p>
                  <span>邮箱</span>SH@hotian.com
                </p>
              </div>
            </li>
            <li>
              <div>
                <p>
                  <span>客户</span>
                  <span>恒大大</span>
                </p>
                <p>
                  <span>电话</span>18292992992
                </p>
                <p class="style3">
                  查看客户详情
                  <i class="el-icon-arrow-right"></i>
                </p>
              </div>
            </li>
            <li>
              <div>
                <p>
                  <span>客户</span>
                  <span>
                    恒大大
                    <i class="el-icon-edit"></i>
                  </span>
                </p>
                <p>
                  <span>电话</span>18292992992
                </p>
                <p class="style3">
                  查看客户详情
                  <i class="el-icon-arrow-right"></i>
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="box1">
        <div style="padding:0 5%;">
          <h1 style="font-size:26px;font-weight:400;text-align:left;">订单详情</h1>
          <div style="display: flex;justify-content:space-between">
            <img src="../img/1.png" alt style="width:80px;height:100%;" />
            <table class="tableStyl1">
              <tr class="colorGray">
                <td>产品名称</td>
                <td>产品型号</td>
                <td>产品数量</td>
                <td>产品类型</td>
              </tr>
              <tr>
                <td>除尘大化500G</td>
                <td>2.15米</td>
                <td>2000米</td>
                <td>布料</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
      <div class="box1">
        <div style="padding:0 5%;">
          <h1 style="font-size:26px;font-weight:400;text-align:left;">收货地址</h1>
          <div style="display: flex;justify-content:space-between">
            <ul class="ulStyle2">
              <li><span >收件人</span>柠檬</li>
              <li><span >联系电话</span>备注</li>
              <li><span >配送地址</span>吉林省白城市镇赉县长江路, 10021</li>
              <li class="colorBlue"><span >备注 <sup >*</sup></span>这里单子比较急，请优先排单生产 </li>
            </ul>
            
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  props: {
    callBack: {
      type: Function,
      default: () => { }
    }
  },
  data() {
    return {

    }
  },
  created() {
    console.log(JSON.stringify({ title: '客户详情', value: 'detail1' }))
  },
  methods: {
    btnClick() {
      let content = `你添加了${this.message1}客户名称为 <span style="color:#3293D7">${this.message2}</span> 的客户 <p style="font-size:30px;line-height:50px;">是否确认添加？</p>`
      this.$confirm(content, '提示', {
        dangerouslyUseHTMLString: true,
        cancelButtonClass: 'bigBtn',
        confirmButtonClass: 'bigBtn',
        customClass: 'width600',
        center: true
      }).then(() => {

      }).catch(() => {

      })
    }
  },
  computed: {

  },
  components: {
  }
}
</script>
<style lang="stylus"></style>