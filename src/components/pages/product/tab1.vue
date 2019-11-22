<template >
<div class="tab1">
	<div style="width: 100%;height: 510px;background: #f8f8f8;overflow: hidden;">
		<div class="card-type1">
			<div class="top">
				<div class="left">
					<span class="cn">皓天®皓清达®催化滤袋的显著优势</span>
					<span class="en">Significant Advantages of Catalytic Filter Bag </span>
				</div>
				<div class="right">
					<span class="msg">戈尔自创的过滤工艺通过催化过滤和表面过滤相结合，解决了垃圾焚烧中的二噁英控制。现在，作为催化过滤产品系列首选的戈尔滤必达催化过滤袋，正在改变过滤及有害物排放控制技术的未来。</span>
					<div class="forBtn">
						<span class="btn1">线上下单咨询</span>
						<span class="btn2">联系我们</span>
					</div>
				</div>
			</div>
			<div class="bottom">
				<div class="item">
					<span class="text">高效消除有害毒素</span>
					<span class="index">a.</span>
				</div>
				<div class="item">
					<span class="text">降低处理成本 <br />无需购置新设备</span>
					<span class="index">b.</span>
				</div>
				<div class="item">
					<span class="text">灵活的袋式除尘器 <br />易于操作</span>
					<span class="index">c.</span>
				</div>
				<div class="item">
					<span class="text">提升员工操作安全</span>
					<span class="index">d.</span>
				</div>
				<div class="item">
					<span class="text">价格合理 <br />使用寿命长</span>
					<span class="index">e.</span>
				</div>
			</div>
		</div>
	</div>
	<div class="card-left">
		<div class="headline">
			<span class="cn">概述</span>
			<span class="en">Overview</span>
			<span class="num">01</span>
		</div>
		<div class="msg">
			<div class="item">
				现在大众谈二噁英色变，只因其危害覆盖范围广、持续时间长，被称为“世纪之毒”。 二噁英非常容易在生物体内积累，目前已被认为是人类一级致癌物。在一些发生过二噁英外泄事故的地区，当地人民的疾病发病率、死亡率以及孕妇流产率远高于其他地区。
			</div>
			<div class="line"></div>
			<div class="item">
				而拥有如此毒害的二噁英主要来源于城市垃圾焚烧，不仅如此，在中国22%的较大颗粒（直径达10微米）都产生自垃圾焚烧，因此有效治理垃圾焚烧产生的有害气体，实现常态达标成为了政府和企业共同追求的目标。
			</div>
		</div>
	</div>
	<div class="card-type2">
		<div class="newsBox">
			<div class="news">
				<div class="tab">
					<span class="tabItem" :class="activeTab === 'nc' ? 'is-active' : ''" @click="tabClick(nc, 'nc')">常态达标</span>
					<span class="tabItem" :class="activeTab === 'ep' ? 'is-active' : ''" @click="tabClick(ep, 'ep')">环境法/方案</span>
					<span class="tabItem" :class="activeTab === 'ss' ? 'is-active' : ''" @click="tabClick(ss, 'ss')">监督体系</span>
				</div>
				<div class="newsContent">
					<div class="newsItem" v-for="item in activeNews" :key="item.id">
						<span class="title">{{item.title}}</span>
						<span class="text">{{item.text}}</span>
					</div>
				</div>
			</div>
			<div class="headline">
				<span class="cn">挑战</span>
				<span class="en">Challenge</span>
				<span class="text">治理二噁英排放<br>常态达标是关键</span>
				<span class="num">02</span>
			</div>
		</div>
	</div>
	<div class="card-type3">
		<div class="cardContent">
			<div class="left">
				<div class="headline">
					<span class="cn">解决方案<br />皓清™催化滤袋</span>
					<span class="en">Solution<br />catalytic filter bag</span>
				</div>
				<div class="newsBox">
					<p class="title"><span class="block"></span>皓天自家首创二噁英控制工艺</p>
					<div class="newsItem">
						<div class="text">
							皓天公司自家首创的二噁英控制工艺，在系统上同时集成了两种技术：“催化过滤”技术与“表面过滤”技术，系统由膨体聚四氟乙烯(ePTFE)薄膜与催化底布组成。
							底布是一种针刺结构，纤维是由膨体聚四氟乙烯(ePTFE)符合催化剂组成。这种复合的催化毡材料能够把PCDD/Fs在低温状态（180摄氏度至260摄氏度彻底摧毁）。
							在催化剂作用下二噁英即刻发生氧化分解反应，被分解为极微量的CO2、H2O与HCI，从而使过滤后的气体无毒无害，自始至终达一次性到环保标准。
						</div>
					</div>
					<div class="newsItem">
						<div class="text">
							这种滤袋表面仍有膨体聚四氟乙烯(ePTFE)薄膜来去除亚微粉尘,能阻挡细微的颗粒穿透到底布中，这样表面的薄膜承担了阻挡任何吸附了PCDD/PCDFs的颗粒的功能，气态的PCDD/PCDFs穿过薄膜进入催化毡料被有效分解，其原理如图：
						</div>
						<img src="./img/pic1.png" alt="">
					</div>
				</div>
			</div>
			<div class="right">
				<div class="newsBox">
					<p class="title"><span class="block"></span>传统减排二噁英的方法与Remedia技术</p>
					<img src="./img/pic1.png" alt="">
          <div class="collapse-box">
            <el-collapse v-model="activeCol" accordion>
              <el-collapse-item title="“催”毁二噁英，还看皓天®皓清®催化滤袋" name="0">
                <div>
                  目前针对二噁英处理手段可分为前处理技术、过程控制减排技术与尾气处理技术三大类。其中，前处理技术理论上本应是最佳治本的科学方法，可是由于目前受到工程设备实践中的各种限制，较难实现。而过程中控制减排二噁英也由于需要对燃烧条件、燃烧温度、燃烧时间、燃烧时的氧气浓度以及添加抑制生成剂的控制，使得其难以真正在生产中落实减排效果。<br>
                  此外，在尾气处理技术中二噁英末端控制法因其具有“Police Filter”功能而广泛采用，这些方法主要包括：活性炭吸附法，选择性催化分解法（SCR）以及戈尔
                </div>
              </el-collapse-item>
              <el-collapse-item title="“喷炭技术”难以彻底与二噁英类有害物质说拜拜" name="1">
                <div>
                  目前针对二噁英处理手段可分为前处理技术、过程控制减排技术与尾气处理技术三大类。其中，前处理技术理论上本应是最佳治本的科学方法，可是由于目前受到工程设备实践中的各种限制，较难实现。而过程中控制减排二噁英也由于需要对燃烧条件、燃烧温度、燃烧时间、燃烧时的氧气浓度以及添加抑制生成剂的控制，使得其难以真正在生产中落实减排效果。<br>
                  此外，在尾气处理技术中二噁英末端控制法因其具有“Police Filter”功能而广泛采用，这些方法主要包括：活性炭吸附法，选择性催化分解法（SCR）以及戈尔
                </div>
              </el-collapse-item>
              <el-collapse-item title="选择性催化分解二噁英法（SCR）并未在国内广泛使用" name="2">
                <div>
                  目前针对二噁英处理手段可分为前处理技术、过程控制减排技术与尾气处理技术三大类。其中，前处理技术理论上本应是最佳治本的科学方法，可是由于目前受到工程设备实践中的各种限制，较难实现。而过程中控制减排二噁英也由于需要对燃烧条件、燃烧温度、燃烧时间、燃烧时的氧气浓度以及添加抑制生成剂的控制，使得其难以真正在生产中落实减排效果。<br>
                  此外，在尾气处理技术中二噁英末端控制法因其具有“Police Filter”功能而广泛采用，这些方法主要包括：活性炭吸附法，选择性催化分解法（SCR）以及戈尔
                </div>
              </el-collapse-item>
            </el-collapse>
          </div>
				</div>
			</div>
      <div class="num">
        03
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
			activeTab: 'nc',
			activeNews: [],
      activeCol: '0',
			nc: [{
					title: '常态达标常态达标常态达标常态',
					text: '环保部原六大区域环保督查中心“升级”为督察局。督察局的一大新增职能是承担中央环保督察相关工作，进一步强化督政，这也意味着中央环保督察将成为常态。生态环境部向媒体通报2018年1-10月，全国共下达处罚决定书145167份，罚没款金额为118.295亿元。'
				},
				{
					title: '常态达标常态达标常态达标常态达标',
					text: '环境保护部和国家质量监督检验检疫总局联合发布了最新一版《生活垃圾焚烧污染控制标准》（GB18485-1014），其中大大提高了对二噁英等污染物排放的控制要求。生活垃圾焚烧炉排放烟气中，二噁英类的污染物限值由旧标准的1.0ng TEQ/Nm3降低为0.1ng TEQ/Nm3。'
				},
				{
					title: '常态达标常态达标常态达标常态达标',
					text: '环保部门将采取随机方式对生活垃圾焚烧厂进行日常监督性监测，对焚烧炉渣热灼减率与烟气中颗粒物、二氧化硫、氮氧化物、氯化氢、重金属类污染物和一氧化碳的监测应每季度至少开展1次，对烟气中二噁英类的监督性监测应每年至少开展1次。'
				},
				{
					title: '常态达标常态达标常态达标常态达标',
					text: '环保部门将采取随机方式对生活垃圾焚烧厂进行日常监督性监测，对焚烧炉渣热灼减率与烟气中颗粒物、二氧化硫、氮氧化物、氯化氢、重金属类污染物和一氧化碳的监测应每季度至少开展1次，对烟气中二噁英类的监督性监测应每年至少开展1次。'
				}
			],
			ep: [{
					title: '环境法/方案环境法/方案环境法/方案',
					text: '环保部原六大区域环保督查中心“升级”为督察局。督察局的一大新增职能是承担中央环保督察相关工作，进一步强化督政，这也意味着中央环保督察将成为常态。生态环境部向媒体通报2018年1-10月，全国共下达处罚决定书145167份，罚没款金额为118.295亿元。'
				},
				{
					title: '环境法/方案环境法/方案环境法/方案',
					text: '环境保护部和国家质量监督检验检疫总局联合发布了最新一版《生活垃圾焚烧污染控制标准》（GB18485-1014），其中大大提高了对二噁英等污染物排放的控制要求。生活垃圾焚烧炉排放烟气中，二噁英类的污染物限值由旧标准的1.0ng TEQ/Nm3降低为0.1ng TEQ/Nm3。'
				},
				{
					title: '环境法/方案环境法/方案环境法/方案',
					text: '环保部门将采取随机方式对生活垃圾焚烧厂进行日常监督性监测，对焚烧炉渣热灼减率与烟气中颗粒物、二氧化硫、氮氧化物、氯化氢、重金属类污染物和一氧化碳的监测应每季度至少开展1次，对烟气中二噁英类的监督性监测应每年至少开展1次。'
				},
				{
					title: '环境法/方案环境法/方案环境法/方案',
					text: '环保部门将采取随机方式对生活垃圾焚烧厂进行日常监督性监测，对焚烧炉渣热灼减率与烟气中颗粒物、二氧化硫、氮氧化物、氯化氢、重金属类污染物和一氧化碳的监测应每季度至少开展1次，对烟气中二噁英类的监督性监测应每年至少开展1次。'
				}
			],
			ss: [{
					title: '更加全面和严格的督监体系',
					text: '环保部原六大区域环保督查中心“升级”为督察局。督察局的一大新增职能是承担中央环保督察相关工作，进一步强化督政，这也意味着中央环保督察将成为常态。生态环境部向媒体通报2018年1-10月，全国共下达处罚决定书145167份，罚没款金额为118.295亿元。'
				},
				{
					title: '二噁英污染物排放标准大大提高',
					text: '环境保护部和国家质量监督检验检疫总局联合发布了最新一版《生活垃圾焚烧污染控制标准》（GB18485-1014），其中大大提高了对二噁英等污染物排放的控制要求。生活垃圾焚烧炉排放烟气中，二噁英类的污染物限值由旧标准的1.0ng TEQ/Nm3降低为0.1ng TEQ/Nm3。'
				},
				{
					title: '监督性监测日常化，随机化',
					text: '环保部门将采取随机方式对生活垃圾焚烧厂进行日常监督性监测，对焚烧炉渣热灼减率与烟气中颗粒物、二氧化硫、氮氧化物、氯化氢、重金属类污染物和一氧化碳的监测应每季度至少开展1次，对烟气中二噁英类的监督性监测应每年至少开展1次。'
				},
				{
					title: '监督体系监督体系监督体系监督体系',
					text: '环保部门将采取随机方式对生活垃圾焚烧厂进行日常监督性监测，对焚烧炉渣热灼减率与烟气中颗粒物、二氧化硫、氮氧化物、氯化氢、重金属类污染物和一氧化碳的监测应每季度至少开展1次，对烟气中二噁英类的监督性监测应每年至少开展1次。'
				}
			]
		}
	},
	created() {
		this.activeNews = this.nc
	},
	methods: {
		tabClick(data, activeTab) {
			this.activeNews = data
			this.activeTab = activeTab
		}
	}
}
</script>

