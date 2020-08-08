<template>
    <div class="arcPath-entry">
       arcPath组件
        <arcPath />
    </div>
</template>
<script>
import arcPath from './index.vue'
export default {
    name: 'arcPathEntry',
    components: { arcPath },
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
.arcPath-entry {
    width: 100%;
    height: 100%;
}
</style>