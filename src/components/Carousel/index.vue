<template>
  <div class="swiper-container" ref="flo">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(item, index) in list" :key="index">
        <img :src="item.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>
    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper from 'swiper';
export default {
  name: "Carousel",
  props: ["list"],
  watch: {
    list: {
      immediate: true,
      handler() {
        this.$nextTick(() => {
          new Swiper(this.$refs.flo, {
            loop: true,
            // 如果需要分页器
            pagination: ".swiper-pagination",

            // 如果需要前进后退按钮
            nextButton: ".swiper-button-next",
            prevButton: ".swiper-button-prev",

            // 如果需要滚动条
            scrollbar: ".swiper-scrollbar",
          });
        });
      },
    },
  },
};
</script>

<style>
</style>