<template>
  <div class="svg-flow-entry">
    svg-flow组件
    <svg-flow />
  </div>
</template>
<script>
import svgFlow from './index.vue'
export default {
  name: 'svg-flowEntry',
  components: { svgFlow },
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
.svg-flow-entry {
  width: 100%;
  height: 100%;
}
</style>
