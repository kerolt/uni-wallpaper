<script setup>
import { ref } from "vue";
import { onLoad, onUnload, onReachBottom } from "@dcloudio/uni-app";
import { apiSearchWall } from "../../api/api";
import { getSysSafeAreaInsets } from "../../utils/system-safearea";

//查询参数
const queryParams = ref({
  pageNum: 1,
  pageSize: 12,
  keyword: ""
});

//搜索历史词
const historySearch = ref(uni.getStorageSync("history_search") || []);

//热门搜索词
const recommendList = ref(["美女", "帅哥", "宠物", "卡通"]);

//没有更多
const noData = ref(false);

//搜索结果列表
const classList = ref([]);

//点击搜索
async function onSearch(e) {
  // 设置历史查询（最多10条），并保存至缓存中
  historySearch.value = [...new Set([queryParams.value.keyword, ...historySearch.value])].slice(0, 10);
  uni.setStorageSync("history_search", historySearch.value);

  initSearch(queryParams.value.keyword);

  // 设置搜索结果，并保存至缓存中
  const res = await apiSearchWall(queryParams.value);
  if (res.data.length === 0) {
    noData.value = true;
  }
  classList.value = [...classList.value, ...res.data];
  uni.setStorageSync("classlist", classList.value);
};

//点击清除按钮
function onClear() {
  initSearch();
  uni.removeStorageSync("classlist");
};

// 初始化params
function initSearch(key) {
  queryParams.value.pageNum = 1;
  queryParams.value.pageSize = 12;
  queryParams.value.keyword = key || "";
  classList.value = [];
}

//点击标签进行搜索
function clickTab(value) {
  initSearch();
  queryParams.value.keyword = value;
  onSearch();
};

//点击清空搜索记录
function removeHistory() {
  uni.showModal({
    title: "是否清空历史搜索？",
    success: res => {
      if (res.confirm) {
        historySearch.value = [];
        uni.removeStorageSync("history_search");
      }
    }
  });
};

//触底加载更多
onReachBottom(() => {
  if (noData.value) {
    return;
  }
  queryParams.value.pageNum++;
  onSearch();
});

//关闭有页面
onUnload(() => {
  uni.removeStorageSync("classlist");
});

</script>

<template>
  <view class="searchLayout">
    <view class="search">
      <uni-search-bar v-model="queryParams.keyword" focus placeholder="搜索" @confirm="onSearch" @cancel="onClear"
        @clear="onClear" />
    </view>
    <!-- 历史搜索 -->
    <view v-if="!classList.length">
      <view v-if="historySearch.length !== 0" class="history">
        <view class="topTitle">
          <view class="text">
            历史搜索
          </view>
          <view class="icon" @click="removeHistory">
            <uni-icons type="trash" size="25" />
          </view>
        </view>
        <view class="tabs">
          <view v-for="tab in historySearch" :key="tab" class="tab" @click="clickTab(tab)">
            {{ tab }}
          </view>
        </view>
      </view>
      <!-- 热门搜索 -->
      <view class="recommend">
        <view class="topTitle">
          <view class="text">
            热门搜索
          </view>
        </view>
        <view class="tabs">
          <view v-for="tab in recommendList" :key="tab" class="tab" @click="clickTab(tab)">
            {{ tab }}
          </view>
        </view>
      </view>
      <!-- 无搜索结果时的占位图 -->
      <view class="noSearch">
        <uv-empty mode="search" icon="http://cdn.uviewui.com/uview/empty/search.png" />
      </view>
    </view>
    <view v-else>
      <view class="list">
        <navigator v-for="item in classList" :key="item._id" :url="`/pages/preview/index?id=${item._id}`" class="item">
          <image :src="item.smallPicurl" mode="aspectFill" />
        </navigator>
      </view>
      <view v-if="noData || classList.length">
        <uni-load-more :status="noData ? 'noMore' : 'loading'" />
      </view>
      <view :style="{ paddingBottom: getSysSafeAreaInsets() + 'px' }" />
    </view>
  </view>
</template>

<style lang="scss" scoped>
.searchLayout {
  .search {
    padding: 0 10rpx;
  }

  .topTitle {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 32rpx;
    color: #999;
  }

  .history {
    padding: 30rpx;
  }

  .recommend {
    padding: 30rpx;
  }

  .tabs {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    padding-top: 20rpx;

    .tab {
      background: #F4F4F4;
      font-size: 28rpx;
      color: #333;
      padding: 10rpx 28rpx;
      border-radius: 50rpx;
      margin-right: 20rpx;
      margin-top: 20rpx;
    }
  }

  .list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 5rpx;
    padding: 20rpx 5rpx;

    .item {
      height: 440rpx;

      image {
        width: 100%;
        height: 100%;
        display: block;
      }
    }
  }
}
</style>
