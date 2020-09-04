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
        <!-- 左上/第二象限 -->
        <linearGradient :id="`${timeScopd}-gradient-2`" x1="0" y1="1" x2="1" y2="0">
            <stop :offset="startOffset" :stop-color="colorFamily[3]" :stop-opacity="valueFill.opacity" />
            <stop :offset="endOffset" :stop-color="colorFamily[4]" :stop-opacity="valueFill.opacity" />
        </linearGradient>
        <!-- 左下/第三象限 -->
        <linearGradient :id="`${timeScopd}-gradient-3`" x1="1" y1="1" x2="0" y2="0">
            <stop :offset="startOffset" :stop-color="colorFamily[2]" :stop-opacity="valueFill.opacity" />
            <stop :offset="endOffset" :stop-color="colorFamily[3]" :stop-opacity="valueFill.opacity" />
        </linearGradient>
        <!-- 右上/第一象限 -->
        <linearGradient :id="`${timeScopd}-gradient-1`" x1="0" y1="0" x2="1" y2="1">
            <stop :offset="halfOffset" :stop-color="colorFamily[0]" :stop-opacity="0" />
            <stop :offset="startOffset" :stop-color="colorFamily[0]" :stop-opacity="backgroundFill.opacity" />
            <stop :offset="endOffset" :stop-color="colorFamily[1]" :stop-opacity="valueFill.opacity" />
        </linearGradient>
        <!-- 右下/第四象限 -->
        <linearGradient :id="`${timeScopd}-gradient-4`" x1="1" y1="0" x2="0" y2="1">
            <stop :offset="startOffset" :stop-color="colorFamily[1]" :stop-opacity="valueFill.opacity" />
            <stop :offset="endOffset" :stop-color="colorFamily[2]" :stop-opacity="valueFill.opacity" />
        </linearGradient>
        <!-- 扫光颜色 -->
        <linearGradient :id="`${timeScopd}-light-gradient`" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" :stop-color="colorFamily[4]" stop-opacity="0" />
            <stop offset="30%" :stop-color="colorFamily[4]" stop-opacity="0.2" />
            <stop offset="90%" :stop-color="colorFamily[4]" stop-opacity="0.9" />
            <stop offset="99%" :stop-color="colorFamily[5]" stop-opacity="1" />
            <stop offset="100%" stop-color="#fff" stop-opacity="1" />
        </linearGradient>
        <!-- <clipPath :id="`${timeScopd}-value-clip-path`">
            <path :d="drawPath(rate, true)" stroke="none" />
        </clipPath> -->
    </defs>
    <!-- 辅助线start -->
    <line x1="0" :y1="centerY" :x2="width" :y2="centerY" stroke="#ccc" class="guide-line" />
    <line :x1="centerX" y1="0" :x2="centerX" :y2="height" stroke="#ccc" class="guide-line" />
    <circle :cx="centerX" :cy="centerY" :r="outRadius" stroke="#ccc" fill="none" class="guide-circle" />
    <circle :cx="centerX" :cy="centerY" :r="innerRadius" stroke="#ccc" fill="none" class="guide-circle" />
    <g class="text-group">
        <text
            v-for="(item, index) in textFormat"
            :key="'text-group-li-'+index"
            :x="item.x"
            :y="item.y">
            {{ item.text }}
        </text>
        <line
          v-for="(item, index) in verticesFormat"
          :key="'vertices-line-'+index"
          :x1="centerX"
          :y1="centerY"
          :x2="item.x"
          :y2="item.y"
          stroke-width="2"
          stroke-dasharray="8"
          stroke="#ccc"
        />
    </g>
    <!-- <text :x="width-10" :y="centerY" fill="#000" class="guide-text">w</text>
    <text :x="centerX" :y="height" fill="#000" class="guide-text">h</text>
    <text :x="offsetRadiusX" :y="centerY" fill="#000" class="guide-text">o</text>
    <text :x="ringWidth+offsetRadiusX" :y="centerY" fill="#000" class="guide-text">i</text> -->
    <rect x="0" y="0" :width="width" :height="height" stroke="#000" fill="none" class="guide-rect" />
    <!-- 辅助线end -->
    <!-- colorFamily[0] -->
    <path
        class="polygon-ring"
        stroke="red"
        stroke-width="10"
        fill="none"
        :d="drawPath(1)"
        :filter="`url(#${timeScopd}-shadow)`"
    />
    <g class="gradient-group" :style="{'clip-path': `url(#${timeScopd}-value-clip-path)`}">
        <!-- <path stroke="blue" fill="none" :d="drawPath(rate, true)" /> -->
        <!-- 右上/右下/左下/左上 -->
        <!-- <rect
           :x="centerX"
           :y="offsetRadiusY"
           :width="outRadius"
           :height="outRadius"
           :fill="`url(#${timeScopd}-gradient-1)`" />
        <rect
           :x="centerX"
           :y="centerY"
           :width="outRadius"
           :height="outRadius"
           :fill="`url(#${timeScopd}-gradient-4)`" />
        <rect
           :x="offsetRadiusX"
           :y="centerY"
           :width="outRadius"
           :height="outRadius"
           :fill="`url(#${timeScopd}-gradient-3)`" />
        <rect
           :x="offsetRadiusX"
           :y="offsetRadiusY"
           :width="outRadius"
           :height="outRadius"
           :fill="`url(#${timeScopd}-gradient-2)`" />
        <rect class="lignt-rect"
            :width="lightWidth"
            :height="ringWidth"
            :x="centerX - lightWidth"
            :y="offsetRadiusY"
            :fill="`url(#${timeScopd}-light-gradient)`">
            <animateTransform
                attributeName="transform"
                type="rotate"
                :values="`${0} ${centerX} ${centerY};${360} ${centerX} ${centerY}; ${360} ${centerX} ${centerY}`"
                keyTimes="0; 0.4; 1"
                :begin="`${lightConfig.delay}s`"
                :dur="`${lightConfig.duration}s`"
                fill="freeze"
                repeatCount="indefinite" /> 
            <animate
                attributeName="opacity"
                values="0; 1; 0; 0"
                keyTimes="0; 0.1; 0.4; 1"
                :begin="`${lightConfig.delay}s`"
                :dur="`${lightConfig.duration}s`"
                fill="freeze"
                repeatCount="indefinite"
            />  
        </rect> -->
    </g>
    <!-- 文本 -->
    <g class="text">
        <text
            class="text-desc"
            :x="centerX+title.x"
            :y="centerY+title.y"
            fill="#000"
            :text-anchor="title.textAnchor"
            :font-size="title.fontSize">
            {{ centerX + '*' + centerY }}
        </text>
        <text
            class="text-value"
            :x="centerX+valueFill.x"
            :y="centerY+valueFill.y"
            :fill="colorFamily[4]"
            :text-anchor="title.textAnchor"
            :font-size="valueFill.fontSize">
            {{ formatValueText }}
        </text>
    </g>
