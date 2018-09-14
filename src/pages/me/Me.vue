<template>
  <div>
   <div class="container"> 
   	<div class="userinfo" > 
   		<img :src="userinfo.avatarUrl" alt="">
   		 <p>{{userinfo.nickName}}</p> 
	</div>
   </div>
	<year-progress></year-progress>
	<button class='btn' @click="scanbook">添加图书</button>
	<!-- <button open-type="getUserInfo" lang="zh_CN" class='btn' @getuserinfo="login">老师的新点击登录</button>
	<button open-type="getUserInfo" lang="zh_CN" class='btn' @getuserinfo="loginTwo">同学的点击登录</button> -->
	<!-- <button v-if='userinfo.openId' @click='scanbook' class='btn'>添加图书</button> -->
    <button open-type="getUserInfo" lang="zh_CN" class='btn' @getuserinfo="login">点击登录</button>
  </div>
</template>

<script>
import config from "@/config"
import qcloud from "wafer2-client-sdk"
import YearProgress from "@/components/YearProgress"
import { showSuccess,get,post } from "@/util"
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
  	async addBook(isbn){
  		const res = await post('/webapp/addbook',{
  			isbn
  		})
  		if(res.code == 0 && res.data.title){
  			showSuccess('添加成功')
  		}else{
  			console.log('error')
  		}
  	},
  	scanbook(){
  		wx.scanCode({
		  success: (res) => {
		    if(res.result){
		    	console.log(res)
		    	this.addBook(res.result)
		    }
		  }
		})
  	},
  	
  	 login () {
      wx.showToast({
        title: '登录中',
        icon: 'loading'
      })
      qcloud.setLoginUrl(config.loginUrl)
      const session = qcloud.Session.get()
      if (session) {
        qcloud.loginWithCode({
          success: res => {
            console.log('没过期的登录', res)
            this.loginSuccess(res)
          },
          fail: err => {
            console.error(err)
          }
        })
      } else {
        qcloud.login({
          success: res => {
            console.log('登录成功', res)
            this.loginSuccess(res)
          },
          fail: err => {
            console.error(err)
          }
        })
      }
    }


  }
}
</script>

<style>

</style>
