<template>
  <el-container>
    <el-header>
      <div>
        <img src="@/assets/img/heima.png" alt="">
        <span>电商后台管理系统</span>
      </div>
      <el-button type="info" @click="exit">退出</el-button>
    </el-header>

    <el-container>
      <el-aside :width="isCollapse? '64px' : '200px' ">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <el-menu background-color="#545c64" text-color="#fff"
                 active-text-color="#ffd04b" router unique-opened :collapse="isCollapse" :collapse-transition="false">
          <el-submenu :index="String(item1.path)" v-for="(item1, index1) in menuList" :key="item1.id">
            <template slot="title">
              <i :class="iconClass[index1]"></i>
              <span>{{item1.authName}}</span>
            </template>
            <el-menu-item :index="String(item2.path)" v-for="(item2, index2) in item1.children" :key="item2.id">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>{{item2.authName}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-main>
        <router-link to="/home/welcome"></router-link>
        <router-link to="/home/users"></router-link>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import { get } from "../networks/request"
  import '@/assets/fonts/iconfont.css'

  import Welcome from "../components/Home/Welcome";

  export default {
    name: "Home",
    data(){
      return {
        menuList: [],
        iconClass: [
            "iconfont icon-user",
            "iconfont icon-tijikongjian",
            "iconfont icon-shangpin",
            "iconfont icon-danju",
            "iconfont icon-baobiao",
        ],
        isCollapse: false
      }
    },
    components: {
      Welcome: Welcome
    },
    methods: {
      exit() {
        window.sessionStorage.removeItem('token')
        this.$router.push('/login')
      },
      toggleCollapse() {
        this.isCollapse = !this.isCollapse
      }
    },
    created() {
      get({
        url: 'menus'
      }).then(res=>{
        if (res.data.meta.status === 200) {
          this.menuList = res.data.data
        }
      })
    }
  }
</script>

<style scoped>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .el-header div {
    display: flex;
    align-items: center;
  }
  .el-header span{
    margin-left: 15px;
    color: white;
    font-size: 20px;
  }
  .el-aside {
    background-color: #545c64;
    color: #333;
  }
  .el-menu {
    text-align: left;
    border-right: none;
  }
  .iconfont {
    margin-right: 10px;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
  }

  .el-container {
    height: 100%;
  }

  .toggle-button {
    background-color: #4a5064;
    text-align: center;
    color: white;
    font-size: 16px;
    line-height: 30px;
    letter-spacing: .2em;
    cursor: pointer;
  }
</style>
