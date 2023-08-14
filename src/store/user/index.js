import { getCodeApi, reqRgisterUserInfoApi, reqUserLoginApi, reqUserInfoApi, reqUserLogoutApi } from "@/apis/user"
import { setToken, getToken, removeToken } from "@/utils/token"
const state = {
    code: "",
    token: getToken(),
    userInfo: {}
}
const mutations = {
    GETCODE(state, value) {
        state.code = value
    },
    USERLOGIN(state, value) {
        state.token = value
    },
    REQUSERINFO(state, value) {
        state.userInfo = value
    },
    CLEARUSERINFO(state, value) {
        state.userInfo = {}
        state.token = ""
        removeToken()
    }
}
const actions = {
    async getCode(ministore, phone) {
        const result = await getCodeApi(phone)
        ministore.commit('GETCODE', result.data.data)
    },
    async reqRgisterUserInfo(ministore, data) {
        const result = await reqRgisterUserInfoApi(data)
        console.log(result);
        if (result.data.code == 200) {
            console.log(result);
            return 'ok'
        } else {
            return Promise.reject(new Error('注册失败'))
        }
    },
    async reqUserLogin(ministore, data) {
        const result = await reqUserLoginApi(data)
        console.log(result);
        if (result.data.code == 200) {
            ministore.commit('USERLOGIN', result.data.data.token)
            setToken(result.data.data.token)
            return 'ok'
        } else {
            return Promise.reject(new Error('登录失败'))
        }
    },
    async reqUserInfo(ministore, value) {
        const result = await reqUserInfoApi()
        if (result.data.code == 200) {
            console.log('用户登录信息', result);
            ministore.commit('REQUSERINFO', result.data.data)
        } else {
            return Promise.reject(new Error('error'))
        }
    },
    async reqUserLogout(ministore, value) {
        const result = await reqUserLogoutApi()
        console.log('退出登录信息', result.data.code);
        if (result.data.code) {
            ministore.commit('CLEARUSERINFO')
            return 'ok'
        } else {
            return Promise.reject(new Error('退出失败'))
        }
    }
}
const getters = {

}

export default {
    state, mutations, actions, getters
}