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
            <line x1="0" :y1="centerY" :x2="width" :y2="centerY" stroke="#ccc" class="guide-line" />
            <line :x1="centerX" y1="0" :x2="centerX" :y2="height" stroke="#ccc" class="guide-line" />
            <path :d="drawPath()" stroke="red" fill="none" />
        </svg>
    </div>
</template>
<script>
export default {
    name: 'arcPath',
    props: {
        height: {
            type: Number,
            default: 400
        },
        width: {
            type: [Number, String],
            default: '100%'
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
        return {}
    },
    computed: {
        viewBox() {
            return `0 0 ${1200} ${this.height}`
        },
        centerX() {
            let isString = typeof (this.width) === 'string'
            if (isString) {
                if (this.testPercent(this.width)) {
                    return this.toPoint(this.width) / 2 + '%'
                } else {
                    return Number(this.width) / 2
                } 
            } else {
                return Number(this.width) / 2
            }
        },
        centerY() {
            return this.height / 2
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
        drawPath() {
            // let domEle = this.$refs.arcPath
            // console.log(domEle, 'domEle=111')
            // let mPoint = `M${0},${this.height - 90}`
            // 贝兹曲线 C300,350 500,250 5600,100 700,200
            // let cPoint = `C${0}, ${this.height - 40} ${500},${320} ${1200},${240} ${1900},${130}`
            let resultPath
            let domWidth = 1920
            if (this.svgReady) {
                let domEle = this.$refs.arcPath
                domWidth = domEle.getBoundingClientRect().width
                resultPath = `M${-90} ${this.height} C${domWidth / 3},${this.height / 10} ${domWidth / 4},${this.height * 4 / 3} ${domWidth},${this.height * 2 / 5}`
            }
            return `M${-90} ${this.height} C${domWidth / 3},${this.height / 10} ${domWidth / 4},${this.height * 4 / 3} ${domWidth},${this.height * 2 / 5}`
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
