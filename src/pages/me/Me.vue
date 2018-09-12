<template>
  <div>
   <div class="container"> 
   	<div class="userinfo" > 
   		<img :src="userinfo.avatarUrl" alt="">
   		 <p>{{userinfo.nickName}}</p> 
   		</div>
	</div>
	<button v-if='userinfo.openId' class='btn'>添加图书</button>
   <button v-else open-type="getUserInfo" lang="zh_CN" class='btn' @getuserinfo="login">点击登录</button>
  </div>
</template>

<script>
import config from "@/config"
import qcloud from "wafer2-client-sdk"
export default {
  data(){
	return{
		userinfo: { 
			avatarUrl: 'http://image.shengxinjing.cn/rate/unlogin.png', 
			nickName: '' 
		}
	}
  },
  methods:{
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
  				console.log(1)
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
  	}
  }
}
</script>

<style>

</style>
