<template>
  <div class="custom-table">
    <div class="custom-table-thead">
      <div class="custom-table-thead-li"
        v-for="(column, columnIndex) in columns"
        :key="'thead-li-'+columnIndex"
        :style="{width: column.width}">
        {{ column.name }}
      </div>
    </div>
    <div class="custom-table-tbody">
      <table cellspacing="0" cellpadding="0">
        <tbody>
          <tr class="custom-table-tbody-tr"
            v-for="(tr, k, trIndex) in row"
            :key="'tr-key-'+trIndex">
            <td
              v-for="(td, tdIndex) in columns"
              :key="'td-key-'+tdIndex"
              :style="{width: td.width}">
               <div v-if="td.merge" class="td-left">
                 {{typeKey[k].name}}
               </div>
               <div v-else  class="td-right">
                 <tr
                  v-for="(trChild, trChildIndex) in tr"
                  :key="'tr-child-key-'+trChildIndex">
                   <td>{{trChild[td.field]||'--'}}</td>
                 </tr>
               </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
export default {
  name: 'mergeTable',
  props: {
    table: {
      type: Object,
      default: () => {
        return {
          columns: [],
          row: []
        }
      }
    },
    typeKey: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      columns: [],
      row: [],
      colors: null
    }
  },
  mounted() {
    this.initTable()
  },
  methods: {
    initTable () {
      this.columns = this.table.columns
      this.row = this.table.row
    }
  }
}
</script>
<style lang="scss" scoped>
.custom-table {
  width: 98%;
  margin: 20px auto;
  &-thead {
    width: 100%;
    height: 50px;
    display: flex;
    border-top: 1px solid #000;
    &-li {
      height: 100%;
      line-height: 50px;
      border-left: 1px solid #000;
      padding: 0 10px;
      box-sizing: border-box;
      &:last-child {
        border-right: 1px solid #000;
      }
    }
  }
  &-tbody {
    width: 100%;
    height: calc(100% - 50px);
    table {
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      border: 1px solid #000;
      border-bottom: none;
      tbody {
        width: 100%;
        height: 100%;
        tr.custom-table-tbody-tr {
          width: 100%;
           display: inline-block;
           border-bottom: 1px solid #000;
           box-sizing: border-box;
          td {
            display: inline-block;
            height: 100%;
            box-sizing: border-box;
            &:nth-child(2) {
              .td-right {
                box-sizing: border-box;
                border-left: 1px solid #000;
              }
            }
            .td-left {
              padding: 0 10px;
              box-sizing: border-box;
            }
            .td-right {
              box-sizing: border-box;
              tr {
                display: inline-block;
                box-sizing: border-box;
                width: 100%;
                line-height: 25px;
                border-bottom: 1px solid #000;
                &:last-child {
                  border-bottom: none;
                }
                td {
                  padding: 0 10px;
                  display: inline-block;
                  box-sizing: border-box;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
