<template>
	<view class="container flex flex-direction">
		<view class="flex   p-xs margin-bottom-sm mb-sm text-center padding-sm">
			<view class="flex flex-sub">
				<view class="flex-sub radius">台号</view>
				<view class="flex-sub radius">台名</view>
				<view class="flex-twice radius">区域</view>
				<view class="flex-sub radius">包间费</view>
				<view class="flex-sub radius">座位数</view>
			</view>
			<view class=" radius s-miniWidth">显示</view>
		</view>
		<view class="flex-sub flex flex-direction">
			<view class=" flex-sub" style="position: relative;">
				<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y scroll " @scroll="scroll">
					<view
						class="flex p-xs  mb-sm text-center padding-sm text-df s-lineH1 "
						:class="index === active ? 'bg-gradual-blue text-white' : ''"
						v-for="(item, index) in dataList"
						:key="index"
					>
						<view class="flex flex-sub" @tap="clickActive(index)">
							<view class="flex-sub radius">{{ item.number }}</view>
							<view class="flex-sub radius">{{ item.name }}</view>
							<view class="flex-twice radius">{{ item.area }}</view>
							<view class="flex-sub radius">{{ item.room }}</view>
							<view class="flex-sub ">{{ item.seating }}</view>
						</view>
						<view @tap="deskShow(index)" class="s-miniWidth" style="height: 40upx;">
							<view class="s-checkBox" :class="item.show ? 'check-green cuIcon-check' : ''"></view>
						</view>
					</view>
				</scroll-view>
			</view>
			<view class="flex">
				<view class="flex-sub"><button class="bg-normail" @tap="showModal('add')">增加</button></view>
				<view class="flex-sub"><button class="bg-normail" @tap="deleteList">删除</button></view>
				<view class="flex-sub"><button class="bg-normail" @tap="showModal('change')">修改</button></view>
			</view>
		</view>
		<!-- ，modal -->
		<view class="cu-modal bottom-modal" :class="modalName ? 'show' : ''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white">
					<view class="action text-green" @tap="submit">确定</view>
					<view class="action text-blue" @tap="hideModal">取消</view>
				</view>
				<view class="">
					<form @submit="formSubmit" @reset="formReset">
						<view class="cu-form-group">
							<view class="title">台号</view>
							<input placeholder="" name="number" :value="form.number" ></input>
						</view>
						<view class="cu-form-group">
							<view class="title">台名</view>
							<input placeholder="" name="name" :value="form.name" ></input>
						</view>
						<view class="cu-form-group">
							<view class="title">区域</view>
							<input placeholder="" name="area" :value="form.area" ></input>
						</view>
						<view class="cu-form-group">
							<view class="title">包间费</view>
							<input placeholder="" name="room" :value="form.room" ></input>
						</view>
						<view class="cu-form-group">
							<view class="title">座位数</view>
							<input placeholder="" name="seating" :value="form.seating" ></input>
						</view>
						<view class="uni-btn-v">
						                    <button formType="submit">Submit</button>
						                    <button type="default" formType="reset">Reset</button>
						                </view>
					</form>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			scrollTop: 0,
			dataList: [],
			active: '',
			modalName: '', //modalState
			form: {
				number: '',
				name: '',
				area: '',
				room: '',
				seating: ''
			},
			status: ''
		};
	},
	onLoad() {
		let n = 0;
		let interval = setInterval(() => {
			// this.dataList = this.dataList.concat(JSON.parse(JSON.stringify(this.dataList)));
			n++;
			if (n == 3) {
				clearInterval(interval);
			}
		});

		let self = this;
		uni.getStorage({
			key: 'basicInformationDesk',
			success: function(res) {
				self.dataList = res.data;
			}
		});
	},
	methods: {
		//模拟点击
		submit() {
			this.$refs.submit.$el.click();
		},
		formSubmit(e) {
			if (this.status == 'add') {
				let obj = JSON.parse(JSON.stringify(e.detail.value));
				obj.show = true;
				this.dataList.push(obj);

				this.setData(); //保存本地数据

				this.modalName = '';

				this.$refs.reset.$el.click();
			}
			if (this.status == 'change') {
				let obj = JSON.parse(JSON.stringify(e.detail.value));
				obj.show = this.dataList[this.active].show;
				this.$set(this.dataList, this.active, obj);
				this.setData(); //保存本地数据

				this.modalName = '';

				this.$refs.reset.$el.click();
			}
		},
		formReset(e) {
			this.form = {};
		},
		//选中效果
		clickActive(n) {
			if (n === this.active) {
				this.active = '';
				return false;
			}
			this.active = n;
		},
		//modal
		showModal(e) {
			if (e == 'add') {
				this.modalName = true;
			} else if (e == 'change') {
				if (this.active === '') {
					uni.showToast({
						icon: 'none',
						title: '请选择删除项！',
						duration: 1000
					});
					return false;
				}
				this.modalName = true;
				this.form = this.dataList[this.active];
			}
			this.status = e;
		},
		hideModal(e) {
			this.modalName = null;
		},
		deskShow(n) {
			console.log(this.dataList[n]);
			this.$set(this.dataList[n], 'show', !this.dataList[n].show);
			this.setData(); //保存本地数据
		},
		scroll: function(e) {
			console.log(e);
			this.old.scrollTop = e.detail.scrollTop;
		},
		//保存本地数据
		setData() {
			uni.setStorage({
				key: 'basicInformationDesk',
				data: this.dataList,
				success: function() {
					console.log('success');
				}
			});
		},
		deleteList() {
			//删除选中项
			if (this.active === '') {
				uni.showToast({
					icon: 'none',
					title: '请选择删除项！',
					duration: 1000
				});
				return false;
			}
			let self = this;
			uni.showModal({
				title: '提示',
				content: '确认删除？',
				success: function(res) {
					if (res.confirm) {
						self.dataList.splice(self.active, 1);
						self.setData(); //保存本地数据
					} else if (res.cancel) {
						console.log('用户点击取消');
					}
				}
			});
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
