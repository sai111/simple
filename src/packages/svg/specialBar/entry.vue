<template>
    <div class="specialBar-entry">
    specialBar组件
    <specialBar
        :svg-ready="svgReady"
        :chart-series="seriesColor"
        :chart-data="chartData"
        :width="chartWidth"
        :height="chartHeight"
        :bar-width="barWidth"
        :bar-xcenter="barXcenter"
    />
</div>
</template>
<script>
import specialBar from './index.vue'
export default {
    name: 'specialBarEntry',
    components: { specialBar },
    data() {
        return {
            chartData: [
                {x: '测试1', y: Math.random() * 1000},
                {x: '测试2', y: Math.random() * 100}
            ],
            chartWidth: 400,
            chartHeight: 400,
            barWidth: '30%',
            barXcenter: 50,
            svgReady: false,
            seriesColor: [
                {
                    fill: {start: 'rgba(0,118,226,0.2)', end: 'rgba(46,209,252,0.3)'},
                    stroke: {start: 'rgba(0,118,226,1)', end: 'rgba(46,209,252,1)'}
                },
                {
                    fill: {start: 'rgba(254,106,0,0.2)', end: 'rgba(255,174,0,0.3)'},
                    stroke: {start: 'rgba(254,106,0,1)', end: 'rgba(255,174,0,1)'}
                }
            ]
        }
    },
    computed: {},
    watch: {},
    mounted() {
        this.svgReady = true
    },
    methods: {}
}
</script>
<style lang="scss" scoped>
.specialBar-entry {
    width: 400px;
    height: 400px;
}
</style>
