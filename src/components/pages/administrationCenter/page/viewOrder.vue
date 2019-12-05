
<template>
  <!-- 管理中心 -->
  <el-container style="height:100%;">
    <!-- <h1>viewOrder --查看订单</h1> -->
    <el-aside class="aside" width="260px">
      <ul>
        <li v-for="i in asideArray" :key="i.title" @click="getPage(i.value)" :class="componentType===i.value?'active':''">
          <a>
          {{i.title}}
          <i class="el-icon-arrow-right"></i>
          </a>
        </li>
      </ul>
    </el-aside>
    <el-main style="padding:30px 80px;">
      <component :is="components[componentType]"></component>
    </el-main>
  </el-container>
</template>

<script>
import {components} from "./../viewOrderPage/index.js";
import {baseUrl} from '../../../../common/js/tool.js'
export default {
  data() {
    return {
      components,
      baseUrl,
      // componentType:'orderReview',
      componentType:'productManagement', // debugger 开发中页面
      asideArray: [
        { title: '订单总览' ,value:'orderReview'},
        { title: '客户管理' ,value:'customerManagement'},
        { title: '销售员管理' ,value:'SalesmanManagement'},
        { title: '所有订单' ,value:'allOrders'},
        { title: '发送样品请求' ,value:'sendSample'},
        { title: '产品管理' ,value:'productManagement'}
      ]
    }
  },
  created() {
    console.log(this.baseUrl,11111111111)
  },
  methods: {
   getPage(value){
     this.componentType = value
   } 
  }
}
</script>

<style scoped lang="stylus">
  .aside{
    border-right 2px solid #eee
    ul{
       li:hover,li.active{
          color:#0D81CE
        }
      li{
        height 80px
        position: relative;
         a:hover{
          color:#0D81CE
        }
        a{
          position: absolute;
          font-weight 700
          top: 50%;
          left: 50%;
          width 180px
          transform: translate(-50%, -50%);
          display: -webkit-flex
          height 100%
          display: flex;
          line-height 80px
          justify-content: space-between
          border-bottom 1px solid #EDEEF0
          i{
            line-height 80px
            font-weight 700
          }
        }
      }
    }
  }
</style>