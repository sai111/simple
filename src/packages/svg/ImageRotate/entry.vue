<template>
    <div class="ImageRotate-entry gridLines">
       ImageRotate组件
        <ImageRotate v-bing="config" />
    </div>
</template>
<script>
import ImageRotate from './index.vue'
export default {
    name: 'ImageRotateEntry',
    components: { ImageRotate },
    data() {
        return {
            config: {
                width: 200,
                height: 200,
                backColor: 'gray',
                background: '#000',
                lightColor: '#bad424',
                num: 30,
                rect: {
                    x: 20,
                    y: 10,
                    rx: 0,
                    ry: 0
                }
            }
        }
    },
    computed: {},
    watch: {},
    mounted() {},
    methods: {}
}
</script>
<style lang="scss" scoped>
.ImageRotate-entry {
    width: 100%;
    height: 100%;
}
</style>
