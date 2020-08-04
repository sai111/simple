<template>
    <div class="filter-entry">
       filter组件
        <!-- 高斯模糊 -->
        <h2>feComposite-组合模糊--滤镜执行两个输入图像的智能像素组合</h2>
        <filter-feComposite />
        <!-- 高斯模糊 -->
        <h2>feGaussianBlur-高斯模糊</h2>
        <filter-feGaussianBlur />
        <h2>mode-混合模式</h2>
        <filter-feBlend />
        <h2>feColorMatrix--颜色矩阵</h2>
        <filter-feColorMatrix />
        <!-- <filter-svg /> -->
    </div>
</template>
<script>
import filterSvg from './index.vue'
import filterFeComposite from './feComposite.vue'
import filterFeGaussianBlur from './feGaussianBlur'
import filterFeBlend from './feBlend'
import filterFeColorMatrix from './feColorMatrix'
export default {
    name: 'filterEntry',
    components: { filterSvg, filterFeComposite, filterFeGaussianBlur, filterFeBlend, filterFeColorMatrix},
    data() {
        return {}
    },
    computed: {},
    watch: {},
    mounted() {},
    methods: {}
}
</script>
<style lang="scss" scoped>
.filter-entry {
    width: 100%;
    height: 100%;
    overflow: auto;
}
</style>
