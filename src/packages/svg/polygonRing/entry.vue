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
                startAngle: 0,
                value: Math.random() * 100,
                sum: 100,
                innerRadius: 60,
                valueFormat: 'percent',
                sideNum: 0,
                lightConfig: {
                    duration: 9,
                    delay: 0
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
    width: 100%;
    height: 100%;
}
</style>
