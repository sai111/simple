<template>
    <div class="progress-entry">
        <progress />
    </div>
</template>
<script>
import progress from './index.vue'
export default {
    name: 'progressEntry',
    components: { progress },
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
.progress-entry {
    width: 100%;
    height: 100%
}
</style>