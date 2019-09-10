<template>
	<view class="container">
		<view class="cu-bar bg-white margin-top">
			<view class="action">
				<text class="cuIcon-title text-orange "></text>
				侧边抽屉
			</view>
			<view class="action"><button class="cu-btn bg-green shadow" @tap="showModal" data-target="DrawerModalL">Left</button></view>
		</view>
		<view class="cu-modal drawer-modal justify-start" :class="modalName == 'DrawerModalL' ? 'show' : ''" @tap="hideModal">
			<view class="cu-dialog basis-lg" @tap.stop="" :style="[{ top: CustomBar + 'px', height: 'calc(100vh - ' + CustomBar + 'px)' }]">
				<view class="cu-list menu" :class="[menuBorder ? 'sm-border' : '', menuCard ? 'card-menu margin-top' : '']">
					<view class="cu-item" :class="menuArrow ? 'arrow' : ''">
						<view class="content text-left flex-direction">
							<text class="cuIcon-circlefill text-grey"></text>
							<text class="text-grey">点单收银</text>
						</view>
					</view>
					<view class="cu-item" :class="menuArrow ? 'arrow' : ''">
						<view class="content text-left flex-direction">
							<text class="cuIcon-circlefill text-grey"></text>
							<text class="text-grey">撤销收银</text>
						</view>
					</view>
					<view class="cu-item" :class="menuArrow ? 'arrow' : ''">
						<view class="content text-left flex-direction">
							<text class="cuIcon-circlefill text-grey"></text>
							<text class="text-grey">交接班</text>
						</view>
					</view>
					<view @tap="routerPush(3)" class="cu-item" :class="menuArrow ? 'arrow' : ''">
						<view class="content text-left flex-direction">
							<text class="cuIcon-circlefill text-grey"></text>
							<text class="text-grey">菜品资料维护</text>
						</view>
					</view>
					<view class="cu-item" :class="menuArrow ? 'arrow' : ''">
						<view class="content text-left flex-direction">
							<text class="cuIcon-circlefill text-grey"></text>
							<text class="text-grey">营业全面分析</text>
						</view>
					</view>
					<view @tap="routerPush(5)" class="cu-item" :class="menuArrow ? 'arrow' : ''">
						<view class="content text-left flex-direction">
							<text class="cuIcon-circlefill text-grey"></text>
							<text class="text-grey">基础信息设置</text>
						</view>
					</view>
					<view class="cu-item" :class="menuArrow ? 'arrow' : ''">
						<view class="content text-left flex-direction">
							<text class="cuIcon-circlefill text-grey"></text>
							<text class="text-grey">外卖订单管理</text>
						</view>
					</view>
					<view class="cu-item" :class="menuArrow ? 'arrow' : ''">
						<view class="content text-left flex-direction">
							<text class="cuIcon-circlefill text-grey"></text>
							<text class="text-grey">会员管理</text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			CustomBar: this.CustomBar,
			modalName: 'DrawerModalL',
			menuBorder: false,
			menuArrow: false,
			menuCard: false,
			routerArr: [
				"",
				"",
				"",
				"../foodMaterials/foodMaterials",
				"",
				'../basicInformation/basicInformation']
		};
	},
	onLoad() {},
	onNavigationBarButtonTap(e) {
		console.log(e);
		if (e.index == 0) {
			this.modalName == 'DrawerModalL' ? (this.modalName = '') : (this.modalName = 'DrawerModalL');
		}
	},
	methods: {
		routerPush(n) {
			console.log(this.routerArr[n])
			uni.navigateTo({
				url: this.routerArr[n]
			});
		},
		async getData() {
			try {
				let res = await this.$api.getData({
					url: 'https://unidemo.dcloud.net.cn/api/news',
					num: '1111111'
				});
				console.log(res);
			} catch (e) {
				console.log(e);
				//TODO handle the exception
			}
		},
		showModal(e) {
			this.modalName = e.currentTarget.dataset.target;
		},
		hideModal(e) {
			this.modalName = null;
		}
	}
};
</script>

<style></style>
