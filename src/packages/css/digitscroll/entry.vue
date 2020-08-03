<template>
    <div class="digitscroll-entry">
        <digitscroll />
    </div>
</template>
<script>
import digitscroll from './index.vue'
export default {
    name: 'digitscrollEntry',
    components: { digitscroll },
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
.digitscroll-entry {
    width: 100%;
    height: 100%
}
</style>