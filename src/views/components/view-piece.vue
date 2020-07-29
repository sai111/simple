<template>
<div
  ref="piece-main"
  class="piece"
>
  <div class="piece-tool">
    <md-button
      v-for="(button, bIndex) in buttons"
      :key="'piece-tool-'+bIndex"
      :title="button.name"
      class="md-icon-button"
      @click="operateClick(button)"
    >
      <md-icon :title="button.name">{{ button.icon }}</md-icon>
    </md-button>
  </div>
  <!-- 主体 -->
  <div class="piece-wrap" ref="piece-comp">
    <component :is="temp" /> 
  </div>
  <!-- 展示截图内容 -->
  <md-dialog
    class="view-piece-dialog"
    :md-active.sync="pieceDialog"
    :md-click-outside-to-close="false"
  >
    <md-dialog-title>{{pieceTip}}</md-dialog-title>
    <md-card-content>
      <img :src="screenScr" alt="" style="width:800px;height:400px;display:inline-block;">
    </md-card-content>
    <md-dialog-actions style="width:100%;display:flex;">
      <md-button class="md-raised" @click="closeDialog()">关闭</md-button>
      <md-button class="md-raised" @click="saveScreen()">保存</md-button>
    </md-dialog-actions>
  </md-dialog>
</div>
</template>
<script>
// 第三方
import html2canvas from 'html2canvas'
import domtoimage from 'dom-to-image'
export default {
  name: 'ViewPiece',
  props: {
    pieceObj: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      buttons: [
        {code: 'screenshot', icon: 'photo_camera', name: '截图'},
        {code: 'config', icon: 'build', name: '配置'},
        {code: 'markdown', icon: 'library_books', name: '文档'},
        {code: 'close', icon: 'close', name: '关闭'}
      ],
      screenScr: null,
      pieceDialog: false,
      pieceTip: ''
    }
  },
  computed: {
    temp() {
      this.pieceTip = this.pieceObj.title + '组件截图'
      let comp = () => import(`@/packages/${this.pieceObj.pieceType}/${this.pieceObj.title}/entry.vue`)
      return comp
    }
  },
  mounted() {},
  methods: {
    // 工具操作
    operateClick(item) {
      switch (item.code) {
        case 'screenshot':
          this.screenShot(item)
          break;
        case 'config':
          this.formatConfig(item)
          break;
        case 'markdown':
          this.openMarkdown(item)
          break;
        case 'close':
          this.closePiece(item)
          break;
      }
    },
    screenShot() {
      let screenEle = this.$refs['piece-comp']
      this.pieceDialog = true
      // 优先使用domtoimage截图
      domtoimage.toPng(screenEle).then((res) => {
        this.screenScr = res
      }).catch(() => {
        // domtoimage截图失败使用html2canvas
        html2canvas(screenEle, {
          foreignObjectRendering: false,
          logging: false,
          allowTaint: false,
          imageTimeout: 5000,
          useCORS: true,
          width: screenEle.getBoundingClientRect().width,
          height: screenEle.getBoundingClientRect().height,
          scale: window.devicePixelRatio || 1
        }).then((res) => {
          this.screenScr = res.toDataURL('image/png')
        })
      })
    },
    formatConfig() {},
    openMarkdown() {},
    closePiece() {
      this.$router.replace('/')
    },
    saveScreen() {},
    closeDialog() {
      this.pieceDialog = false
    }
  }
}
</script>
<style lang="scss" scoped>
.piece {
  width: 100%;
  height: 100%;
  overflow: hidden;
  color: #000;
  transition: all 1s;
  position: relative;
  &-tool {
    position: absolute;
    top: 0;
    right: 0;
  }
  &-wrap {
    width: 100%;
    height: 100%;
  }
}
</style>
