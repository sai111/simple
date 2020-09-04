<template>
    <div class="dropShadow-entry">
       dropShadow组件
        <dropShadow />
    </div>
</template>
<script>
import dropShadow from './index.vue'
export default {
    name: 'dropShadowEntry',
    components: { dropShadow },
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
.dropShadow-entry {
    width: 100%;
    height: 100%;
}
</style>