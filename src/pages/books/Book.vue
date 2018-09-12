<template>
  <div id="persons">
    <button open-type="getUserInfo" lang="zh_CN" @getuserinfo="doLogin">获取用户信息</button>
  </div>
  <!-- <div>book</div> -->
</template>

<script>
import config from "../../config"
import qcloud from "wafer2-client-sdk"
export default {
  methods: {
      doLogin: function (e) {
        qcloud.setLoginUrl(config.loginUrl)
        qcloud.login({
          success: function (userInfo) {
            console.log('登录成功', userInfo)
          },
          fail: function (err) {
            console.log('登录失败1', err)
          }
        })
      }
    }
}
</script>

<style>

</style>
