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
      <list-item
        v-for="(item, index) in categoryList"
        :key="'category-li-'+index"
        :item="item"
        @cateDelete="deleteCate"
        @cateEdit="editCate"
        @categoryClick="categoryClick"
      ></list-item>
    </md-list>
    <home-add ref="home-add-dialog" :is-add="isAdd" @cateAddSuccess="addSuccess" />
    <dialog-confirm ref="delConfirm" @confirmClick="confirmClick"></dialog-confirm>
  </md-app-drawer>
  <md-app-content>
    <piece-list :piece-type="pieceType" :list="childList"></piece-list>
  </md-app-content>
</md-app>
</template>
<script>
import HomeAdd from '@/views/home/components/add.vue' 
import listItem from '@/views/home/components/list-item.vue'
import PieceList from '@/views/home/components/piece-list.vue'
import DialogConfirm from '@/views/home/components/confirm.vue'
export default {
  name: 'Home',
  components: { HomeAdd, listItem, PieceList, DialogConfirm },
  data() {
    return {
      homeLabel: '分类',
      pieceType: '',
      isAdd: false,
      categoryList: [],
      childList: [
        {
          name: 'css-三角形',
          title: 'triangle',
          desc: '三角形代码整理',
          tag: 'css',
          type: 'css'
        },
        {
          name: 'canvas-wordCloud',
          title: 'wordCloud',
          desc: '字符云可以将文字根据不同的权重布局为大小、颜色各异的图，支持使用图片作为遮罩',
          tag: 'canvas',
          type: 'canvas'
        }
      ]
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    categoryClick(item) {
      this.pieceType = item.type
    },
    // 删除确认提醒
    confirmClick(flag = false, obj = {}) {
      if (flag) {
        this.$http({
          method: 'POST',
          url: '/api/collect/delete',
          data: {_id: obj._id}
        }).then(() => {
          this.getList()
          this.$refs.delConfirm.closeDialog()
        })
      }
    },
    // 新增
    addCategory() {
      this.isAdd = true
      let addForm = {
        name: '',
        desc: '',
        title: '',
        tag: ''
      }
      this.$refs['home-add-dialog'].activateForm('创建一个合集', addForm)
    },
    addSuccess() {
      this.getList()
    },
    editCate(obj) {
      this.isAdd = false
      let addForm = {
        name: obj.name,
        desc: obj.desc,
        title: obj.title,
        tag: obj.tag
      }
      this.$refs['home-add-dialog'].activateForm(`修改${obj.title}合集`, addForm)
    },
    deleteCate(obj) {
      let confirm = {
        title: '删除提醒',
        content: '是否删除该合集？',
        confirmText: '确认',
        cancelText: '取消'
      }
      confirm.form = obj
      this.$refs.delConfirm.openConfirm(confirm)
    },
    getList() {
      this.$http({
        method: 'get',
        url: '/api/collect/list'
      }).then((res) => {
        this.categoryList = res.data.data
        this.pieceType = res.data.data[0].type || res.data.data[0].type
      })
    }
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
