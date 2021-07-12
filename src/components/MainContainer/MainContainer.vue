<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><slot name="first">First</slot></el-breadcrumb-item>
      <el-breadcrumb-item><slot name="second">Second</slot></el-breadcrumb-item>
    </el-breadcrumb>

    <el-card class="box-card">
      <el-row :gutter="20" class="search" >
        <el-col :span="18">
          <el-input placeholder="请输入内容" v-model="query" clearable @clear="search">
            <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="2">
          <slot name="addButton">按钮</slot>
        </el-col>
      </el-row>

      <slot name="tableColumn">表格内容</slot>

      <Pagination ref="pagination" v-on="$listeners"></Pagination>
    </el-card>
  </div>
</template>

<script>
  import Pagination from "../MainContainer/Pagination";
  export default {
    name: "MainContainer",
    data() {
      return {
        query: ''
      }
    },
    computed: {
      path: function () {
        var regex = /\w*/g
        return this.$route.path.match(regex).filter((res)=>{return res})[1]
      }
    },
    components: {
      Pagination: Pagination
    },
    methods: {
      search() {
        let module
        switch (this.path) {
          case 'users': module = this.$store.state.users;break;
        }
        module.query = this.query
        this.$refs.pagination.changeList()
      }
    }
  }
</script>

<style scoped>
  .el-breadcrumb {
    font-size: 14px;
    margin-bottom: 20px;
  }
  .el-card {
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15) !important;

  }
  .search {
    width: 400px;
  }
</style>
