import requests from "./request";
import requestsMock from './requestMock'

export function reqCategoryList() {
    return requests({ url: "/product/getBaseCategoryList" })
}

//mock模拟数据
export function reqGetBannerList() {
    return requestsMock({ url: "/banner" })
}
export function reqGetFloors() {
    return requestsMock({ url: "/floor" })
}

// 搜索模块API
export function reqGetGoodList(data) {
    return requests({ url: "/list", method: "post", data: data })
}
