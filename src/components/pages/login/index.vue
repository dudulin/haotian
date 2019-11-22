<template>
<div id="loginView">
	<pc-header theme="blue" />
	<div class="content">
		<p class="headline">呼吸新鲜空气</p>
		<p class="text">是每个人生来的权利</p>
		<div class="login-box">
			<div class="tab-title row">
				<span class="type" @click="() => pageType='1'" style="margin-right: 2vw;" :class="pageType === '1' ? 'is-active': ''">登录</span>
				<span class="type" @click="() => pageType='2'" :class="pageType === '2' ? 'is-active': ''">注册</span>
			</div>
			<div class="row" v-if="pageType === '1'">
				<el-select v-model="loginType" slot="prepend" placeholder="请选择" @change="handleChange" style="width: 6vw;">
					<el-option label="手机号 + 验证码 登录" value="1"></el-option>
					<el-option label="手机号 + 密码 登录" value="2"></el-option>
					<el-option label="邮箱 + 密码 登录" value="3"></el-option>
				</el-select>
				<div style="display: inline-block;width: 22vw;">
					<el-input :placeholder="loginPH" v-model="username" class="input-with-select">
						<el-select v-model="countryCode" slot="prepend" style="width: 120px;" placeholder="请选择" v-if="loginType !== '3'">
							<el-option v-for="item in country" :label="item.zh + ' ' + item.code" :value="item.code"></el-option>
						</el-select>
					</el-input>
				</div>
			</div>
			<div class="row" v-if="pageType === '2'">
				<el-select v-model="registerType" style="width: 6vw;" slot="prepend" placeholder="请选择" @change="handleChange">
					<el-option label="手机号" value="1"></el-option>
					<el-option label="邮箱" value="2"></el-option>
				</el-select>
				<div style="display: inline-block;width: 22vw;">
					<el-input :placeholder="registerPH" v-model="username" @blur="usernameBlur" prop="username">
						<el-select v-model="countryCode" slot="prepend" style="width: 120px;" placeholder="请选择" v-if="registerType === '1'">
							<el-option v-for="item in country" :label="item.zh + ' ' + item.code" :value="item.code"></el-option>
						</el-select>
					</el-input>
				</div>
			</div>
			<div class="row" v-if="loginType === '1' || pageType === '2'">
				<span style="width: 20vw;display: inline-block;">
					<el-input placeholder="请输入验证码" v-model="captcha"></el-input>
				</span>
				<el-button class="resend" @click="sendCode" :disabled="sendCodeDisabled">{{sendCodeText}}</el-button>
			</div>
			<div class="row" v-if="loginType === '2' || pageType === '2' || loginType === '3'">
				<el-input placeholder="请输入密码" v-model="password" show-password></el-input>
			</div>
			<div class="row" v-if="pageType === '2'">
				<el-input placeholder="请再次输入密码" v-model="cPassword" show-password></el-input>
			</div>
			<div class="row">
				<el-button class="login-btn" v-if="pageType === '1'" type="primary" @click="login">登录</el-button>
				<el-button class="login-btn" v-if="pageType === '2'" type="primary" @click="register">注册</el-button>
			</div>
		</div>
	</div>
	<div class="padding-box" style=""></div>
	<footer-plus theme="blue" />
</div>
</template>

<script>
import pcHeader from '../../public/header.vue'
import footerPlus from '../../public/footer-plus.vue'
import axios from 'axios'
import qs from 'qs'

