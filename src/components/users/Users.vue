<template>
  <div>
    <Main-container @changeUsersShowData="changeUsersShowData">
      <span slot="first">用户管理</span>
      <span slot="second">用户列表</span>
      <span slot="addButton">
        <el-button class="add-user" type="primary" @click="changeAddUserDialogVisible">添加用户</el-button>
        <add-user-dialog ref="addUserDialog" :changeUsersShowData="changeUsersShowData"></add-user-dialog>
      </span>

      <Table-column class="table" slot="tableColumn" :label="userLabel" :prop="userProp" :table-data="showData">
        <el-table-column slot="state" :index="5" :key="5" label="状态">
          <template v-slot="scope">
            <el-switch v-model="scope.row.mg_state" disabled></el-switch>
          </template>
        </el-table-column>

        <el-table-column slot="operate" :index="6" :key="6" label="操作" width="250px">
          <template v-slot="scope">
            <el-tooltip effect="dark" content="修改" placement="top" :enterable="false">
              <el-button type="primary" icon="el-icon-edit" @click="changeEditUserDialogVisible(scope.row.id)" circle></el-button>
            </el-tooltip>
            <el-tooltip effect="dark" content="删除" placement="top" :enterable="false">
              <el-button type="danger" icon="el-icon-delete" @click="changeDeleteUserDialogVisible(scope.row.id)" circle></el-button>
            </el-tooltip>
            <el-tooltip effect="dark" content="分配权限" placement="top" :enterable="false">
              <el-button type="warning" icon="el-icon-setting" circle></el-button>
            </el-tooltip>
            <edit-user-dialog ref="editUserDialog" :changeUsersShowData="changeUsersShowData"></edit-user-dialog>
            <delete-user-dialog ref="deleteUserDialog" :changeUsersShowData="changeUsersShowData"></delete-user-dialog>
          </template>
        </el-table-column>
      </Table-column>
    </Main-container>
  </div>
</template>

<script>
  import {get} from "../../networks/request";
  import MainContainer from "../MainContainer/MainContainer";
  import TableColumn from "../MainContainer/TableColumn";
  import addUserDialog from "./addUserDialog";
  import editUserDialog from "./editUserDialog";
  import deleteUserDialog from "./deleteUserDialog";

  export default {
    name: "users",
    data(){
      return {
        showData: [],
        userLabel: ['姓名','邮箱','电话','角色'],
        userProp: ['username','email','mobile','role_name'],
        queryInfo: {
          query: '',
          pagenum: this.$store.state.users.currentPage,
          pagesize: this.$store.state.users.pageSize
        },
      }
    },
    components: {
      MainContainer: MainContainer,
      TableColumn: TableColumn,
      addUserDialog: addUserDialog,
      editUserDialog: editUserDialog,
      deleteUserDialog: deleteUserDialog,
    },
    created() {
      this.getUsers(this.queryInfo)
    },
    methods: {
      getUsers(queryInfo) {
        this.$store.dispatch('requestList', {
          path: this.$route.path,
          queryInfo: queryInfo
        }).then(res=>{
          if (res === 'fail') return this.$message.error('获取用户列表失败!')
          this.showData = this.$store.state.users.showData
          this.$message.success('获取用户列表成功!')
        })
      },
      changeUsersShowData(){
        this.queryInfo.query = this.$store.state.users.query
        this.queryInfo.pagenum = this.$store.state.users.currentPage
        this.queryInfo.pagesize = this.$store.state.users.pageSize
        this.getUsers(this.queryInfo)
      },
      changeAddUserDialogVisible() {
        this.$refs.addUserDialog.changeAddUserDialogVisible()
      },
      changeEditUserDialogVisible(id) {
        this.$refs.editUserDialog.changeEditUserDialogVisible(id)
      },
      changeDeleteUserDialogVisible(id) {
        this.$refs.deleteUserDialog.open(id)
      }
    }
  }
</script>

<style scoped>
  .table {
    margin-top: 20px;
  }
  .el-switch {
    opacity: 1 !important;
  }
</style>
