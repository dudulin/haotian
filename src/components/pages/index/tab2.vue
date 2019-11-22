<template>
<div class="tab2">
	<div style="width: 100%;height: 90px;background: #fff;">
		<pc-header theme="white" />
	</div>
	<div class="box">
		<div class="left">
			<div class="text">
				<span class="toAboutUs">公司介绍</span>
				<span class="title">21年的历程<br />皓天—环境保护的卫士</span>
				<span class="text1">皓天成立于1997年，作为第一代针对环保的企业<br />我们的使命是通过我们的专业和决心，让天空更加湛蓝</span>
			</div>
			<div class="btn">
				<router-link to="/service">
					<div class="service">
						<span>我们的服务</span>
						<i>></i>
					</div>
				</router-link>
				<router-link to="/product">
					<div class="product">
						<span>我们的产品</span>
						<i>></i>
					</div>
				</router-link>
			</div>
		</div>
		<div class="right">
			<div class="item" :style="'background-image: url('+bg1+')'">
				<span class="num">01</span>
				<span class="cn">除尘流程设计</span>
				<span class="en">Dust removal<br /> process design</span>
			</div>
			<div class="item" style="margin-top: 55px;">

			</div>
			<div class="item" :style="'background-image: url('+bg2+')'">

			</div>
		</div>
	</div>
</div>
</template>

<script>
import pcHeader from '../../public/header.vue'

export default {
	data() {
		return {
			bg1: require('./img/bg2.png'),
			bg2: require('./img/bg4.png')
		}
	},
	components: {
		pcHeader
	}
}
</script>

<style scoped lang="stylus">
.tab2
  width: 100%
  height: 100%
  background: url('./img/bg9.png')
  text-align: left
  .box
    width: 100%
    height: 100%
    display: flex
    justify-content: space-around
    .left
      width: 400px
      height: 100%
      display: flex
      flex-direction: column
      justify-content: space-around
      .text
        width: 100%
        span
          display: block
        .toAboutUs
          font-size: 14px
          font-weight: 400
          color: rgba(34,34,34,1)
          height: 60px
          line-height: 60px
        .title
          font-size: 38px
          font-weight: 400
          color: rgba(34,34,34,1)
        .text1
          margin-top: 15px
          font-size: 16px
          font-weight: 300
          color: rgba(0,0,0,1)
          line-height: 30px
      .btn
        width: 100%
        div
          width: 400px
          height: 60px
          margin-top: 30px
          font-size: 18px
          line-height: 60px
          box-sizing: border-box
          border: 2px solid rgba(218,218,218,0.4)
          padding: 0 30px
          display: flex
          justify-content: space-between
        .service
          background: #248ED8;
        .product
          color: rgba(34,34,34,1)
          margin-bottom: 50px
    .right
      display: flex
      align-items: center
      justify-content: space-between
      width: 680px
      .item
        float: left
        width: 220px
        height: 440px
        background-image: url('./img/bg3.png')
        span
          display: block
        .num
          font-size: 60px
          font-weight: bold
          color: rgba(255,255,255,0.4)
          margin: 20px 20px
        .cn
          font-size: 20px
          color: rgba(255,255,255,0.8)
          margin: 10px 20px
        .en
          font-size: 16px
          color: rgba(255,255,255,0.8)
          margin: 10px 20px
</style>
