export default function (Vue) {
  let io = null
  Vue.directive('animateHandle', {
    inserted(el, binding) {
      let {
        type,
        col = 1,
        transition = {},
        transfrom = {},
        addDlay = 0.1,
        enterCls = 'animate_slideY_enter',
        leaveCLs ='animate_slideUpY_leave'
      } = binding.value || {}
      const children = type === 'list' ? Array.from(el.children) : []
      const root = binding.root || null
      const threshold = binding.threshold || [0.1, 0.5, 0.9]
      const callback = binding.callback || observableHandle
      io = new IntersectionObserver(callback, { root, threshold })
      io.observe(el)
      // 列表展示
      if (type === 'list') {
        enterCls = 'animate_slideUpY_list_enter'
        leaveCLs = 'animate_slideUpY_list_leave'
        handleListTransitionStyle(children)
        // 当vue子元素为v-for，需要监听子元素变化
        const observe = new MutationEvent(() => {
          handleListTransitionStyle(Array.from(el.children))
        })
        observe.observe(el, { childList: true })
      } else {
        el.classList.add(leaveCLs)
        handleListTransitionStyle(el)
      }
      /**
       * @param {*} entries 
       * intersectionRect 目标元素和视窗（根）相交的矩形信息 可以称为相交区域
       * isIntersecting 目标元素当前是否可见 Boolean值 可见为true
       */
      function observableHandle(entries) {
        const entry = entries[0]
        const top = entry.boundingClientRect.top
        // 出现在可视区，并且是从下部出现
        if (entry.isIntersecting && top > 0) {
          handleRemoveAnimateClass(el)
          el.classList.add(enterCls)
        } else if (!entry.isIntersecting && top > 0) {
          // 离开可视区，并且是从下离开
          handleRemoveAnimateClass(el)
          el.classList.add(leaveCLs)
        }
      }

      function computedTransitionDelay(index) {
        const delay = col === 1 ? index : ((index % col) === 0 ? col : index % col)
        return (delay / 10) + addDlay + 's'
      }

      function handleRemoveAnimateClass(el) {
        const clsName = el.className
        const classList = clsName ? clsName.split(' ') : []
        const removeClass = []
        classList.forEach((cls) => {
          if (/^animate_/.test(cls)) {
            removeClass.push(cls)
          }
        })
        el.classList.remove(...removeClass)
      }

      function handleListTransitionStyle(list) {
        list.forEach((child, index) => {
          handleTransitionStyle(child, index + 1)
        })
      }
      function handleTransitionStyle(el, index) {
        const { duration, timing, delay } = transition
        const { x, y } = transfrom
        const _style = `
          transform: translate(${x}, ${y});
          transition-duration: ${duration};
          transition-delay: ${index ? computedTransitionDelay(index) : delay};
          transition-timing-function: ${timing};
          animation-delay: ${index ? computedTransitionDelay(index) : delay}
        `
        el.style.cssText += _style
      }
    },
    unbind() {
      io.disconnect()
    }
  })
}
