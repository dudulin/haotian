<template>
  <!-- 管理中心 -->
  <el-container class="container">
    <pc-header></pc-header>
    <el-container style="margin-top:100px">
      <el-aside class="aside" width="100px">
        <ul>
          <li v-for="i in asideArray" :key="i.title" @click="getPage(i.value)" :class="componentType===i.value?'active':''">
            <a>
              <img :src="i.imgSrc" draggable="false">
              {{i.title}}
            </a>
          </li>
        </ul>
      </el-aside>
      <el-main class="main">
        <!-- component模版 通过is来获取 -->
        <component :is="components[componentType]"></component>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import pcHeader from "../../public/header.vue";
import img1 from "./img/icon1.png";
import img2 from "./img/icon2.png";
import img3 from "./img/icon3.png";
import axios from "axios";
import { components } from "./page/index.js";
// import qs from "qs";

export default {
  data() {
    return {
      activeABC: '',
      componentType: 'viewOrder',
      components, // 返回的数据保存起来
      asideArray: [
        { title: '发起询价', value: 'enquiry', imgSrc: img1 },
        { title: '查看订单', value: 'viewOrder', imgSrc: img2 },
        { title: '我的资料', value: 'myInformation', imgSrc: img3 }
      ]
    };
  },
  created() {
    axios.get("/auth/v1/countries").then(res => {
      this.country = res.data;
    });
  },
  methods: {
    getPage(value) {
      this.componentType = value
    }
  },
  components: {
    pcHeader
  }
};
</script>

<style scoped lang="stylus">
.container {
  height: 100%;

  .aside {
    background-color: #0C7FD0;
    width: 100px;

    ul {
      li:hover, li.active {
        background-color: #0172C2;
      }

      li {
        height: 160px;
        color: #fff;
        position: relative;

        a {
          img {
            display: block;
            margin-bottom: 10px;
            width:30px;
            height:30px;
            margin-left:17px;
            user-select:none;
          }

          white-space: nowrap;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }
    }
  }

  .main {
    background-color: #F7F8FC;
    padding: 0;
  }
}
</style>
