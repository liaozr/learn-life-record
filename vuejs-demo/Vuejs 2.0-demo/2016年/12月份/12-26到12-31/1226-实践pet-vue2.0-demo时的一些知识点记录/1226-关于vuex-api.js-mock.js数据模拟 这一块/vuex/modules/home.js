/*
*  
*
*
* */
import * as types from '../mutation-types'

// 该模块的初始状态 
const state = {
    info:{

    }
};

// 相关的 mutations
const mutations = {
    [types.HOME_GET_INFO](state,res){
         state.info=res
    }
};
export default { 
    state, 
    mutations 
}  