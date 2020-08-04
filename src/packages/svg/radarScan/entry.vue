<template>
    <div class="radarScan-entry">
       radarScan组件
        <radarScan />
    </div>
</template>
<script>
import radarScan from './index.vue'
export default {
    name: 'radarScanEntry',
    components: { radarScan },
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
.radarScan-entry {
    width: 100%;
    height: 100%;
}
</style>