<template>
<div class="layout">
  <!-- 导航 -->
  <section class="app-nav">
    <md-toolbar color="primary">
      <h3 class="md-title" style="flex:1 1 1%">Default</h3>
      <md-button
        class="md-raised"
        v-for="(item, index) in routers"
        v-show="item.show"
        :key="'md-button-router-'+index">
        <router-link :to="item.path">
          {{item.meta.title}}
        </router-link>
      </md-button>
    </md-toolbar>
  </section>
  <!-- 页面 -->
  <section class="app-main">
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>  
  </section>
</div>
</template>
<script>
export default {
  name: 'Layout',
  data() {
    return {
      routers: this.$router.options.routes
    }
  },
  mounted() {},
  methods: {}
}
</script>
<style lang="scss" scoped>
.layout {
  width: 100%;
  height: 100%;
  section.app-nav {
    width: 100%;
    height: 64px;
  }
  section.app-main {
    width: 100%;
    height: calc(100% - 64px);
  }
}
</style>
