import requests from "./request";

export const getGoodInfoApi = (skuId) => {
    return requests({
        url: `/item/${skuId}`,
        method: "get"
    })
}

// /api/cart/addToCart/{ skuId }/{ skuNum } POST
export const reqAddOrUpdateShopcart = (skuId,skuNum) => {
    return requests({
        url: `/cart/addToCart/${skuId}/${skuNum}`,
        method: "post"
    })
} 
