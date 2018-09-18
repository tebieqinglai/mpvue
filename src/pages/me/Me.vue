<template>
  <div>
   <div class="container"> 
   	<div class="userinfo" > 
   		<img :src="userinfo.avatarUrl" alt="">
   		 <p>{{userinfo.nickName}}</p> 
	</div>
   </div>
	<year-progress></year-progress>
	<button v-if='userinfo.openId' @click='scanBook' class='btn'>添加图书</button>
    <button v-else open-type="getUserInfo" lang="zh_CN" class='btn' @getuserinfo="login">点击登录</button>
  </div>
</template>

<script>
import config from "@/config"
import qcloud from "wafer2-client-sdk"
import YearProgress from "@/components/YearProgress"
import { showSuccess,get,post,showModal } from "@/util"
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
  			isbn,
  			openId:this.userinfo.openId
  		})
  		showModal('添加成功',`${res.title}添加成功`)
  		// if(res.code == 0 && res.data.title){
  		// 	showSuccess('添加成功')
  		// }else{
  		// 	console.log('error')
  		// }
  	},
  	scanBook(){
  		wx.scanCode({
		  success: (res) => {
		    if(res.result){
		    	console.log(res.result)
		    	this.addBook(res.result)
		    }
		  }
		})
  	},
  	loginSuccess (res) {
      showSuccess('登录成功')
      wx.setStorageSync('userinfo', res)
      this.userinfo = res
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
		}else {
			qcloud.login({
			  success: res => {
			    this.loginSuccess(res)
			  },
			  fail: err => {
			    console.error(err)
			  }
			})
		}
	}

  },
  onShow(){
  	wx.showShareMenu()
  	let userinfo = wx.getStorageSync('userinfo')
  	if(userinfo){
  		this.userinfo = userinfo
  	}
  }
}
</script>

<style>
	.container{
		padding:0 30rpx;
	}  
	.userinfo{
  		margin-top:100rpx;
  		text-align:center;
  	}
  	.userinfo img{
	    width: 150rpx;
	    height:150rpx;
	    margin: 20rpx;
	    border-radius: 50%;
  	}
</style>
