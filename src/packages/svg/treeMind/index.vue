<template>
  <div class="treeMind">
     <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      preserveAspectRetio="xMidYMid meet"
      width="100%"
      height="100%"
      x="0%"
      y="0%"
      :viewBox="`0 0 ${this.width} ${this.height}`"
    >
      <g v-if="treeData&&Object.keys(treeData).length>0" class="tree-mind-group">
        <circle :cx="cx" :cy="cy" :r="radius" stroke="red" fill="none" />
        <g class="tree-mind-circle-group" :transform="`translate(${cx},${cy})`">
          <path :d="drawFive(sideNum, fiveRadius)" stroke="red" fill="none" />
          <text y="-10" class="align-text">
            {{ treeData.title }}
          </text>
          <text y="20" class="align-text">
            {{ treeData.value }}
          </text>
        </g>
        <g
          v-if="treeData.children&&treeData.children.length>0"
          class=tree-mind-one-group
          :transform="`translate(${cx},${cy})`"
        >
          <template v-for="(item1, index1) in treeData.children">
            <g
              :key="'tree-mind-one-corner-'+index1"
              class="tree-mind-one-corner-group"
              :transform="transformCorner(index1, fiveRadius)"
            >
              <g class="tree-mind-one-corner-group-box">
                <path :d="drawFive(sideNum+1, smallRadius)" stroke="red" fill="none" />
                <image
                  width="50"
                  height="50"
                  x="-25"
                  y="-25"
                  :xlink:href="defaultImage"
                />
                <text :y="index1>0?(smallRadius + 15):-(smallRadius + 20)" class="align-text">
                  {{ item1.title }}
                </text>
              </g>
              <g
                :key="'tree-mind-two-corner-'+index1"
                v-if="item1.children&&item1.children.length>0"
                class="tree-mind-two-corner-group"
              >
                <g
                  :key="'tree-mind-two-corner-group-'+index2"
                  v-for="(item2, index2) in item1.children"
                  class="tree-mind-two-corner-group"
                  :transform="formatTwo(index1, index2)"
                >
                  <text class="align-text">
                    {{ item2.title }}
                  </text>
                </g>
              </g>
            </g>
          </template>
        </g>
      </g>
    </svg>
  </div>
</template>
<script>
export default {
  name: 'treeMind',
  props: {},
  data() {
    return {
      treeData: {
        title: '中间位置',
        value: '193.213.22.1212',
        children: []
      },
      // 配置
      defaultImage: 'https://iconfont.alicdn.com/t/55287536-9526-4f05-99ba-427310367ba0.png',
      width: 1000,
      height: 800,
      radius: 100,
      sideNum: 5,
      fiveRadius: 230,
      smallRadius: 50
    }
  },
  computed: {
    cx() {
      return this.width / 2
    },
    cy() {
      return this.height / 2
    },
    sixRad() {
      return Math.PI * 2 / (this.sideNum + 1)
    },
    fiveRad() {
      return Math.PI * 2 / this.sideNum
    }
  },
  watch: {},
  mounted() {
    this.initData()
  },
  methods: {
    initData() {
      this.treeData.children = Array.from({ length: 5 }, (v, i) => {
        return {
          title : 'parent-测试文本' + i,
          value: 'https://www.baidu.com',
          type: 'webtype',
          edit: true,
          childLength: Math.random() * 5,
          children: Array.from({ length: Math.random() * 5 }, (v2, i2) => {
            return {
              title : 'children-测试文本' + i2,
              value: 'https://www.baidu.com',
              type: 'webtype',
              edit: true
            }
          })
        }
      })
    },
    // 绘制五边形
    drawFive(num, radius) {
      let polyPath = ''
      for (let i = 0; i < num; i++) {
        const angle = i * this.fiveRad
        if (i === 0) {
          polyPath += `M${Math.sin(angle) * radius},${-Math.cos(angle) * radius}`
        } else {
          polyPath += ` L${Math.sin(angle) * radius},${-Math.cos(angle) * radius}`
        }
      }
      polyPath += 'Z'
      return polyPath
    },
    transformCorner(index1, radius) {
      const angle = index1 * this.fiveRad
      return `translate(${Math.sin(angle) * radius},${-Math.cos(angle) * radius})`
    },
    // 从最外层开始绘制，绘制最大宽度，然后求一半
    formatTwo(index1, index2) {
      // let result = 0
      // if (index1 === 0) {
      //   result = index2 * 20
      // }
      // return 
      return 'translate(0,0)'
    }
  }
}
</script>
<style lang="scss" scoped>
.treeMind {
  width: 100%;
  height: 100%;
  .align-text {
    dominant-baseline:middle;
    text-anchor:middle;
  }
}
</style>
