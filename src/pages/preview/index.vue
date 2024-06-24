<script setup>
import { ref } from "vue";
import { onLoad } from "@dcloudio/uni-app";
import { getStatusBarHeight, getTitleBarHeight } from "../../utils/system-safearea";

const imageList = ref([]);
const currentIndex = ref(0);
const currentInfo = ref(null);
const hasReadImages = new Set();


onLoad((e) => {
  const classlist = uni.getStorageSync("classlist") || [];
  imageList.value = classlist.map(item => {
    return {
      ...item,
      picurl: item.smallPicurl.replace("_small.webp", ".jpg")
    };
  });

  // 根据url中的id定位图片的索引，方便swipper处理
  const id = e.id;
  currentIndex.value = imageList.value.findIndex(item => item._id === id);

  hasReadImages.add((currentIndex.value - 1 + imageList.value.length) % imageList.value.length);
  hasReadImages.add(currentIndex.value);
  hasReadImages.add((currentIndex.value + 1) % imageList.value.length);

  currentInfo.value = imageList.value[currentIndex.value];
});

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

function swipperChange(e) {
  currentIndex.value = e.detail.current;
  hasReadImages.add((currentIndex.value - 1 + imageList.value.length) % imageList.value.length);
  hasReadImages.add(currentIndex.value);
  hasReadImages.add((currentIndex.value + 1) % imageList.value.length);
  currentInfo.value = imageList.value[currentIndex.value];
  console.log(currentInfo.value);
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
  <view>
    <view class="preview-image">
      <swiper circular :current="currentIndex" @change="swipperChange" @click="showChange">
        <swiper-item v-for="(item, index) in imageList" :key="item._id">
          <image v-if="hasReadImages.has(index)" :src="item.picurl" mode="aspectToFill" />
        </swiper-item>
      </swiper>

      <view v-show="showDetails" class="details">
        <view class="go-back" :style="{ top: getStatusBarHeight() + 'px' }" @click="goBack">
          <uni-icons type="left" size="30" />
        </view>
        <view class="count">
          {{ currentIndex + 1 }} / {{ imageList.length }}
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
              {{ currentInfo._id }}
            </view>
          </view>
          <!-- <view class="pop-row">
            <view class="title">
              分类：
            </view>
            <view class="caption">
              <view class="category">
                猫咪
              </view>
            </view>
          </view> -->
          <view class="pop-row">
            <view class="title">
              发布者：
            </view>
            <view class="caption">
              {{ currentInfo.nickname }}
            </view>
          </view>
          <view class="pop-row">
            <view class="title">
              评分：
            </view>
            <view class="caption rate">
              <uni-rate readonly touchable="false" :value="currentInfo.score" />
              <text>{{ currentInfo.score }}分</text>
            </view>
          </view>
          <view class="pop-row">
            <view class="title">
              摘要：
            </view>
            <view class="caption">
              {{ currentInfo.description }}
            </view>
          </view>
          <view class="pop-row">
            <view class="title">
              标签：
            </view>
            <view class="caption">
              <view class="tags">
                <view v-for="tab in currentInfo.tabs" :key="tab" class="tag">
                  {{ tab }}
                </view>
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
  </view>
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
      padding: 10rpx 20rpx;

      .pop-row {
        display: flex;
        line-height: 1.7em;
        margin-bottom: 30rpx;

        .title {
          width: 150rpx;
          text-align: right;
          color: $text-color-light-gray;
          margin-right: 10rpx;
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

        .tags {
          display: flex;

          .tag {
            border: 1px solid $theme-color;
            border-radius: 25rpx;
            color: $theme-color;
            width: fit-content;
            padding: 0 10rpx;
            margin-right: 15rpx;
          }
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
