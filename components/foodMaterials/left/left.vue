<template>
	<view class="container">
		<view class="VerticalBox">
			<scroll-view class="VerticalNav nav" scroll-y scroll-with-animation :scroll-top="verticalNavTop" style="height:100%">
				<view class="cu-item" :class="index==tabCur?'text-green cur':''" v-for="(item,index) in list" :key="index" @tap="TabSelect"
				 :data-id="index">
					{{item.name}}
				</view>
			</scroll-view>
			<scroll-view class="VerticalMain" scroll-y scroll-with-animation style="height:100%"
			 :scroll-into-view="'main-'+mainCur" @scroll="VerticalMain">
				<view class="padding-top padding-lr" v-for="(item,index) in dataList" :key="index" :id="'main-'+index">
					<view class="cu-bar solid-bottom bg-white">
						<view class="action">
							<text class="cuIcon-title text-green"></text>{{item.food_type_name}}</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list_data: ['现有类别','新增类别'],
				list:[],
				tabCur: 0,
				mainCur: 0,
				verticalNavTop: 0,
				load: true,
				dataList: [
					{
						food_type_id: 'id',
						food_type_name: '素炒',
						food_type_code: '001'
					},
					{
						food_type_name: '凉菜',
						food_type_code: '001'
					},
					{
						food_type_id: 'id',
						food_type_name: '糖粥',
						food_type_code: '001'
					},
					{
						food_type_id: 'id',
						food_type_name: '荤炒',
						food_type_code: '001'
					},
					{
						food_type_id: 'id',
						food_type_name: '主食',
						food_type_code: '001'
					},
					{
						food_type_id: 'id',
						food_type_name: '酒水',
						food_type_code: '001'
					}
				]
			};
		},
		created() {
			uni.showLoading({
				title: '加载中...',
				mask: true
			});
			let list = [{}];
			for (let i = 0; i < this.list_data.length; i++) {
				list[i] = {};
				list[i].name = this.list_data[i]
				list[i].id = i;
			}
			this.list = list;
			this.listCur = list[0];
		},
		mounted() {
			uni.hideLoading()
		},
		methods: {
			TabSelect(e) {
				this.tabCur = e.currentTarget.dataset.id;
				this.mainCur = e.currentTarget.dataset.id;
				this.verticalNavTop = (e.currentTarget.dataset.id - 1) * 50
			},
			VerticalMain(e) {
				// #ifdef MP-ALIPAY
				   return false  //支付宝小程序暂时不支持双向联动 
				// #endif
				let that = this;
				let tabHeight = 0;
				if (this.load) {
					for (let i = 0; i < this.list.length; i++) {
						let view = uni.createSelectorQuery().select("#main-" + this.list[i].id);
						view.fields({
							size: true
						}, data => {
							this.list[i].top = tabHeight;
							tabHeight = tabHeight + data.height;
							this.list[i].bottom = tabHeight;
						}).exec();
					}
					this.load = false
				}
				let scrollTop = e.detail.scrollTop + 10;
				for (let i = 0; i < this.list.length; i++) {
					if (scrollTop > this.list[i].top && scrollTop < this.list[i].bottom) {
						this.verticalNavTop = (this.list[i].id - 1) * 50
						this.tabCur = this.list[i].id
						console.log(scrollTop)
						return false
					}
				}
			}
		},
	}
</script>

<style>
	
</style>
