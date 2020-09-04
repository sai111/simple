<template>
    <div class="polygonRing-entry">
       polygonRing组件
        <polygonRing v-bind="ringConfig" :visualMap="visualMap" />
    </div>
</template>
<script>
import polygonRing from './index.vue'
export default {
    name: 'polygonRingEntry',
    components: { polygonRing },
    data() {
        return {
            ringConfig: {
                width: 500,
                height: 500,
                outRadius: 200,
                innerRadius: 120,
                startAngle: 0,
                lightAngle: 14,
                value: Math.random() * 100,
                sum: 100,
                valueFormat: 'percent',
                sideNum: 3,
                lightConfig: {
                    duration: 9,
                    delay: 0
                },
                backgroundFill: {
                    color: '',
                    opacity: 0.4
                },
                valueFill: {
                    color: '#33bbff',
                    opacity: 1,
                    x: 0,
                    y: -10,
                    fontSize: 64,
                    textAnchor: 'middle'
                },
                title: {
                    text: '测试文本',
                    x: 0,
                    y: 40,
                    fontSize: 20,
                    textAnchor: 'middle'
                }
            },
            visualMap: [
                {value: 60, color: '#04A7F9'},
                {value: 80, color: '#FDEA00'},
                {value: 100, color: '#fd4000'}
            ]
        }
    },
    computed: {},
    watch: {},
    mounted() {},
    methods: {}
}
</script>
<style lang="scss" scoped>
.polygonRing-entry {
    width: 400px;
    height: 400px;
    margin: 0 auto;
}
</style>
