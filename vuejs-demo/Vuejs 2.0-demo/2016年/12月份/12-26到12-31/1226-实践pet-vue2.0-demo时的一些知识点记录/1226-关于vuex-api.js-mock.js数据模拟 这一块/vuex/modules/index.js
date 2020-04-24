/*
*
*
*
* */
import * as types from '../mutation-types'

// 该模块的初始状态
const state = {
    shouye:{
        lists:[],
        imgs:[]
    }
};

// 相关的 mutations
const mutations = {
    [types.INDEX_GET_LIST_SUCCESS](state,res){

        state.shouye.lists=res
    },
    [types.INDEX_GET_IMG_SUCCESS](state,res){
        state.shouye.imgs = res
    }

};

export default {
    state,
    mutations
}
