import requests from "./request";

export const getShopCartApi = () => {
    return requests({
        url: `/cart/cartList`,
        method: "get"
    })
}

// /api/cart/deleteCart/{skuId}  DELETE
export const deleteShopCartByIdApi = (skuId) => {
    return requests({
        url: `/cart/deleteCart/${skuId}`,
        method: "DELETE"
    })
}

//修改购物车某一个产品的选中状态 /api/cart/checkCart/{skuID}/{isChecked}
export const updateCheckedByIdApi = (skuId,isChecked) => {
    return requests({
        url: `/cart/checkCart/${skuId}/${isChecked}`,
        method: "GET"
    })
}