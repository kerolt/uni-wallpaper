<script setup>
import { getTimeDescription } from "../utils/utils";
defineProps({
  isMore: {
    type: Boolean,
    default: false,
  },
  item: {
    type: Object,
    default() {
      return {
        name: "壁纸分类",
        pircurl: "../common/image/preview2.jpg",
        updateTime: Date.now()
      };
    }
  }
});
</script>

<template>
  <navigator v-if="!isMore" :url="`/pages/classlist/index?id=${item._id}&name=${item.name}`" class="image-box">
    <image class="pic" :src="item.picurl" mode="aspectFill" />
    <view class="title">
      {{ item.name }}
    </view>
    <view class="update-time">
      {{ getTimeDescription(item.updateTime) }}前更新
    </view>
  </navigator>

  <navigator v-else url="/pages/classify/index" class="image-box more" open-type="switchTab">
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
