<template>
<md-app>
  <md-app-drawer class="navigator" md-permanent="full">
    <md-toolbar class="md-transparent" md-elevation="0">
      <span class="home-left-label">{{homeLabel}}</span>
      <md-button class="md-icon-button" @click="addCategory">
        <md-icon>add</md-icon>
      </md-button>
    </md-toolbar>
    <md-list>

    </md-list>
    <home-add ref="home-add-dialog" />
  </md-app-drawer>
</md-app>
</template>
<script>
import HomeAdd from '@/views/home/components/add.vue' 
export default {
  name: 'Home',
  components: { HomeAdd },
  data() {
    return {
      homeLabel: '分类',
      showDialog: false,
      add_category: {
        title: '创建一个合集'
      }
    }
  },
  mounted() {},
  methods: {
    // 新增
    addCategory() {
      console.log('弹窗')
      this.$refs['home-add-dialog'].openDialog()
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
