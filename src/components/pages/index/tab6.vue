<template>
<div id="tab6">
	<div style="width: 100%;height: 90px;background: #fff;">
		<pc-header theme="white" />
	</div>
  <div class="box">
    <div class="left">
			<div class="text">
				<span class="toAboutUs">全球业务分布</span>
				<span class="title">我们有能力提供<br />全球的服务</span>
			</div>
			<div class="number">
				<div class="item">
					<span class="num">05</span>
					<span class="text1">办公中心</span>
				</div>
				<div class="item">
					<span class="num">04</span>
					<span class="text1">生产基地</span>
				</div>
        <div class="item">
					<span class="num">02</span>
					<span class="text1">研发基地</span>
				</div>
        <div class="item">
					<span class="num">23</span>
					<span class="text1">全球服务</span>
				</div>
			</div>
			<div class="btn">
				了解全部
			</div>
		</div>
  </div>
	<div style="height: 230px;width:100%;background:#fff;position:absolute;bottom: 0;">
		<footer-plus theme="white" />
	</div>
</div>
</template>

<script>
import pcHeader from '../../public/header.vue'
import footerPlus from '../../public/footer-plus.vue'

export default {
	components: {
		pcHeader,
		footerPlus
	}
}
</script>

<style lang="stylus" scoped>
  #tab6
    width: 100%;
    height: 100%
    background: url('./img/bg10.png')
    flex-direction: column
    .box
      width: 100%
      flex: 1
      text-align: left
      .left
        width: 620px
        height: 100%
        margin: 4vh 80px
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
        .number
          margin-top: 3vh
          .item
            display: inline-block;
            margin-right: 6vh
            text-align: center
            span
              display: block
            .num
              font-size: 60px
              color: #248ED8
              font-weight: 100
            .text1
              font-size: 14px
        .btn
          width: 110px
          height: 40px
          background: #248ED8
          color: #fff
          text-align: center
          line-height: 40px
          font-size: 14px
          margin-top: 6vh
</style>
