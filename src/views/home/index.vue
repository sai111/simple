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
export default {
  name: 'Home',
  components: { HomeAdd, listItem, PieceList },
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
          tag: 'css'
        }
      ]
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    categoryClick(item) {
      this.pieceType = item.title
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
      // todo:删除提示
      this.$http({
        method: 'POST',
        url: '/api/collect/delete',
        data: {_id: obj._id}
      }).then((res) => {
        console.log(res)
        this.getList()
      })
    },
    getList() {
      this.$http({
        method: 'get',
        url: '/api/collect/list'
      }).then((res) => {
        this.categoryList = res.data.data
        this.pieceType = res.data.data[0].title || res.data.data[0].name
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
