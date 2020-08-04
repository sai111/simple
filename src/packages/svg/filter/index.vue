<template>
    <div class="filter-svg">
        <svg xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            preserveAspectRetio="xMidYMid meet"
            viewBox="0 0 400 100">
            <defs>
                <!-- 模糊 -->
                <filter id="blurFilter1" x="0" y="0">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="15" />
                </filter>
                <filter id="blurFilter1-3" x="0" y="0">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
                </filter>
                <filter id="blurFilter1-1" x="0" y="0">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="1" />
                </filter>
                <!-- 多重阴影 feMerge -->
                <filter id="blurFilter2" y="-10" height="40" x="-10" width="150">
                    <feOffset in="SourceAlpha" dx="3" dy="3" result="offset2" />
                    <feGaussianBlur in="offset2" stdDeviation="3" result="blur2" />
                    <feMerge>
                        <feMergeNode in="blur2" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
                <!-- 偏移滤镜-feOffset -->
                <filter id="blurFilter3" x="-20" y="-20" width="200" height="200">
                    <feOffset in="SourceGraphic" dx="50" dy="0" />
                </filter>
                <!-- 油漆桶工具-feFlood -->
                <filter id="blurFilter4" filterUnits="userSpaceOnUse">
                    <feFlood x="150" y="0" width="15" height="15" flood-color="green" flood-opacity="0.5" />
                </filter>
            </defs>
            <!-- 矩形滤镜 -->
            <rect width="15" height="15" x="10" y="0" stroke="green" stroke-width="1" fill="blue" filter="url(#blurFilter1)" />
            <rect width="15" height="15" x="10" y="20" stroke="green" stroke-width="1" fill="blue" filter="url(#blurFilter1-1)" />
            <rect width="15" height="15" x="10" y="50" stroke="green" stroke-width="1" fill="blue" filter="url(#blurFilter1-3)" />
           <!--  椭圆形滤镜 -->
            <ellipse cx="40" cy="10" rx="10" ry="5" style="stroke: none; fill: #0000ff; filter: url(#blurFilter2);" />
           <!-- 偏移滤镜的使用 -->
            <rect x="60" y="10" width="15" height="15" style="stroke:#9a12b3; fill:none; filter: url(#blurFilter3);" />
            <rect x="80" y="10" width="15" height="15" style="stroke:#1f3a93; fill:none;" />
            <!-- 油漆桶-feFlood -->
            <use style="filter: url(#blurFilter4)" />
        </svg>
    </div>
</template>
<script>
export default {
    name: 'filterSvg',
    props: {},
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
.filter-svg {
    width: 100%;
    height: 300px;
    svg {
        width: 100%;
        height: 100%;
    }
}
</style>
