<template >
  <div class="tab1">
    <div class="detailsCon">
      <div class="titleCon">
        <div class="titleValCon">
          <span>PTFE</span>
          <span class="titleVal">PPS</span>
          <span class="titleVal">NOMEX</span>
          <span class="titleVal">涤纶</span>
          <span class="titleVal">丙纶</span>
        </div>
        <el-button type="primary" style="width: 110px;float: right;">返回列表</el-button>
      </div>
      <div class="productsCon">
        <div class="productsIllustrate">
          <div style="width: 486px;position: relative;top: 35%;text-align: left;">
            <div style="font-size: 32px;color: #000000;margin-bottom: 17px;">皓洁PTFE针刺毡</div>
            <div style="font-size: 26px;color: #222222;">Haojie PTFE needled felt</div>
            <div style="width: 20px;border-bottom: 2px solid #D2D2D2;margin: 25px 0 29px 0;"></div>
            <div style="width:486px;">PTFE针刺毡是来自于PTFE纤维通过膜裂法拉丝形成的耐高温布袋在除尘和相关领域都有重点的应用场景</div>
          </div>
        </div>
        <div class="productsImg">
          <img src="./img/pic5.png" alt="img">
        </div>
        <div class="productsBtn">
          <div style="width: 1180px;margin: 0 auto;height: 40px;position: relative;top: 50%;">
            <el-button type="primary" style="width: 158px;float: left;">发起一个询价</el-button>
            <el-button style="width: 158px;float: left;margin-left: 15px;">查看联系方式</el-button>
          </div>
        </div>
      </div>
      <div style="width: 1180px;margin: 0 auto;display: flex;border-bottom: 1px dashed;height: 290px;">
        <div style="width: 30%;margin-right: 10%;padding: 70px 0;">
          <div style="font-size: 24px;text-align: left;margin-bottom: 18px;">产品参数</div>
          <div v-for="val in valueArr" :key="val">
            <div style="text-align: left;font-size: 26px;">{{val}}</div>
          </div>
        </div>
        <div style="width: 60%;padding: 70px 0;text-align: left;font-size: 16px;">
          <div v-for="item in okkk" :key="item">
            <div>{{item}}</div>
          </div>
        </div>
      </div>
      <div style="width: 1180px;margin: 0 auto;display: flex;border-bottom: 1px dashed;height: 558px;">
        <div style="padding: 70px 0;">
          <div style="font-size: 24px;text-align: left;margin-bottom: 18px;">产品性能</div>
          <div style="text-align: left;font-size: 26px;">Product</div>
          <div style="text-align: left;font-size: 26px;">performance</div>
        </div>
        <div style="padding: 70px 0;">
          <div>sdasdaf</div>
          <div>
            <ul>
              <li>ssss</li>
              <li>ssss</li>
              <li>ssss</li>
            </ul>
          </div>
        </div>
      </div>
      <div style="width: 1180px;margin: 0 auto;display: flex;height: 696px;">
        <div>
          <div>产品性能</div>
          <div>Productperformance</div>
        </div>
        <div>aaaadfasdf</div>
      </div>
    </div>
    <div style="height: 350px;width:100%;background:rgb(244,244,244);"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      valueArr: ['Product','parameter'],
      okkk: ['PTFE针刺毡是采用PTFE(聚四氟乙烯纤维)经三维针刺而成的一种过滤材料。','PTFE纤维为大分子线性结构，','PTFE针刺毡因而具有极强的耐温、耐磨、耐腐、耐化学稳定性，','广泛适用于钢铁、电力、垃圾焚烧等各种恶劣的烟气过滤环境。']
    }
  },
  created() {

  },
  methods: {

  }
}
</script>

<style lang="stylus" scoped>
.tab1 {
  .detailsCon {
    .titleCon {
      width: 1180px;
      margin: 0 auto;
      height: 55px;
      border-bottom: 1px solid #ededed;

      .titleValCon {
        display: inline-block;
        height: 40px;
        line-height: 40px;
        float: left;
        font-size: 17px;

        .titleVal {
          margin-left: 30px;
        }
      }
    }
  }

  .productsCon {
    height: 622px;

    .productsIllustrate {
      display: inline-block;
      height: 321px;
      width: 1180px;
      position: relative;
    }

    .productsImg {
      display: inline-block;
      position: absolute;
      margin-top: 110px;
      right: 434px;

      img {
        width: 535px;
        height: 380px;
      }
    }

    .productsBtn {
      height: 300px;
      background-image: url('./img/bg2.png');
    }
  }
}
</style>
