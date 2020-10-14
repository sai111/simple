<template>
  <div class='vue-draggable-resizable-entry'>
    <div class='vue-draggable-resizable-entry-tip'>
      vue-draggable-resizable组件
    </div>
    <!-- <vue-draggable-resizable class='vue-draggable-resizable-entry-container' /> -->
  </div>
</template>
<script>
// import vue-draggable-resizable from './index.vue'
export default {
  name: 'vue-draggable-resizableEntry',
  // components: { vue-draggable-resizable },
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
.vue-draggable-resizable-entry {
  width: 100%;
  height: 100%;
  .vue-draggable-resizable-entry-tip {
    width: 100%;
    height: 40px;
    line-height: 40px;
  }
  .vue-draggable-resizable-entry-container {
    width: 100%;
    height: calc(100% - 40px);
  }
}
</style>
