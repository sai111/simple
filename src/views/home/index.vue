<template>
<el-container>
  <el-aside width="200px" height="100%">
    <div class="aside-button" style="display: flex; justify-content:center;margin-top:30px;">
      <el-button plain icon="el-icon-plus" @click="addCategory">{{homeLabel}}</el-button>
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
  <el-main style="overflow:auto;height:100%;">
    <piece-list :piece-type="pieceType" :list="childList" @pieceSuccess="pieceSuccess"></piece-list>
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
      childList: [],
      childList1: [
        {
          name: 'css-三角形',
          title: 'triangle',
          desc: '三角形代码整理',
          tag: 'css',
          category_code: 'css'
        },
        {
          name: 'svg-arcPath',
          title: 'arcPath',
          desc: '弧线',
          tag: 'svg,path,linearGradient',
          category_code: 'svg'
        },
        {
          name: 'canvas-wordCloud',
          title: 'wordCloud',
          desc: '字符云可以将文字根据不同的权重布局为大小、颜色各异的图，支持使用图片作为遮罩',
          tag: 'canvas',
          category_code: 'canvas'
        },
        {
          name: 'css-specialBar',
          title: 'specialBar',
          desc: '特殊的柱形图',
          tag: 'svg,bar,linearGradient',
          category_code: 'svg'
        },
        {
          name: 'svg-progress',
          title: 'progress',
          desc: '进度条可以根据设置不同的布局，颜色，支持使用图片,svg作为填充物',
          tag: 'svg',
          category_code: 'svg'
        },
        {
          name: 'css-bubbles',
          title: 'bubbles',
          desc: 'CSS 滤镜实现安卓充电动画效果',
          tag: 'css,animate',
          category_code: 'css'
        },
        {
          name: 'css-scale',
          title: 'scale',
          desc: 'CSS 收缩动画',
          tag: 'css,scale',
          category_code: 'css'
        },
        {
          name: 'svg-scale',
          title: 'radarScan',
          desc: 'radarScan 雷达扫描效果',
          tag: 'svg,rotate',
          category_code: 'svg'
        },
        // {
        //   name: 'css-digitscroll',
        //   title: 'digitscroll',
        //   desc: '数字滚动效果',
        //   tag: 'css,animate',
        //   en: 'css'
        // },
        {
          name: 'svg-polygonRing',
          title: 'polygonRing',
          desc: 'svg环图/多边形环图 环图动态扫描效果',
          tag: 'svg,filter,animate,animateTransfrom',
          category_code: 'svg'
        },
        {
          name: 'svg-filter',
          title: 'filter',
          desc: 'svg滤镜效果',
          tag: 'svg,filter',
          category_code: 'svg'
        }
      ]
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    // 分类：左侧模块接口
    // 集合：右侧模块接口
    categoryClick(item) {
      this.pieceType = item.category_code
      this.getPiece(item.category_code)
    },
    pieceSuccess() {
      this.getPiece(this.pieceType)
    },
    getPiece(item) {
      this.childList = []
      this.$http({
        method: 'get',
        url: '/api/collect/list',
        params: {category_code: item}
      }).then((res) => {
        this.childList = res.data.data
      })
    },
    // 新增
    addCategory() {
      this.isAdd = true
      let addForm = {
        category: '',
        category_desc: '',
        category_code: '',
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
        category: obj.category,
        category_desc: obj.category_desc,
        category_code: obj.category_code,
        tag: obj.tag,
        _id: obj._id
      }
      this.$refs['home-add-dialog'].activateForm(`修改${obj.category_code||'css'}合集`, addForm)
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
          url: '/api/category/delete',
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
        url: '/api/category/list'
      }).then((res) => {
        this.categoryList = res.data.data
        if (res.data.data && res.data.data.length > 0) {
          this.pieceType = res.data.data[0].category_code
          this.getPiece(res.data.data[0].category_code)
        }
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
  .aside-button {
    width: 100%;
    text-align: center;
  }
}
</style>
