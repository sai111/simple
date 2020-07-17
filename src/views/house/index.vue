<template>
<div class="house">
  <!-- <merge-table :table="listTable" :type-key="typeKey" /> -->
  <base-table :table="listTable" />
</div>
</template>
<script>
const toLower = text => {
    return text.toString().toLowerCase()
  }
const searchByName = (items, term) => {
  if (term) {
    return items.filter(item => toLower(item.name).includes(toLower(term)))
  }
  return items
}
import { typeKey } from './index.js'
import houseJson from './index.json'
import { getHouseList } from './api'
import baseTable from '@/views/components/table/baseTable.vue'
import mergeTable from '@/views/components/table/mergeTable.vue'
export default {
  name: 'House',
  components: { mergeTable, baseTable },
  data() {
    return {
      search: null,
      searched: [],
      typeKey: typeKey,
      listTable: {
        columns: [
          {width: '20%', field: 'address', name: '位置', merge: true, mergeField: 'type'},
          {width: '20%', field: 'loupan', name: '楼盘'},
          {width: '26%', field: 'decoration', name: '是否毛坯/备注'},
          {width: '10%', field: 'area', name: '面积(平方)'},
          {width: '8%', field: 'totalPrice', name: '总价(万)'},
          {width: '8%', field: 'price', name: '单价(万)'},
          {width: '8%', field: 'payNow', name: '首付(万)'}
        ],
        row: []
      },
      priceColor: [
        {max: Infinity, min: 1.8, color: '#fff'},
        {max: 1.8, min: 1.6, color: '#fff'},
        {max: 1.6, min: 1.4, color: '#fff'},
        {max: 1.4, min: 1.2, color: '#409EFF'},
        {max: 1.2, min: 1, color: '#F56C6C'},
        {max: 1, min: Infinity, color: '#F56C6C'},
      ]
    }
  },
  created() {
    this.getData()
    this.searched = houseJson.data
  },
  methods: {
    async getData() {
      let res = await getHouseList()
      let data = res.data.data
      if (data && data.length > 0) {
        data.forEach((v, i) => {
          this.priceColor.forEach((m, n) => {
            let k1 = m.max
            let k2 = m.min
            if (parseInt(v.price) >= k2 && parseInt(v.price) < k1) {
              v.priceColor = m.color
            }
          })
        })
      }
      // this.listTable.row = this.groupBy(data, 'areaType')
      this.listTable.row = data
    },
    groupBy (array, name) {
      const groups = {}
      array.forEach(function (o) {
        const group = o[name]
        groups[group] = groups[group] || []
        groups[group].push(o)
      })
      // k值数组
      return groups
      // 索引数组
      // return Object.keys(groups).map(function (group) {
      //   return groups[group]
      // })
    }
  }
}
</script>
<style lang="scss">
.house {
  width: 100%;
  height: 100%;
  .md-table {
    .md-table-fixed-header {
      .md-table-fixed-header-container {
        table {
          display: flex;
          thead {
            tr {
              flex: 1;
              .md-table-head.md-numeric {
                text-align: left;
                border-top: 1px solid #000!important;
                border-right: 1px solid #000!important;
              }
            }
          }
        }
        
      }
    }
    .md-table-content {
      table {
        tbody {
          tr.md-table-row {
            text-align: left;
            .md-table-cell.md-numeric  {
              text-align: left;
              .md-table-cell-container {
                text-align: left!important;
                // padding: 0!important;
              }
            }
          }
        }
      }
    }
  }
}
</style>
