<template>
  <!-- 管理中心 -->
  <el-container class="container">
    <pc-header></pc-header>
    <el-container style="margin-top:100px">
      <el-aside class="aside" width="100px">
        <ul>
          <li>
            <div>
              <i class="el-icon-coin"></i>
              发起询价
            </div>
          </li>
          <li class="active">
            <div>
              <i class="el-icon-s-order"></i>
              查看订单
            </div>
          </li>

          <li>
            <div>
              <i class="el-icon-user"></i>
              我的资料
            </div>
          </li>
        </ul>
      </el-aside>
      <el-main class="main">mainmainmain</el-main>
    </el-container>
  </el-container>
</template>

<script>
import pcHeader from "../../public/header.vue";
import axios from "axios";
// import qs from "qs";

export default {
  data() {
    return {
      activeABC: ''
    };
  },
  created() {
    axios.get("/auth/v1/countries").then(res => {
      this.country = res.data;
    });
  },
  methods: {
    setABC(item) {
      this.activeABC = item
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

        div {
          i {
            display: block;
            margin-bottom: 10px;
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
    background-color: #F6F9FB;
  }
}
</style>
