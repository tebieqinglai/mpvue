<template>
  <div>
    <top-swiper :tops='tops'></top-swiper>
    <card v-for="book in books" :key="book.id" :book='book'></card>
    <div class="text-footer" v-if="!more">
      没有更多数据了
    </div>
  </div>
</template>

<script>
import {get} from "@/util"
import Card from "@/components/Cardtwo"
import TopSwiper from "@/components/TopSwiper"
export default {
  components:{
    Card,
    TopSwiper
  },
  data(){
    return{
      books:[],
      page:0,
      more:true,
      tops:[]
    }
  },
  methods:{
    async getList(init){
      if(init){
        this.page = 0
        this.more = true
      }
      wx.showNavigationBarLoading()  //打开loading
      const books = await get('/webapp/booklist',{
        page:this.page
      })
      //this.books = books.list
      if(books.list.length<6 && this.page>0){
        this.more = false
      }
      if(init){
        this.books = books.list
        wx.stopPullDownRefresh()  //关闭刷新动画 页面自动就弹上去 不关闭页面不自动弹上去 打开在app.json中配置的 全局
      }else{
        //不是第一次加载 就是下拉刷新
        this.books = this.books.concat(books.list)
      }
      
      wx.hideNavigationBarLoading()  //关闭loading
    },
    async getTop(){
      const tops = await get('/webapp/top')
      this.tops = tops.list
    }
  },
  onPullDownRefresh(){
    this.getList(true)
    this.getTop()
  },
  onReachBottom(){
    if(!this.more){
      //没有更多了
      return false
    }
    this.page = this.page +1
    this.getList()
  },
  mounted(){
    this.getList(true)
    this.getTop()
  }
}
</script>

<style>
  .text-footer{
    font-size:14px;
    text-align: center;
    margin-bottom:10px;
  }
</style>
