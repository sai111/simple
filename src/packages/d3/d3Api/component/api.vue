<template>
  <div class='d3-api-container'>
    <h3>d3-API文档资料</h3>
    <section>
      <h4>D3 API总览</h4>
      <ul class='d3-api-container-list'>
        <li
          v-for='(item, index) in apiList'
          :key=''d3-api-container-list-li-'+index'
          class='d3-api-container-list-li'>
          <span>
            {{ item.label }}
          </span>
          <span>
            {{ item.des }}
          </span>
        </li>
      </ul>
    </section>
    <section>
      <h4>d3 (核心)</h4>
      <h5>选择器</h5>
      <ul class='d3-api-container-list'>
        <li
          class='d3-api-container-list-li'>

        </li>
      </ul>
    </section>
  </div>
</template>
<script>
export default {
  name: 'D3ApiList',
  data() {
    return {
      apiList: [
        {type: 'behavior', label: '行为', des: '可重用的交互行为'},
        {type: 'core', label: '核心', des: '包括选择器，过渡，数据处理，本地化，颜色等'},
        {type: 'geo', label: '地理', des: '球面坐标，经纬度运算'},
        {type: 'geometry', label: '几何', des: '提供绘制2D几何图形的实用工具'},
        {type: 'layout', label: '布局', des: '推导定位元素的辅助数据'},
        {type: 'scale', label: '比例尺', des: '数据编码和视觉编码之间转换'},
        {type: 'zoom', label: '可缩放矢量', des: '提供用于创建可伸缩矢量图形的实用工具'},
        {type: 'time', label: '时间', des: '解析或格式化时间，计算日历的时间间隔等'}
      ]
    }
  }
}
</script>
<style lang='scss' scoped>
.d3-api-container {
  width: 100%;
  height: 100%;
  section {
    width: 95%;
    margin: 20px auto;
  }
  &-list {
    width: 100%;
    list-style: none;
    &-li {
      width: 100%;
    }
  }
}
</style>
