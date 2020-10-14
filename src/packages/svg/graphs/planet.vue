<template>
  <div class='planet-container'>
    <div id='myChart'></div>
  </div>
</template>
<script>
import chartx from 'chartx'
export default {
  name: 'planetChart',
  data () {
    return {
      options: {
        coord: {
          type: 'polar'
        },
        graphs: [
          {
            id: 'planet',
            type: 'planet',
            field: 'name',
            ringGroupField: 'group',
            center: {
              fillStyle: '#1ad09f',
              fillText: ''
            },
            node: {
              //shapeType : 'circle', //默认circle
              radius: function () {
                var rs = [8, 12, 15];
                return rs[parseInt(Math.random() * rs.length, 10)]
              },
              //r : 'pv',     
              fillStyle: function (e) {

                var fs = ['#ffca4a', '#58c0ff', '#fb9c37'];
                return fs[parseInt(Math.random() * fs.length, 10)]
              }
            },
            grid: {
              rings: {
                fillStyle: ['#e3f9f3', '#ecfbf7', '#f5fdfb'],
                strokeStyle: function (e) {
                  if (e.groupInd < e.groups.length - 1) {
                    return '#c1f3e5'
                  }
                }
              },
              rays: {
                count: 12
              }
            },
            show: function (field, legendData) {
              this.getAgreeNodeData(legendData, function (data) {
                data.nodeElement.context.visible = true;
                data.labelElement.context.visible = true;
              });
            },
            hide: function (field, legendData) {
              this.getAgreeNodeData(legendData, function (data) {
                data.nodeElement.context.visible = false
                data.labelElement.context.visible = false
              })
            }
          }
        ],
        tips: {},
        legend: {
          data: [
            { name: 1, color: '#ff8533', field: 'group' },
            { name: 2, color: '#58c0fe', field: 'group' },
            { name: 3, color: '#faca4a', field: 'group' }
          ]
        }
      }
    }
  },
  mounted () {
    console.log(111)
    this.drawPlanet()
  },
  methods: {
    drawPlanet () {
      const data = [
        ['group', 'name', 'pv', 'tgi'],
        [1, '德云社相声', '6628973', '114.9'],
        [2, '恋爱先生', '68029673', '107.13']]
      chartx.create('myChart', data, this.options)
    }
  }
}
</script>
<style lang='scss' scoped>
.planet-container {
  width: 100%;
  height: 100%;
  #myChart {
    width: 1000px;
    height: 500px;
  }
}
</style>
