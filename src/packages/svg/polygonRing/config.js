/** polygonRing配置项 */
export const polygonConfig = {
  width: {
    type: [String, Number],
    default: 500
  },
  height: {
      type: [String, Number],
      default: 500
  },
  outRadius: {
      type: [String, Number],
      default: 200
  },
  innerRadius: {
      type: [String, Number],
      default: 60
  },
  value: {
      type: [String, Number],
      default: 0
  },
  sum: {
      type: [String, Number],
      default: 100
  },
  startAngle: {
      type: Number,
      default: 0
  },
  lightShow: {
      type: Boolean,
      default: false
  },
  lightAngle: {
      type: Number,
      default: 14
  },
  // 格式符号：目前支持【percent, divide, value】
  valueFormat: {
      type: String,
      default: 'percent'
  },
  // 超过3的为正N边形，0为圆
  sideNum: {
      type: [String, Number],
      default: 0
  },
  // 颜色
  visualMap: {
      type: Array,
      default: () => []
  },
  name: {
      type: String,
      default: ''
  },
  // 扫描配置；时间（单位：s）
  lightConfig: {
      type: [Object, Array],
      default: {
          duration: 9,
          delay: 0
      }
  }
}
