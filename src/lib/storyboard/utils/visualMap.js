import Color from './color'

export default class VisualMap {
  constructor({ visualMap}) {
    this.createMap(visualMap)
  }
  createMap(visualMap) {
    this.map = visualMap.map((stop) => {
      return {
        value: stop.value,
        color: new Color(stop.color)
      }
    })
  }
  filter(value) {
    if (!this.map || this.map.length === 0) return false
    let i
    for (i = 0; i < this.map.length - 1; i ++) {
      if (i === this.map.length - 1 || value < this.map[i].value) {
        if (i === 0) {
          return this.map[i].color.get16String()
        } else {
          return Color.lerp(this.map[i - 1].color, this.map[i].color, (value - this.map[i - 1].value) / (this.map[i].value - this.map[i - 1].value)).get16String()
        }
      }
    }
    return Color.lerp(this.map[i - 1].color, this.map[i].color, (value - this.map[i - 1].value) / (this.map[i].value - this.map[i - 1].value)).get16String()
  }
  initArr() {
    this.map = []
  }
}
