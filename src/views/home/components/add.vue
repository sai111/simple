<template>
  <el-dialog
    class="home-add-dialog"
    :title="title"
    :visible.sync="showDialog"
    :close-on-click-modal="false"
  >
    <el-form :model="form" :rules="rules" ref="ruleForm" label-width="120px">
      <el-form-item label="英文分类名" prop="category_code">
        <el-input v-model="form.category_code"></el-input>
      </el-form-item>
      <el-form-item label="中文标题" prop="category">
        <el-input v-model="form.category"></el-input>
      </el-form-item>
      <el-form-item label="描述" prop="category_desc">
        <el-input v-model="form.category_desc"></el-input>
      </el-form-item>
      <el-form-item label="标签(逗号隔开)" prop="tag">
        <el-input v-model="form.tag"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="close('ruleForm')">关闭</el-button>
        <el-button @click="submitForm('ruleForm')">保存</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>
export default {
  name: 'HomeAdd',
  props: {
    isAdd: {
      type: Boolean,
      default: false
    }
  },
  mixins: [],
  data() {
    const validateTitle = (rules, value, callback) => {
      let reg = /^[a-zA-Z_0-9]{1,}$/
      if (!reg.test(value)) {
        callback(new Error('作品的英文名由大小写英文字母、下划线、数字组成'))
      } else {
        callback()
      }
    }
    return {
      showDialog: false,
      title: '',
      id: '',
      form: {
        category_code: '',
        category: '',
        category_desc: '',
        tag: ''
      },
      rules: {
        category_code: [
          {required: true, message: `为分类${this.isAdd ? '添加' : '修改'}一个英文名`, trigger: 'blur'},
          {validator: validateTitle, message: '作品的英文名由大写英文字母、下划线、数字组成'}
        ],
        category: [
          {required: true, message: `为分类${this.isAdd  ? '添加' : '修改'}一个中文标题`, trigger: 'blur'},
          {min: 1, message: '中文标题长度最小1个字符'}
        ],
        category_desc: [
          {required: true, message: `为分类${this.isAdd  ? '添加' : '修改'}描述信息`, trigger: 'blur'}
        ],
        tag: [
          {required: true, message: `为分类${this.isAdd  ? '添加' : '修改'}标签信息`, trigger: 'blur'}
        ]
      }
    }
  },
  computed: {},
  mounted() {},
  methods: {
    openDialog() {
      this.showDialog = true
    },
    /**
     * activateForm方法
     * dialogTitle: 弹窗标题
     * obj: 参数
     * type: 类型,会当作参数进行传递
     */
    activateForm(dialogTitle, obj = {}) {
      this.openDialog()
      this.title = dialogTitle
      if (!this.isAdd) this.id = obj._id
      for (const k in this.form) {
        if (this.form.hasOwnProperty(k)) {
          this.form[k] = obj[k]
        }
      }
    },
    close(formName) {
      this.showDialog = false
      this.id = null
      this.$refs[formName].resetFields()
      for (const k in this.form) {
        if (this.form.hasOwnProperty(k)) {
          this.form[k] = ''
        } else {
          this.form[k] = ''
        }
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.save()
        } else {
          this.$message.error('请检查表单是否正确填写!')
          return false
        }
      })
    },
    save() {
      let param = Object.assign({}, this.form)
      if (!this.isAdd) {
        param._id = this.id
      }
      this.$http({
        method: 'POST',
        url: `/api/category/${this.isAdd ? 'add': 'update'}`,
        data: param
      }).then((res) => {
        this.showDialog = false
        this.$emit('cateAddSuccess')
      }).catch((e) => {
        this.showDialog = false
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
