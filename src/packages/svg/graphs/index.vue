<template>
  <div class='graphs'>
    <svg
      class='graphs-svg'
      version='1.1'
      xmlns='http://www.w3.org/2000/svg'
      xmlns:xlink='http://www.w3.org/1999/xlink'
      preserveAspectRetio='xMidYMid meet'
      width='100%'
      height='100%'
      x='0%'
      y='0%'
      :viewBox='viewBox'
    >
      <!-- <circle cx='60' cy='60' r='50' fill='#34538b' clip-path='url(#clipPath)' /> -->
      <line :x1='cx' :y1='height' :x2='cx' y2='0' stroke='#ccc' fill='none' class='guide-rect' />
      <line x1='0' :y1='cy' :x2='width' :y2='cy' stroke='#ccc' fill='none' class='guide-rect' />
      <!-- 绘制 -->
      <!-- <rect :x='cx/2' :y='cy/2' width='80' height='80' /> -->
      <g class='circle-groups'>
        <!-- <template v-for='(circle, circleIndex) in dataList'> -->
        <!-- 线条 -->
        <!-- <path
            v-if='circleIndex==0'
            :key=''line-groups-li'+circleIndex'
            stroke-dasharray='4,4'
            :d='`M${circleGap * 1.2}, ${cy} L${circleGap * circleNum * 2 + circleGap},${cy}`'
            style='stroke:#ccc;'
          />
          <circle
            :key=''circle-groups-li'+circleIndex'
            :cx='cx'
            :cy='cy'
            :r='circleIndex>0?circleGap + circleGap * circleIndex:originRadius'
            :stroke='circleIndex>0?'skyblue':'none''
            :fill='circleIndex>0?'none':'skyblue''
            class='circle-groups-li'
          /> -->
        <!-- 文字 -->
        <!-- <text
            :x='circleGap + circleGap * circleIndex'
            :y='cy+3'
            :key=''text-groups-li'+circleIndex'
            class='text-groups-li'
           >
            {{ textS[circleIndex] }}
          </text> -->
        <!-- </template> -->
        <circle :cx='cx' :cy='cy' :r='radiusArr[0]' fill='skyblue' stroke='none' />
        <circle :cx='cx' :cy='cy' :r='radiusArr[1]' fill='none' stroke='green' />
        <circle :cx='cx' :cy='cy' :r='radiusArr[2]' fill='none' stroke='green' />
        <circle :cx='cx' :cy='cy' :r='radiusArr[3]' fill='none' stroke='green' />
      </g>
      <g class='circle-li-group'>
        <template v-for='(li, liIndex) in circleDatas'>
          <circle
            :key=''circle-li-group-li-' + liIndex'
            :cx='cx + li[2] * Math.sin(li[1])'
            :cy='cy - li[2] * Math.cos(li[1])'
            :r='li[0]'
            fill='red'
            stroke='none'
          />
        </template>
      </g>
    </svg>
  </div>
</template>
<script>
export default {
  name: 'graphs',
  props: {
    width: {
      type: Number,
      default: 400
    },
    height: {
      type: Number,
      default: 400
    },
    listData: {
      type: Array,
      default: () => []
    },
    circleGap: {
      type: Number,
      default: 40
    },
    textS: {
      type: Array,
      default: () => []
    },
    lineStyle: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      circleDatas: [],
      radiusArr: [20, 100, 200, 300]
    }
  },
  computed: {
    viewBox () {
      return `0 0 ${this.width} ${this.height}`
    },
    cx () {
      return this.width / 2
    },
    cy () {
      return this.height / 2
    },
    dataList () {
      return [{ group: '', value: 0 }].concat(this.groupBy(this.listData, 'group'))
    },
    circleNum () {
      return this.dataList.length
    },
    originRadius () {
      return this.circleGap * 2 / 3
    }
  },
  watch: {},
  mounted () {
    this.getRandomData()
    console.log(this.dataList, '数据')
  },
  methods: {
    getRandomData () {
      const len = 100
      const rarr = this.radiusArr
      this.circleDatas = Array.from({ length: len }, (v, i) => {
        const o = { r: 0, angle: 0, l: 0 }
        if (i < 0.2 * len) {
          o.r = 15
          o.angle = 360 * i / (len * 0.2)
          o.l = Math.floor((rarr[1] - rarr[0] - 15) * Math.random()) + rarr[0] + 15
        } else if (i < 0.5 * len) {
          o.r = 10
          o.angle = 360 * (i - Math.floor(0.2 * len)) / (len * 0.3)
          o.l = Math.floor((rarr[2] - 10 - rarr[1]) * Math.random()) + rarr[1] + 10
        } else {
          o.r = 8
          o.angle = 360 * (i - Math.floor(0.5 * len)) / (len * 0.5)
          o.l = Math.floor((rarr[3] - rarr[2] - 8) * Math.random()) + rarr[2] + 8
        }
        return [o.r, o.angle, o.l]
      })
      console.log('getRandomData -> this.circleDatas', this.circleDatas)
    },
    groupBy (data, key) {
      let result = []
      let map = {}
      for (let i = 0;i < data.length;i++) {
        if (!map[data[i][key]]) {
          result.push({
            key: data[i][key],
            children: [data[i]]
          })
          map[data[i][key]] = data[i]
        } else {
          for (let j = 0;j < result.length;j++) {
            if (result[j][key] === data[i][key]) {
              result[j].children.push(data[i])
              break
            }
          }
        }
      }
      console.log(result, 'result====0000000---99999')
      return result
    }
  }
}
</script>
<style lang='scss' scoped>
.graphs {
  width: 100%;
  height: 100%;
  .graphs-svg {
    .circle-groups-li {
      z-index: 2;
    }
    .text-groups-li {
      font-size: 10px;
      fill: red;
      z-index: 2;
    }
  }
}
</style>
