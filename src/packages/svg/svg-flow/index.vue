<template>
  <div class="svg-flow">
    <svg version="1.1" width="400" height="200" xmlns="http://www.w3.org/2000/svg">
      <path d="M 0 100 l 300 0" stroke="#ff7500" stroke-width="8" />
      <path class="inner1" d="M 5 100 l 300 0" stroke="#fff" stroke-width="4" />
      <path d="M 300 92 l 30 8 l -30 8 Z" fill="#ff7500" stroke="#ff7500" />
    </svg>

    <svg version="1.1" width="400" height="200" xmlns="http://www.w3.org/2000/svg">
      <path d="M 0 100 l 150 0 l 0 50 l 150 0" stroke="#ff7500" fill="none" stroke-width="8" />
      <path
        class="inner1"
        d="M 0 100 l 150 0 l 0 50 l 150 0"
        stroke="#fff"
        fill="none"
        stroke-width="4"
      />
      <path d="M 300 142 l 30 8 l -30 8 Z" fill="#ff7500" stroke="#ff7500" />
    </svg>

    <svg version="1.1" width="400" height="200" xmlns="http://www.w3.org/2000/svg">
      <path d="M 0 100 l 300 0" stroke="#ff7500" stroke-width="5" />
      <path class="inner2" d="M 5 100 l 300 0" stroke="#ff7500" stroke-width="10" />
      <path d="M 300 92 l 30 8 l -30 8 Z" fill="#ff7500" stroke="#ff7500" />
    </svg>
  </div>
</template>
<script>
export default {
  name: 'svg-flow',
  props: {},
  data () {
    return {}
  },
  computed: {},
  watch: {},
  mounted () { },
  methods: {}
}
</script>
<style lang="scss" scoped>
body {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.inner1 {
  stroke-dasharray: 20, 10;
  animation: move 1s linear infinite;
}

.inner2 {
  stroke-dasharray: 20, 10;
  animation: move 1s linear infinite;
}

@keyframes move {
  0% {
    stroke-dashoffset: 0;
  }
  100% {
    stroke-dashoffset: -30;
  }
}
.svg-flow {
  width: 100%;
  height: 100%;
}
</style>
