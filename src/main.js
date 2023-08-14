import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false
import TypeNav from '@/components/TypeNav'
import Carousel from '@/components/Carousel'
import Pagination from '@/components/Pagination'
import * as TradeAPI from '@/apis/trade'
import { Button, MessageBox } from 'element-ui'

import '@/mock/mockServe'
import 'swiper/swiper-bundle.min.css'
import VueLazyload from 'vue-lazyload'
import '@/plugins/validate'
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name, Carousel)
Vue.component(Pagination.name, Pagination)

Vue.component(Button.name, Button)
import img1 from '@/assets/images/777.png'
Vue.use(VueLazyload, {
  preLoad: 1.3,
  loading: img1,
  attempt: 1
})


new Vue({
  render: h => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this //注册全局事件总线
    Vue.prototype.$TradeAPI = TradeAPI
    Vue.prototype.$msgbox = MessageBox;
    Vue.prototype.$alert = MessageBox.alert;
  },
  router,
  store
}).$mount('#app')
