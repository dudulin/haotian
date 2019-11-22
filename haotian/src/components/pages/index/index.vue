<template>
<div id="index">
	<div class="content">
		<swiper :options="swiperOption">
			<swiper-slide><tab1 /></swiper-slide>
      <swiper-slide><tab2 /></swiper-slide>
      <swiper-slide><tab3 /></swiper-slide>
      <swiper-slide><tab4 /></swiper-slide>
      <swiper-slide><tab5 /></swiper-slide>
      <swiper-slide><tab6 /></swiper-slide>
			<div class="swiper-pagination" slot="pagination"></div>
		</swiper>
	</div>
</div>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import {
	swiper,
	swiperSlide
} from 'vue-awesome-swiper'
import tab1 from './tab1.vue'
import tab2 from './tab2.vue'
import tab3 from './tab3.vue'
import tab4 from './tab4.vue'
import tab5 from './tab5.vue'
import tab6 from './tab6.vue'


export default {
	name: 'Index',
	data() {
		return {
			swiperOption: {
				direction: 'vertical',
				scrollbar: {
					el: '.swiper-scrollbar',
					hide: true, //滚动条是否自动隐藏。默认：false，不会自动隐藏。
					snapOnRelease: true, //如果设置为false，释放滚动条时slide不会自动贴合。
				},
        mousewheel: true,
				pagination: {
					el: '.swiper-pagination',
					clickable: true
				}
			}
		}
	},
	components: {
    tab1,
    tab2,
    tab3,
    tab4,
    tab5,
    tab6,
		swiper,
		swiperSlide
	}
}
</script>

<style scoped lang="stylus">
  #index
    width: 100%
    height: 100%
    background: #c1c1c1
    .content
      height: 100%
      overflow: hidden
      position: relative
      .swiper-container
        height: 100%
        .swiper-slide
          background: #fff
</style>
