<script setup>
import { ref } from "vue";
import { getStatusBarHeight, getTitleBarHeight } from "../../utils/system-safearea";

function goBack() {
  uni.navigateBack({
    animationType: "pop-out"
  });
}

// 显示/隐藏遮罩
const showDetails = ref(true);

function showChange() {
  showDetails.value = !showDetails.value;
}

// 信息弹窗
const infoPopup = ref(null);

function openInfoPop() {
  infoPopup.value.open();
}

// 评分弹窗
const ratePopup = ref(null);
const rateNum = ref(0);

function openRatePop() {
  ratePopup.value.open();
}

function closeRatePopup() {
  ratePopup.value.close();
}
</script>

<template>
  <view class="preview-image">
    <swiper circular @click="showChange">
      <swiper-item v-for="i in 3">
        <image src="@/common/image/preview_small.webp" mode="aspectToFill" />
      </swiper-item>
    </swiper>

    <view v-show="showDetails" class="details">
      <view class="go-back" :style="{ top: getStatusBarHeight() + 'px' }" @click="goBack">
        <uni-icons type="left" size="30" />
      </view>
      <view class="count">
        3 / 8
      </view>
      <view class="time">
        <uni-dateformat :date="Date.now()" format="hh:mm" />
      </view>
      <view class="date">
        <uni-dateformat :date="Date.now()" format="yyyy/MM/dd" />
      </view>
      <view class="more">
        <view class="info" @click="openInfoPop">
          <uni-icons type="info" size="40" />
          <view class="text">
            信息
          </view>
        </view>
        <view class="star" @click="openRatePop">
          <uni-icons type="star" size="40" />
          <view class="text">
            5分
          </view>
        </view>
        <view class="download">
          <uni-icons type="download" size="40" />
          <view class="text">
            下载
          </view>
        </view>
      </view>
    </view>
  </view>

  <uni-popup ref="infoPopup" type="bottom" border-radius="10px 10px 0 0" background-color="#fff" class="info-popup">
    <view class="pop-header">
      <view />
      <view class="pop-header-text">
        信息详情
      </view>
      <view />
      <!-- <uni-icons type="closeempty" class="close" /> -->
    </view>
    <scroll-view scroll-y>
      <view class="pop-content">
        <view class="pop-row">
          <view class="title">
            壁纸ID：
          </view>
          <view class="caption">
            1212122
          </view>
        </view>
        <view class="pop-row">
          <view class="title">
            分类：
          </view>
          <view class="caption">
            <view class="category">
              猫咪
            </view>
          </view>
        </view>
        <view class="pop-row">
          <view class="title">
            发布者：
          </view>
          <view class="caption">
            kerolt
          </view>
        </view>
        <view class="pop-row">
          <view class="title">
            评分：
          </view>
          <view class="caption rate">
            <uni-rate readonly touchable="false" :value="5" />
            <text>5分</text>
          </view>
        </view>
        <view class="pop-row">
          <view class="title">
            摘要：
          </view>
          <view class="caption">
            摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要摘要
          </view>
        </view>
        <view class="pop-row">
          <view class="title">
            标签：
          </view>
          <view class="caption">
            <view class="tag">
              标签1
            </view>
          </view>
        </view>

        <view class="copyright">
          版权声明：版权声明版权声明版权声明版权声明版权声明版权声明版权声明版权声明版权声明版权声明版权声明版权声明版权声明版权声明版权声明版权声明版权声明
        </view>
      </view>
    </scroll-view>
  </uni-popup>

  <uni-popup ref="ratePopup" background-color="#fff" border-radius="10px 10px 10px 10px" :is-mask-click="false">
    <view class="rate-popup">
      <view class="pop-header">
        <view />
        <view class="pop-header-text">
          评分
        </view>
        <uni-icons type="closeempty" class="close" @click="closeRatePopup" />
      </view>
      <view class="rate-pop-content">
        <uni-rate v-model="rateNum" allow-half />
        <text>{{ rateNum }}分</text>
      </view>
      <view class="rate-pop-footer">
        <button type="default" size="mini" plain :disabled="!rateNum">
          就这个分了！
        </button>
      </view>
    </view>
  </uni-popup>
</template>

<style lang="scss" scoped>
.preview-image {
  width: 100%;
  height: 100vh;
  position: relative;

  swiper {
    width: 100%;
    height: 100%;

    image {
      width: 100%;
      height: 100vh;
    }
  }

  .details {
    &>view {
      position: absolute;
      left: 0;
      right: 0;
      margin: auto;
      width: fit-content;
    }

    .go-back {
      background: rgba(205, 203, 203, 0.2);
      margin: 0;
      left: 5%;
      border-radius: 50%;
      padding: 10rpx;
    }

    .count {
      top: 8%;
      background: rgba(0, 0, 0, 0.2);
      border-radius: 40rpx;
      padding: 8rpx 15rpx;
    }

    .time {
      top: calc(8% + 50rpx);
      color: #eee;
      font-size: 110rpx;
      font-weight: 700;
      text-shadow: 0 4rpx rgba(0, 0, 0, 0.3);
    }

    .date {
      top: 24%;
      color: #eee;
      font-size: 40rpx;
      font-weight: 600;
    }

    .more {
      top: 75%;
      padding: 15rpx 70rpx;
      display: flex;
      gap: 90rpx;
      background: rgba(#eee, $alpha: 0.5);
      border-radius: 80rpx;

      .text {
        font-size: 30rpx;
      }

      .star,
      .info,
      .download {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
    }
  }
}

.pop-header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 20rpx 30rpx;
  overflow: hidden;

  .pop-header-text {
    font-size: 30rpx;
    color: #676767;
  }

  .close {
    padding: 10rpx;
  }
}

.info-popup {

  scroll-view {
    max-height: 60vh;
    font-size: 28rpx;

    .pop-content {
      padding: 10rpx 0;

      .pop-row {
        display: flex;
        line-height: 1.7em;
        margin-bottom: 30rpx;

        .title {
          width: 150rpx;
          text-align: right;
          color: $text-color-light-gray;
        }

        .caption {
          flex: 1;
        }

        .rate {
          display: flex;
          align-items: center;

          text {
            color: rgb(255, 202, 62);
            margin-left: 10rpx;
          }
        }

        .category {
          color: $theme-color;
        }

        .tag {
          border: 1px solid $theme-color;
          border-radius: 25rpx;
          color: $theme-color;
          width: fit-content;
          padding: 0 10rpx;
        }
      }

      .copyright {
        color: $text-color-light-gray;
        padding: 20rpx;
        margin: 0 20rpx 15rpx;
        background: #f6f6f6;
        border-radius: 10rpx;
        line-height: 1.6em;
      }
    }
  }
}

.rate-popup {
  width: 70vw;

  .rate-pop-content {
    display: flex;
    align-items: center;
    justify-content: center;

    text {
      color: rgb(255, 202, 62);
      margin-left: 10rpx;
    }
  }

  .rate-pop-footer {
    display: flex;
    align-items: center;
    justify-content: center;

    button {
      margin: 30rpx 30rpx;

    }
  }
}
</style>
