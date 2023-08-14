import requests from "./request";

export const getCodeApi = (phone) => {
    return requests({
        url: `/user/passport/sendCode/${phone}`,
        method: "get"
    })
}
/**
 * 注册用户
 * @param {用户信息} data 
 * @returns 
 */
export const reqRgisterUserInfoApi = (data) => {
    return requests({
        url: `/user/passport/register`,
        method: "POST",
        data
    })
}


export const reqUserLoginApi = (data) => {
    return requests({
        url: `/user/passport/login`,
        method: "POST",
        data
    })
}


export const reqUserInfoApi = () => {
    return requests({
        url: `/user/passport/auth/getUserInfo`
    })
}

// 退出登录 /api/user/passport/logout
export const reqUserLogoutApi = () => {
    return requests({
        url: `/user/passport/logout`
    })
}





