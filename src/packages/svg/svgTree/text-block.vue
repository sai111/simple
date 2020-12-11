<template>
  <g class="text-block">
    <text>
      eeeee
    </text>
  </g>
</template>
<script>
export default {
  name: 'TextBlock',
  props: {
    item: {
      type: Object,
      default: () => {}
    },
    index1: {
      type: [Number, String],
      default: 0
    }
  },
  data() {
    return {}
  },
  mounted() {},
  methods: {
    drawOnePath() {
      return ''
    }
  }
}
</script>
