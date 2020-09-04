<template>
    <div class="question-entry">
       question组件
        <question />
    </div>
</template>
<script>
import question from './index.vue'
export default {
    name: 'questionEntry',
    components: { question },
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
.question-entry {
    width: 100%;
    height: 100%;
}
</style>