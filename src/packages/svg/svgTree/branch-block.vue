<template>
  <g class="branch-block">
    <path-link
      distance="100"
      :item="item"
      :index1="index1"
    />
    <g
      class="branch-block-wrap"
      :transform="transformDistance(item, index1)"
    >
      <rect
        x="0"
        y="0"
        :width="index1>0?200:item.childLength * 100"
        :height="index1>0?item.childLength*50:50"
        fill="none"
        stroke="#00cc00"
      />
    </g>
  </g>
</template>
<script>
import PathLink from './path-block.vue'
export default {
  name: 'BranchBlock',
  components: { PathLink },
  props: {
    distance: {
      type: [Number, String],
      default: 100
    },
    item: {
      type: Object,
      default: () => {}
    },
    index1: {
      type: [Number, String],
      default: 0
    },
    index2: {
      type: [Number, String],
      default: 0
    }
  },
  data() {
    return {}
  },
  mounted() {},
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
    transformDistance(item, index1) {
      let result = 0
      // const top = item.childLength > 0 ? 25 : 0
      if (index1 === 0) {
        result = `translate(-${item.childLength * 100 / 2}, -200)`
      } else if (index1 === 1 || index1 === 2) {
        result = `translate(150, -${item.childLength * 50 / 2})`
      } else if(index1 === 3 || index1 === 4){
        result = `translate(-350, -${item.childLength * 50 / 2})`
      }
      return result
    }
  }
}
</script>
