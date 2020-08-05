<template>
    <div class="polygonRing" :style="{width:width+'px',height:height+'px'}">
        {{colorFamily}}
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
            <path
                class="polygon-ring"
                stroke="red"
                :fill="colorFamily[0]"
                :d="drawPath(1)"
            />
        </svg>
    </div>
</template>
<script>
import { polygonConfig } from './config'
import Color from '../../../lib/storyboard/utils/color.js'
import VisualMap from '../../../lib/storyboard/utils/visualMap.js'
export default {
    name: 'polygonRing',
    props: polygonConfig,
    data() {
        return {
            timeScopd: (new Date()).getTime(),
            visualMapObj: null,
            store: {value: 0}
        }
    },
    computed: {
        viewBox() {
            return `0 0 ${this.width} ${this.height}`
        },
        rate() {
            if (this.sum === 0 || this.store.value / this.sum < 0) {
                console.error(`错误的数据传入${this.store.value}/${this.sum}`)
            }
            return this.store.value / this.sum
        },
        visualFill() {
            if (this.visualMapObj) {
                return this.visualMapObj.filter(this.store.value / this.sum * 100) || this.valueFill
            } else {
                return this.valueFill
            }
        },
        lightWidth() {
            return this.lightAngle * Math.PI / 180 * (this.outRadius - this.initVisualMap)
        },
        colorFamily() {
            let all = new Color(this.visualFill)
            all.getHSL()
            return [
                all.getFamilyColor(0.8, 0.2).get16String(),
                all.getFamilyColor(0.9, 0.35).get16String(),
                all.getFamilyColor(0.95, 0.42).get16String(),
                all.getFamilyColor(1, 0.48).get16String(),
                all.getFamilyColor(1, 0.55).get16String(),
                all.getFamilyColor(1, 0.8).get16String()
            ]
        },
        isPolygon() {
            return this.sideNum && this.sideNum > 2
        }
    },
    watch: {
        value: {
            handler(val) {
                this.store.value = Math.min(Math.max(val, 0), this.sum)
            },
            immediate: true
        },
        visualMap() {
            this.initVisualMap()
        }
    },
    mounted() {
        if (this.value) {
            this.store.value = Math.min(Math.max(this.value, 0), this.sum)
        }
        this.initVisualMap()
    },
    beforeDestroy() {
        this.visualMapObj = null
    },
    methods: {
        initVisualMap() {
            if (!this.visualMap) {
                if (this.visualMapObj) {
                    this.visualMapObj.initArr()
                }
            } else {
                this.visualMapObj = new VisualMap({ visualMap: this.visualMap })
            }
        },
        drawPath(sideNum = 1, isPolygon = false) {
            console.log(sideNum, isPolygon, '绘制路径')
        }
    }
}
</script>
<style lang="scss" scoped>
.polygonRing {
    width: 100%;
    height: 100%;
}
</style>
