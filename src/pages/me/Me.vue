<template>
  <div>
   <div class="container"> 
   	<div class="userinfo" > 
   		<img :src="userinfo.avatarUrl" alt="">
   		 <p>{{userinfo.nickName}}</p> 
   		</div>
	</div>
	<year-progress></year-progress>
	<!-- <button class='btn' @click="scanbook">添加图书</button> -->
	<button open-type="getUserInfo" lang="zh_CN" class='btn' @getuserinfo="login">老师的新点击登录</button>
	<button open-type="getUserInfo" lang="zh_CN" class='btn' @getuserinfo="loginTwo">同学的点击登录</button>
  </div>
</template>

<script>
import config from "@/config"
import qcloud from "wafer2-client-sdk"
import YearProgress from "@/components/YearProgress"
import { showSuccess } from "@/util"
export default {
  components:{
	YearProgress
  },
  data(){
	return{
		userinfo: { 
			avatarUrl: '../../../static/img/unlogin.png', 
			nickName: '' 
		}
	}
  },
  methods:{
  	scanbook(){
  		wx.scanCode({
		  success: (res) => {
		    console.log(res)
		  }
		})
  	},
  	getWxLogin: function ({encryptedData, iv, userinfo}) {
		const self = this
		wx.login({
			success:function(loginResult){
				console.log('loginResult',loginResult)
				var loginParams = { 
					code: loginResult.code, 
					encryptedData: encryptedData, 
					iv: iv 
				}
				qcloud.setLoginUrl(config.loginUrl)
				console.log(config.userUrl)
				qcloud.requestLogin({
					loginParams,
					success(){
						qcloud.request({ 
							url: config.userUrl, 
							login: true, 
							success (userRes) { 
								console.log('登录成功2') 
								wx.setStorageSync('userinfo', userRes.data.data)
								self.userinfo = userRes.data.data 
							} 
						})
					},
					fail(error){
						console.log('登录失败1', error)
					}
				})
			},
			fail:function(loginError){
				console.log('登录失败2',loginError)
			}
		})
  	},
  	login(e){
  		const self = this
  		console.log(0,e)
  		wx.getSetting({
  			success:function(res){
  				console.log(1,res)
  				if (res.authSetting['scope.userInfo']) {
  					wx.checkSession({
  						success: function (res) {
							console.log('登录成功1',res)
  						},
  						fail:function(){
  							console.log(2)
  							qcloud.clearSession()
  							var options = { 
  								encryptedData: e.mp.detail.encryptedData, 
  								iv: e.mp.detail.iv, 
  								userinfo: e.mp.detail.userInfo 
  							}
  							console.log(3) 
  							self.getWxLogin(options)
  						}
  					})
				}else{
					console.log('用户未授权', e.mp.detail.errMsg)
				}				
  			},
  			fail:function(){
  				console.log(4)
  			}
  		})
  	},
  	loginTwo () {
      let user = wx.getStorageSync('userinfo')
      if (!user) {
        qcloud.login({
          success: (userinfo) => {
            console.log('登陆成功', userinfo)
            wx.setStorageSync('userinfo', userinfo)
            this.userinfo = userinfo
            showSuccess('登陆成功')
          },
          fail: (err) => {
            console.log('登陆失败', err)
          }
        })
      }
    }
  }
}
</script>

<style>

</style>
