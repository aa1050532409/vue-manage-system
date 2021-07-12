<template>
  <el-dialog
          title="提示"
          :visible.sync="editDialogVisible"
          width="50%"
          @close="editUserDialogClose">
    <el-form :model="editUserForm" :rules="editUserFormRules" ref="editUserFormRef" label-width="80px">
      <el-form-item label="姓名" prop="username">
        <el-input v-model="editUserForm.username" disabled></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="editUserForm.email"></el-input>
      </el-form-item>
      <el-form-item label="电话" prop="mobile">
        <el-input v-model="editUserForm.mobile"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="editDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="editUser">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import {get} from "../../networks/request";

  export default {
    name: "editUserDialog",
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
        editDialogVisible: false,
        id: Number,
        editUserForm: {
          username: '',
          email: '',
          mobile: '',
        },
        editUserFormRules: {
          email: [
            {required: true, message: '请输入邮箱', trigger: blur},
            {validator: checkEmail, trigger: blur}
          ],
          mobile: [
            {required: true, message: '请输入电话', trigger: blur},
            {validator: checkMobile, trigger: blur}
          ]
        }
      }
    },
    props: {
      changeUsersShowData: Function
    },
    methods: {
      editUserDialogClose() {
        this.$refs.editUserFormRef.resetFields()
      },
      changeEditUserDialogVisible(id) {
        this.id = id
        this.editDialogVisible = true
        get({
          url: 'users/' + id,
          method: 'get',
        }).then(res=>{
          this.editUserForm = res.data.data
        })
      },
      editUser(){
        this.$refs.editUserFormRef.validate(async valid => {
          if (!valid) return
          get({
            url: 'users/' + this.id,
            method: 'put',
            data: {
              email: this.editUserForm.email,
              mobile: this.editUserForm.mobile
            }
          }).then(res=>{
            if (res.data.meta.status !== 200) return this.$message.error('更新失败!')
            this.changeUsersShowData()
            this.$message.success('更新成功!')
            this.$refs.editUserFormRef.resetFields()
            this.editDialogVisible = false
          })
        })
      }
    }
  }
</script>

<style scoped>

</style>
