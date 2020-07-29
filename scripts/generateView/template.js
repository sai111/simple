// template.js
module.exports = {
    vueTemplate: compoenntName => {
        return `<template>
    <div class="${compoenntName}">${compoenntName}组件</div>
</template>
<script>
export default {
name: '${compoenntName}',
props: {},
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
.${compoenntName} {}
</style>`
    },
    entryTemplate: compoenntName => {
        return `<template>
    <div class="${compoenntName}-entry">
        <${compoenntName} />
    </div>
</template>
<script>
import ${compoenntName} from './index.vue'
export default {
name: '${compoenntName}Entry',
components: { ${compoenntName} },
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
.${compoenntName}-entry {}
</style>`
    },
    configTemplate: compoenntName => {
        return `/** ${compoenntName}配置项 */`
    },
    docTemplate: compoenntName => {
        return `<!-- ${compoenntName}文档 -->`
    }
}


