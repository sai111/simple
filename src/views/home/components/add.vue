<template>
  <md-dialog
    class="home-add-dialog"
    :md-active.sync="showDialog"
    :md-click-outside-to-close="false"
  >
    <md-dialog-title>{{title}}</md-dialog-title>
    <md-card-content>
      <md-field :class="getValidationClass('en')">
        <label>英文分类名</label>
        <md-input v-model="form.en" :disabled="sending" />
        <span
          class="md-error"
          v-if="!$v.form.en.required">
          为分类添加一个英文名
        </span>
        <span
          class="md-error"
          v-if="$v.form.en.required && !$v.form.en.correctEnglishName">
          作品的英文名由大小写英文字母、数字、下划线组成
        </span>
      </md-field>
      <md-field>
        <label>中文标题</label>
        <md-input v-model="form.name" :disabled="sending" />
        <span
          class="md-error"
          v-if="!$v.form.name.required">
          为分类添加一个中文标题
        </span>
        <span
          class="md-error"
          v-if="$v.form.name.required && !$v.form.name.minLength">
          中文标题长度最小3个字符
        </span>
      </md-field>
      <md-field>
        <label>描述</label>
        <md-input v-model="form.desc" :disabled="sending" />
      </md-field>
      <md-field>
        <label>标签(以逗号隔开)</label>
        <md-input v-model="form.tag" :disabled="sending" />
      </md-field>
    </md-card-content>
    <md-dialog-actions>
      <md-button class="md-primary" @click="close()">关闭</md-button>
      <md-button class="md-primary" @click="save()">保存</md-button>
    </md-dialog-actions>
  </md-dialog>
</template>
<script>
import { validationMixin } from 'vuelidate'
import { required, maxLength, minLength } from 'vuelidate/lib/validators'
const correctEnglishName = (str) => {
  return /^[0-9a-zA-Z_]{1,}$/.test(str)
}
export default {
  name: 'HomeAdd',
  mixins: [validationMixin],
  data() {
    return {
      showDialog: false,
      sending: false,
      title: '',
      id: '',
      form: {
        en: '',
        name: '',
        desc: '',
        tag: ''
      }
    }
  },
  validations: {
    form: {
      en: {
        required,
        correctEnglishName
      },
      name: {
        required,
        minLength: minLength(3)
      }
    }
  },
  mounted() {},
  methods: {
    getValidationClass(fieldName) {
      const field = this.$v.form[fieldName]
      if (field) {
        return {
          'md-invalid': field.$invalid && field.$dirty
        }
      }
    },
    openDialog() {
      this.showDialog = true
    },
    activateForm(dialogTitle, obj = {}) {
      this.openDialog()
      this.title = dialogTitle
      for (const k in this.form) {
        if (this.form.hasOwnProperty(k)) {
          this.form[k] = obj[k]
        }
      }
    },
    close() {
      this.$v.$reset()
      this.showDialog = false
      this.id = null
      for (const k in this.form) {
        if (this.form.hasOwnProperty(k)) {
          this.form[k] = ''
        } else {
          this.form[k] = ''
        }
      }
      console.log(this.form, 1111)
    },
    save() {
      console.log(this.form, 1111)
    }
  }
}
</script>
<style lang="scss">
.md-dialog.home-add-dialog {
  .md-dialog-container {
    width: 400px!important;
    max-height: 100%!important;
    .md-card-content {
      padding-left: 30px;
      padding-right: 30px;
      padding-bottom: 16px;
      padding-top: 8px;
      .md-field{
        margin-bottom: 20px;
      }
    }
  }
  .move-in-enter-active, .move-in-leave-active {
    transition: opacity 0.3s, transform 0.3s;
  }
  .move-in-enter, .move-in-leave-to {
    opacity: 0;
    transform: translate(-10px, 0);
  }
}
</style>
