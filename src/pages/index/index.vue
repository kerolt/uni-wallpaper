<script setup>
import { ref } from "vue";
import { onLoad, onShareAppMessage, onShareTimeline } from "@dcloudio/uni-app";
import InfoBar from "../../components/InfoBar.vue";
import Topic from "../../components/Topic.vue";
import NavBar from "../../components/NavBar.vue";
import { apiGetBanner, apiGetClassify, apiGetDayRandom, apiGetNotice } from "../../api/api";

const bannerList = ref([]);
const recommendList = ref([]);
const classifyList = ref([]);

async function getBannerList() {
  const { data } = await apiGetBanner();
  bannerList.value = data;
}

async function getRecommendList() {
  const { data } = await apiGetDayRandom();
  recommendList.value = data;
}

async function getClassifyList() {
  const { data } = await apiGetClassify({
    select: true
  });
  classifyList.value = data;
}

onLoad(async () => {
  getBannerList();
  getRecommendList();
  getClassifyList();
});

onShareAppMessage(() => {
  return {
    title: "咸虾米壁纸学习～",
    path: "/pages/index/index"
  };
});

onShareTimeline(() => {
  return {
    title: "咸虾米壁纸学习～",
  };
});

</script>

<template>
  <view class="home page-bg">
    <NavBar title="推荐" />
    <!-- 轮播图 -->
    <view class="banner">
      <swiper circular indicator-dots autoplay indicator-color="rgba(255,255,255,0.5)" indicator-active-color="#fff">
        <swiper-item v-for="item in bannerList" :key="item._id">
          <image :src="item.picurl" mode="aspectFill" />
        </swiper-item>
      </swiper>
    </view>

    <!-- 公告栏 -->
    <view class="notice">
      <view class="notice-left">
        <uni-icons type="sound-filled" size="20" color="#28b398" />
        <text class="text">
          公告
        </text>
      </view>
      <view class="notice-center">
        <swiper vertical autoplay circular interval="2500" duration="800">
          <swiper-item v-for="item in 3">
            消息
          </swiper-item>
        </swiper>
      </view>
      <view class="notice-right">
        <uni-icons type="right" size="16" color="#333" />
      </view>
    </view>

    <!-- 每日推荐 -->
    <view class="recommend">
      <InfoBar>
        <template #name>
          每日推荐
        </template>
        <template #custom>
          <view class="date">
            <uni-icons type="calendar" size="18" color="#28b398" />
            <uni-dateformat :date="Date.now()" format="MM月dd日" />
          </view>
        </template>
      </InfoBar>
      <view class="content">
        <scroll-view scroll-x>
          <navigator url="/pages/preview/index" open-type="navigate">
            <view v-for="item in recommendList" :key="item._id" class="image-box">
              <image :src="item.smallPicurl" mode="aspectFill" />
            </view>
          </navigator>
        </scroll-view>
      </view>
    </view>

    <!-- 专题精选 -->
    <view class="special-select">
      <InfoBar>
        <template #name>
          专题精选
        </template>
        <template #custom>
          more
        </template>
      </InfoBar>
      <view class="select-content">
        <Topic v-for="item in classifyList" :key="item._id" class="select-content-item" :item="item" />
        <Topic :is-more="true" />
      </view>
    </view>
  </view>
</template>

<style lang="scss">
.home {
  .banner {
    width: 750rpx;
    padding: 30rpx 0;

    swiper {
      width: 750rpx;
      height: 340rpx;

      &-item {
        width: 100%;
        height: 100%;
        padding: 0 30rpx;

        image {
          width: 100%;
          height: 100%;
          border-radius: 10rpx;
        }
      }
    }
  }

  .notice {
    width: 690rpx;
    height: 80rpx;
    line-height: 80rpx;
    background: #f9f9f9;
    margin: 0 auto;
    display: flex;
    border-radius: 10rpx;

    &-left {
      width: 140rpx;
      display: flex;
      align-items: center;
      justify-content: center;

      .text {
        font-size: 28rpx;
        font-weight: 600;
      }
    }

    &-center {
      flex: 1;

      swiper {
        height: 100%;

        &-item {
          height: 100%;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
    }

    &-right {
      width: 70rpx;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .recommend {
    padding-top: 50rpx;

    .date {
      color: $theme-color;
    }

    .content {
      width: 720rpx;
      margin-top: 30rpx;

      scroll-view {
        white-space: nowrap;
        padding-left: 30rpx;

        .image-box {
          width: 200rpx;
          height: 430rpx;
          display: inline-block;
          margin-right: 15rpx;

          image {
            width: 100%;
            height: 100%;
          }
        }

        .image-box:last-child {
          margin-right: 30rpx;
        }
      }
    }
  }

  .special-select {
    padding: 50rpx 0;

    .select-content {
      margin-top: 30rpx;
      padding: 0 30rpx;
      display: grid;
      gap: 15rpx;
      grid-template-columns: repeat(3, 1fr);
    }
  }
}
</style>
