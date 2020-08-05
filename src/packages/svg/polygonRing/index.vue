<template>
    <div class="polygonRing" :style="{width:width+'px',height:height+'px'}">
        <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            preserveAspectRetio="xMidYMid meet"
            width="100%"
            height="100%"
            x="0%"
            y="0%"
            :viewBox="viewBox">
            <defs></defs>
            {{rate}}
            <path
                class="polygon-ring"
                stroke="red"
                fill="none"
            />
        </svg>
    </div>
</template>
<script>
import { polygonConfig } from './config'
export default {
    name: 'polygonRing',
    props: polygonConfig,
    data() {
        return {
            timeScopd: (new Date()).getTime(),
            store: {value: 0}
        }
    },
    computed: {
        viewBox() {
            return `0 0 ${this.width} ${this.height}`
        },
        rate() {
            console.log(this.value, '1111', this.sum)
        }
    },
    watch: {},
    mounted() {},
    methods: {}
}
</script>
<style lang="scss" scoped>
.polygonRing {
    width: 100%;
    height: 100%;
}
</style>
