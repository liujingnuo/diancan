<template>
  <view class="content">
    <view class="flex align-center justify-center">
      <image
        src="../../static/img/qq.png"
        mode=""
      ></image>
    </view>
    <view class="login">
      <view class="input-row ">
        <text class="title">工号：</text>
        <m-input
          class="m-input"
          type="text"
          clearable
          focus
          v-model="user.account"
        ></m-input>
      </view>
      <view class="input-row ">
        <text class="title">密码：</text>
        <m-input
          type="password"
          displayable
          v-model="user.password"
        ></m-input>
      </view>
    </view>
    <view class=" margin-top-lg flex align-center justify-center">
      <view
        class="padding-right-lg flex align-center justify-center"
        @tap="changeBox(0)"
      >
        <view
          class="checkBox"
          :class="checkbox[0].checked?'checked':''"
        ></view>
        <text class="padding-left-xs">
          自动登录
        </text>
      </view>
      <view
        class="padding-left-lg flex align-center justify-center "
        @tap="changeBox(1)"
      >
        <view
          class="checkBox"
          :class="checkbox[1].checked?'checked':''"
        ></view>
        <text class="padding-left-xs">
          记住密码
        </text>
      </view>
    </view>
    <view class="btn-row">
      <button
        type=""
        class="bg-normail text-white"
        @tap="bindLogin"
      >登 录</button>
    </view>
    <view class="flex text-gray align-center justify-center">
      <navigator url="">
        忘记密码？
      </navigator>
    </view>
  </view>
</template>

<script>
import service from "../../service.js";
import { mapState, mapMutations } from "vuex";
import mInput from "../../components/m-input.vue";

export default {
  components: {
    mInput
  },
  data() {
    return {
      user: {
        account: "",
        password: ""
      },
      checkbox: [{ checked: false }, { checked: true }]
    };
  },
  computed: mapState(["forcedLogin"]),
  methods: {
    changeBox(n) {
      this.$set(this.checkbox[n], "checked", !this.checkbox[n].checked);
    }
  }
};
</script>

<style>
.action-row {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.action-row navigator {
  color: #007aff;
  padding: 0 20upx;
}

.oauth-row {
  display: flex;
  flex-direction: row;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}

.oauth-image {
  width: 100upx;
  height: 100upx;
  border: 1upx solid #dddddd;
  border-radius: 100upx;
  margin: 0 40upx;
  background-color: #ffffff;
}

.oauth-image image {
  width: 60upx;
  height: 60upx;
  margin: 20upx;
}
</style>
<style lang="stylus">
.login {
  .input-row {
    border-bottom: 1px solid #ca4341;
    border-radius: 5px;
  }
}

checkbox {
  position: relative;
  transform: scale(0.5);
}
</style>
