import Vue from 'vue'
import Vuex from 'vuex'
import users from "./user";
import {get} from "../networks/request";

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    users: users
  },
  mutations:{
    getShowData(state, data) {
      let module
      switch (data.module) {
        case 'users': module = state.users; break;
      }
      module.showData = data.showData
      module.total = data.total
    }
  },
  actions: {
    changePage(context, val) {
      context.commit(val.path + '/setPage', val.currentPage)
    },
    changePageSize(context, val) {
      context.commit(val.path + '/setPageSize', val.pageSize)
    },
    requestList(context, val) {
      var path = val.path.match(/\w*/g).filter((res)=>{return res})[1]
      return new Promise((resolve, reject) => {
        get({
          url: path,
          params: val.queryInfo
        }).then(res=>{
          if (res.data.meta.status !== 200) {
            resolve('fail')
          }
          context.commit('getShowData', {
            module: path,
            showData: res.data.data.users,
            total: res.data.data.total
          })
          resolve('success')
        })
      })
    }
  }
})
