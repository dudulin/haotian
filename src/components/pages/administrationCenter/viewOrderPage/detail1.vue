
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
      <div style="min-height:90px;border-bottom:1px solid #ddd;">
        <h1>我们已经听到了你的需求!</h1>
        <h5>客户代表将在24小时之内给你回复</h5>
        <div style="margin-left:200px;margin-right:200px;">
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
      <div style="min-height:90px;border-bottom:1px solid #ddd;">
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
                <span >恒大大</span>
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
                <span >恒大大<i class="el-icon-edit"></i></span> 
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
      <div style="min-height:90px;border-bottom:1px solid #ddd;">
         <div style="margin-left:140px;border:1px solid #ddd;min-height:90px;text-align:left;">
           <h1 style="font-size:26px;font-weight:400;">订单详情</h1>
           <div style="background:#eee;min-height:44px;">
             <img src="../img/1.png" alt="" style="width:80px;height:80px;">
           </div>
         </div>
      </div>
      <div style="min-height:90px;border-bottom:1px solid #ddd;">
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
  computed: {},
  components: {
  }
}
</script>
<style lang="stylus"></style>