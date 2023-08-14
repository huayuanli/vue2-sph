import { getShopCartApi, deleteShopCartByIdApi, updateCheckedByIdApi } from "@/apis/shopcart"
import { getUUID } from "@/utils/uuid_token"
const state = {
    uuid: getUUID(),
    shopCartList: []
}
const mutations = {
    GETSHOPCART(state, value) {
        state.shopCartList = value.data
    }
}
const actions = {
    async getShopCart(ministore) {
        const result = await getShopCartApi()
        ministore.commit('GETSHOPCART', result.data)
    },
    async deleteShopCartById(ministore, skuId) {
        const result = await deleteShopCartByIdApi(skuId)
        // if (result.code == 200) {
        //     return 'ok'
        // } else {
        //     return Promise.reject(new Error('删除失败'))
        // }
    },
    async updateCheckedById(ministore, { skuId, isChecked }) {
        const result = await updateCheckedByIdApi(skuId, isChecked)
    },
    deleteChechedShopCart(ministore) {
        const promiseALL = []
        ministore.getters.getShopCartList.cartInfoList.forEach(async (item) => {
            if (item.isChecked == 1) {
                const result = await ministore.dispatch('deleteShopCartById', item.skuId)
                promiseALL.push(result)
            }
        })
        return Promise.all(promiseALL)
    },
    updateAllChecked(ministore, value) {
        let promiseALL = []
        ministore.state.shopCartList[0].cartInfoList.forEach(item => {
            if (item.isChecked != value) {
                let re = ministore.dispatch('updateCheckedById', { skuId: item.skuId, isChecked: value })
                promiseALL.push(re)
            }
        })
        return Promise.all(promiseALL)
    }
}
const getters = {
    getShopCartList(state) {
        return state.shopCartList[0] || {}
    }
}

export default {
    state, mutations, actions, getters
}