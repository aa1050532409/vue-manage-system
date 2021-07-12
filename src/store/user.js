import Vue from 'vue'
export default {
  namespaced: true,
  state: {
    currentPage: 1,
    pageSizes: [1, 2, 5, 10],
    pageSize: 5,
    total: 12,
    showData: [],
    query: ''
  },
  mutations: {
    setPage(state, page) {
      state.currentPage = page
    },
    setPageSize(state, pageSize) {
      state.pageSize = pageSize
    }
  },
}
