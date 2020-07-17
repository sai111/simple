<template>
  <md-list-item class="category-list">
    <div class="category-list-item">
      <md-button class="category-button">
        测试
      </md-button>
      <div class="category-list-group">
        <md-button class="md-icon-button" @click.native="editCategory('edit')">
          <md-icon>edit</md-icon>
        </md-button>
        <md-button class="md-icon-button" @click.native="editCategory('delete')">
          <md-icon>delete</md-icon>
        </md-button>
      </div>
    </div>
  </md-list-item>
</template>
<script>
export default {
  name: 'listItem',
  props: {},
  data() {
    return {}
  },
  mounted() {},
  methods: {
    editCategory(str = null) {
      console.log(str, 111)
    }
  }
}
</script>
<style lang="scss" scoped>
.category-list {
  height: 36px !important;
  min-height: 36px!important;
  pointer-events: auto;
  overflow: hidden;
  transition: height 0.2s;
  cursor: pointer;
  &-item {
    width: 100%;
    .md-button.category-button {
      width: 100%;
      margin: 0 8px!important;
    }
  }
  &:hover {
    height: 72px !important;
    .category-list-group {
      opacity: 1;
    }
  }
  &-group {
    height: 28px;
    line-height: 28px;
    margin-bottom: 6px;
    text-align: center;
    opacity: 1;
    transition: opacity 0.5s;
    .md-icon-button {
      height: 28px!important;
      min-width: 28px!important;
      width: 28px!important;
    }
  }
}
</style>
