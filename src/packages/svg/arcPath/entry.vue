<template>
    <div class="arcPath-entry">
       arcPath组件
        <arcPath :svg-ready="svgReady" />
    </div>
</template>
<script>
import arcPath from './index.vue'
export default {
    name: 'arcPathEntry',
    components: { arcPath },
    data() {
        return {
            svgReady: false,
            arcConfig: {
                width: 1290,
                height: 1000
            }
        }
    },
    computed: {},
    watch: {},
    mounted() {
        this.svgReady = true
    },
    methods: {}
}
</script>
<style lang="scss" scoped>
.arcPath-entry {
    width: 100%;
    height: 100%;
}
</style>
