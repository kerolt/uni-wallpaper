<script setup>
import { ref } from "vue";
import { onLoad } from "@dcloudio/uni-app";
import { getTitleBarHeight } from "../../utils/system-safearea";
import { apiUserInfo } from "../../api/api";

const userInfo = ref(null);

onLoad(() => {
  getUserInfo();
});

async function getUserInfo() {
  const { data } = await apiUserInfo();
  userInfo.value = data;
}

</script>

<template>
  <view class="page-bg">
    <view :style="{ height: getTitleBarHeight() + 'px' }" />
    <view class="info">
      <image src="@/static/logo.png" mode="aspectFill" />
      <view class="ip">
        IP：{{ userInfo?.IP }}
      </view>
      <view class="location">
        来自于：{{ userInfo?.address.city || userInfo?.address.province || userInfo?.address.country }}
      </view>
    </view>

    <view class="section">
      <view class="section-list">
        <navigator url="/pages/classlist/index?name=我的下载&type=download" open-type="navigate"
          hover-class="navigator-hover" class="section-item">
          <view class="item-left">
            <uni-icons type="download-filled" size="30" color="#28b398" />
            <view class="text">
              我的下载
            </view>
          </view>
          <view class="item-right">
            <view class="text">
              {{ userInfo?.downloadSize }}
            </view>
            <uni-icons type="right" size="20" color="#666" />
          </view>
        </navigator>
        <navigator url="/pages/classlist/index?name=我的评分&type=score" open-type="navigate" hover-class="navigator-hover"
          class="section-item">
          <view class="item-left">
            <uni-icons type="star-filled" size="30" color="#28b398" />
            <view class="text">
              我的评分
            </view>
          </view>
          <view class="item-right">
            <view class="text">
              {{ userInfo?.scoreSize }}
            </view>
            <uni-icons type="right" size="20" color="#666" />
          </view>
        </navigator>
      </view>
    </view>

    <view class="section">
      <view class="section-list">
        <view class="section-item">
          <view class="item-left">
            <uni-icons type="chatbubble-filled" size="30" color="#28b398" />
            <view class="text">
              联系客服
            </view>
          </view>
          <view class="item-right">
            <uni-icons type="right" size="20" color="#666" />
          </view>
          <button open-type="contact">
            联系客服
          </button>
        </view>
        <navigator url="/pages/notice/index?id=653507c6466d417a3718e94b" open-type="navigate" class="section-item">
          <view class="item-left">
            <uni-icons type="notification-filled" size="30" color="#28b398" />
            <view class="text">
              订阅更新
            </view>
          </view>
          <view class="item-right">
            <uni-icons type="right" size="20" color="#666" />
          </view>
        </navigator>
        <navigator url="/pages/notice/index?id=6536358ce0ec19c8d67fbe82" open-type="navigate" class="section-item">
          <view class="item-left">
            <uni-icons type="help-filled" size="30" color="#28b398" />
            <view class="text">
              常见问题
            </view>
          </view>
          <view class="item-right">
            <uni-icons type="right" size="20" color="#666" />
          </view>
        </navigator>
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
    margin: 20rpx 0;
  }

  .ip {
    margin: 12rpx 0;
    font-size: 20px;
  }

  .location {
    margin: 12rpx 0;
  }
}

.section {
  width: 690rpx;
  margin: 50rpx auto;
  box-shadow: 0 0 15rpx rgba(0, 0, 0, 0.05);
  border: 1px solid #eee;
  border-radius: 15rpx;
  overflow: hidden;

  .section-list {

    .section-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #eee;
      background: #fff;
      padding: 15rpx 10rpx;
      position: relative;

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

      button {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        opacity: 0;
      }
    }

    .section-item:last-child {
      border-bottom: 0;
    }
  }

}
</style>
