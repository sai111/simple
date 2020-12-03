<template>
  <div ref="container" class="svg-shape">
    <svg
      ref="main"
      class="svg-shape-background"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      preserveAspectRetio="xMidYMid meet"
      :width="width"
      :height="height"
      x="0"
      y="0"
      :viewBox="viewBox"
    >
      12
    </svg>
  </div>
</template>
<script>
import ResizeObserver from 'resize-observer-polyfill'
export default {
  name: 'SvgShape',
  props: {},
  data() {
    return {
      width: 0,
      height: 0
    }
  },
  computed: {
    viewBox() {
      return `0 0 ${this.width} ${this.height}`
    }
  },
  watch: {},
  mounted() {
    this.resizeObserver = new ResizeObserver(this.resize)
    this.resizeObserver.observe(this.$refs.container)
  },
  methods: {
    resize() {
      const { width, height } = this.$refs.container.getBoundingClientRect()
      this.width = width
      this.height = height
    }
  }
}
</script>
<style lang="scss" scoped>
.svg-shape {
  width: 100%;
  height: 100%;
}
</style>
