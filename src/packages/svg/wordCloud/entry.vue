<template>
    <div class="wordCloud-entry">
        <wordCloud />
    </div>
</template>
<script>
import wordCloud from './index.vue'
export default {
    name: 'wordCloudEntry',
    components: { wordCloud },
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
.wordCloud-entry {}
</style>
