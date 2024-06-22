<script setup>

</script>

<template>
  <view class="title-box">
    <view class="title-name">
      <slot name="name"></slot>
    </view>
    <view class="custom">
      <slot name="custom"></slot>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.title-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30rpx;

  .title-name {
    font-size: 40rpx;
  }
}
</style>
