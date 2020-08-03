<template>
    <div v-if="svgReady" class="specialBar">
        <svg class="special-bar-svg"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            preserveAspectRetio="xMidYMid meet"
            width="100%"
            height="100%"
            x="0%"
            y="0%"
            :viewBox="viewBox">
           <g :transform="formatX">
               <template v-for="(item, index) in chartData">
                   <defs :key="'svg-defs-'+index">
                       <linearGradient :id="'svg-background-'+index" x1="0%" y1="80%" x2="0%" y2="20%">
                           <stop offset="0" :stop-color="item.fill&&item.fill.startColor" />
                           <stop offset="100%" :stop-color="item.fill&&item.fill.endColor" />
                       </linearGradient>
                       <linearGradient :id="'svg-aside-'+index" x1="0%" y1="80%" x2="0%" y2="20%">
                           <stop offset="0" :stop-color="item.stroke&&item.stroke.startColor" />
                           <stop offset="100%" :stop-color="item.stroke&&item.stroke.endColor" />
                       </linearGradient>
                   </defs>
                   <polygon
                     :key="'svg-polygon-'+index"
                     :points="item.points"
                     :stroke="`url(#${'svg-aside-' + index})`"
                     :fill="`url(#${'svg-background-' + index})`"
                   />
               </template>
           </g>
        </svg>
    </div>
</template>
<script>
export default {
name: 'specialBar',
props: {
    svgReady: {
        type: Boolean,
        default: false
    },
    chartData: {
        type: Array,
        default: []
    },
    chartSeries: {
        type: Array,
        default: []
    },
    width: {
        type: Number,
        default: 400
    },
    height: {
        type: Number,
        default: 400
    },
    barWidth: {
        type: String,
        default: '30%'
    },
    barXcenter: {
        type: [Number, String],
        default: 50
    }
},
data() {
    return {
        maxValue: 0
    }
},
computed: {
    viewBox() {
        return `0 0 ${this.width} ${this.height}`
    },
    barPointX() {
        return this.toPoint(this.barWidth) * this.width
    },
    formatX() {
        let percentw = this.width * this.barXcenter / 100
        let barw = this.barPointX / 2
        let diff = barw > percentw ? percentw : (percentw - barw)
        return `translate(${diff}, 0)`
    }
},
watch: {
    chartData: {
        handler(val) {
            this.drawPoint()
        },
        deep: true
    },
    svgReady(val) {
        if (val) this.drawPoint()
    }
},
mounted() {
    this.$nextTick(() => {
        this.drawPoint()
    })
},
methods: {
    toPoint(percent) {
        let str = percent.replace('%', '')
        str = str / 100
        return str
    },
    drawPoint() {
        if (this.chartData && this.chartData.length > 0) {
            let maxValue = Math.max.apply(null, this.chartData.map(function(o) {return o.y}))
            let dataLen = this.chartData.length
            let seriesLen = this.chartSeries.length
            this.maxValue = maxValue / 0.8
            this.chartData.forEach((v, i) => {
                if (seriesLen < dataLen) {
                    if (i < seriesLen) {
                        v.fill = this.multiColorTrans(this.chartSeries[i].fill)
                        v.stroke = this.multiColorTrans(this.chartSeries[i].stroke)
                    } else {
                        v.fill = this.multiColorTrans(this.chartSeries[seriesLen - 1].fill)
                        v.stroke = this.multiColorTrans(this.chartSeries[seriesLen - 1].stroke)
                    }
                } else {
                    v.fill = this.multiColorTrans(this.chartSeries[i].fill)
                    v.stroke = this.multiColorTrans(this.chartSeries[i].stroke)
                }
                v.points = `0, ${this.height} ${this.barPointX}, ${this.height} ${this.barPointX / 2}, ${this.height - v.y / this.maxValue * this.height}`
            })
        }
    },
    multiColorTrans(color) {
        if (typeof color === 'string') {
            return color
        } else {
            return {
                startColor: color.start,
                endColor: color.end
            }
        }
    }
  }
}
</script>
<style lang="scss" scoped>
.specialBar {}
</style>
