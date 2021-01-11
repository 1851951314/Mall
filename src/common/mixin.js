import BackTop from "components/content/backTop/BackTop.vue";

export const backTopMixin = {
    data() {
        return {
            isShowBackTop: false
        }
    },
    components: {
        BackTop,
    },
    methods: {
        backClick() {
            this.$refs.scroll.scrollTo(0, 0);
        },
        listenShowBackTop(position) {
            // 1.判断BackTop是否显示
            this.isShowBackTop = position.y < -1000;
        }
    }
}