<template>
  <div class="login">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form">
      <div class="title">
        <div class="small-logo"><img src="@/assets/image/logo_small.svg" alt=""></div>
        <div class="title-text">长三角资本市场服务基地后台管理系统</div>
      </div>
      <el-form-item prop="username">
        <el-input
          v-model="loginForm.username"
          type="text"
          auto-complete="off"
          placeholder="手机号/邮箱" />
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="loginForm.password"
          type="text"
          auto-complete="off"
          placeholder="请输入密码" />
      </el-form-item>
      <check-slider v-model="loginForm.slider"/>
      <div class="handle-module">
        <el-checkbox class="login-status" v-model="loginForm.rememberMe">一周内保持登录状态</el-checkbox>
        <div class='forget-register'>
          <span>忘记密码</span>
          <span>|</span>
          <span>注册</span>
        </div>
      </div>
      <el-button class="button--gradient login-btn" @click="handleLogin">登录</el-button>
    </el-form>
  </div>
</template>

<script>
import CheckSlider from '@/components/common/checkSlider'
import { checkPhone, checkEmail } from '@/utils/validate'
import { createPublicKey, logout, md5Encrypted, publicKeyEncrypted } from '@/utils/user'
import { getAuthorize, getPublicKey } from '@/api/user'
export default {
  name: 'Login',
  components: { CheckSlider },
  data() {
    const checkUsername = (rule, value, callback) => {
      if (!value || String(value).trim() === '') {
        callback(new Error('请输入用户名！'))
      } else {
        if (checkPhone(value) || checkEmail(value)) {
          callback()
        } else {
          callback(new Error('请输入正确的用户名'))
        }
      }
    }
    const checkPassword = (rule, value, callback) => {
      if (!value || String(value).trim() === '') {
        callback(new Error('请输入密码！'))
      } else {
        callback()
      }
    }
    return {
      publicKey: '',
      loginForm: {
        emailOrUsername: '',
        password: '',
        slider: 10
      },
      loginRules: {
        username: [
          { validator: checkUsername, trigger: 'blur' }
        ],
        password: [
          { validator: checkPassword, trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    logout()
    this.getPublicKey()
  },
  methods: {
    async getPublicKey () {
      const response = await getPublicKey()
      this.publicKey = createPublicKey(response)
    },
    handleLogin() {
      this.$refs.loginForm.validate(async(valid) => {
        if (!valid || this.loginForm.slider !== 100) return
        let result = getAuthorize({
          emailOrUsername: this.loginForm.emailOrUsername,
          password: publicKeyEncrypted(this.publicKey, md5Encrypted(this.loginForm.password)),
          type: 2,
          clientId: ''
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "@/assets/css/login.scss";
</style>
