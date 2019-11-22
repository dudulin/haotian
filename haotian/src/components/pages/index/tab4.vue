<template>
<div class="tab3">
	<div style="width: 100%;height: 90px;background: #fff;">
		<pc-header theme="white" />
	</div>
	<div class="box">
		<div class="left">
			<div class="text">
				<span class="toAboutUs">热门产品</span>
				<span class="title">从高性能纤维到除尘袋<br />从除尘器设计到安装施工<br />我们能构建更好解决方案</span>
				<span class="text1">皓天集团提供端到端的服务，我们的专业让我们有能力<br />提供更加完善的产品和更加全面的服务。</span>
				<span class="btn">全部产品</span>
			</div>
			<div class="slideBox">
				<swiper :options="swiperOption">
					<swiper-slide v-for="item in productList" :key="item.id">
						<div class="img">
							<img :src="item.imgUrl" alt="">
						</div>
					</swiper-slide>
				</swiper>
			</div>
		</div>
		<div class="right">

		</div>
	</div>
</div>
</template>

<script>
import pcHeader from '../../public/header.vue'
import 'swiper/dist/css/swiper.css'
import {
	swiper,
	swiperSlide
} from 'vue-awesome-swiper'

export default {
	data() {
		return {
			productList: [{
					name: '原材料（圆形布料）',
					imgUrl: require('./img/product3.png')
				},
				{
					name: '除尘袋（工业制品）',
					imgUrl: require('./img/product2.png')
				},
				{
					name: '除尘器管理',
					imgUrl: require('./img/product3.png')
				},
				{
					name: '高性能纤维',
					imgUrl: require('./img/product4.png')
				},
				{
					name: '原材料（圆形布料）',
					imgUrl: require('./img/product3.png')
				},
				{
					name: '除尘袋（工业制品）',
					imgUrl: require('./img/product2.png')
				},
				{
					name: '除尘器管理',
					imgUrl: require('./img/product3.png')
				},
				{
					name: '高性能纤维',
					imgUrl: require('./img/product4.png')
				}
			],
			swiperOption: {
				loop: true,
				slidesPerView: 5,
				spaceBetween: 19,
				autoplay: true
			}
		}
	},
	components: {
		pcHeader,
		swiper,
		swiperSlide
	}
}
</script>

<style scoped lang="stylus">
.tab3
  width: 100%
  height: 100%
  background: url('./img/bg6.png')
  text-align: left
  color: black
  .box
    width: 100%
    height: 100%
    display: flex
    justify-content: space-around
    .left
      width: 620px
      height: 100%
      margin: 10vh 80px
      padding-bottom: 70px
      box-sizing: border-box
      .text
        width: 100%
        span
          display: block
        .toAboutUs
          font-size: 14px
          font-weight: 400
          height: 60px
          line-height: 60px
        .title
          font-size: 38px
          font-weight: 400
        .text1
          margin-top: 15px
          font-size: 16px
          font-weight: 300
          line-height: 30px
        .btn
          width: 110px
          height: 40px
          background: #2490d8
          text-align: center
          line-height: 40px
          font-size: 14px
          color: #fff
          margin-top: 3vh
      .slideBox
        position: absolute
        bottom: 8vh
        width: 700px
        padding: 20px
        background: #fff
        .swiper-container
          .swiper-wrapper
            .swiper-slide
              width: 140px
              height: 90px
              background: #f0f8fd
              .img
                width: 140px
                height: 90px
                margin: 7px auto
                img
                  width: 100%
                  height: 100%
    .right
      overflow: hidden
      flex: 1
      margin-left: 30px
      background: url('./img/bg7.png')
</style>
