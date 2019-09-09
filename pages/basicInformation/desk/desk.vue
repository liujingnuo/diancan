<template>
	<view class="container flex flex-direction">
		<view class="flex   p-xs margin-bottom-sm mb-sm text-center padding-sm">
			<view class="flex-sub radius">台号</view>
			<view class="flex-sub radius">台名</view>
			<view class="flex-twice radius">区域</view>
			<view class="flex-sub radius">包间费</view>
			<view class="flex-sub radius">座位数</view>
			<view class="flex-sub radius">隐藏</view>
		</view>
		<view class="flex-sub flex flex-direction">
			<view class=" flex-sub" style="position: relative;">
				<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y scroll " @scroll="scroll">
					<view class="flex p-xs  mb-sm text-center padding-sm text-df" v-for="(item, index) in dataList" :key="index">
						<view class="flex-sub radius">{{ item.number }}</view>
						<view class="flex-sub radius">{{ item.name }}</view>
						<view class="flex-twice radius">{{ item.area }}</view>
						<view class="flex-sub radius">{{ item.room }}</view>
						<view class="flex-sub ">{{ item.seating }}</view>
						<view @tap="deskShow(index)" class="flex-sub " style="height: 40upx;"><view class="s-checkBox" :class="item.show ? 'check-green cuIcon-check' : ''"></view></view>
					</view>
				</scroll-view>
			</view>
			<view class="flex">
				<view class="flex-sub"><button class="bg-normail">增加</button></view>
				<view class="flex-sub"><button class="bg-normail">删除</button></view>
				<view class="flex-sub"><button class="bg-normail">修改</button></view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			scrollTop: 0,
			dataList: [
				{
					number: '001',
					name: '001',
					area: '荷花池',
					room: '120',
					seating: 5,
					show: true
				},
				{
					number: '002',
					name: '002',
					area: '荷花池2',
					room: '120',
					seating: 5,
					show: false
				}
			]
		};
	},
	onLoad() {
		let n = 0;
		let interval = setInterval(() => {
			this.dataList=this.dataList.concat(JSON.parse(JSON.stringify(this.dataList)));
			n++;
			if (n == 3) {
				clearInterval(interval);
			}
		});
	},
	methods: {
		deskShow(n){
			console.log(this.dataList[n])
			this.$set(this.dataList[n],'show',!this.dataList[n].show)
		},
		scroll: function(e) {
			console.log(e);
			this.old.scrollTop = e.detail.scrollTop;
		}
	}
};
</script>

<style lang="stylus">
.scroll
	position absolute
	left 0
	height 100%
	width 100%
	top 0
</style>
