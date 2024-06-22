<script setup>
import NavBar from "../../components/NavBar.vue";
import Topic from "../../components/Topic.vue";
</script>

<template>
  <view class="wrapper page-bg">
    <NavBar title="分类" />
    <view class="categories">
      <view v-for="item in 10" class="category-box">
        <navigator url="/pages/classlist/index" open-type="navigate" hover-class="navigator-hover">
          <Topic />
        </navigator>
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
