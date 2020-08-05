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
      // childList: [],
      childList: [
        {
          name: 'css-三角形',
          title: 'triangle',
          desc: '三角形代码整理',
          tag: 'css',
          en: 'css'
        },
        {
          name: 'canvas-wordCloud',
          title: 'wordCloud',
          desc: '字符云可以将文字根据不同的权重布局为大小、颜色各异的图，支持使用图片作为遮罩',
          tag: 'canvas',
          en: 'canvas'
        },
        {
          name: 'css-specialBar',
          title: 'specialBar',
          desc: '特殊的柱形图',
          tag: 'svg,bar,linearGradient',
          en: 'svg'
        },
        {
          name: 'svg-progress',
          title: 'progress',
          desc: '进度条可以根据设置不同的布局，颜色，支持使用图片,svg作为填充物',
          tag: 'svg',
          en: 'svg'
        },
        {
          name: 'css-bubbles',
          title: 'bubbles',
          desc: 'CSS 滤镜实现安卓充电动画效果',
          tag: 'css,animate',
          en: 'css'
        },
        {
          name: 'css-scale',
          title: 'scale',
          desc: 'CSS 收缩动画',
          tag: 'css,scale',
          en: 'css'
        },
        {
          name: 'svg-scale',
          title: 'radarScan',
          desc: 'radarScan 雷达扫描效果',
          tag: 'svg,rotate',
          en: 'svg'
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
          en: 'svg'
        },
        {
          name: 'svg-filter',
          title: 'filter',
          desc: 'svg滤镜效果',
          tag: 'svg,filter',
          en: 'svg'
        }
      ]
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    categoryClick(item) {
      this.pieceType = item.en
      // this.$http({
      //   method: 'get',
      //   url: '/api/collect/list',
      //   params: {en: item.en}
      // }).then((res) => {
      //   console.log(res, 'piece----type')
      // })
    },
    // 新增
    addCategory() {
      this.isAdd = true
      let addForm = {
        name: '',
        desc: '',
        en: '',
        tag: ''
      }
      this.$refs['home-add-dialog'].activateForm('创建一个合集', addForm)
    },
    addSuccess() {
      this.getList()
    },
    editCate(obj) {
      console.log(obj, 'onj===修改')
      this.isAdd = false
      let addForm = {
        name: obj.name,
        desc: obj.desc,
        en: obj.en,
        tag: obj.tag,
        _id: obj._id
      }
      this.$refs['home-add-dialog'].activateForm(`修改${obj.en}合集`, addForm)
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
        this.pieceType = res.data.data[0].en
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
