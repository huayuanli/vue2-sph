<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="(cart, index) in cartInfoList">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" :checked="cart.isChecked === 1"
              @change="updateChecked(cart, $event.target.checked)">
          </li>
          <li class="cart-list-con2">
            <img :src="cart.imgUrl">
            <div class="item-msg">{{ cart.skuName }}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ cart.skuPrice.toFixed(2) }}</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" @click="handleNum('mins', -1, cart)">-</a>
            <input autocomplete="off" type="text" value="1" minnum="1" class="itxt" :value="cart.skuNum"
              @change="handleNum('change', $event.target.value * 1, cart)">
            <a href="javascript:void(0)" class="plus" @click="handleNum('add', 1, cart)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ (cart.skuNum * cart.skuPrice).toFixed(2) }}</span>
          </li>
          <li class="cart-list-con7">
            <a class="sindelet" @click="deleteCart(cart)">删除</a>
            <br>
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked="isAllChecked && cartInfoList.length > 0"
          @change="updateAllChecked">
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteCartCheched">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>{{ checkShopCartCount }}</span>件商品
          <!-- <span>0</span>件商品 -->
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice.toFixed(2) }}</i>
        </div>
        <div class="sumbtn">
          <!-- <a class="sum-btn" href="###" target="_blank">结算</a> -->
          <router-link class="sum-btn" to="/trade">去结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import throttle from "lodash/throttle";
export default {
  name: 'ShopCart',
  mounted() {
    this.getShopCartData()
  },
  methods: {
    getShopCartData() {
      this.$store.dispatch('getShopCart')
    },
    handleNum(type, num, cart) {
      console.log(type, num, cart);
      switch (type) {
        // 添加
        case "add":
          num = 1
          break;
        // 删除 小于1 
        case "mins":
          num = num > 1 ? -1 : 0
          break;
        // 输入框 特殊符号、负数，小数
        case "change":
          num = (isNaN(num) || num < 1) ? 0 : parseInt(num) - cart.skuNum
          break;
      }
      // 发起更新购物车数量请求
      this.$store.dispatch('getAddOrUpdateShopcart', { skuId: cart.skuId, skuNum: num })
      // 重新获取数据
      this.getShopCartData()
    },
    deleteCart(cart) {
      this.$store.dispatch('deleteShopCartById', cart.skuId)
      this.getShopCartData()
    },
    updateChecked(cart, checked) {
      let check = checked ? '1' : '0'
      this.$store.dispatch('updateCheckedById', {
        skuId: cart.skuId,
        isChecked: check
      })
      this.getShopCartData()
    },
    async deleteCartCheched() {
      try {
        const res = await this.$store.dispatch('deleteChechedShopCart')
        this.getShopCartData()
      } catch (error) {
        console.log(error);
      }
    },
    async updateAllChecked(event) {
      try {
        let checkStr = event.target.checked ? "1" : "0"
        const res = await this.$store.dispatch('updateAllChecked', checkStr)
        this.getShopCartData()
      } catch (error) {
        alert(error.message)
      }
    }
  },
  computed: {
    ...mapGetters(['getShopCartList']),
    cartInfoList() {
      return this.getShopCartList.cartInfoList || []
    },
    totalPrice() {
      return this.cartInfoList.reduce((pre, item) => {
        return pre + (item.skuNum * item.skuPrice)
      }, 0)
    },
    checkShopCartCount() {
      let count = 0
      this.cartInfoList.forEach(item => {
        if (item.isChecked === 1) count++
      })
      return count
    },
    isAllChecked() {
      return this.cartInfoList.every(item => {
        return item.isChecked === 1
      })
    }
  }
}
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      &>div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;

      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        &>li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;

        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>