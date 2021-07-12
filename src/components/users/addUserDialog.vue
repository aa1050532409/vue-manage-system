<template>
  <el-dialog
          title="提示"
          :visible.sync="dialogVisible"
          width="50%"
          @close="addUserDialogClose">
    <el-form :model="addUserForm" :rules="addUserFormRules" ref="addUserFormRef" label-width="80px">
      <el-form-item label="姓名" prop="username">
        <el-input v-model="addUserForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="addUserForm.password"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="addUserForm.email"></el-input>
      </el-form-item>
      <el-form-item label="电话" prop="mobile">
        <el-input v-model="addUserForm.mobile"></el-input>
      </el-form-item>

    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="addUser">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import {get} from "../../networks/request";

  export default {
    name: "addUserDialog",
    data() {
      var checkEmail = (rule, value, callback) => {
        const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
        if (regEmail.test(value)) return callback()
        callback(new Error('请输入合法的邮箱'))
      }
      var checkMobile = (rule, value, callback) => {
        const regMobile =/^(0|86|17951)?(13[0-9]|15[0123456789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
        if (regMobile.test(value)) return callback()
        callback(new Error('请输入合法的手机号'))
      }
      return {
        addUserForm: {
          username: '',
          password: '',
          email: '',
          mobile: '',
        },
        addUserFormRules: {
          username: [
            { required: true, message: '请输入性名', trigger: 'blur' },
            { min: 3, max: 12,message: '性名范围在3-12个字符', trigger: 'blur' },
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 3, max: 12,message: '密码范围在4-12个字符', trigger: 'blur' },
          ],
          email: [
            { required: true, message: '请输入邮箱', trigger: 'blur' },
            {validator:checkEmail, trigger: 'blur'}
          ],
          mobile: [
            { required: true, message: '请输入手机', trigger: 'blur' },
            {validator:checkMobile, trigger: 'blur'}
          ],
        },
        dialogVisible: false
      }
    },
    props: {
      changeUsersShowData: Function,
    },
    methods: {
      changeAddUserDialogVisible() {
        this.dialogVisible = true
      },
      addUserDialogClose() {
        this.$refs.addUserFormRef.resetFields()
      },
      addUser() {
        this.$refs.addUserFormRef.validate((valid)=> {
          if (!valid) return
          get({
            url: 'users',
            method: 'post',
            data: this.addUserForm
          }).then(res => {
            if (res.data.meta.status !== 201) {
              this.$message.error('用户添加失败!')
            }
            console.log(res);
            this.$message.success('添加用户成功!')
            this.dialogVisible = false
            this.changeUsersShowData()
          })
        })
      }
    }
  }
</script>

<style scoped>

</style>
