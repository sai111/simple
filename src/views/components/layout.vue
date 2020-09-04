<template>
<div class="layout">
  <!-- 导航 -->
  <el-container class="app-nav">
    <el-header color="primary">
      <div class="layout-nav">追影</div>
      <div class="layout-list">
        <div
          class="layout-list-li"
          v-for="(item, index) in routers"
          v-show="item.show"
          :key="'md-button-router-'+index">
          <router-link :to="item.path">
            {{item.meta.title}}
          </router-link>
        </div>
      </div>
    </el-header>
    <el-container style="height:calc(100% - 60px)">
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </el-container>
  </el-container>
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
  .app-nav {
    width: 100%;
    height: 100%;
  }
  .el-header {
    width: 100%;
    line-height: 60px;
    height: 60px;
    box-shadow: 0px 4px 5px 0 rgba(0,0,0,.4);
    display: flex;
    .layout-nav {
      width: 240px;
      height: 100%;
    }
    .layout-list {
      flex: 1 1 1%;
      display: flex;
      justify-content: flex-end;
      &-li {
        margin-right: 15px;
        a {
          text-decoration: none;
        }
      }
    }
  }
}
</style>
