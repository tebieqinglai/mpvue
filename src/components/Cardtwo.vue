<template>
  <a :href="detailUrl">
      <div class="book-card">
        <div class="thumb">
        	<img :src="book.image" class="img" mode="aspectFit" @click.stop="preview">
        </div>
        <div class="detail">
        	<div class="row clearfix">
        		<div class="left">
        			{{book.title}}
        		</div>
        		<div class="right">
        			{{book.rate}}<Rate :value="book.rate"></Rate>
        		</div>
        	</div>
            <div class="row clearfix">
                <div class="left">
                    {{book.author}}
                </div>
                <div class="right">
                    浏览量:{{book.count}}
                </div>
            </div>
            <div class="row clearfix">
                <div class="left">
                    {{book.publisher}}
                </div>
                <div class="right">
                    添加者:{{book.user_Info.nickName}}
                </div>
            </div>
        </div>
      </div>
  </a>
</template>

<script>
import Rate from '@/components/Rate'
export default {
    components:{
        Rate
    },
    props:['book'],
    computed:{
        detailUrl(){
            return '/pages/detail/main?id='+this.book.id
        }
    },
    methods:{
        preview(){
            wx.previewImage({
                current:this.book.image,
                urls:[this.book.image]
            })
        }
    }
}
</script>

<style scoped>
.clearfix{
    display:inline-block;
}
.book-card{
  padding:5px;
  overflow: hidden;
  margin-top: 5px;
  margin-bottom: 5px;
  font-size:14px;
}
.thumb{
  height:90px;
  width:90px;
  float:left;
  margin: 0 auto;
  overflow: hidden;
}
.img{
    max-width: 100%;
    max-height: 100%;
}
.detail{
    margin-left:100px;
}
.row{
    width:100%;
    line-height:20px;
    margin-bottom:3px;
}
.left{
    float:left;
}
.right{
    float:right;
}
</style>
