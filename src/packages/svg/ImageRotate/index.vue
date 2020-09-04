<template>
    <div class="image-rotate">
        <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            shape-rendering="geometricPrecision"
            :width="width"
            :height="height"
            :viewBox="viewBox"
            x="0%"
            y="0%"
        >
        <!-- 绘制辅助线 -->
        <circle :cx="cx" :cy="cy" :r="radius" stroke="red" fill="none" />
        <circle :cx="cx" :cy="cy" r="1" stroke="red" fill="red" />
        {{ arcGap }}
        <line
            v-for="(item, index) in num"
            :key="'gird-lines-'+index"
            class="grid-lines"
            :x1="cx"
            :y1="cy"
            :x2="cx"
            y2="0"
            stroke="red"
            fill="none"
        />
        <!-- 绘制灰色底部 -->
        <g id="rect-gray-back">
          <!-- <path :d="drawPath" stroke="green" fill="none" /> -->
        </g>
        </svg>
    </div>
</template>
<script>
export default {
    name: 'ImageRotate',
    props: {
        width: {
            type: Number,
            default: 200
        },
        height: {
            type: Number,
            default: 200
        },
        num: {
            type: Number,
            default: 30
        },
        backColor: {
            type: String,
            default: 'gray'
        },
        lightColor: {
            type: String,
            default: '#bad424'
        },
        background: {
            type: String,
            default: '#000'
        },
        rect: {
            type: Object,
            default: () => {
                return {
                    width: 20,
                    height: 10,
                    rx: 0,
                    ry: 0
                }
            }
        }
    },
    data() {
        return {
            timeScopd: (new Date()).getTime()
        }
    },
    computed: {
        viewBox () {
            return `0 0 ${this.width} ${this.height}`
        },
        cx() {
            return this.width / 2
        },
        cy() {
            return this.height / 2
        },
        radius() {
            return this.width / 2
        },
        arcLength() {
            return Math.PI * 2 * this.radius
        },
        arcGap() {
            const arcItem = this.arcLength / this.num
            const angle = arcItem * 180 / Math.PI
            console.log(angle, '11111')
            return {
                x: 0,
                y: 0
            }
        },
        nums() {
            const x = this.cx + Math.sin(2 * Math.PI / 360) * this.radius
            const y = this.cy + Math.cos(2 * Math.PI / 360) * this.radius
        },
        x() {
            return this.cx + Math.sin(2 * Math.PI / 360) * this.radius
        },
        y() {
            return this.cy + Math.cos(2 * Math.PI / 360) * this.radius
        }
    },
    watch: {},
    mounted() {},
    methods: {
        drawPath() {
            let resultPath
            // const startPoint = `M`
            return resultPath
        }
    }
}
</script>
<style lang="scss" scoped>
.image-rotate {
    width: 300px;
    height: 300px;
    margin: 100px auto;
}
</style>
