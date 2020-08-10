<template>
  <div class="category-list">
    <div class="category-list-item">
      <div class="category-button" @click="$emit('categoryClick', item)">
        {{item.category_code}}
      </div>
      <div class="category-list-group">
        <i class="el-icon-edit" @click="editCategory('update', item)" />
        <i class="el-icon-delete" @click="deleteCategory('delete', item)" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'listItem',
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {}
  },
  mounted() {},
  methods: {
    editCategory(item) {
      this.$emit('cateEdit', this.item)
    },
    deleteCategory(item) {
      this.$emit('cateDelete', this.item)
    }
  }
}
</script>
<style lang="scss" scoped>
.category-list {
  height: 36px;
  pointer-events: auto;
  overflow: hidden;
  transition: height 0.2s;
  cursor: pointer;
  &-item {
    width: 100%;
    .category-button {
      width: 100%;
      white-space: nowrap;
      cursor: pointer;
      color: #000;
      text-align: center;
      box-sizing: border-box;
      transition: .1s;
      font-weight: 500;
      font-size: 14px;
    }
  }
  &:hover {
    height: 72px;
    .category-list-group {
      opacity: 1;
    }
  }
  .category-list-group {
    width: 100%;
    height: 28px;
    line-height: 28px;
    text-align: center;
    margin: 0 auto;
    opacity: 0;
    transition: opacity 0.5s;
    i {
      padding-right: 10px;
    }
  }
}
</style>
