<template>
  <div>
    <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="pageSizes"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
    </el-pagination>
  </div>
</template>

<script>
  import {get} from "../../networks/request";

  export default {
    name: "Pagination",
    data() {
      return {
        currentPage: 1,
        pageSizes: [1,2,5,10],
        pageSize: 5,
        total: 5
      }
    },
    created() {
      this.changeList()
    },
    computed: {
      path: function () {
        var regex = /\w*/g
        return this.$route.path.match(regex).filter((res)=>{return res})[1]
      }
    },
    methods: {
      handleSizeChange(val) {
        this.$store.dispatch('changePageSize', {
          path: this.path,
          pageSize: val
        })
        this.changeList()
      },
      handleCurrentChange(val) {
        this.$store.dispatch('changePage', {
          path: this.path,
          currentPage: val
        })
        this.changeList()
      },
      changeList() {
        let event
        switch (this.path) {
          case 'users': event = 'changeUsersShowData';break;
        }
        this.$emit(event)
        this.changePageNum()
      },
      changePageNum() {
        switch(this.path) {
          case 'users': module = this.$store.state.users;break;
        }
        this.currentPage = module.currentPage
        this.pageSizes = module.pageSizes
        this.pageSize = module.pageSize
        this.total = module.total
      }
    }
  }
</script>

<style scoped>
  .el-pagination {
    margin-top: 10px;
  }
</style>
