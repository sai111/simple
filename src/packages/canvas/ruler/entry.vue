<template>
  <div class='ruler-entry'>
    <div class='ruler-entry-tip'>
      ruler组件
    </div>
    <ruler class='ruler-entry-container' />
  </div>
</template>
<script>
import ruler from './index.vue'
export default {
  name: 'rulerEntry',
  components: { ruler },
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
.ruler-entry {
  width: 100%;
  height: 100%;
  .ruler-entry-tip {
    width: 100%;
    height: 40px;
    line-height: 40px;
  }
  .ruler-entry-container {
    width: 100%;
    height: calc(100% - 40px);
  }
}
</style>
