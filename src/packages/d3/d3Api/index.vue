<template>
  <div class='d3Api'>
    <component :is='isCom' /> 
  </div>
</template>
<script>
import D3ApiList from './component/api.vue'
export default {
  name: 'D3Api',
  components: { D3ApiList },
  props: {},
  data() {
    return {
      isCom: 'D3ApiList'
    }
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {}
}
</script>
<style lang='scss' scoped>
.d3Api {
  width: 100%;
  height: 100%;
}
</style>
