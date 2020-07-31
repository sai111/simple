<template>
<div class="md-layout home-piece-list">
  <div class="home-piece-list-block md-layout-item">
    <div class="piece-content" @click="addDialog">
      <div class="piece-content-add">+</div>
    </div>
  </div>
  <div
    v-for="(item, index) in list"
    :key="'piece-li-'+index"
    class="home-piece-list-block"
    @click="openPiece(item, index)">
    <div class="piece-content">
      <div class="piece-content-title">
        {{ item.title }}
      </div>
      <div class="piece-content-des">
        {{ item.desc }}
      </div>
    </div>
  </div>
   <home-add ref="piece-add-dialog" />
</div>
</template>
<script>
import HomeAdd from '@/views/home/components/add.vue' 
export default {
  name: 'PieceList',
  props: {
    list: {
      type: Array,
      default: () => []
    },
    pieceType: {
      type: String,
      default: ''
    }
  },
  components: { HomeAdd },
  data() {
    return {}
  },
  mounted() {},
  methods: {
    addDialog() {
      let addForm = {
        name: '',
        title: '',
        desc: '',
        en: '',
        tag: ''
      }
      this.$refs['piece-add-dialog'].activateForm('创建一个作品', addForm, this.pieceType)
    },
    openPiece(item, index) {
      let obj = {
        pieceType: this.pieceType
      }
      this.$router.replace({name: 'ViewPiece', params: Object.assign({}, obj, item)})
    }
  }
}
</script>
<style lang="scss">
.home-piece-list {
  width: 100%;
  height: 100%;
  display: flex;
  &-block {
    position: relative;
    width: 100%;
    transform-style:preserve-3d;
    perspective:800px;
    margin-right: 15px;
    flex-basis: calc(25% - 15px);
    flex-grow: 0;
    flex-shrink: 25;
    .piece-content {
      width: 250px;
      height: 150px;
      padding: 10px;
      box-sizing: border-box;
      vertical-align: middle;
      background-color: #fff;
      border-radius: 4px;
      border: 1px solid #ebeef5;
      font-size: 18px;
      text-align: left;
      overflow: hidden;
      cursor: pointer;
      backface-visibility: hidden;
      transition: box-shadow 135ms 0ms cubic-bezier(0.4, 0, 0.2, 1);
      .piece-content-add {
        width: 100%;
        height: 100%;
        font-size: 30px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .piece-content-title {
        width: 100%;
        height: 60%;
        font-size: 20px;
        line-height: 30px;
        text-align: center;
      }
      .piece-content-des {
        width: 100%;
        font-size: 14px;
        line-height: 20px;
        text-indent: 6px;
      }
      &:hover {
        box-shadow: 0px 4px 5px 0 rgba(0,0,0,.4);
        .piece-content-title {
          animation: fadeInDownBig 0.6s ease;
          opacity: 0;
          transform: translate3d(0, -2000px, 0);
          animation-fill-mode: forwards;
        }
        .piece-content-des {
          animation: fadeInUpBig 0.6s ease;
          opacity: 0;
          -webkit-transform: translate3d(0, 2000px, 0);
          transform: translate3d(0, 2000px, 0);
          animation-fill-mode: forwards;
        }
      }
    }
  }
}
</style>
