<template>
<div class="tab4">
	<div class="search-box">
		<div class="search-area">
			<span class="search-item">
				<span class="unit">℃</span>
				<span class="title">工作温度</span>
				<span class="value">
					<el-input-number v-model="num1" @change="handleChange" size="small" :min="1" :max="10" label="描述文字"></el-input-number>
				</span>
			</span>
			<span class="search-item">
				<span class="unit">PH</span>
				<span class="title">抗酸性</span>
				<span class="value" style="width:120px;">
					<el-select v-model="value2" placeholder="请选择" size="small">
						<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</span>

			</span>
			<span class="search-item">
				<span class="unit">PH</span>
				<span class="title">抗碱性</span>
				<span class="value" style="width:120px;">
          <el-select v-model="value3" placeholder="请选择" size="small">
						<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</span>
			</span>
		</div>
	</div>
  <div class="productList">
    <div class="product-item" v-for="item in productList" :key="item.id">
      <div class="img-box">
        <img :src="item.imgUrl" alt="">
      </div>
      <div class="msg">
        <p class="title">{{item.name}}</p>
        <div class="btn-area">
          <span class="detail">查看详情</span>
          <span class="price">查看详情</span>
        </div>
      </div>
    </div>
  </div>
  <div style="height: 350px;width:100%;background:rgb(244,244,244);"></div>

</div>
</template>

<script>
export default {
	data() {
		return {
			num1: 1,
			value2: '1',
			value3: '3',
      options: [
				{
          value: '1',
          label: '极差'
        }, {
          value: '2',
          label: '普通'
        }, {
          value: '3',
          label: '好'
        }, {
          value: '4',
          label: '非常差'
        }
			],
      productList: [
				{
					name: 'PTFE针刺粘',
					imgUrl: require('./img/pic3.png')
				},
				{
					name: '除尘袋',
					imgUrl: require('./img/pic4.png')
				},
				{
					name: 'Pleated Filters',
					imgUrl: require('./img/pic5.png')
				},
				{
					name: 'Filter Cloths',
					imgUrl: require('./img/pic6.png')
				},
				{
					name: 'Accessories',
					imgUrl: require('./img/pic7.png')
				},
				{
					name: 'Pulse - Jet Filter Bags',
					imgUrl: require('./img/pic8.png')
				}
			]
		}
	},
	methods: {
		handleChange() {

		}
	},
	components: {}
}
</script>

<style lang="stylus" scoped>
.tab4
  .search-box
    background: #fff
    width: 100%
    .search-area
      width: 1180px
      margin: 0 auto
      text-align: left
      display: flex
      margin-bottom: 65px
      span
        display: inline-block
      .search-item
        display: flex
        align-items: center
        margin-right: 70px
        .unit,
        .title
          font-size: 20px
          font-family: PingFangSC
          font-weight: 500
          color: rgba(34,34,34,0.4)
          margin-right: 5px
          line-height: 32px
          height: 32px
        .value
          height: 32px
          margin-left: 30px
          .el-input.el-input--small
            font-size: 24px
            font-family: HelveticaNeue
            font-weight: bold
            color: rgba(34,34,34,1)
  .productList
    width: 100%
    display: flex
    flex-wrap: wrap
    margin-bottom: 180px
    justify-content: center
    .product-item
      width: 33.333%
      height: 600px
      border: 2px solid rgba(237,237,237,1)
      box-sizing: border-box
      margin-right: -1px
      margin-bottom: -1px
      .img-box
        height: 200px
        width: 100%
        margin-top: 100px
      p
        margin-top: 100px
        font-size: 18px
        font-family: PingFangSC
        font-weight: 400
        color: rgba(34,34,34,1)
      .btn-area
        margin-top: 20px
        span
          display: inline-block
          width: 158px
          height: 55px
          border: 2px solid rgba(242,242,242,1)
          line-height: 55px
          font-size: 14px
          font-family: PingFangSC
          font-weight: 100
          color: rgba(34,34,34,1)
          cursor: pointer
          &:hover
            background: rgba(12,127,208,1)
            color: rgba(255,255,255,1)
            border-color: rgba(12,127,208,1)
        .detail
          margin-right: 15px
</style>
