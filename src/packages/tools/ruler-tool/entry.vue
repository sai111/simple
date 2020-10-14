<template>
  <div class='ruler-tool-entry'>
    <ruler-tool class='ruler-tool-entry-container' />
  </div>
</template>
<script>
import RulerTool from './index.vue'
export default {
  name: 'ruler-toolEntry',
  components: { RulerTool },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {}
}
</script>
<style lang='scss' scoped>
.ruler-tool-entry {
  width: 100%;
  height: 100%;
  .ruler-tool-entry-container {
    width: 100%;
    height: 100%;
  }
}
</style>
