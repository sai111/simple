<template>
<md-app>
  <md-app-drawer class="navigator" md-permanent="full" style="width:240px">
    <md-toolbar class="md-transparent" md-elevation="0">
      <span class="home-left-label">{{homeLabel}}</span>
      <md-button class="md-icon-button" @click="addCategory">
        <md-icon>add</md-icon>
      </md-button>
    </md-toolbar>
    <md-list>
      <list-item></list-item>
    </md-list>
    <home-add ref="home-add-dialog" />
  </md-app-drawer>
</md-app>
</template>
<script>
import HomeAdd from '@/views/home/components/add.vue' 
import listItem from '@/views/home/components/list-item.vue'
export default {
  name: 'Home',
  components: { HomeAdd, listItem },
  data() {
    return {
      homeLabel: '分类',
      showDialog: false,
      add_category: {
        title: '创建一个合集',
        form: {}
      }
    }
  },
  mounted() {},
  methods: {
    // 新增
    addCategory() {
      console.log('弹窗')
      let addForm = {
        name: '',
        title: '',
        desc: '',
        en: '',
        tag: ''
      }
      this.$refs['home-add-dialog'].activateForm('创建一个合集', addForm)
    },
    editCategory() {}
  }
}
</script>
<style lang="scss" scoped>
.md-app {
  width: 100%;
  height: 100%;
  .md-drawer {
    height: 100%;
    width: 240px;
  }
  .md-app-container {
    height: 100%;
  }
}
</style>