export default {
	data() {
		return {
			loginType: '1', // 1 手机+验证码登录 2 手机+密码 3 邮箱+密码
			username: '',
			password: '',
			cPassword: '',
			captcha: '',
			pageType: '1', // 1 登录 2 注册
			registerType: '1',
			registerPH: '请输入手机号码',
			loginPH: '请输入手机号码',
			sendCodeText: '发送验证码',
			sendCodeDisabled: false,
			country: [],
			countryCode: '86'
		}
	},
	created() {
		axios.get('/auth/v1/countries')
			.then(res => {
				this.country = res.data
			})
	},
	methods: {
		validateUsername() {
			if (!this.username) {
				if (this.pageType === '1' && this.loginType === '3' || this.pageType === '2' && this.registerType === '2') {
					this.$message({
						message: '邮箱不能为空',
						type: 'error'
					})
				} else {
					this.$message({
						message: '手机号不能为空',
						type: 'error'
					})
				}
			}
		},
		// 切换登录方式更改提示文字
		handleChange(val) {
			if (this.pageType === '1') {
				if (val === '3') {
					this.loginPH = '请输入邮箱'
				} else {
					this.loginPH = '请输入手机号码'
				}
			} else {
				if (val === '2') {
					this.registerPH = '请输入邮箱'
				} else {
					this.registerPH = '请输入手机号码'
				}
			}
		},
		sendCode() {
			if (!this.username) {
				this.validateUsername()
				return
			}
			if (this.pageType === '1') {
				axios.post(`/auth/v1/countries/${this.countryCode}/phones/${this.username}/phone-login-captcha`)
				.then(res => {
					debugger
					if (res.status === 201) {
						if (res.data.captcha) {
							this.sendCodeDisabled = true
							let num = 60
							this.sendCodeText = `${num}秒重新发送`
							let time = setInterval(() => {
								num--
								this.sendCodeText = `${num}秒重新发送`
								if (num === 0) {
									this.sendCodeDisabled = true
									this.sendCodeText = '重新发送'
									clearInterval(time)
								}
							}, 1000)
						}
					} else if (res.status === 429) {
						this.$message({
							message: '验证码请求过于频繁',
							type: 'error'
						})
					} else {
						this.$message({
							message: '接口错误',
							type: 'error'
						})
					}
				})
			} else {
				axios.post(`/auth/v1/countries/${this.countryCode}/phones/${this.username}/register-captcha`)
				.then(res => {
					if (res.data.captcha) {
						this.sendCodeDisabled = true
						let num = 60
						this.sendCodeText = `${num}秒重新发送`
						let time = setInterval(() => {
							num--
							this.sendCodeText = `${num}秒重新发送`
							if (num === 0) {
								this.sendCodeDisabled = true
								this.sendCodeText = '重新发送'
								clearInterval(time)
							}
						}, 1000)
					}
				})
			}

		},
		usernameBlur() {
			if (this.username) {
				if (this.pageType === '1' && this.loginType === '3' || this.pageType === '2' && this.registerType === '2') {
					let regex = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
					if (!regex.test(this.username)) {
						this.$message({
							message: '请输入正确的邮箱',
							type: 'error'
						})
					}
				}
			} else {
				this.validateUsername()
			}
		},
		register() {
			let data = {
				country_code: this.countryCode,
				phone: this.username,
				captcha: this.captcha,
				language: "zh_CN",
				nickname: "Felix"
			}
			// data = qs.stringify(data)
      this.$http.post('/auth/v1/users', data)
        .then(res => {
					if (res.status === 201) {
						this.$router.push({  //核心语句
			        path:'/'   //跳转的路径
			      })

					} else if (res.status === 400) {
						this.$message({
							message: '验证码错误',
							type: 'error'
						})
					} else if (res.status === 404) {
						this.$message({
							message: '验证码已经过期',
							type: 'error'
						})
					} else if (res.status === 410) {
						this.$message({
							message: '验证码错误次数太多',
							type: 'error'
						})
					} else if (res.status === 409) {
						this.$message({
							message: '用户已注册',
							type: 'error'
						})
					} else {
						this.$message({
							message: '接口错误',
							type: 'error'
						})
					}
        })
		},
		login() {
			let data = {
				country_code: this.countryCode,
				phone: this.username,
				captcha: this.captcha
			}
			this.$http.post('/auth/v1/phone-captcha-login', data)
        .then(res => {
					if (res.status === 201) {
						this.$router.push({  //核心语句
			        path:'/'   //跳转的路径
			      })

					} else if (res.status === 400) {
						this.$message({
							message: '验证码错误',
							type: 'error'
						})
					} else if (res.status === 404) {
						this.$message({
							message: '验证码已经过期',
							type: 'error'
						})
					} else if (res.status === 410) {
						this.$message({
							message: '验证码错误次数太多',
							type: 'error'
						})
					}
        })
		}
	},
	components: {
		pcHeader,
		footerPlus
	}
}
</script>

<style scoped lang="stylus">
#loginView
  width: 100%
  height: 100%
  background: url('./img/bg.png')
  background-size: cover
  overflow: hidden
  .padding-box
    height: 350px
    width:100%
    background: rgba(36, 142, 216, 0.2)
    position: absolute
    bottom: 0
    border-top: 2px solid rgba(244,244,244,0.4)
  .content
    .headline
      margin-top: 100px
      font-size: 40px
      font-family: PingFangSC
      font-weight: 600
      color: rgba(255,255,255,1)
      line-height: 52px
    .text
      font-size: 20px
      font-family: PingFangSC
      font-weight: 400
      color: rgba(255,255,255,1)
      line-height: 40px
    .login-box
      width: 32vw
      /* height: 40vh */
      background: #fff
      border-radius: 10px
      margin: 0 auto
      margin-top: 2vh
      overflow: hidden
      position: relative
      z-index: 200
      .row
        margin: 2vh 2vw
        text-align: left
        .el-select
          width: 180px
        .resend
          padding 0
          width: 6vw
          border: 2px solid rgba(102,102,102,0.2)
          text-align: center
          line-height: 40px
          display: inline-block
          height: 40px
          box-sizing: border-box
          float: right
          font-size: 14px
          font-family: PingFangSC
          font-weight: 400
          color: rgba(34,34,34,1)
        .login-btn
          padding: 0
          width: 100%
          height: 40px
          line-height: 40px
          text-align: center
          display: block
          background: rgba(36,142,216,1)
          border-radius: 5px
          font-size: 16px
          font-family: PingFangSC
          font-weight: 500
          color: rgba(255,255,255,1)
          margin-bottom: 30px
      .tab-title
        text-align: center
        margin-top: 2vh
        padding: 2vh
        .type
          display: inline-block
          font-size: 20px
          font-family: PingFangSC
          font-weight: 400
          color: rgba(34,34,34,1)
          cursor: pointer
          &.is-active
            font-weight: 500
            color: rgba(36,142,216,1)
</style>
