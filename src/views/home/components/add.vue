<template>
  <md-dialog
    class="home-add-dialog"
    :md-active.sync="showDialog"
    :md-click-outside-to-close="false"
  >
    <md-dialog-title>{{title}}</md-dialog-title>
    <form novalidate class="md-layout" @submit.prevent="validateUser">
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
        <md-field :class="getValidationClass('name')">
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
        <md-field :class="getValidationClass('desc')">
          <label>描述</label>
          <md-input v-model="form.desc" :disabled="sending" />
          <span
            class="md-error"
            v-if="$v.form.desc.required">
            为分类添加描述信息
          </span>
        </md-field>
        <md-field :class="getValidationClass('tag')">
          <label>标签(以逗号隔开)</label>
          <md-input v-model="form.tag" :disabled="sending" />
          <span
            class="md-error"
            v-if="$v.form.tag.required">
            为分类添加标签信息
          </span>
        </md-field>
      </md-card-content>
       <md-dialog-actions style="width:100%">
        <md-button class="md-primary" @click="close()">关闭</md-button>
        <md-button class="md-primary" type="submit">保存</md-button>
      </md-dialog-actions>
    </form>
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
      categoryType: null,
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
      },
      desc: {
        required
      },
      tag: {
        required
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
    /**
     * activateForm方法
     * dialogTitle: 弹窗标题
     * obj: 参数
     * type: 类型,会当作参数进行传递
     */
    activateForm(dialogTitle, obj = {}, type = null) {
      this.categoryType = type
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
    },
    validateUser() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.save()
      }
    },
    save() {
      this.$http({
        method: 'POST',
        url: '/api/collect/add',
        params: this.form
      }).then((res) => {
        console.log(res, 'res==1111')
      })
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
      width: 100%;
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
