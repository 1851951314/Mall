<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button class="check-button" />
      <div>全选</div>
    </div>
    <div class="sum-price">合计:{{ totalPrice }}</div>
    <div class="calculate">去计算({{ checkedLength }})</div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton";

export default {
  name: "CartBottomBar",
  data() {
    return {};
  },
  components: {
    CheckButton,
  },
  computed: {
    totalPrice() {
      return (
        "￥" +
        this.$store.state.cartList
          .filter((item) => item.checked)
          .reduce((preValue, item) => {
            return preValue + item.price * item.count;
          }, 0)
          .toFixed(2) +
        "元"
      );
    },
    checkedLength() {
      return this.$store.state.cartList.filter((item) => item.checked).length;
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
