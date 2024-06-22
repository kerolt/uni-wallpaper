<script setup>
function gotoPreview() {
  uni.navigateTo({
    url: "/pages/preview/index"
  });
}
</script>

<template>
  <view class="grid-content">
    <view v-for="item in 9" class="grid-item" @click="gotoPreview">
      <!-- <navigator url="/pages/preview/index"> -->
      <image src="@/common/image/preview_small.webp" mode="aspectToFill" />
      <!-- </navigator> -->
    </view>
  </view>
</template>

<style lang="scss" scoped>
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
