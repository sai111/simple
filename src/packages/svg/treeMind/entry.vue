<template>
  <div class="treeMind-entry">
    treeMind组件
    <treeMind />
  </div>
</template>
<script>
import treeMind from './index.vue'
export default {
  name: 'treeMindEntry',
  components: { treeMind },
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
.treeMind-entry {
  width: 100%;
  height: 100%;
}
</style>