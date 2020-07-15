<template>
<div class="house">
  <merge-table :table="listTable" :type-key="typeKey" />
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
import mergeTable from '@/views/components/table/mergeTable.vue'
export default {
  name: 'House',
  components: { mergeTable },
  data() {
    return {
      search: null,
      searched: [],
      typeKey: typeKey,
      listTable: {
        columns: [
          {width: '20%', field: 'position', name: '位置', merge: true, mergeField: 'type'},
          {width: '20%', field: 'name', name: '楼盘'},
          {width: '26%', field: 'traffic', name: '是否毛坯/备注'},
          {width: '10%', field: 'area', name: '面积(平方)'},
          {width: '8%', field: 'sum', name: '总价(万)'},
          {width: '8%', field: 'price', name: '单价(万)'},
          {width: '8%', field: 'payment', name: '首付(万)'}
        ],
        row: []
      }
    }
  },
  created() {
    this.getData()
    this.searched = houseJson.data
  },
  methods: {
    getData() {
      this.listTable.row = this.groupBy(houseJson.data, 'type')
    },
    newUser() {},
    searchOnTable() {
      this.searched = searchByName(houseJson.data, this.search)
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
