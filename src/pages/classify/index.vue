<script setup>
import { ref } from "vue";
import { onLoad } from "@dcloudio/uni-app";
import NavBar from "../../components/NavBar.vue";
import Topic from "../../components/Topic.vue";
import { apiGetClassify } from "../../api/api";

const classifyList = ref([]);

async function getClassifyList() {
  const { data } = await apiGetClassify({
    pageSize: 15
  });
  classifyList.value = data;
}

onLoad(() => {
  getClassifyList();
});
</script>

<template>
  <view class="wrapper page-bg">
    <NavBar title="分类" />
    <view class="categories">
      <view v-for="item in classifyList" :key="item._id" class="category-box">
        <Topic :item="item" />
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.wrapper {

  .categories {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 15rpx;
    padding: 30rpx 15rpx;
  }
}
</style>
