<template>
    <div ref="arcPath" class="arcPath">
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
            <line x1="0" :y1="cy" :x2="width" :y2="cy" stroke="#ccc" class="guide-line" />
            <line :x1="cx" y1="0" :x2="cx" :y2="height" stroke="#ccc" class="guide-line" />
            <circle :cx="cx" :cy="cy" :r="radius" stroke="null" fill="red" />
            <path :d="drawPath(outRadius)" stroke="red" fill="transparent" />
            <path :d="drawPath(outRadius + 200)" stroke="red" fill="transparent" />
            <g>
              <circle
                v-for="(item, index) in sideNum"
                :key="'circle-'+index"
                :cx="cx+Math.sin(index*rad_a_base)*outRadius"
                :cy="cy-Math.cos(index*rad_a_base)*outRadius"
                r="30"
                stroke="transparent"
                fill="red"
              />
              <line
                v-for="(item, index) in sideNum"
                :key="'line-'+index"
                :x1="cx+Math.sin(index*rad_a_base)*outRadius"
                :y1="cy-Math.cos(index*rad_a_base)*outRadius"
                :x2="cx+Math.sin(index*rad_a_base)*(radius3+extendLine)"
                :y2="cy-Math.cos(index*rad_a_base)*(radius3+extendLine)"
                stroke="green"
                fill="transparent"
              />
            </g>
        </svg>
    </div>
</template>
<script>
export default {
    name: 'arcPath',
    props: {
        height: {
            type: Number,
            default: 1000
        },
        width: {
            type: [Number, String],
            default: 1000
        },
        svgReady: {
            type: Boolean,
            default: false
        },
        strokeWidth: {
            type: Number,
            default: 400
        },
        strokeColor: {
            type: [String, Array],
            default: '#04A7F9'
        },
        fillColor: {
            type: [String, Array],
            default: '#04A7F9'
        }
    },
    data() {
        return {
            sideNum: 5,
            gap: 60,
            radius: 60,
            outRadius: 300,
            radius3: 500,
            extendLine: 500
        }
    },
    computed: {
        viewBox() {
            return `0 0 ${this.width} ${this.height}`
        },
        cx() {
            return this.width / 2
        },
        cy() {
            return this.height / 2
        },
        rad_a_base() {
            return Math.PI * 2 / this.sideNum
        },
        offsetRadiusY() {
            return this.height / 2 - this.outRadius
        }
    },
    watch: {},
    mounted() {},
    methods: {
        testPercent(str) {
            let reg = new RegExp(/^\d+%$/)
            if (reg.test(str)) return true
            else return false
        },
        toPoint(percent) {
            return percent.replace('%', '')
        },
        drawPath(radius) {
            const offsetRadiusY = this.height / 2 - radius
            let polyPath = `M${this.cx}, ${offsetRadiusY}`
            for (let i = 0; i < this.sideNum; i++) {
                const angle = i * this.rad_a_base
                polyPath += `L${this.cx + Math.sin(angle) * radius},${this.cy - Math.cos(angle) * radius}`
            }
            polyPath += 'Z'
            return polyPath
        }
    }
}
</script>
<style lang="scss" scoped>
.arcPath {
    width: 100%;
    height: 400px;
}
</style>
