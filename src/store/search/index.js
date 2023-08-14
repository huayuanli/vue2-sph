import { reqGetGoodList } from "@/apis"
const state = {
    searchList:{}
}
const mutations = {
    GETGOODLIST(state,obj){
        state.searchList = obj
    }
}
const actions = {
    async getGoodList(miniStore,value){
        const result = await reqGetGoodList(value)
        miniStore.commit('GETGOODLIST',result.data.data)
    }
}
const getters = {
    goodsList(state){
        return state.searchList.goodsList || []
    },
    attrsList(state){
        return state.searchList.attrsList
    },
    trademarkList(state){
        return state.searchList.trademarkList
    }
}

export default {
    state,mutations,actions,getters
}