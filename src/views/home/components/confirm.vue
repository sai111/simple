<template>
  <div class="dialog-confirm">
     <md-dialog-confirm
      class="home-add-dialog"
      :md-active.sync="active"
      :md-title="confirm.title"
      :md-content="confirm.content"
      :md-confirm-text="confirm.confirmText"
      :md-cancel-text="confirm.cancelText"
      @md-cancel="confirmSave(false)"
      @md-confirm="confirmSave(true)" />
  </div>
</template>
<script>
  export default {
    name: 'DialogConfirm',
    data() {
      return {
        active: false,
        confirm: {
          title: '',
          content: '',
          confirmText: '确认',
          cancelText: '取消',
          form: {}
        }
      }
    },
    methods: {
      closeDialog() {
        this.active = false
      },
      openConfirm (obj) {
        this.confirm = obj
        this.active = true
      },
      confirmSave(flag = false) {
        if (!flag) {
          this.active = false
        }
        this.$emit('confirmClick', flag, this.confirm.form)
      }
    }
  }
</script>
