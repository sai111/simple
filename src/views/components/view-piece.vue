<template>
<div
  ref="piece-main"
  class="piece">
  <div class="piece-tool">
    <div
      v-for="(button, bIndex) in buttons"
      :key="'piece-tool-'+bIndex"
      :title="button.name"
      class="piece-tool-icon"
      @click="operateClick(button)">
      <i :title="button.name" :class="button.icon" />
    </div>
  </div>
  <!-- 主体 -->
  <div class="piece-wrap" ref="piece-comp">
    <component :is="temp" /> 
  </div>
  <!-- 展示截图内容 -->
  <el-dialog
    class="view-piece-dialog"
    width="500px"
    :title="pieceTip"
    :visible.sync="pieceDialog"
    :close-on-click-modal="false">
    <img :src="screenScr" alt="" style="height:300px;width:100%;">
    <div style="width:100%;display:flex;justify-content:flex-end;">
      <el-button class="md-raised" @click="closeDialog()">关闭</el-button>
      <el-button class="md-raised" @click="saveScreen()">保存</el-button>
    </div>
  </el-dialog>
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
        {code: 'screenshot', icon: 'el-icon-camera', name: '截图'},
        {code: 'config', icon: 'el-icon-setting', name: '配置'},
        {code: 'markdown', icon: 'el-icon-document', name: '文档'},
        {code: 'close', icon: 'el-icon-close', name: '关闭'}
      ],
      screenScr: null,
      pieceDialog: false,
      pieceTip: ''
    }
  },
  computed: {
    temp() {
      this.pieceTip = this.pieceObj.title + '组件截图'
      let comp = () => import(`@/packages/${this.pieceObj.en}/${this.pieceObj.title}/entry.vue`)
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
    display: flex;
    &-icon {
      font-size: 24px;
      padding-right: 5px;
      cursor: pointer;
    }
  }
  &-wrap {
    width: 100%;
    height: 100%;
  }
}
</style>
