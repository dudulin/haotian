<template>
<div id="tab1" style="display: flex;flex-direction: column;justify-content: space-around;">
	<div style="width: 100%;height: 90px;background: #fff; position: absolute;top: 0;">
		<pc-header theme="white" />
	</div>
	<div class="headline">
		<span class="cn">皓天 - 我们保护你的空气</span>
		<span class="en">We clean up the air</span>
	</div>
	<div class="enquiry">
		<div class="title">
			<span style="font-size: 50px;font-weight: 600;">开启你的询价</span>
			<span style="font-size: 28px;font-weight: 500;">我知道我需要的产品</span>
		</div>
		<div class="search">
			<span class="text">查询我的订单状态</span>
			<span class="searchBody">
				<select v-model="searchIn">
					<option value="phone">手机</option>
					<option value="email">邮箱</option>
				</select>
				<span style="display: flex;" v-if="searchIn === 'phone'">
					<span class="num86">
						<span class="text">+ 86</span>
					</span>
					<el-input v-model="input" placeholder="请输入手机号码" clearable></el-input>
					<el-button type="primary">查询</el-button>
				</span>
				<span style="display: flex;" v-if="searchIn === 'email'">
					<el-input v-model="input2" placeholder="请输入邮箱" clearable style="width: 325px;"></el-input>
					<el-button type="primary">查询</el-button>
				</span>
			</span>
		</div>
	</div>
	<div class="productList">
		<swiper :options="swiperOption">
			<swiper-slide v-for="item in productList" :key="item.id">
				<div class="img">
					<img :src="item.imgUrl" alt="">
				</div>
				<p class="name">{{item.name}}</p>
			</swiper-slide>
		</swiper>
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
			input: '',
			input2: '',
			searchIn: 'phone',
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
#tab1
  width: 100%
  height: 100%
  background: url('./img/bg1.png')
  .headline
    margin-top: 100px
    span
      display: block
      margin-left: 80px
      text-align: left
    .cn
      font-size 54px
      font-weight 500
      color rgba(255,255,255,1)
      line-height 70px
      height: 70px
    .en
      font-size: 34px
      font-weight: bold
      color: rgba(255,255,255,1)
      line-height: 45px
  .enquiry
    margin-top: 20px
    display: flex
    justify-content: space-between
    width: 100%
    .title
      color: #fff
      margin-left: 80px
      width: 350px
      text-align: left
      span
        display: block
    .search
      .text
        font-size: 30px
        font-weight: 600
        color: rgba(255,255,255,1)
        display: block
        text-align: right
        margin-right: 85px
      .searchBody
        display: block
        margin-right: 85px
        display: flex
        margin: 20px 85px 0 0
        select
          width: 110px
          height: 70px
          border: none
          text-align: center
          text-align-last: center
          font-size: 16px
          font-weight: 400
          color: rgba(34,34,34,1)
        .num86
          height: 70px
          width: 90px
          display: flex
          align-items: center
          background: #fff
          .text
            width: 90px
            height: 25px
            font-size: 22px
            font-weight: 400
            color: rgba(153,153,153,1)
            margin: 0
            text-align: center
            border-right: 2px solid rgba(3,3,3,0.1)
        .el-button
          border-radius: 0
          width: 140px
          background: #4790D3
          font-size: 18px
          font-weight: 300
  .productList
    margin: 60px 80px 0
    .swiper-container
      .swiper-wrapper
        .swiper-slide
          width: 330px
          height: 220px
          background: #f0f8fd
          .img
            width: 265px
            height: 150px
            margin: 7px auto
            img
              width: 100%
              height: 100%
</style>
