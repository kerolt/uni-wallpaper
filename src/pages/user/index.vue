<script setup></script>

<template>
  <view class="page-bg">
    <view class="info">
      <image src="@/static/logo.png" mode="aspectFill" />
      <view class="ip">127.0.0.1</view>
      <view class="location">来自于：湖南</view>
    </view>

    <view class="section">
      <view class="section-list">
        <view class="section-item" v-for="i in 3">
          <view class="item-left">
            <uni-icons type="download-filled" size="30" color="#28b398"> </uni-icons>
            <view class="text">我的下载</view>
          </view>
          <view class="item-right">
            <view class="text">20</view>
            <uni-icons type="right" size="20" color="#666"></uni-icons>
          </view>
        </view>
      </view>
    </view>

    <view class="section">
      <view class="section-list">
        <view class="section-item" v-for="i in 2">
          <view class="item-left">
            <uni-icons type="download-filled" size="30" color="#28b398"> </uni-icons>
            <view class="text">我的下载</view>
          </view>
          <view class="item-right">
            <view class="text">20</view>
            <uni-icons type="right" size="20" color="#666"></uni-icons>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.info {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 50rpx 0 0 0;

  image {
    width: 160rpx;
    height: 160rpx;
    border-radius: 50%;
  }

  .ip {
    padding: 10rpx 0;
  }

  .location {
    padding: 5rpx 0;
  }
}

.section {
  width: 690rpx;
  margin: 50rpx auto;
  box-shadow: 0 0 15rpx rgba(0, 0, 0, 0.05);
  border: 1px solid #eee;
  border-radius: 15rpx;

  .section-list {

    .section-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #eee;
      background: #fff;
      padding: 15rpx 10rpx;

      .item-left {
        display: flex;
        align-items: center;
        justify-content: center;

        .text {
          padding-left: 10rpx;
          color: #666;
        }
      }

      .item-right {
        display: flex;
        align-items: center;
        justify-content: center;

        .text {
          color: #666;
          padding-right: 10rpx;
        }
      }
    }

    .section-item:last-child {
      border-bottom: 0;
    }
  }

}
</style>
