<script setup>
import { onLoad, onReachBottom, onShareAppMessage, onUnload } from "@dcloudio/uni-app";
import { ref } from "vue";
import { apiGetClassifyDetails, apiGetUserWallList } from "../../api/api";
import { getSysSafeAreaInsets } from "../../utils/system-safearea";
import { gotoHome } from "../../utils/utils";

const params = {
  pageNum: 1
};
const classifyDetails = ref([]);
const noData = ref(false);

onLoad((e) => {
  const { id, name, type = null } = e;
  // 通过type来区分是查询下载还是评分，用id的值是否为空来判断页面参数是否有误。
  // 这是因为点击“我的下载/评分”跳转至classlist页面时不会携带id
  if (type) {
    params.type = type;
  } else if (!id) {
    gotoHome();
    return;
  }
  params.classid = id;
  params.name = name;
  uni.setNavigationBarTitle({
    title: name
  });
  getClassifyDetails();
});

onUnload(() => {
  uni.removeStorageSync("classlist");
});

onShareAppMessage(() => {
  return {
    title: "分类详情" + params.name,
    path: "/pages/classlist/index?id=" + params.classid + "&name=" + params.name
  };
});

onReachBottom(() => {
  getClassifyDetails();
});

function gotoPreview() {
  uni.navigateTo({
    url: "/pages/preview/index"
  });
}

async function getClassifyDetails() {
  if (noData.value) {
    return;
  }
  let res;
  if (params.classid) {
    res = await apiGetClassifyDetails(params);
  } else if (params.type) {
    res = await apiGetUserWallList(params);
  }
  classifyDetails.value = [...classifyDetails.value, ...res.data];
  uni.setStorageSync("classlist", classifyDetails.value);
  if (res.data.length === 0) {
    noData.value = true;
  }
  params.pageNum++;
}
</script>

<template>
  <view>
    <view class="grid-content">
      <navigator v-for="item in classifyDetails" :key="item._id" :url="`/pages/preview/index?id=${item._id}`"
        class="grid-item">
        <image :src="item.smallPicurl" mode="aspectToFill" />
      </navigator>
    </view>

    <uni-load-more :status="noData ? 'noMore' : 'loading'" />

    <view :style="{ paddingBottom: getSysSafeAreaInsets() + 'px' }" />
  </view>
</template>

<style lang="scss" scoped>
.safe {
  padding-bottom: constant(safe-area-inset-bottom);
  /* 兼容 iOS < 11.2 */
  padding-bottom: env(safe-area-inset-bottom);
  /* 兼容 iOS >= 11.2 */

}

.grid-content {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10rpx;
  padding: 10rpx;

  .grid-item {
    height: 440rpx;

    image {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
