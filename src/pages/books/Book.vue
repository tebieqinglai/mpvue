<template>
  <div>
    <card v-for="book in books" :key="book.id" :book='book'></card>
  </div>
</template>

<script>
import {get} from "@/util"
import Card from "@/components/Cardtwo"
export default {
  components:{
    Card
  },
  data(){
    return{
      books:[]
    }
  },
  methods:{
    async getList(){
      const books = await get('/webapp/booklist')
      this.books = books.list
    }
  },
  mounted(){
    this.getList()
  }
}
</script>

<style>

</style>
