<script setup>
import { ref } from "vue";
import { onLoad, onShareAppMessage } from "@dcloudio/uni-app";
import { getStatusBarHeight, getTitleBarHeight } from "../../utils/system-safearea";
import { apiDetailWall, apiRecordDownload, apiSetupScore } from "../../api/api";
import { gotoHome } from "../../utils/utils";

const imageList = ref([]);        // 先从缓存中获取图片对象数组
const currentIndex = ref(0);      // 当前图片的索引
const currentInfo = ref(null);    // 当前图片对象
const hasReadImages = new Set();  // 已经从网络获取了的图片
const isRate = ref(false);        // 是否已经评分
const showDetails = ref(true);    // 显示遮罩
const infoPopup = ref(null);      // 信息弹窗
const ratePopup = ref(null);      // 评分弹窗
const rateNum = ref(0);           // 评分数字

onLoad(async (e) => {
  const id = e.id; // 根据url中的id定位图片的索引，方便swipper处理
  if (!id) {
    gotoHome();
    return;
  }

  const classlist = uni.getStorageSync("classlist") || [];
  imageList.value = classlist.map(item => {
    return {
      ...item,
      picurl: item.smallPicurl.replace("_small.webp", ".jpg")
    };
  });

  // 若该页面是用户通过点击别的用户分享的链接进入的，应该只展示分享的壁纸，即只有一张
  if (e.type === "share") {
    const { data } = await apiDetailWall({ id });
    imageList.value = data.map(item => {
      return {
        ...item,
        picurl: item.smallPicurl.replace("_small.webp", ".jpg")
      };
    });
  }
  currentIndex.value = imageList.value.findIndex(item => item._id === id);

  hasReadImages.add((currentIndex.value - 1 + imageList.value.length) % imageList.value.length);
  hasReadImages.add(currentIndex.value);
  hasReadImages.add((currentIndex.value + 1) % imageList.value.length);

  currentInfo.value = imageList.value[currentIndex.value];
});

onShareAppMessage(() => {
  return {
    path: "/pages/preview/index?id=" + currentInfo.value._id + "&type=share"
  };
});

function goBack() {
  uni.navigateBack({
    fail: () => {
      uni.reLaunch({ url: "/pages/index/index" });
    }
  });
}

function showChange() {
  showDetails.value = !showDetails.value;
}

function swipperChange(e) {
  currentIndex.value = e.detail.current;
  hasReadImages.add((currentIndex.value - 1 + imageList.value.length) % imageList.value.length);
  hasReadImages.add(currentIndex.value);
  hasReadImages.add((currentIndex.value + 1) % imageList.value.length);
  currentInfo.value = imageList.value[currentIndex.value];
}

function openInfoPop() {
  infoPopup.value.open();
}

function openRatePop() {
  // 判断当前图片是否已经评分过了
  if (currentInfo.value.userScore) {
    isRate.value = true;
    rateNum.value = currentInfo.value.userScore;
  }
  ratePopup.value.open();
}

function closeRatePopup() {
  rateNum.value = 0;
  isRate.value = false;
  ratePopup.value.close();
}

async function submitRateScore() {
  const { classid, _id: wallId } = currentInfo.value;
  const res = await apiSetupScore({
    classid,
    wallId,
    userScore: rateNum.value
  });
  if (res.errCode === 0) {
    uni.showToast({
      title: "评分成功",
      icon: "none"
    });
    // 这里不能是更新currentInfo的值，而是需要更新数组的值，之后将数组更新至缓存中
    imageList.value[currentIndex.value].userScore = rateNum.value;
    uni.setStorageSync("classlist", imageList.value);
    closeRatePopup();
  }
}

async function downloadImage() {
  // #ifdef MP
  try {
    const { classid, _id: wallId } = currentInfo.value;
    const res = await apiRecordDownload({
      classid,
      wallId
    });
    if (res.errCode !== 0) throw res;

    uni.showLoading({
      title: "下载中...",
      mask: true
    });

    // 由于uniapp中的saveImageToPhotosAlbum这个api不支持网络图片路径，
    // 但可以是临时文件路径也可以是永久文件路径，用getImageInfo可以在小程序中获取一个临时的图片地址
    uni.getImageInfo({
      src: currentInfo.value.picurl,
      success: (res) => {
        uni.saveImageToPhotosAlbum({
          filePath: res.path,
          success: (res) => {
            uni.showToast({
              title: "保存成功！",
              icon: "none"
            });
          },
          fail: (err) => {
            // 未授权的情况下也会走到这里，通过uni.openSetting来设置权限
            uni.showModal({
              title: "授权提示",
              content: "需要授权保存相册",
              success: (res) => {
                if (res.confirm) {
                  uni.openSetting({
                    success: (setting) => {
                      console.log(setting);
                      uni.showToast({
                        title: setting.authSetting["scope.writePhotosAlbum"] ? "授权成功^_^" : "未获取授权>_<",
                        icon: setting.authSetting["scope.writePhotosAlbum"] ? "success" : "error"
                      });
                    }
                  });
                }
              }
            });
          },
          complete: () => {
            uni.hideLoading();
          }
        });
      }
    });
  } catch (err) {
    uni.hideLoading();
  }
  // #endif
}
</script>

<template>
  <view>
    <view class="preview-image">
      <swiper circular :current="currentIndex" @change="swipperChange" @click="showChange">
        <swiper-item v-for="(item, index) in imageList" :key="item?._id">
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
              评分
            </view>
          </view>
          <view class="download" @click="downloadImage">
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
              {{ currentInfo?._id }}
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
              {{ currentInfo?.nickname }}
            </view>
          </view>
          <view class="pop-row">
            <view class="title">
              评分：
            </view>
            <view class="caption rate">
              <uni-rate readonly touchable="false" :value="currentInfo?.score" />
              <text>{{ currentInfo?.score }}分</text>
            </view>
          </view>
          <view class="pop-row">
            <view class="title">
              摘要：
            </view>
            <view class="caption">
              {{ currentInfo?.description }}
            </view>
          </view>
          <view class="pop-row">
            <view class="title">
              标签：
            </view>
            <view class="caption">
              <view class="tags">
                <view v-for="tab in currentInfo?.tabs" :key="tab" class="tag">
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
            {{ isRate ? "已经评过分啦" : "评分" }}
          </view>
          <uni-icons type="closeempty" class="close" @click="closeRatePopup" />
        </view>
        <view class="rate-pop-content">
          <uni-rate v-model="rateNum" allow-half :disabled="isRate" disabled-color="rgb(255, 202, 62)" />
          <text>{{ rateNum }}分</text>
        </view>
        <view class="rate-pop-footer">
          <button type="default" size="mini" plain :disabled="!rateNum || isRate" @click="submitRateScore">
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
