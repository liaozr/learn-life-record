export default  {
  state: {
     transitionName:"slide-right"
  },
  mutations: {
    SLIDELEFT(state) {
        state.transitionName="slide-left"
    },
    SLIDERIGHT (state) {
        state.transitionName="slide-right"
    },
    FADE (state) {
        state.transitionName="fade"
    }
  },
  actions: {
    slideLeft ({ commit }) {
        commit('SLIDELEFT')
    },
    slideRight ({ commit }) {
        commit('SLIDERIGHT')
    },
    fade ({ commit }) {
        commit('FADE')
    }
  },
  getters: {
    routerChangeName:state => {
      return state.transitionName
    },
  }
}
