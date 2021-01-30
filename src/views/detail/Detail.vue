<template>
  <div class="detail" v-if="Object.keys(commentInfo).length !== 0">
    <detail-nav-bar
      class="detail-nav"
      @titleClick="titleClick"
      ref="detailNavBar"
    />
    <scroll class="content" ref="scroll" @scroll="contentScroll" :probeType="3">
      <detail-swiper :top-images="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info
        :detail-info="detailInfo"
        @loadImgEvent="loadImgEvent"
      />
      <detail-param-info ref="params" :param-info="paramInfo" />
      <detail-comment-info ref="comment" :comment-info="commentInfo" />
      <goods-list ref="recommend" :goods="recommend" />
    </scroll>
    <detail-bottom-bar @addCart="addToCart" />
    <back-top @click.native="backClick" v-show="isShowBackTop" />
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar.vue";
import DetailSwiper from "./childComps/DetailSwiper.vue";
import DetailBaseInfo from "./childComps/DetailBaseInfo.vue";
import DetailShopInfo from "./childComps/DetailShopInfo.vue";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo.vue";
import DetailParamInfo from "./childComps/DetailParamInfo.vue";
import DetailCommentInfo from "./childComps/DetailCommentInfo.vue";
import DetailBottomBar from "./childComps/DetailBottomBar.vue";

import Scroll from "components/common/scroll/Scroll.vue";
import GoodsList from "components/content/goods/GoodsList.vue";

import { debounce } from "common/utils";
import { backTopMixin } from "common/mixin";

import {
  getDetail,
  Goods,
  Shop,
  GoodsParams,
  getRecommend,
} from "network/detail";

export default {
  name: "Detail",
  mixins: [backTopMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommend: [],
      itemImgListener: null,
      themeTopYs: [],
      currentIndex: 0,
    };
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    Scroll,
    GoodsList,
  },
  created() {
    this.iid = this.$route.params.iid;
    getDetail(this.iid).then((res) => {
      const data = res.result;
      // 1.获取顶部的轮播图数据
      this.topImages = data.itemInfo.topImages;
      // 2.获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      // 3.创建店铺信息
      this.shop = new Shop(data.shopInfo);
      // 4.获取商品详细信息
      this.detailInfo = data.detailInfo;
      // 5.获取参数的信息
      this.paramInfo = new GoodsParams(
        data.itemParams.info,
        data.itemParams.rule
      );
      // 6.取出评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list;
      }
      // 7.请求推荐数据
      getRecommend().then((res) => {
        this.recommend = res.data.list;
      });
    });
  },
  updated() {
    const refresh = debounce(this.$refs.scroll.refresh, 20);
    this.itemImgListener = () => {
      refresh();
    };
    this.$bus.$on("itemImageLoad", this.itemImgListener);
  },
  destroyed() {
    this.$bus.$off("itemImageLoad", this.itemImgListener);
  },
  methods: {
    loadImgEvent() {
      this.themeTopYs.push(0);
      this.themeTopYs.push(-this.$refs.params.$el.offsetTop + 49);
      this.themeTopYs.push(-this.$refs.comment.$el.offsetTop + 49);
      this.themeTopYs.push(-this.$refs.recommend.$el.offsetTop + 49);
      this.$refs.scroll.refresh();
    },
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, this.themeTopYs[index], 500);
    },
    contentScroll(position) {
      this.listenShowBackTop(position);

      if (position.y <= this.themeTopYs[3]) {
        this.currentIndex = 3;
      } else if (position.y <= this.themeTopYs[2]) {
        this.currentIndex = 2;
      } else if (position.y <= this.themeTopYs[1]) {
        this.currentIndex = 1;
      } else {
        this.currentIndex = 0;
      }
      this.$refs.detailNavBar.currentIndex = this.currentIndex;
    },
    addToCart() {
      // 1.获取购物车需要展示的信息
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;

      // 2.将商品添加到购物车里
      this.$store.dispatch("addCart", product);
    },
  },
};
</script>

<style scoped>
.detail-nav {
  position: relative;
  z-index: 999;
  background-color: #fff;
}
.content {
  height: calc(100vh - 44px);
}
</style>
