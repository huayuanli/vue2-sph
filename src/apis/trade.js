import requests from "./request";

// /api/user/userAddress/auth/findUserAddressList
export const reqUserAddressApi = () => {
    return requests({
        url: `/user/userAddress/auth/findUserAddressList`,
        method: "get"
    })
}

export const reqUserOrderInfoApi = () => {
    return requests({
        url: `/order/auth/trade`,
        method: "get"
    })
}

// /api/order/auth/submitOrder?tradeNo={tradeNo}
export const reqsubmitOrderApi = (tradeNo, data) => {
    return requests({
        url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
        method: "post",
        data
    })
}


// /api/payment/weixin/createNative/{orderId}
export const reqOrderInfoApi = (orderId) => {
    return requests({
        url: `/payment/weixin/createNative/${orderId}`
    })
}

// 查看订单状态 
export const reqPayStatusApi = (orderId) => {
    return requests({
        url: `/payment/weixin/queryPayStatus/${orderId}`
    })
}


// 获取我的订单列表  /api/order/auth/{page}/{limit}
export const reqOrderListApi = (page, limit) => {
    return requests({
        url: `/order/auth/${page}/${limit}`
    })
}