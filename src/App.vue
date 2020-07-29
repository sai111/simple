<template>
  <div id="app">
    <layout v-if="isLayout"></layout>
    <view-piece v-else :piece-obj="pieceCom"></view-piece>
  </div>
</template> 
<script>
import Layout from '@/views/components/layout.vue'
import ViewPiece from'@/views/components/view-piece.vue'
export default {
  name: 'App',
  components: { Layout, ViewPiece },
  data() {
    return {
      isLayout: true,
      pieceCom: null
    }
  },
  watch: {
    '$route'(to, from) {
      if (to.name === 'ViewPiece') {
        this.pieceCom = to.params
      }
      this.isLayout = to.name === 'ViewPiece' ? false: true
    }
  }
}
</script>
<style lang="scss" scoped>
#app {
  width: 100%;
  height: 100%;
}
</style>
