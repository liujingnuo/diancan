<template>
    <view class="content">
    </view>
</template>

<script>

    export default {
        onLoad() {
        },
		methods:{
			async getData(){
				try{
					let res=await this.$api.getData({
						url:'https://unidemo.dcloud.net.cn/api/news',
						num:"1111111"
					})
					console.log(res)
					
				}catch(e){
					console.log(e)
					//TODO handle the exception
				}
			}
		}
    }
</script>

<style>
</style>
