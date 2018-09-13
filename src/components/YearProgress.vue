<template>
	<div class="progressbar">
		<progress :percent='persent' activeColor='#ea5a49'></progress>
		<p>{{year}}已经过去了{{days}}天</p>
	</div>
</template>

<script>
	export default {
		methods:{

		},
		computed:{
			year(){
				return new Date().getFullYear()
			},
			days(){
				let start = new Date()
				start.setMonth(0)
				start.setDate(1)
				let offset = new Date().getTime() - start.getTime()
				return parseInt(offset/1000/60/60/24)
			},
			persent(){
				console.log((this.days*100/365).toFixed(1))
				return (this.days*100/365).toFixed(1)
			}
		}
		
	}
</script>

<style>
	
</style>