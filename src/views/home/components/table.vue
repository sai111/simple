<template>
  <div class="custom-table">
    <div class="custom-table-thead">
      <div class="custom-table-thead-li"
        v-for="(thead, theadIndex) in columns"
        :key="'thead-li-'+theadIndex"
        :style="{width: thead.width}">
        {{ thead.name }}
      </div>
    </div>
    <div class="custom-table-tbody">
      <div class="custom-table-tbody-li"
        v-for="(tbody, tbodyIndex) in row"
        :key="'tbody-li-'+tbodyIndex">
        <div class="custom-table-tbody-li-column"
          v-for="(thead, theadIndex) in columns"
          :key="'thead-li-'+theadIndex"
          :style="{width: thead.width}">
            {{ tbody[thead.field] || '--' }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'customTable',
  props: {
    table: {
      type: Object,
      default: () => {
        return {
          columns: [],
          row: []
        }
      }
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
  height: calc(100% - 40px);
  margin: 20px auto;
  &-thead {
    width: 100%;
    height: 50px;
    display: flex;
    border-top: 1px solid #000;
    border-bottom: 1px solid #000;
    &-li {
      height: 100%;
      line-height: 50px;
      border-left: 1px solid #000;
      padding: 0 20px;
      box-sizing: border-box;
      &:last-child {
        border-right: 1px solid #000;
      }
    }
  }
  &-tbody {
    width: 100%;
    height: calc(100% - 50px);
    &-li {
      display: flex;
      border-bottom: 1px solid #000;
      &-column {
        line-height: 25px;
        border-left: 1px solid #000;
        padding: 0 20px;
        box-sizing: border-box;
        &:last-child {
          border-right: 1px solid #000;
        }
      }
    }
  }
}
</style>
