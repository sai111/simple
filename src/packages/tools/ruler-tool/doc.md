<!-- ruler-tool文档 -->


### 1.onselectstart 事件选中

[onselectstart](https://www.jianshu.com/p/701cc19d2c5a)
> onselectstart = 'return false'
+ 文本框中的文本被选中时发生
+ 被 input 和 textarea 标签支持


> 禁止选择: onselectstart='return false'
  + 使用场景：实现元素内文本不被选中

> 禁止拖放：ondragstart='return false'
  + 使用场景：禁止鼠标在网页上拖动

> 禁止拷贝：oncopy='return false'
  + 使用场景： 使用场景：网银转账时，输入对方卡号，需要输入两次，通常第二次输入的输入框是不允许粘贴的，这样就在一定程度上保证了卡号的准确性


> 禁止剪贴：oncut='return false'

> 禁止鼠标右键: oncontextmenu='return false'
