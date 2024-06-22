<script setup>
defineProps({
  isMore: {
    type: Boolean,
    default: false,
  }
});
</script>

<template>
  <navigator v-if="!isMore" url="" class="image-box">
    <image class="pic" src="@/common/image/preview2.jpg" mode="aspectFill" />
    <view class="title">
      明星美女
    </view>
    <view class="update-time">
      三天前更新
    </view>
  </navigator>

  <navigator v-else url="" class="image-box more">
    <image class="pic" src="@/common/image/more.jpg" mode="aspectFill" />
    <view class="more-content">
      <uni-icons type="more-filled" size="34" color="#fff" />
      <view class="text">
        更多
      </view>
    </view>
  </navigator>
</template>

<style lang="scss" scoped>
.image-box {
  height: 340rpx;
  border-radius: 15rpx;
  overflow: hidden;
  position: relative;

  .pic {
    width: 100%;
    height: 100%;
  }

  .title {
    width: 100%;
    height: 70rpx;
    position: absolute;
    left: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.2);
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(20rpx);
    font-weight: 600;
  }

  .update-time {
    position: absolute;
    left: 0;
    top: 0;
    background: rgba(250, 129, 90, 0.7);
    color: #fff;
    font-size: 22rpx;
    padding: 6rpx 16rpx;
    border-radius: 0 0 20rpx 0;
  }
}

.image-box.more {
  .more-content {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    backdrop-filter: blur(20rpx);

    .text {
      color: #fff;
      font-weight: 600;
    }
  }
}
</style>
