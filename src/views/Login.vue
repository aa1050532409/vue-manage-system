<template>
  <div id="login_container">
    <div id="login_box">
      <div id="avatar_box">
        <img src="@/assets/img/logo.png" alt="">
      </div>
      <el-form :model="loginForm" id="login_form" ref="loginFormRef" :rules="loginFormRules" label-width="0px">
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input v-model="loginForm.username"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" type="password"></el-input>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item id="login_button">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginForm('loginFormRef')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>

</template>

<script>
  import { get } from "../networks/request"

  export default {
    name: "Login",
    data() {
      return {
        loginForm: {
          'username': '',
          'password': '',
        },
        loginFormRules: {
          'username': [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 12, message: '请输入6-12位字符', trigger: 'blur'}
          ],
          'password': [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 3, max: 12, message: '请输入3-12位字符', trigger: 'blur' }
          ],
        }
      }
    },
    methods: {
      login() {
        this.$refs.loginFormRef.validate((valid) => {
          if (!valid) return null
          else {
            get({
              url: '/login',
              method: 'post',
              data: this.loginForm
            }).then((res)=>{
              if (res.data.meta.status === 200) {
                this.$message.success('登录成功！')
                window.sessionStorage.setItem("token", res.data.data.token)
                this.$router.push("/home")
              } else if (res.data.meta.status === 400) {
                return this.$message.error('登录失败！')
              }
            })
          }
        })
      },
      resetLoginForm(formName) {
        this.$refs[formName].resetFields()
      }
    }
  }
</script>

<style scoped>
  #login_container {
    width: 100%;
    height: 100%;
    border: 0;
    padding: 0;
    background-color: #2b4b6b;
  }
  #login_box {
    width: 400px;
    height: 300px;
    background-color: white;
    position: relative;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    border-radius: 20px;
    box-shadow: 0 0 10px #eeeeee;
  }
  #avatar_box {
    width: 125px;
    height: 125px;
    padding: 10px;
    border-radius: 50%;
    border: 1px solid grey;
    position: absolute;
    left: 50%;
    transform: translate(-50%,-50%);
    background-color: white;
    box-shadow: 0 0 10px grey;
  }
  #avatar_box img{
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 1px solid grey;
    background-color: #eeeeee;
  }
  #login_form {
    padding: 25% 20px 0px 20px;
  }
  #login_button {
    text-align: right;
  }
</style>
