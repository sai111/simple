<template>
  <div class="svg-shape-entry">
    svg-shape组件
    <svg-shape />
  </div>
</template>
<script>
import SvgShape from './index.vue'
export default {
  name: 'SvgShapeEntry',
  components: { SvgShape },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {}
}
</script>
<style lang="scss" scoped>
.svg-shape-entry {
  width: 100%;
  height: 100%;
}
</style>
