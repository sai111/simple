<template>
<div class="home">
  <div class="home-left">
    <span class="home-left-label">{{homeLabel}}</span>
    <md-button class="md-icon-button" @click="addDialog">
      <md-icon>add</md-icon>
    </md-button>
  </div>
  <div class="home-right"></div>
</div>
</template>
<script>
export default {
  name: 'Home',
  data() {
    return {
      homeLabel: '分类',
      homeOperate: 'dialog'
    }
  },
  mounted() {},
  methods: {
    addDialog() {
      console.log('弹窗')
    }
  }
}
</script>
<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
  display: flex;
  &-left {
    width: 100px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &-right {
    flex: 1 1 1%;
    height: 100%;
  }
}
</style>
