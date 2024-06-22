<script setup>
import { getStatusBarHeight, getTitleBarHeight } from "../utils/system-safearea";

defineProps({
  title: {
    type: String,
    default: "壁纸"
  }
});
</script>

<template>
  <view class="navbar">
    <view class="status-bar" :style="{ height: getStatusBarHeight() + 'px' }"></view>
    <view class="title-bar" :style="{ height: getTitleBarHeight() + 'px' }">
      <view class="title">{{ title }}</view>
      <view class="search">
        <uni-icons type="search" size="20"></uni-icons>
        <view class="text">搜索</view>
      </view>
    </view>
  </view>
  <view :style="{ height: getStatusBarHeight() + getTitleBarHeight() + 'px' }"></view>
</template>

<style lang="scss" scoped>
.navbar {
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 999;
  background: linear-gradient(to bottom, transparent, #fff 400rpx), linear-gradient(to right, #beecd8 20%, #f4e2d8);

  .title-bar {
    display: flex;
    align-items: center;
    padding: 0 30rpx;

    .title {
      font-size: 24px;
      font-weight: 600;
    }

    .search {
      display: flex;
      align-items: center;
      background: rgba(#fff, 0.45);
      border: 1px solid #fff;
      border-radius: 25px;
      color: #999;
      padding: 10rpx 15rpx;
      width: 220rpx;
      height: 56rpx;
      margin-left: 30rpx;

      &>view {
        margin-left: 20rpx;
      }
    }
  }
}
</style>
