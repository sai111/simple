<template>
  <div class="css-base-animate-entry">
    css-base-animate组件
    <css-base-animate />
  </div>
</template>
<script>
import CssBaseAnimate from './index.vue'
export default {
  name: 'css-base-animateEntry',
  components: { CssBaseAnimate },
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
.css-base-animate-entry {
  width: 100%;
  height: 100%;
}
</style>
