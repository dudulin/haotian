<template>
  <div id="service">
    <pc-header theme="blue" />
    <div class="banner">
      <div class="title">服务</div>
    </div>
    <div class="content">
      <div class="nav">
        <div class="left">{{menu[activeMenu]}}</div>
        <div class="right">
          <ul class="menu">
            <li v-for="(item, index) in menu" :key="item.id" :class="activeMenu === index ? 'is-active' : ''" @click="() => activeMenu = index">{{item}}</li>
          </ul>
        </div>
      </div>
      <div class="breadcrumb">
        <i class="el-icon-s-home"></i>
        <el-breadcrumb separator="-">
          <el-breadcrumb-item><a href="/" style="color: #606266;">首页</a></el-breadcrumb-item>
          <el-breadcrumb-item>我们</el-breadcrumb-item>
          <el-breadcrumb-item style="color: #0c7fd0;">{{menu[activeMenu]}}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <tab1 v-if="activeMenu === 0" />
      <tab2 v-if="activeMenu === 1" />
      <tab3 v-if="activeMenu === 2" />
    </div>
    <footer-plus theme="white" />
  </div>
</template>

<script>
import pcHeader from '../../public/header.vue'
import footerPlus from '../../public/footer-plus.vue'
import tab1 from './tab1.vue'
import tab2 from './tab2.vue'
import tab3 from './tab3.vue'

export default {
  data() {
    return {
      activeMenu: 0,
      menu: ['优化你的除尘效果', '数据监控你的系统', '百分百的托管服务']
    }
  },
  components: {
    pcHeader,
    footerPlus,
    tab1,
    tab2,
    tab3
  }
}
</script>

<style scoped lang="stylus">
#service
  width: 100%
  min-height: 100%
  position: relative
  .banner
    width: 100%
    height: 400px
    background-image: url('./img/banner.png')
    overflow: hidden
    .title
      margin-top: 180px
      margin-left: 80px
      font-size: 40px
      text-align: left
      color: #fff
  .content
    width: 100%
    .nav
      width: 1180px
      height: 75px
      margin: 0 auto
      box-sizing: border-box
      border-bottom: 2px solid rgb(237,237,237)
      display: flex
      justify-content: space-between
      .left
        height: 100%
        line-height: 75px
        font-size: 26px
      .right
        height: 100%
        position: relative
        .menu
          position: absolute
          right: 0
          top: 0
          width: 625px
          height: 75px
          li
            height: 75px
            line-height: 75px
            font-size: 16px
            font-weight: 400
            float: left
            margin-left: 80px
            box-sizing: border-box
            cursor: pointer
            &.is-active
              color: #0c7fd0
              border-bottom: 2px solid #0c7fd0
    .breadcrumb
      display: flex
      width: 1180px
      margin: 35px auto
      i
        color: rgb(208,208,208)
        margin-right: 10px
</style>
