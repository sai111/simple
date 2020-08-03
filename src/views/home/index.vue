<template>
<el-container>
  <el-aside width="200px">
    <div class="aside-button">
      <span class="home-left-label">{{homeLabel}}</span>
      <i class="el-icon-circle-plus"  @click="addCategory" />
    </div>
    <div class="aside-list">
      <list-item
        v-for="(item, index) in categoryList"
        :key="'category-li-'+index"
        :item="item"
        @cateDelete="deleteCate"
        @cateEdit="editCate"
        @categoryClick="categoryClick"
      ></list-item>
    </div>
  </el-aside>
  <el-main>
    <piece-list :piece-type="pieceType" :list="childList"></piece-list>
  </el-main>
  <home-add ref="home-add-dialog" :is-add="isAdd" @cateAddSuccess="addSuccess" />
</el-container>
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
          tag: 'css',
          type: 'css'
        },
        {
          name: 'canvas-wordCloud',
          title: 'wordCloud',
          desc: '字符云可以将文字根据不同的权重布局为大小、颜色各异的图，支持使用图片作为遮罩',
          tag: 'canvas',
          type: 'canvas'
        },
        {
          name: 'css-specialBar',
          title: 'specialBar',
          desc: '特殊的柱形图',
          tag: 'svg,bar,linearGradient',
          type: 'svg'
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
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({message: '删除成功', type: 'success'})
        this.$http({
          method: 'POST',
          url: '/api/collect/delete',
          data: {_id: obj._id}
        }).then(() => {
          this.getList()
        })
      }).catch(() => {
        this.$message('已取消删除')
      })
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
