export default {
  state: {
     topList:{}
  },
  mutations: {
      SET_TOPLIST(state,topList){
          state.topList = topList
      }
  },
  actions: {
      topList({commit},topList){
         commit('SET_TOPLIST',topList)
      }
  },
  getters: {
     topList:state =>{
         return state.topList
     }
  }
}