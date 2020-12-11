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
      <defs>
        <path id="myTextPath" d="M0,0 L300,0" />
      </defs>
      <g v-if="treeData&&Object.keys(treeData).length>0" class="tree-mind-group">
        <circle :cx="cx" :cy="cy" :r="radius" stroke="red" fill="none" />
        <g class="tree-mind-circle-group" :transform="`translate(${cx},${cy})`">
          <path :d="drawFive(sideNum, fiveRadius)" stroke="red" fill="none" />
          <text y="-10" class="align-text origin-title">
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
                <path-link
                  distance="100"
                  :item="item1"
                  :index1="index1"
                />
              <g
                :key="'tree-mind-two-corner-'+index1"
                v-if="item1.children&&item1.children.length>0"
                class="tree-mind-two-corner-group"
                :transform="transformBox(index1, item1)"
              >
                <rect
                  x="0"
                  y="0"
                  :width="index1>0?200:item1.childLength * 100"
                  :height="index1>0?item1.childLength*50:50"
                  fill="none"
                  stroke="#00cc00"
                />
                <g
                  :key="'tree-mind-two-group-'+index1"
                  class="tree-mind-two-group"
                >
                  <g
                    :key="'tree-mind-two-corner-group-'+index2"
                    v-for="(item2, index2) in item1.children"
                    class="tree-mind-two-corner-group-text"
                    :transform="formatTwoBox(index1, index2, item1)"
                  >

                    <!-- <path-link
                      :distance="formatText(item2.title)"
                      :item="item2"
                      :index1="index1"
                    /> -->
                    <!-- <rect
                      :x="index1>2?-200:0"
                      :y="index1>0?0:0"
                      :width="index1>0?200:100"
                      height="50"
                      fill="none"
                      stroke="#00cc00"
                    /> -->
                    <!-- <text
                      y="25"
                      dominant-baseline="middle"
                      :text-anchor="twoTextAnchor(index1)"
                      :class="'tree-mind-two-group-text-'+index1+'two-'+index2"
                    >
                      {{ cutOff(item2.title )}}
                    </text> -->
                    <!-- <g
                      :key="'tree-mind-three-group-'+index1 + 'two' + index2"
                      v-if="item2.children&&item2.children.length>0"
                      class="tree-mind-three-group-box"
                      :transform="transformThreeCorner(index1, item2)"
                    > -->
                      <!-- <rect
                        x="0"
                        y="0"
                        :width="index1>0?200:item2.childLength * 100"
                        :height="index1>0?item2.childLength*50:50"
                        fill="none"
                        stroke="#00cc00"
                      /> -->
                      <!-- <g
                        :key="'tree-mind-three-text-group-'+index1+'two'+index2+'three'+index3"
                        v-for="(item3, index3) in item2.children"
                        class="tree-mind-three-group"
                        :transform="transformThreeBox(index1, index3)"
                      >
                        <rect
                          :x="index1>2?-200:0"
                          :y="index1>0?0:0"
                          :width="index1>0?200:100"
                          height="50"
                          fill="none"
                          stroke="#00cc00"
                        />
                      </g> -->
                    <!-- </g> -->
                  </g>
                </g>
              </g>
              <!-- 第二部分 -->
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
                  {{ cutOff(item1.title) }}
                </text>
              </g>
            </g>
          </template>
        </g>
      </g>
    </svg>
  </div>
</template>
<script>
import TextBlock from './text-block.vue'
import PathLink from './path-block.vue'
export default {
  name: 'treeMind',
  components: {
    PathLink,
    TextBlock
  },
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
      width: 1440,
      height: 1000,
      radius: 100,
      sideNum: 5,
      fiveRadius: 200,
      smallRadius: 50,
      textHeight: 12
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
    formatText(text) {
      let div = document.createElement('div')
      div.innerText = text.slice(0, 24)
      div.style.fontSize = '12px'
      div.style.position = 'fixed'
      div.style.opacity = 0
      div.style.border = '1px solid red'
      document.body.appendChild(div)
      const { width } = div.getBoundingClientRect()
      document.body.removeChild(div)
      div = null
      return width
    },
    cutOff(text) {
      const width = this.formatText(text)
      if (width < 140) {
        return text
      } else {
        return text.slice(0, 18 - Math.round((width - 200) / 12)) + '...'
      }
    },
    initData() {
      const str = '测试文本aaa测啊阿gagagaga测啊阿hahahhahrEERRLRWWXrara'
      const randomNum = Math.floor(Math.random()*(1-1+1)+1)
      this.treeData.children = Array.from({ length: 5 }, (v, i) => {
        return {
          title : 'parent' + str.slice(0, str.length * Math.random()) + i,
          value: 'https://www.baidu.com',
          type: 'webtype',
          edit: true,
          childLength: randomNum,
          children: Array.from({ length: randomNum }, (v2, i2) => {
            return {
              title : 'children' + str.slice(0, str.length * Math.random()) + i2,
              value: 'https://www.baidu.com',
              type: 'webtype',
              edit: true,
              childLength: 5,
              children: Array.from({ length: 5 }, (v3, i3) => {
                return {
                  title : 'children' + str.slice(0, str.length * Math.random()) + i3,
                  value: 'https://www.baidu.com',
                  type: 'webtype',
                  edit: true
                }
              })
            }
          })
        }
      })
      console.log(this.treeData, '111111>>>>>')
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
    transformBox(index1, item1) {
      let result = 0
      const top = item1.childLength > 0 ? 25 : 0
      if (index1 === 0) {
        result = `translate(-${item1.childLength * 100 / 2}, -200)`
      } else if (index1 === 1 || index1 === 2) {
        result = `translate(150, -${item1.childLength * 50 / 2})`
      } else if(index1 === 3 || index1 === 4){
        result = `translate(-150, -${item1.childLength * 50 / 2})`
      }
      return result
    },
    formatTwoBox(index1, index2, item1) {
      let result = 0
      if (index1 === 0) {
        result = `translate(${index2 * 120},0)`
      } else {
        if (index2 === 0) {
          result = `translate(0, ${index2 * 0})`
        } else {
          result = `translate(0, ${index2 * 50})`
        }
      }
      return result
    },
    transformTwoBox(index1) {
      let result = ''
      if (index1 === 0) {
        result = 'translate(0, -100)'
      } else if (index1 === 1 || index1 === 2) {
        result = 'translate(300, 0)'
      } else {
        result = 'translate(-400, 0)'
      }
      return result
    },
    transformThreeCorner(index1, item2) {
      let result = 0
      const top = item2.childLength > 0 ? 25 : 0
      if (index1 === 0) {
        result = `translate(-${item2.childLength * 100 / 2}, -200)`
      } else if (index1 === 1 || index1 === 2) {
        result = `translate(300, ${25 - item2.childLength * 50 / 2})`
      } else if(index1 === 3 || index1 === 4){
        result = `translate(-300, ${25 - item2.childLength * 50 / 2})`
      }
      return result
    },
    transformThreeBox(index1, index3) {
      let result = 0
      if (index1 === 0) {
        result = `translate(${index3 * 120},0)`
      } else {
        if (index1 === 0) {
          result = `translate(0, ${index3 * 0})`
        } else {
          result = `translate(0, ${index3 * 50})`
        }
      }
      return result
    },
    twoTextAnchor(index1) {
      let result = ''
      if (index1 === 0){
        result = 'middle'
      } else if (index1 === 1 || index1 === 2) {
        result = 'start'
      } else {
        result = 'end'
      }
      return result
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
