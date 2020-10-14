import Canvax from 'canvax'
import dataFrame from './core/dataFrame.js'

let { _ , $ , event } = Canvax
const globalTheme = ['#ff8533','#73ace6','#82d982','#e673ac','#cd6bed','#8282d9','#c0e650']
const _padding = 20

class Chart extends event.Dispatcher {
  constructor(node, data, opt, componentModules) {
    super()
    this._node = node
    this._data = data
    this._opt = opt
    this.componentModules = componentModules

    this.dataFrame = this.initData(data, opt)
    this.el = $.query(node) // chart 在页面里面的容器节点，也就是要把这个chart放在哪个节点里
    this.width = parseInt(this.el.offsetWidth) // 图表区域宽
    this.height = parseInt(this.el.offsetHeight) // 图表区域高
    this.canvax = new Canvax.App({
      el: this.el,
      webGL: false
    })
    this.canvax.registEvent()
    this.id = 'chartx_' + this.canvax.id
    this.el.setAttribute('chart_id', this.id)
    console.log(this.canvax, 111111)
    // 设置stage-------------start
    this.stage = new Canvax.Display.Stage({
      id: 'main-chart-stage'
    })
    this.canvax.addChild(this.stage)
    // state----------------end
    // 构建好coord和graphs的根容器
    this.setCoord_Graphs_Sp()
    // 这三类组件是优先级最高的组件，所有的组件的模块化和绘制，都要一次在这三个完成后实现
    this._highMoudules = ['theme', 'coord', 'graphs']
    this.inited = false
    this.init()
  }
  init() {
    let me = this
    const opt = this._opt
    // 先依次init 处理 "theme", "coord", "graphs" 三个优先级最高的模块
    _.each(this._highMoudules, function(compName) {
      if(!opt[compName]) return
      const comps = _.flatten([opt[compName]])
      if (compName === 'theme') {
        comps = [comps]
      }
      _.each(comps, function(comp) {
        if (
          (compName === 'coord' && !comp.type) ||
          (compName === 'graphs' && !comp.field && !comp.keyField && !comp.adcode && !comp.geoJson && !comp.geoJsonUrl)
        ) return
        const compModule = me.componentModules.get(compName, comp.type)
        if (compModule) {
          const _comp = new compModule(comp, me)
          me.components.push(_comp)
        }
      })
    })
    for (const _p in this._opt) {
      // 非coord graphs theme
      if (_.indexOf(this._highMoudules, _p) === -1) {
        const comps = this._opt[_p]
        if (!_.isArray(comps)) {
          comps = [comps]
        }
        _.each(comps, function(comp) {
          const compModule = me.componentModules.get(_p, comp.type)
          if (compModule) {
            const _comp = new compModule(comp, me)
            me.components.push(_comp)
          }
        })
      }
    }
  }
  draw(opt) {
    
  }
  initData() {
    return dataFrame.apply(this, arguments)
  }
  setCoord_Graphs_Sp() {
    // 坐标系存放的容器
    this.coordSprite = new Canvax.Display.Sprite({
      id: 'coordSprite'
    })
    this.stage.addChild(this.coordSprite)
    // graphs管理
    this.graphsSprite = new Canvax.Display.Sprite({
      id: 'graphsSprite'
    })
    this.stage.addChild(this.graphsSprite)
  }
}

export default Chart
