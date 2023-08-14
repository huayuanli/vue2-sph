<template>
  <div>
    <TypeNav></TypeNav>
    <ListContainer></ListContainer>
    <Recommend></Recommend>
    <Rank></Rank>
    <Like></Like>
    <Floor v-for="(item,index) in floorList" :key="item.id" :list="item"></Floor>
    <Brand></Brand>

  </div>
</template>

<script>
import ListContainer from "@/pages/Home/ListContainer";
import Recommend from "@/pages/Home/Recommend";
import Rank from "@/pages/Home/Rank";
import Like from "@/pages/Home/Like";
import Floor from "@/pages/Home/Floor";
import Brand from "@/pages/Home/Brand";
import { mapState } from "vuex";

export default {
  name: "Home",
  components: {
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand,
  },
  methods:{
    
  },
  computed:{
    ...mapState({
      floorList:(state)=>state.home.floorList
    })
  },
  mounted() {
    this.$store.dispatch("getFloorList")
    //获取用户信息，分发请求
    //this.$store.dispatch('reqUserInfo')
  },
};
</script>

<style>
</style>