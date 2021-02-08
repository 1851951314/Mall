<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button
        :isChecked="isSelectAll"
        @click.native="checkClick"
        class="check-button"
      />
      <div>全选</div>
    </div>
    <div class="sum-price">合计:{{ totalPrice }}</div>
    <div class="calculate" @click="payClick">去支付({{ checkedLength }})</div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton";

import { mapGetters } from "vuex";

export default {
  name: "CartBottomBar",
  data() {
    return {};
  },
  components: {
    CheckButton,
  },
  computed: {
    ...mapGetters(["cartList"]),
    totalPrice() {
      return (
        "￥" +
        this.cartList
          .filter((item) => item.checked)
          .reduce((preValue, item) => {
            return preValue + item.price * item.count;
          }, 0)
          .toFixed(2) +
        "元"
      );
    },
    checkedLength() {
      return this.cartList.filter((item) => item.checked).length;
    },
    isSelectAll() {
      // return !this.cartList.filter((item) => !item.checked).length;
      if (this.cartList.length === 0) {
        return false;
      }
      return !this.cartList.find((item) => !item.checked);
    },
  },
  methods: {
    checkClick() {
      if (this.isSelectAll) {
        this.cartList.forEach((item) => (item.checked = false));
      } else {
        this.cartList.forEach((item) => (item.checked = true));
      }
      // this.cartList.forEach((item) => (item.checked = !this.isSelectAll));
    },
    payClick() {
      if (!this.checkedLength) {
        this.$toast.show("购物车为空");
      }
    },
  },
};
</script>

<style scoped>
.bottom-bar {
  display: flex;
  height: 40px;
  background-color: #eee;
}
.check-content {
  display: flex;
  width: 60px;
  line-height: 40px;
  margin-left: 10px;
}
.sum-price {
  line-height: 40px;
  flex: 1;
  margin-left: 30px;
}
.calculate {
  text-align: center;
  width: 90px;
  line-height: 40px;
  background-color: red;
}
</style>
