<template>
  <div id="product">
    <pc-header theme="blue" />
    <div class="banner">
      <div class="title">产品</div>
    </div>
    <div class="content">
      <div style="border-bottom: 2px solid #ededed;box-sizing: border-box;height: 75px;">
        <div class="nav">
          <div class="left">{{menu[activeMenu]}}</div>
          <div class="right">
            <ul class="menu">
              <li v-for="(item, index) in menu" :key="item.id" :class="activeMenu === index ? 'is-active' : ''" @click="() => activeMenu = index">{{item}}</li>
            </ul>
          </div>
        </div>
      </div>
      <div style="width: 100%;overflow: hidden;" :style="activeMenu !== 0 ? 'background:rgba(255,255,255,1);' : 'background:rgba(248,248,248,1);'">
        <div class="breadcrumb" :style="activeMenu !== 0 ? 'background:rgba(255,255,255,1);' : 'background:rgba(248,248,248,1);'">
          <i class="el-icon-s-home"></i>
          <el-breadcrumb separator="-">
            <el-breadcrumb-item>
              <a href="/" style="color: #606266;">首页</a>
            </el-breadcrumb-item>
            <el-breadcrumb-item>产品</el-breadcrumb-item>
            <el-breadcrumb-item style="color: #0c7fd0;">{{menu[activeMenu]}}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </div>
    </div>
    <tab1 />
    <footer-plus theme="white" />
  </div>
</template>

<script>
import pcHeader from '../../public/header.vue'
import footerPlus from '../../public/footer-plus.vue'
import tab1 from './tab1.vue'

export default {
  data() {
    return {
      activeMenu: 3,
      menu: ['催化滤袋', '针刺粘', '除尘袋', '配件']
    }
  },
  created() {

  },
  components: {
    pcHeader,
    footerPlus,
    tab1
    // tab2,
    // tab3,
    // tab4
  }
}
</script>

<style scoped lang="stylus">
#product {
  width: 100%;
  min-height: 100%;
  position: relative;

  .banner {
    width: 100%;
    height: 400px;
    background-image: url('./img/bg1.png');
    overflow: hidden;

    .title {
      margin-top: 180px;
      margin-left: 80px;
      font-size: 40px;
      text-align: left;
      color: #fff;
    }
  }

  .content {
    width: 100%;

    .nav {
      width: 1180px;
      height: 75px;
      margin: 0 auto;
      box-sizing: border-box;
      border-bottom: 2px solid rgb(237, 237, 237);
      display: flex;
      justify-content: space-between;

      .left {
        height: 100%;
        line-height: 75px;
        font-size: 26px;
      }

      .right {
        height: 100%;
        position: relative;

        .menu {
          position: absolute;
          right: 0;
          top: 0;
          width: 600px;
          height: 75px;

          li {
            height: 75px;
            line-height: 75px;
            font-size: 16px;
            font-weight: 400;
            float: left;
            margin-left: 80px;
            box-sizing: border-box;
            cursor: pointer;

            &.is-active {
              color: #0c7fd0;
              border-bottom: 2px solid #0c7fd0;
            }
          }
        }
      }
    }

    .breadcrumb {
      display: flex;
      width: 1180px;
      margin: 35px auto;
      background: rgba(248, 248, 248, 1);

      i {
        color: rgb(208, 208, 208);
        margin-right: 10px;
      }
    }
  }
}
</style>
