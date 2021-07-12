<template>
  <span></span>
</template>

<script>
  import {get} from "../../networks/request";

  export default {
    name: "deleteUserDialog",
    data() {
      return {
        id: Number
      }
    },
    props: {
      changeUsersShowData: Function
    },
    methods: {
      open(id) {
        this.id = id
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.removeUser().then((result)=>{
            console.log(result);
            if (result === 'success') {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              return this.changeUsersShowData()
            }
            return this.$message({
              type: 'error',
              message: '删除失败!'
            })
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      removeUser() {
        return  get({
          url: 'users/' + this.id,
          method: 'delete',
        }).then(res=>{
          if (res.data.meta.status !== 200) return 'fail'
          return 'success'
        })
      }
    }
  }
</script>

<style scoped>

</style>
