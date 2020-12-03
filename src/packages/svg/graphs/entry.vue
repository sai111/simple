<template>
  <div class='graphs-entry'>
    <div class='graphs-entry-tip'>
      graphs组件
    </div>
    <graphs
      :list-data='listData'
      v-bind='config'
      class='graphs-entry-container'
    />
    <planet-chart
      :list-data='listData'
      v-bind='config'
      class='graphs-entry-container'
    />
  </div>
</template>
<script>
import graphs from './index.vue'
import planetChart from './planet.vue'
export default {
  name: 'graphsEntry',
  components: { graphs, planetChart },
  data() {
    return {
      listData: [
        {
          group: '动漫',
          name: '死神',
          value: 114.9
        },
        {
          group: '动漫',
          name: '武庚纪',
          value: 107.13
        },
        {
          group: '明星名人',
          name: '邓丽君',
          value: 119.02
        },
        {
          group: '综艺',
          name: '快乐大本营',
          value: 102.13
        },
        {
          group: '综艺',
          name: '鲁豫有约',
          value: 131.17
        }
      ],
      config: {
        circleGap: 40,
        textS: ['弱', '相关性', '强'],
        lineStyle: 'dash'
      }
    }
  }
}
</script>
<style lang='scss' scoped>
.graphs-entry {
  width: 100%;
  height: 100%;
  .graphs-entry-tip {
    width: 100%;
    height: 40px;
    line-height: 40px;
  }
  .graphs-entry-container {
    width: 100%;
    height: calc(100% - 40px);
  }
}
</style>
