<template>
  <div id="app">
    <layout></layout>
  </div>
</template> 
<script>
import Layout from '@/views/components/layout.vue'
export default {
  name: 'App',
  components: { Layout }
}
</script>
<style lang="scss" scoped>
#app {
  width: 100%;
  height: 100%;
}
</style>
