<template>
  <g class="path-link">
    <path :d="drawOnePath(index1, distance)" stroke="red" fill="none" />
    <path :d="drawTwoPath(item, index1, distance)" stroke="red" fill="none" />
  </g>
</template>
<script>
export default {
  name: 'PathLink',
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
    }
  },
  data() {
    return {}
  },
  mounted() {},
  methods: {
    drawOnePath(index1, distance) {
      if (index1 === 0) {
        return `M0,0 L0,-${distance}`
      } else if (index1 === 1 || index1 === 2) {
        return `M0,0 L${distance},0`
      } else {
        return `M0,0 L-${distance},0`
      }
    },
    drawTwoPath(item, index1) {
      const boxWidth = item.childLength * 100
      const boxHeight = item.childLength * 50
      // const top = item.childLength > 1 ? 50 : 0
      const top = 0
      const gap = 100
      const arrowLen = 20
      if (index1 === 0) {
        return `M${-boxWidth / 2}, ${-gap-arrowLen}
          L${-boxWidth / 2}, ${-gap}
          L${boxWidth / 2},${-gap}
          L${boxWidth / 2},${-gap-arrowLen}
        `
      } else if (index1 === 1) {
        return `M${gap + arrowLen},${-boxHeight / 2 - top}
          L${gap},${-boxHeight / 2 - top}
          L${gap},${boxHeight / 2 - top}
          L${gap + arrowLen},${boxHeight / 2 - top}
        `
      } else if (index1 === 2) {
        return `M${gap + arrowLen},${-boxHeight / 2}
          L${gap},${-boxHeight / 2}
          L${gap},${boxHeight / 2}
          L${gap + arrowLen},${boxHeight / 2}
        `
      } else if (index1 === 3) {
        return `M${-gap - arrowLen},${-boxHeight / 2}
          L${-gap},${-boxHeight / 2}
          L${-gap},${boxHeight / 2}
          L${-gap - arrowLen},${boxHeight / 2}
        `
      }else {
        return `M${-gap - arrowLen},${-boxHeight / 2 - top}
          L${-gap},${-boxHeight / 2 - top}
          L${-gap},${boxHeight / 2 - top}
          L${-gap - arrowLen},${boxHeight / 2 - top}
        `
      }
    }
  }
}
</script>
