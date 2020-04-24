import{saveSearch,loadSearch,deleteSearch,clearSearch} from 'assets/js/cache'

export default {
  state: {
    searchHistory:loadSearch()
  },
  mutations: {
      SET_SEARCH_HISTORY(state,arr){
          state.searchHistory = arr
      }
  },
  actions: {
    setSearchHistory({commit},query){
        commit("SET_SEARCH_HISTORY",saveSearch(query))
    },
    deleteSearchHistory({commit},query){
        console.log("wwwwwww111")
        console.log(deleteSearch(query))
        commit('SET_SEARCH_HISTORY',deleteSearch(query))    
    },
    clearSearchHistory({commit}){
        commit('SET_SEARCH_HISTORY',clearSearch())   
    }
  },
  getters: {
      getHistory:state =>{
          return state.searchHistory
      }
  }
}