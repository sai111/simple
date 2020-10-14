/**
 * 解绑事件 on(element, event, handler)
 */
 export const on = (function () {
  if (document.addEventListener) {
    return function (element, event, handler) {
      if (element && event && handler) {
        element.addEventListener(event, handler, false)
      }
    }
  } else {
    return function (element, event, handler) {
      if (element && event && handler) {
        element.attachEvent('on' + event, handler)
      }
    }
  }
 })()


 /**
  * 解绑事件 off(element, event, handler)
  */
  export const off = (function () {
    if (document.removeEventListener) {
      return function (element, event, handler) {
        if (element && event && handler) {
          element.removeEventListener(event, handler, false)
        }
      }
    } else {
      return function (element, event, handler) {
        if (element && event && handler) {
          element.detachEvent('on' + event, handler)
        }
      }
    }
  })()

 // 自执行函数  链接：https://www.jianshu.com/p/c64bfbcd34c3
