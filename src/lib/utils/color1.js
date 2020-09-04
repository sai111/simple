// https://blog.csdn.net/weixin_33724046/article/details/88986918
export const colorTest = function (color) {
  let hexReg = /^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/
  let rgbReg = /^(rgb|RGB)/
  let hslReg = /^hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)$/g
  let result
  if (hexReg.test(color) && !rgbReg.test(color) && !hslReg.test(color)) {
      result = 'hex'
  } else if (!hexReg.test(color) && rgbReg.test(color) && !hslReg.test(color)) {
      result = 'rgb'
  } else if (!hexReg.test(color) && !rgbReg.test(color) && hslReg.test(color)) {
      result = 'hsl'
  }
  return result
}
export const  hslToRgb = function (h, s, l) {
  var r, g, b
  if(s == 0) {
      r = g = b = l // achromatic
  } else {
      var hue2rgb = function hue2rgb(p, q, t) {
          if(t < 0) t += 1
          if(t > 1) t -= 1
          if(t < 1/6) return p + (q - p) * 6 * t
          if(t < 1/2) return q
          if(t < 2/3) return p + (q - p) * (2/3 - t) * 6
          return p
      }

      var q = l < 0.5 ? l * (1 + s) : l + s - l * s
      var p = 2 * l - q
      r = hue2rgb(p, q, h + 1/3)
      g = hue2rgb(p, q, h)
      b = hue2rgb(p, q, h - 1/3)
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}
export const  colorRgb = function (color) {
  let sColor = color.toLowerCase()
  // 十六进制颜色值的正则表达式
  var reg = /^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/
  if (sColor && reg.test(sColor)) {
      if (sColor.length === 4) {
          let sColorNew = '#'
          for (let i = 0; i < 4; i+=1) {
              sColorNew +=  sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1))
          }
          sColor = sColorNew
      }
      // 处理六位颜色值
      let sColorChange = []
      for (let i = 1; i < 7; i+=2) {
          sColorChange.push(parseInt('0x' + sColor.slice(i, i + 2)))
      }
      return sColorChange
  } else {
      return []
  }
}
// 计算渐变过渡色
export const  gradient = function (start, end, step) {
  let sColor = this.colorRgb(start)
  let eColor = this.colorRgb(end)
 
  // 计算R\G\B每一步的差值
  let rStep = (eColor[0] - sColor[0]) / step
  let gStep = (eColor[1] - sColor[1]) / step
  let bStep = (eColor[2] - sColor[2]) / step

  let gradientcolorArr = []
  for (let i = 0; i < step; i++) {
      // 计算每一步的hex值
      gradientcolorArr.push(
          this.rgbtoHex(parseInt(rStep * i + sColor[0]), parseInt(gStep * i + sColor[1]), parseInt(bStep * i + sColor[2]))
      )
  }
  return gradientcolorArr
}
