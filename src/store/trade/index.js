import { reqUserOrderInfoApi, reqUserAddressApi } from '@/apis/trade'

const state = {
    addressList: [],
    orderInfo: {}
}
const mutations = {
    GETUSERADDRESSLIST(state, value) {
        state.addressList = value
    },
    GETUSERORDERINFO(state, value) {
        state.orderInfo = value
    }
}
const actions = {
    async getUserAddressList(ministore, value) {
        const result = await reqUserAddressApi()
        ministore.commit('GETUSERADDRESSLIST', result.data.data)
    },
    async getUserOrderInfo(ministore, value) {
        const result = await reqUserOrderInfoApi()
        ministore.commit('GETUSERORDERINFO', result.data.data)
    }
}
const getters = {

}

export default {
    state, mutations, actions, getters
}

