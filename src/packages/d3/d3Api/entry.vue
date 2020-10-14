<template>
  <div class='d3Api-entry'>
    <div class='d3Api-entry-tip'>
      d3Api
    </div>
    <d3-api-book class='d3Api-entry-container' />
  </div>
</template>
<script>
import D3ApiBook from './index.vue'
export default {
  name: 'D3ApiEntry',
  components: { D3ApiBook },
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
.d3Api-entry {
  width: 100%;
  height: 100%;
  .d3Api-entry-tip {
    width: 100%;
    height: 40px;
    line-height: 40px;
  }
  .d3Api-entry-container {
    width: 100%;
    height: calc(100% - 40px);
  }
}
</style>
