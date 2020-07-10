<template>
  <md-dialog
    class="home-add-dialog"
    :md-active.sync="showDialog"
    :md-modal="false"
    :md-click-outside-to-close="false">
    <md-dialog-title>Preferences</md-dialog-title>
  </md-dialog>
</template>
<script>
export default {
  name: 'HomeAdd',
  data() {
    return {
      showDialog: false
    }
  },
  mounted() {},
  methods: {
    openDialog() {
      this.showDialog = true
    },
    close() {
      this.showDialog = false
    }
  }
}
</script>
