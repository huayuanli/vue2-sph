import { reqCategoryList,reqGetBannerList,reqGetFloors } from "@/apis"

const state = {
    homeValue:10,
    categoryList:[],
    bannerList:[],
    floorList:[]
}
const mutations = {
    GETCATEGORYLIST(state,value){
        state.categoryList = value.data
    },
    GETBANNERLIST(state,value){
        state.bannerList = value.data
    },
    GETFLOORLIST(state,value){
        state.floorList = value
    }
}
const actions = {
    async getCategoryList({commit}){
        const result = await reqCategoryList()
        commit('GETCATEGORYLIST',result.data)
    },
    // mock
    async getBannerList({commit}){
        const result = await reqGetBannerList()
        commit('GETBANNERLIST',result.data)
    },
    async getFloorList(state){
        const result = await reqGetFloors()
        state.commit("GETFLOORLIST",result.data.data)
    }
}
const getters = {}

export default {
    state,mutations,actions,getters
}