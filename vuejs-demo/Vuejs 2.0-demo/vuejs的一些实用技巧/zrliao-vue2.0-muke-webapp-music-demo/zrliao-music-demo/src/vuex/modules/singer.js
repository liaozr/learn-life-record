export default {
  state: {
      singer:{
      }
  },
  mutations: {
    SETSINGER(state,singer){
      state.singer=singer
    }
  },
  actions: {
      setSinger( { commit },singer ){
          commit("SETSINGER",singer)
      }
  },
  getters: {
      getsinger: state =>{
         return state.singer 
      }
  }
}