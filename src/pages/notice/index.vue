<script setup>
import { ref } from "vue";
import { onLoad } from "@dcloudio/uni-app";
import { apiGetDetailNotice } from "../../api/api";
import mpHtml from "mp-html/dist/uni-app/components/mp-html/mp-html";

const notice = ref({});

onLoad((e) => {
  getDetailNotice(e.id);
});

async function getDetailNotice(id) {
  const { data } = await apiGetDetailNotice({ id });
  notice.value = data;
}
</script>

<template>
  <view class="notice-wrapper">
    <view class="title">
      <uni-tag v-if="notice.select" inverted type="success" text="置顶" class="tag" />
      <text class="text">
        {{ notice.title }}
      </text>
    </view>

    <view class="author">
      <text class="text">
        {{ notice.author }}
      </text>
      <uni-dateformat :date="notice.publish_date" format="yyyy-MM-dd hh:mm:ss" />
    </view>

    <view class="content">
      <mp-html :content="notice.content" />
    </view>

    <view class="footer">
      阅读：{{ notice.view_count }}
    </view>
  </view>
</template>

<style lang="scss" scoped>
.notice-wrapper {
  padding: 20rpx 20rpx;

  .title {
    // display: flex;
    // align-items: center;
    padding: 10rpx 0;

    .tag {
      margin-right: 20rpx;
    }

    .text {
      font-size: 23px;
      font-weight: 600;
    }
  }

  .author {
    color: $text-color-light-gray;
    padding: 10rpx 0;

    .text {
      margin-right: 20rpx;
    }
  }

  .content {
    padding: 20rpx 0;
  }

  .footer {
    color: $text-color-light-gray;
  }
}
</style>