<style lang="stylus" scoped>
.tab1
  .card-type1
    width: 1180px
    margin: 0 auto
    height: 100%
    text-align: left
    .top
      width: 100%
      margin-top: 90px
      overflow: hidden
      .left
        float: left
        width: 400px
        span
          display: block
        .cn
          font-size: 24px
          font-family: PingFang SC
          font-weight: 500
          height: 45px
          line-height: 45px
        .en
          font-size: 26px
          font-family: Helvetica Neue LT Pro
          font-weight: normal
          line-height: 35px
      .right
        float: right
        width: 600px
        .msg
          font-size: 20px
          font-family: PingFang SC
          font-weight: 600
          line-height: 30px
        .forBtn
          margin-top: 30px
          span
            height: 40px
            line-height: 40px
            padding: 0 25px
            font-size: 14px
            font-family: PingFang SC
            font-weight: 400
            display: inline-block
          .btn1
            background: #0d7fce
            color: #fff
            margin-right: 20px
          .btn2
            background: #fff
            color: #0C7FD0
            border: 1px solid rgba(36, 142, 216, 1)
            box-sizing: border-box
    .bottom
      width: 100%
      margin: 60px
      display: flex
      .item
        flex: 1
        height: 140px
        margin-right: 2px
        background: #fff
        padding: 40px 35px
        box-sizing: border-box
        position: relative
        :last-child
          margin-right: 0
        span
          display: block
        .text
          font-size: 14px
          font-family: PingFang SC
          font-weight: 500
        .index
          position: absolute
          left: 35px
          bottom: 25px
          font-size: 14px
          font-family: PingFang SC
          font-weight: 800
          color: rgba(210,210,210,1)
  .card-left
    width: 1180px
    padding: 100px 0
    margin: 0 auto
    text-align: left
    display: flex
    justify-content: space-between
    .headline
      height: 200px
      span
        display: block
      .cn
        font-size: 24px
      .en
        font-size: 26px
      .num
        font-size: 20px
        color: #222222
        opacity: 0.2
        margin-top: 90px
    .msg
      width: 600px
      .item
        font-size: 16px
      .line
        height: 0
        width: 100%
        border-top: 1px dotted rgba(0, 0, 0, 0.3)
        margin: 40px 0
  .card-type2
    width: 100%
    height: 700px
    background: url('./img/bg2.png')
    color: #fff
    .newsBox
      width: 1180px
      height: 100%
      margin: 0 auto
      display: flex
      justify-content: space-between
      .news
        width: 600px
        margin-top: 100px
        .tab
          text-align: left
          .tabItem
            text-align: center
            width: 158px
            height 55px
            display: inline-block
            background: rgba(255,255,255,0.2)
            margin-right: 12px
            line-height: 55px
            border:1px solid rgba(229, 229, 229, 0.4)
            box-sizing: border-box
            cursor: pointer
            &:hover
              background: #fff
              color: #0C7FD0
            &.is-active
              background: #fff
              color: #0C7FD0
        .newsContent
          width: 600px
          height: 390px
          margin-top: 45px
          text-align: left
          overflow: auto
          &::-webkit-scrollbar
            width: 6px
            background: rgba(255, 255, 255, 0.1)
          &::-webkit-scrollbar-thumb
            background: rgba(255, 255, 255, 0.2)
          .newsItem
            margin-top: 20px
            margin-right: 30px
            border-bottom: 1px dashed rgba(255, 255, 255, 0.2)
            span
              display: block
            .title
              font-size: 20px
              font-family: PingFang SC
              font-weight: 500
            .text
              margin: 15px 0 20px
              font-size: 16px
              font-family: PingFang SC
              font-weight: 400
              color: rgba(255,255,255,1)
              line-height: 30px
      .headline
        margin-top: 85px
        text-align: right
        position: relative
        span
          display: block
        .cn
          font-size: 24px
        .en
          font-size: 26px
          line-height: 45px
        .text
          font-size: 16px
          font-family: PingFang SC
          font-weight: 500
          line-height: 35px
          margin-top: 30px
        .num
          font-size: 20px
          color: #fff
          opacity: 0.2
          position: absolute
          bottom: 100px
          right: 0
  .card-type3
    width: 100%
    background: #f8f8f8
    overflow: hidden
    text-align: left
    .cardContent
      width: 1180px
      margin: 100px auto
      display: flex
      justify-content: space-between
      position: relative
      .left
        .headline
          span
            display: block
          .cn
            font-size: 24px
            font-family: PingFang SC
            font-weight: 500
            color: rgba(0,0,0,1)
            line-height: 30px
          .en
            font-size: 26px
            font-family: Helvetica Neue LT Pro
            font-weight: normal
            color: rgba(34,34,34,1)
            line-height: 26px
            margin-top: 15px
        .newsBox
          margin-top: 80px
          margin-bottom: 100px
          width: 580px
          background: #fff
          overflow: hidden
          .title
            height: 30px
            line-height: 30px
            display: block
            margin-top: 40px
            font-size: 20px
            font-family: PingFang SC
            font-weight: bold
            color: rgba(0,0,0,1)
            margin: 40px 0
            .block
              display: inline-block
              height: 18px
              width: 5px
              background: rgba(12,127,208,1)
              margin-right: 25px
          .newsItem
            margin: 0 25px
      .right
        .newsBox
          width: 580px
          background: #fff
          overflow: hidden
          .title
            height: 30px
            line-height: 30px
            display: block
            margin-top: 40px
            font-size: 20px
            font-family: PingFang SC
            font-weight: bold
            color: rgba(0,0,0,1)
            margin: 40px 0
            .block
              display: inline-block
              height: 18px
              width: 5px
              background: rgba(12,127,208,1)
              margin-right: 25px
          .collapse-box
            width: 540px
            margin: 20px auto
            background: #f8f8f8
            padding: 20px
            box-sizing: border-box
      .num
        position: absolute
        right: 0
        bottom: 0
        font-size: 20px
        font-family: Helvetica Neue LT Pro
        font-weight: normal
        color: rgba(34,34,34,0.2)
</style>
