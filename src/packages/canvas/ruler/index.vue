<template>
  <div class='ruler'>
    <canvas
      ref='ruler-canvas'
      class='ruler-canvas'>
      你的浏览器不支持HTML5 Canvas！
      {{ width }}
    </canvas>
  </div>
</template>
<script>
export default {
  name: 'ruler',
  props: {},
  data() {
    return {
      timeScopd: (new Date()).getTime(),
      canvas: null
    }
  },
  computed: {},
  watch: {},
  mounted() {
    this.canvas = this.$refs['ruler-canvas']
  },
  methods: {
    getDomRect(dom) {
      if (dom) {
        return dom.getBoundingClientRect()
      }
    }
  }
}
</script>
<style lang='scss' scoped>
.ruler {
  width: 100%;
  height: 100%;
  .ruler-canvas {
    width: 100%;
    height: 100%;
    border: 1px solid red;
  }
}
</style>
