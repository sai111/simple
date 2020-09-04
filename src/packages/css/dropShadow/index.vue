<template>
    <div class="dropShadow">
        <div class="parent-element">
            <div class="clipped-element"></div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'dropShadow',
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
.dropShadow {
    width: 100%;
    height: 100%;
.parent-element {
  filter: drop-shadow(10rem 0 0 rgba(0, 30, 200, 0.8)) drop-shadow(-10rem 0 0 rgba(0, 30, 200, 0.8)) drop-shadow(20rem 0 0 rgba(0, 30, 200, 0.8)) drop-shadow(-20rem 0 0 rgba(0, 30, 200, 0.8));
  transition: filter 600ms;
}

.parent-element:hover {
  filter: drop-shadow(0 0 0 rgba(0, 30, 200, 0.8));
}

.clipped-element {
  width: 20rem;
  height: 20rem;
  margin: 0 auto;
  background-color: deeppink;
  clip-path: polygon(0 0, 50% 0, 100% 50%, 50% 100%, 0 100%, 50% 50%)
}
}
</style>
