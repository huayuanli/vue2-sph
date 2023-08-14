import { getGoodInfoApi, reqAddOrUpdateShopcart } from "@/apis/detail"

const state = {
    goodInfo: {}
}
const mutations = {
    GETGOODINFO(state, value) {
        state.goodInfo = value
    }
}
const actions = {
    async getGoodInfo(ministore, skuid) {
        const result = await getGoodInfoApi(skuid)
        ministore.commit('GETGOODINFO', result.data.data)
    },
    async getAddOrUpdateShopcart(ministore, { skuId, skuNum }) {
        const result = await reqAddOrUpdateShopcart(skuId, skuNum)
        console.log(result);
        if (result.data.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('添加购物车失败'))
        }
    }
}
const getters = {
    categoryView(state) {
        return state.goodInfo.categoryView || {}
    },
    skuInfo(state) {
        return state.goodInfo.skuInfo || {}
    },
    saleAttrList(state) {
        return state.goodInfo.spuSaleAttrList || []
    }
}

export default {
    state, mutations, actions, getters
}