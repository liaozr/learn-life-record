
// 可以写成下面这种形式的
// import { GETSTARTLIST} from '../mutation-types'
// import { GETTERSLISTS} from '../mutation-types'
// -------------------------------------------------

import Vue from 'vue'       //引入vue模块

import * as types from '../mutation-types'

import { getToken, setToken, removeToken } from '@u/auth';

// 该模块的初始状态
const state = {
    userInfo:JSON.parse(localStorage.getItem('user')) || {},
	loginState:JSON.parse(localStorage.getItem('loginState')) || false,
    token:JSON.parse(localStorage.getItem('token')) || ""
}

// 相关的 mutations
// 要记得 mutations 里面 不同 mutation之间  是要 加逗号的

const mutations = {

	[types.USER_SIGNIN](state,user) {

        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('loginState',true)
      
        state.loginState=Boolean( localStorage.loginState );
        Object.assign(state.userInfo, user)

        console.log(state.loginState)
    },
    
    [types.USER_SIGNOUT](state) {
        localStorage.removeItem('user')
        localStorage.removeItem('loginState')

        localStorage.removeItem('token')
        state.token="";

        state.loginState=false;

        Object.keys(state.userInfo).forEach(k => Vue.delete(state.userInfo, k))
    },

    [types.USER_TOKEN](state,token) {
        localStorage.setItem('token',JSON.stringify(token))
        state.token=token;
    }
}

export default {
    state,
    mutations
}
