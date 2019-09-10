<template>
	<view class="containerBox">
		<view class="s-navbar flex  solid-bottom">
			<view @tap="addBg(0)" :class="[active == 0 ? 'bg-gradualRed' : '']" class="flex-sub flex  align-center justify-center">菜品资料</view>
			<view @tap="addBg(1)" :class="[active == 1 ? 'bg-gradualRed' : '']" class="flex-sub flex  align-center justify-center">菜品类别</view>
		</view>
		<view class="swiper-container">
			<left class="box"  :class="[active==0?'zIndex':'']"></left>
			<!-- <right class="box"  :class="[active==1?'zIndex':'']"></right> -->
		</view>
	</view>
</template>

<script>
import left from '../../components/foodMaterials/left/left.vue';
import right from '../../components/foodMaterials/right/right.vue';
export default {
	data() {
		return {
			duration: 1000,
			active: 0,
		};
	},
	components: {
		left,
		right
	},
	methods: {
		addBg(n){
			this.active=n
		}
	}
};
</script>

<style lang="stylus">
.bg-gradualRed
	background #ea6767
	color #fff
.swiper-container
	position relative
	height calc(100% - 80upx)
	.box
		height: 100%;
		width:100%;
		position:absolute;
		left:0;
		top:0;
		z-index:-1
	.swiper
		height 100%
	.zIndex
		z-index 1!important
</style>