</svg>
</template>
<script>
import { polygonConfig } from './config'
import Color from '../../../lib/storyboard/utils/color.js'
import VisualMap from '../../../lib/storyboard/utils/visualMap.js'
import FloodStrorage from '../../../lib/storyboard/utils/floodStorage.js'
export default {
    name: 'polygonRing',
    props: polygonConfig,
    data() {
        return {
            timeScopd: (new Date()).getTime(),
            visualMapObj: null,
            store: {value: 0},
            floodStorage: null
        }
    },
    computed: {
        viewBox() {
            return `0 0 ${this.width} ${this.height}`
        },
        degreen() {
            return 360 / this.sideNum
        },
        rad_a_base() {
            return Math.PI * 2 / this.sideNum
        },
        rate() {
            if (this.sum === 0 || this.store.value / this.sum < 0) {
                console.error(`错误的数据传入${this.store.value}/${this.sum}`)
            }
            return this.store.value / this.sum
        },
        visualFill() {
            if (this.visualMapObj) {
                return this.visualMapObj.filter(this.store.value / this.sum * 100) || this.valueFill.color
            } else {
                return this.valueFill.color
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
        },
        // 渐变颜色区域
        startOffset() {
            return `${Math.ceil(this.ringWidth / this.outRadius * 100)}%`
        },
        halfOffset() {
            return `${Math.ceil(this.ringWidth / this.outRadius * 100 / 2)}%`
        },
        endOffset() {
            return `${Math.floor(100 - this.ringWidth / this.outRadius * 100)}%`
        },
        formatValueText() {
            if (this.valueFormat === 'percent') return Math.round(this.floodStorage.value / this.sum * 100) + '%'
            if (this.valueFormat === 'divide') return Math.round(this.floodStorage.value) + '/' + this.sum
            return Math.round(this.floodStorage.value)
        },
        textFormat() {
            let result = []
            for (let i = 0; i < this.sideNum; i++) {
                const rad_a = i * this.rad_a_base
                result[i] = {
                    text: i + '*' + (' ' + this.degreen).slice(0, 5) + '°',
                    x: this.centerX + Math.sin(rad_a) * this.outRadius + i * 10 * Math.sin(rad_a),
                    y: this.centerY - Math.cos(rad_a) * this.outRadius - i * 10 * Math.cos(rad_a)
                }
            }
            return result
        },
        // 辅助线-顶点虚线
        verticesFormat() {
            let result = []
            for (let i = 0; i < this.sideNum; i++) {
                const rad_a = i * this.rad_a_base
                result[i] = {
                    x: this.centerX + Math.sin(rad_a) * this.outRadius,
                    y: this.centerY - Math.cos(rad_a) * this.outRadius
                }
            }
            return result
        }
    },
    watch: {
        value: {
            handler(val) {
                if (this.floodStorage) {
                    this.floodStorage.value = Math.min(Math.max(val, 0), this.sum)
                }
            },
            immediate: true
        },
        visualMap() {
            this.initVisualMap()
        }
    },
    created() {
        this.floodStorage = new FloodStrorage(this.store, [
            { key: 'value', speed: this.sum / 2 }
        ])
        // console.log(this.floodStorage, '0000', this.store, this.colorFamily)
    },
    mounted() {
        if (this.value) {
            // this.store.value = Math.min(Math.max(this.value, 0), this.sum)
            this.floodStorage.value = Math.min(Math.max(this.value, 0), this.sum)
        }
        this.initVisualMap()
    },
    beforeDestroy() {
        this.visualMapObj = null
        this.floodStorage.destroy()
        this.floodStorage = null
    },
    methods: {
        camp(value, a, b) {
            if (a < b) {
                return Math.max(a, Math.min(b, value))
            } else {
                return Math.max(b, Math.min(a, value))
            }
        },
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
            rate = rate - (isValue && !this.isPolygon ? (Math.asin(this.innerRadius / this.ringWidth / Math.PI / 2)) * rate : 0)
            // 起点
            let Mpoint = `M${this.centerX},${this.offsetRadiusY} `
            /***
             * 先绘制容器，在绘制进度
             */
            // console.log(rate, isValue, '绘制图形')
            if (this.isPolygon) {
                // console.log(this.sideNum, '是N边形', rate)
                let polyPath = Mpoint
                // 绘制裁剪区域
                let i = 1
                for (; i < this.sideNum && i / this.sideNum < rate; i++) {
                    const angle = i * this.rad_a_base
                    polyPath += `L${this.centerX + Math.sin(angle) * this.outRadius},${this.centerY - Math.cos(angle) * this.outRadius}`
                }
                i--
                // js 根据百分比获取弧线上的位置
                /***
                 * 1. 在上下两个点中间绘制当前点
                 * （rate在外侧边框上的位置）
                 * 2. 绘制垂直的点（基于rate的内侧边框上的点）
                 */
                const startX = Math.sin(this.rad_a_base * 2)
                const endX = Math.sin(this.rad_a_base * (i + 1))
                const startY = Math.cos(this.rad_a_base * i)
                const endY = Math.cos(this.rad_a_base * (i + 1))
                const x = (rate - i / this.sideNum) * this.sideNum * (endX - startX) + startX
                const y = (rate - i / this.sideNum) * this.sideNum * (endY - startY) + startY
                polyPath += `L${this.centerX + x * this.outRadius},${this.centerY - y * this.outRadius + 2}`

                const angle = (i + 0.5) / this.sideNum * Math.PI * 2
                const width = Math.sin((this.sideNum - 2) / this.sideNum * Math.PI / 2) * this.ringWidth

                const xA = x * this.outRadius - Math.sin(angle) * width
                const xB = Math.sin(Math.PI * 2 * i / this.sideNum) * this.innerRadius
                const xC = Math.sin(Math.PI * 2 * (i + 1) / this.sideNum) * this.innerRadius
                const x2 = this.camp(xA, xB, xC)
                
                const yA = y * this.outRadius - Math.cos(angle) * width
                const yB = Math.cos(Math.PI * 2 * i / this.sideNum) * this.innerRadius
                const yC = Math.cos(Math.PI * 2 * (i + 1) / this.sideNum) * this.innerRadius
                const y2 = this.camp(yA, yB, yC)
                console.log(x2, y2, '折线', yA, yB, yC)
                polyPath += `L${this.centerX + x2},${this.centerY - y2} `
                // 绘制内部多边形
                for (; i >=0; i--) {
                    const angle = Math.PI * 2 * i / this.sideNum
                    polyPath += `L${this.centerX + Math.sin(angle) * this.innerRadius},${this.centerY - Math.cos(angle) * this.innerRadius} `
                }
                polyPath += 'Z'
                return polyPath
            } else {
                let angle = rate * Math.PI * 2
                let resultPath
                let roundValuePath = `A${this.ringWidth * 0.5},${this.ringWidth * 0.5} 0 1,1 ${this.centerX + Math.sin(angle) * this.innerRadius},${this.centerY - this.innerRadius * Math.cos(angle)}`
                let normalPath = `L${this.centerX + this.innerRadius * Math.sin(angle)}, ${this.centerY - this.innerRadius * Math.cos(angle)}`
                let outHalfRArc = `A${this.outRadius}, ${this.outRadius} 0 0,1 ${this.centerX + this.outRadius * Math.sin(angle)}, ${this.centerY - this.outRadius * Math.cos(angle)}`
                let inhalfREndArc = `A${this.innerRadius},${this.innerRadius} 0 0,0 ${this.centerX},${this.centerY - this.innerRadius}`
                if (rate > 0.5) {
                    const outHalfLArc = `A${this.outRadius}, ${this.outRadius} 0 0,1 ${this.centerX},${this.centerY + this.outRadius}`
                    const inHalfLArc = `A${this.innerRadius}, ${this.innerRadius} 0 0,0 ${this.centerX},${this.centerY + this.innerRadius}`
                    // const inhalfRArc = `A${this.innerRadius},${this.innerRadius} 0 0,0 ${this.centerX + this.innerRadius * Math.sin(angle)}, ${this.centerY - this.innerRadius * Math.cos(angle)}`
                    resultPath = `${Mpoint} ${outHalfLArc} ${outHalfRArc} ${isValue ? roundValuePath : normalPath} ${inHalfLArc} ${inhalfREndArc}Z`
                } else {
                    // const inHalfRArc = `${this.innerRadius}, ${this.innerRadius} 0 0,0 ${this.centerX},${this.centerY - this.innerRadius}`
                    resultPath = `${Mpoint} ${outHalfRArc} ${isValue ? roundValuePath : normalPath} ${inhalfREndArc}Z`
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
