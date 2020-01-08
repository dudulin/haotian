<template>
  <div id="footer-plus">
    <div class="content">
      <div class="left">
        <ul v-for="menuItem in menu" :key="menuItem.id">
          <span class="title" :style="theme === 'blue' ? blueThemeTitle : ''">{{menuItem.name}}</span>
          <li v-for="item in menuItem.items" :key="item.id" :style="theme === 'blue' ? blueThemeTitle : ''">{{item.name}}</li>
        </ul>
      </div>
      <div class="right">
        <div class="text" :style="theme === 'blue' ? blueThemeTitle : ''">快捷电话</div>
        <div class="phoneNum" :style="theme === 'blue' ? blueThemeTitle : ''">400 - 555 - 8768</div>
        <div class="connect">
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
    <div class="footer-easy">
      <span class="left" :style="theme === 'blue' ? blueThemeTitle : ''">© 2019.hotian. All Rights Reserved.</span>
      <span class="right">
        <img :src="theme === 'blue' ? logoImg2 : logoImg" />
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: ['theme'],
  data() {
    return {
      logoImg: require('../../common/img/logo1.png'),
      logoImg2: require('../../common/img/logo4.png'),
      blueThemeTitle: {
				color: '#fff'
			},
      menu: [
        {
          'name': '我们的产品',
          items: [
            {
              'name': '除尘器和配件',
              'path': '/'
            },
            {
              'name': '针刺毡',
              'path': '/'
            },
            {
              'name': '除尘袋',
              'path': '/'
            }
          ]
        },
        {
          'name': '我们的服务',
          items: [
            {
              'name': '除尘器规划设计',
              'path': '/'
            },
            {
              'name': '除尘材料研发',
              'path': '/'
            },
            {
              'name': '除尘检测运维系统',
              'path': '/'
            }
          ]
        },
        {
          'name': '关于我们',
          items: [
            {
              'name': '历史与荣耀',
              'path': '/'
            },
            {
              'name': 'R&D',
              'path': '/'
            },
            {
              'name': '公司简介',
              'path': '/'
            },
            {
              'name': '联系我们',
              'path': '/'
            }
          ]
        }
      ]
    }
  }
}
</script>

<style lang="stylus">
  #footer-plus
    width: 100%
    height: 210px
    position: absolute
    bottom: 0
    left: 0
    right: 0
    .content
      // height: 290px
      width: 100%
      padding: 00px 80px 0
      box-sizing: border-box
      // display: flex
      justify-content: space-between
      align-items: center
      .left
        ul
          float: left
          margin-right: 120px
          .title
            font-size: 16px
            font-weight: bold
            margin-bottom: 20px
            display: inline-block
            text-align: left
            width: 100%
          li
            font-size: 12px
            text-align: left
            line-height: 25px
            &:hover
              color: #409eff
              cursor: pointer
      .right
        text-align: right
        .text
          font-size: 14px
          color: #222222
          margin-bottom: 20px
        .phoneNum
          font-size: 30px
          color: #0373b9
          margin-bottom: 50px
        .connect
          span
            width: 25px
            height: 25px
            display: inline-block
            background: #909399
            &:first-child
              margin-right: 10px
    .footer-easy
      height: 60px
      margin: 0 80px
      box-sizing: border-box
      border-top: 2px solid rgb(236,236,236)
      display: flex
      justify-content: space-between
      align-items: center
      .left
        color: #909399
        font-size: 12px
</style>
