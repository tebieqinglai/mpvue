<template>
	<div class="progressbar">
		<progress percent='20' activeColor='#ea5a49'></progress>
		<p>{{year}}已经过去了</p>
	</div>
</template>

<script>
	export default {
		methods:{

		},
		compunted:{
			year(){
				return new Date().getFullYear()
			},
			days(){

			}
		}
	}
</script>

<style>
	
</style>