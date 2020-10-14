<template>
  <div
    onselectstart='return false'
    class='ruler-tool ruler-tool-wrapper'
    :style='wrapperStyle'>
    测试标尺
  </div>
</template>
<script>
import { on, off } from './event.js'
export default {
  name: 'RulerTool',
  props: {
    // 元素定位
    position: {
      type: String,
      default: 'relative',
      validator: (val) => {
        return ['absolute', 'fixed', 'relative', 'static', 'inherit'].indexOf(val) !== -1
      }
    },
    // 热键开关
    isHotKey: {
      type: Boolean,
      default: true
    },
    // 刻度修正(根据content进行刻度重置)-内容的位置开始从0计数
    isScaleRevise: {
      type: Boolean,
      default: false
    },
    // 预制参考线
    presetReferLine: {
      type: Array,
      default: []
    },
    // 内容部分布局
    contentLayout: {
      type: Object,
      default: () => {
        return { top: 0, left: 0 }
      }
    },
    parent: {
      type: Boolean,
      default: false
    },
    visible: {
      type: Boolean,
      default: true
    },
    // 步长
    stepLength: {
      type: Number,
      default: 50,
      validator: (val) => val % 10 === 0
    }
  },
  data() {
    return {
      size: 17,
      left_top: 18, // 内容左上填充
      windowWidth: 0, // 窗口宽度
      windowHeight: 0, // 窗口高度
      xScale: [], // 水平刻度
      yScale: [], // 垂直刻度
      topSpacing: 0, // 标尺与窗口上间距
      leftSpacing: 0, //  标尺与窗口左间距
      isDrag: false,
      dragFlag: '', // 拖动开始标记，可能值x(从水平标尺开始拖动),y(从垂直标尺开始拖动)
      horizontalDottedLeft: -999, // 水平虚线位置
      verticalDottedTop: -999, // 垂直虚线位置
      rulerWidth: 0, // 垂直标尺的宽度
      rulerHeight: 0, // 水平标尺的高度
      dragLineId: '', // 被移动线的ID
      keyCode: {
        r: 82
      }, // 快捷键参数
      rulerToggle: true // 标尺辅助线显示开关
    }
  },
  computed: {
    wrapperStyle() {
      return {
        width : this.windowWidth + 'px',
        height : this.windowHeight + 'px',
        position: this.position
      }
    },
    contentStyle() {
      return {
        left: this.contentLayout.left + 'px',
        top: this.contentLayout.top + 'px',
        padding: this.left_top + 'px 0px 0px ' + this.left_top + 'px'
      }
    },
    lineList() {
      const hCount = 0
      const vCount = 0
      return this.presetReferLine.map((item) => {
        const isH = item.type === 'h'
        return {
          id: `${item.type}-${isH ? hCount++ : vCount++}`,
          type: item.type,
          title: item.site.toFixed(2) + 'px',
          [isH ? 'top' : 'left']: item.site / (this.stepLength / 50) + this.size
        }
      })
    }
  },
  watch: {},
  mounted() {},
  methods: {}
}
</script>
<style lang='scss' scoped>
.ruler-tool {
  width: 100%;
  height: 100%;
  &-wrapper {
    left: 0;
    top: 0;
    z-index: 999;
    overflow: hidden;
    user-select: none;
  }
}
</style>
