<template>
<div id="pc-header" style="font-size: 16px;">
  <div class="left">
    <span class="logo">
			<img :src="theme === 'blue' ? logoImg2 : logoImg1" />
		</span>
    <span class="lang" :style="theme === 'blue' ? blueThemeLang : ''" @click="() => caretActive = !caretActive">{{lang}}
      <i class="el-icon-caret-bottom icon" :class="caretActive ? 'is-active' : ''"></i>
      <ul v-if="caretActive" class="el-dropdown-menu el-popper nav-dropdown-list" style="width: auto; transform-origin: center top; z-index: 2036; position: absolute; top: 20px; left: -20px;">
        <li class="el-dropdown-menu__item" @click="changeLang('Cn')">中文</li>
        <li class="el-dropdown-menu__item" @click="changeLang('En')">English</li>
        <div x-arrow="" class="popper__arrow" style="left: 40.7734px;border-bottom-color: #ebeef5; top: -12px;"></div>
      </ul>
    </span>
  </div>
  <div class="right">
    <span class="menu">
			<ul>
				<li v-for="item in menuData" :key="item.id" :class="router === item.path ? 'is-active' : ''" :style="theme === 'blue' ? blueThemeMenu : ''">
					<router-link :to="item.path" :style="theme === 'blue' ? blueThemeMenu : ''">{{item.text}}</router-link>
				</li>
			</ul>
		</span>
    <span class="login">
			<el-button class="manage" @click="toAdministrationCenter" icon="el-icon-edit" :style="theme === 'blue' ? blueThemeBtn1 : ''">管理中心</el-button>
			<el-button class="login" @click="toLogin" type="primary" icon="el-icon-user-solid" :style="theme === 'blue' ? blueThemeBtn2 : ''">登录</el-button>
		</span>
  </div>
</div>
</template>

<script>
export default {
  name: 'pcHeader',
	props: ['theme'],
  data() {
    return {
      caretActive: false,
      lang: 'Cn',
      router: '/',
			blueThemeLang: {
				color: '#fff'
			},
			blueThemeMenu: {
				color: '#fff',
				borderColor: '#fff'
			},
			blueThemeBtn1: {
				color: '#fff',
				background: 'none'
			},
			blueThemeBtn2: {
				color: '#606266',
				background: '#fff',
				border: 'none'
			},
      logoImg1: require('../../common/img/logo.png'),
			logoImg2: require('../../common/img/logo2.png'),
      menuData: [
				{
          text: '主页',
          path: '/'
        },
        {
          text: '产品',
          path: '/product'
        },
        {
          text: '服务',
          path: '/service'
        },
        {
          text: '我们',
          path: '/aboutUs'
        }
      ]
    }
  },
  created() {
    this.router = this.$route.path
  },
  mounted() {
    let _this = this;
    document.addEventListener('click', function(e) {
      // 下面这句代码是获取 点击的区域是否包含你的菜单，如果包含，说明点击的是菜单以外，不包含则为菜单以内
      let sp = document.getElementsByClassName("lang")[0]
      if (sp && !sp.contains(e.target)) {
        _this.caretActive = false
      }
    })
  },
  methods: {
    changeLang(val) {
      this.lang = val
    },
    toLogin() {
      this.$router.push({path:'/login'})
    },
    toAdministrationCenter() {
      this.$router.push({path:'/administrationCenter'})
    }
  },
  components: {}
}
</script>

<style scoped lang="stylus">
  #pc-header
    height: 90px
    position: absolute
    top: 0
    left: 0
    right: 0
    display: flex
    justify-content: space-between
    .left,
    .right
      height: 100%
      display: flex
      align-items: center
    .left
      margin-left: 80px
      .logo
        width: 200px
        margin-right: 40px
      .lang
        cursor: pointer
        position: relative
        &:hover
          color: #409eff
        .icon
          transform: translateY(0px)
          &.is-active
            transform: rotate(180deg) translateY(-1px)
    .right
      margin-right: 80px
			.menu
				ul
					margin-right: 60px
					li
						float: left
						margin-left: 45px
						cursor: pointer
						padding-bottom: 10px
						&.is-active
							color: #409eff
							border-bottom: 2px solid #409eff
							a
								color: #409eff
						a
							color: black
							&:hover
								color: #409eff
			.login
				button
					width: 100px
					border-radius: 0
					padding: 0
					height: 40px
</style>
