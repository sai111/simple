<template>
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
    <defs>
        <filter :id="`${timeScopd}-shadow`" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur in="SourceGraphic" :stdDeviation="shadowBlur" result="blur1" />
            <feFlood :flood-color="colorFamily[4]" :flood-opacity="shadowOpactiy" result="color1" />
            <feOffset dx="0" dy="0" in="blur1" result="offsetBlur1" />
            <feComposite in="color1" in2="offsetBlur1" operator="in" result="interactive1" />
            <feComposite in="interactive1" in2="SourceAlpha" operator="out" result="interactive2" />
            <feFlood :flood-color="colorFamily[0]" :flood-opacity="backgroundFill.opacity" result="mainColor" />
            <feComposite in="mainColor" in2="SourceGraphic" operator="in" result="main" />
            <feMerge>
                <feMergeNode in="main" />
                <feMergeNode in="interactive2" />
            </feMerge>
        </filter>
        <linearGradient :id="`${timeScopd}-light-gradient`" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" :Stop-color="colorFamily[4]" stop-opacity="0" />
            <stop offset="30%" :Stop-color="colorFamily[4]" stop-opacity="0.2" />
            <stop offset="90%" :Stop-color="colorFamily[4]" stop-opacity="0.9" />
            <stop offset="99%" :Stop-color="colorFamily[4]" stop-opacity="1" />
            <stop offset="100%" :Stop-color="colorFamily[5]" stop-opacity="1" />
        </linearGradient>
        <clipPath :id="`${timeScopd}-value-clip-path`">
            <path :d="drawPath(rate, true)" stroke="none" />
        </clipPath>
    </defs>
    <!-- 辅助线 -->
    <line x1="0" :y1="centerY" :x2="width" :y2="centerY" stroke="#ccc" class="guide-line" />
    <line :x1="centerX" y1="0" :x2="centerX" :y2="height" stroke="#ccc" class="guide-line" />
    <circle :cx="centerX" :cy="centerY" :r="outRadius" stroke="#ccc" fill="none" class="guide-circle" />
    <circle :cx="centerX" :cy="centerY" :r="innerRadius" stroke="#ccc" fill="none" class="guide-circle" />
    <text :x="width-10" :y="centerY" fill="#000" class="guide-text">w</text>
    <text :x="centerX" :y="height" fill="#000" class="guide-text">h</text>
    <text :x="offsetRadiusX" :y="centerY" fill="#000" class="guide-text">o</text>
    <text :x="ringWidth+offsetRadiusX" :y="centerY" fill="#000" class="guide-text">i</text>
    <rect x="0" y="0" :width="width" :height="height" stroke="#000" fill="none" class="guide-rect" />
    <!-- 辅助线 -->
    <path
        class="polygon-ring"
        stroke="none"
        :fill="colorFamily[0]"
        :d="drawPath(1)"
        :filter="`url(#${timeScopd}-shadow)`"
    />
    <g class="gradient-group" :style="{'clip-path': `url(#${timeScopd}-value-clip-path)`}">
        <rect class="lignt-rect"
            :width="lightWidth"
            :height="ringWidth"
            :x="centerX - lightWidth"
            :y="offsetRadiusY - ringWidth * 0.2"
            :fill="`url(#${timeScopd}-light-gradient)`" 
            <animateTransform
                attributeName="transfrom"
                type="rotate"
                :value="`${0} ${centerX} ${centerY}; ${360} ${centerX} ${centerY};${360} ${centerX} ${centerY}`"
                keyTimes="0;0.4;1"
                :begin="`${lightConfig.delay}s`"
                :dur="`${lightConfig.duration}s`"
                fill="freeze"
                repeatCount="indefinite" />   
        </rect>
    </g>
</svg>
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
            return this.lightAngle * Math.PI / 180 * (this.outRadius - this.innerRadius)
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
        },
        centerX() {
            return this.width / 2
        },
        centerY() {
            return this.height / 2
        },
        offsetRadiusX() {
            return this.width / 2 - this.outRadius
        },
        offsetRadiusY() {
            return this.height / 2 - this.outRadius
        },
        // 环宽
        ringWidth() {
            return this.outRadius - this.innerRadius
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
        drawPath(rate = 1, isValue = false) {
            // console.log(sideNum, isPolygon, '绘制路径')
            rate = rate - (isValue && !this.isPolygon ? (Math.asin(this.innerRadius / this.ringWidth / Math.PI / 2)) * rate : 0)
            console.log(rate, 'rate===11')
            if (this.isPolygon) {
                console.log('是N边形')
            } else {
                let angle = rate * Math.PI * 2
                let Mpoint = `M${this.centerX},${this.offsetRadiusY}`
                // let Lpoint = `L${this.centerX},${this.centerY}`
                let resultPath
                let roundValuePath = `${this.innerRadius * 0.5},${this.innerRadius * 0.5} 0 1,1 ${this.centerX + Math.sin(angle) * this.innerRadius},${this.centerY - this.innerRadius * Math.cos(angle)}`
                let normalPath = `M${this.centerX + this.innerRadius * Math.sin(angle)}, ${this.centerY - this.innerRadius * Math.cos(angle)}`
                let outHalfRArc = `A${this.outRadius}, ${this.outRadius} 0 0,1 ${this.centerX + this.outRadius * Math.sin(angle)}, ${this.centerY - this.outRadius * Math.cos(angle)}`
                if (rate > 0.5) {
                    let outHalfLArc = `A${this.outRadius}, ${this.outRadius} 0 0,1 ${this.centerX},${this.centerY + this.outRadius}`
                    let inHalfLArc = `A${this.innerRadius}, ${this.innerRadius} 0 0,0 ${this.centerX},${this.centerY + this.innerRadius}`
                    let inhalfRArc = `A${this.innerRadius},${this.innerRadius} 0 0,0 ${this.centerX + this.innerRadius * Math.sin(angle)}, ${this.centerY - this.innerRadius * Math.cos(angle)}`
                    resultPath = `${Mpoint} ${outHalfLArc} ${outHalfRArc} ${isValue ? roundValuePath : normalPath} ${inHalfLArc} ${inhalfRArc}Z`
                } else {
                    let inHalfRArc = `${this.innerRadius}, ${this.innerRadius} 0 0 ,0 ${this.centerX},${this.centerY - this.innerRadius}`
                    resultPath = `${Mpoint} ${outHalfRArc} ${isValue ? roundValuePath : normalPath} ${inHalfRArc}Z`
                }
                return resultPath
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.polygonRing {
    width: 100%;
    height: 100%;
    margin: 0 auto;
}
</style>
