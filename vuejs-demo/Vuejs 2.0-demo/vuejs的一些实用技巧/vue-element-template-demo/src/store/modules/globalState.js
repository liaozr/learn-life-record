
import Vue from 'vue'       //引入vue模块
import { getToken, setToken, removeToken } from '@u/auth';
import router from '@r'  // 导入路由
import fetch from '@a/fetch'
import http from '@a/http'

const baseurl = "http://"+window.location.host
// const baseurl = "http://192.168.0.108:8000"
export default  {
  state: {
    token:sessionStorage.getItem('token') || "",
    userInfo:JSON.parse(sessionStorage.getItem('user')) || {},
    loginState:sessionStorage.getItem('loginState') || false,
    uploadfileflag:sessionStorage.getItem('uploadfileflag') || false,
    url:sessionStorage.getItem('ajaxurl') || baseurl
  },
  mutations: {
    USER_TOKEN(state,token) {
        sessionStorage.token = token
        state.token=token;
    },
    USER_SIGNIN(state,user) {
        sessionStorage.setItem('user',JSON.stringify(user))
        sessionStorage.setItem('loginState',true)
        state.loginState=Boolean(sessionStorage.loginState);
        Object.assign(state.userInfo, user)
        console.log(state.loginState)
    },
    USER_SIGNOUT(state) {
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('loginState')
        sessionStorage.removeItem('user')
        state.token = "";
        state.loginState = false;
        Object.keys(state.userInfo).forEach(k => Vue.delete(state.userInfo, k))
        state.userInfo = {}
    },
    UPLOADFILE(state){

      sessionStorage.setItem('uploadfileflag',true)

      state.uploadfileflag=Boolean(sessionStorage.uploadfileflag);
      
    },
    CLEARUPLOADFILE(state){
       sessionStorage.removeItem('uploadfileflag')
       state.uploadfileflag = false;
    },
    IPSETTING(state,url){
      sessionStorage.setItem('ajaxurl',url)
      state.url = sessionStorage.ajaxurl
    }
  },
  actions: {
    getToken ({commit},token) {
      commit('USER_TOKEN',token)
    },
    loginOut ({commit}) {
      commit('USER_SIGNOUT')
    },
    usersignin ({commit},user) {
      commit('USER_SIGNIN',user)
    },
    ipsetting ({commit},url) {
      commit('IPSETTING',url)
    },
    uploadfile({commit}) {
      commit('UPLOADFILE')
    },
    clearuploadfile({commit}) {
      commit('CLEARUPLOADFILE')
    }
  },
  getters: {
     getUserInfo:state => {
       return state.userInfo
     },
     loginState:state => {
       return state.loginState
     },
     url:state =>{
       return state.url
     }
  }
}

