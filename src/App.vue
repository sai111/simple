<template>
  <div id="app">
    <layout></layout>
    <layout-piece></layout-piece>
  </div>
</template> 
<script>
import Layout from '@/views/components/layout.vue'
import LayoutPiece from'@/views/components/layout.vue'
export default {
  name: 'App',
  components: { Layout, LayoutPiece }
}
</script>
<style lang="scss" scoped>
#app {
  width: 100%;
  height: 100%;
}
</style>
