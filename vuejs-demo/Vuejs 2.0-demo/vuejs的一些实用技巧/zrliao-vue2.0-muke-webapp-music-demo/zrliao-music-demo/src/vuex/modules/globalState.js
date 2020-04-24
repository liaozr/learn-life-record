
import Vue from 'vue'       //引入vue模块

import { getToken, setToken, removeToken } from '@u/auth';

import router from '@r'  // 导入路由

import fetch from '@a/fetch'

import http from '@a/http'

// 使用代理
const HOST = '/eidpws';

export default  {
  state: {
    userInfo:JSON.parse(localStorage.getItem('user')) || {},
    loginState:JSON.parse(localStorage.getItem('loginState')) || false,
    token:JSON.parse(localStorage.getItem('token')) || "",
    direction:'forward'
  },
  mutations: {
    USER_SIGNIN(state,user) {

        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('loginState',true)
      
        state.loginState=Boolean( localStorage.loginState );
        Object.assign(state.userInfo, user)

        console.log(state.loginState)
    },
    USER_SIGNOUT(state) {
        localStorage.removeItem('user')
        localStorage.removeItem('loginState')

        localStorage.removeItem('token')
        state.token="";

        state.loginState=false;

        Object.keys(state.userInfo).forEach(k => Vue.delete(state.userInfo, k))
    },
    USER_TOKEN(state,token) {
        localStorage.setItem('token',JSON.stringify(token))
        state.token=token;
    },
    UPDATE_DIRECTION(state,msg){
        state.direction=msg.direction
    }
  },
  actions: {
    login ({ commit },user) {
            // 自定义鉴权
        // var token='zrliaoTokin';

        // 华美乐鉴权字符串：
        // 这个鉴权字符串是通过base64 等等 加密过后的鉴权字符串 ，
        // 一般可以在用户登录的时候拿到这个鉴权，鉴权的组成一般也是由 用户的一些个人信息组成的一个字符串，在通过base64等的转换的

        // var token='B9590F0F97BA0D679C56B3484901AE22A80C59F2A29135193EE67141F473654B6E408A492BD7E5F30727F361DE2293411392B422602DE30E53262F7DBA27A36509AF073AB8CBB749CAF1EAAF07231A6E4F1162204A65435A362784496312CAAC7CEE2E0DA409A2918E28193627C29A106092C27C48C834AD743BD8F18FE84EF646C65F891AFB6BE514D52688E89D5222C39CDB98357A981AC4F182EFD091F5DC024DDD8BE60C6C8B38AB023CA08CE0A0';

        //  这个鉴权字符串是登录那里登录成功后生成的一个鉴权字符串
        //  这个鉴权字符串是登录那里登录成功后生成的一个鉴权字符串

    // ----------------------------------------------------------------------------------------

        // 一个长度30位左右固定的token放到header 请求头中即可，
        // 客户端请求每次必须携带此token，并且值等于服务器端的才是有效请求。


     //    var token='AES_PB53g0yfq4QQXGnpJkqpDxtrW11IJGGuaD4inbFdfaSaB6+sgE9iQXypZtg3DvrjXRWdDYaYV6SYIX2N3ju/8gODYqt/q0umQ+jGjV+F98Jkc08s1AsHML0AQq+0rWue2h6AHaci3wRdV0M3Vqcy4qw/Jes/rTHl403Tt3Xv8gs7k0Bxao8oyugnxYjRfcMnGOcoe62T68EGhCTCqm+z9e++oOFc7qgt5HcH4l78SeeomZ1sa1FZp7UAopXSEoTGgTwzXsx0lAfcgjoK2Hi4yoxcT5FxpsDbiMWCV2+Xko01bLV4TKp1NQwNCc3daYIeOh9cEBEwdAyD9Oasby5nI7+R9ERqSUNp6hDw/p+gKbs='

        // commit(types.USER_TOKEN,token)
        // setToken(token);

        // 华美乐 登录接口
       //  return new Promise((resolve, reject)=> {
       //      fetch({
       //          baseURL:HOST,
       //          url:HOST+'/system/user/login',
       //          method: 'get',
       //          params:user 
       //      }).then((response) => {

       //       let data = response.data;
       //       console.log('登录信息')
          //       console.log(data )

       //          resolve(response.data);

       //          alert('登录成功')

       //          // 登录成功 存储鉴权
       //          var token='AES_PB53g0yfq4QQXGnpJkqpDxtrW11IJGGuaD4inbFdfaSaB6+sgE9iQXypZtg3DvrjXRWdDYaYV6SYIX2N3ju/8gODYqt/q0umQ+jGjV+F98Jkc08s1AsHML0AQq+0rWue2h6AHaci3wRdV0M3Vqcy4qw/Jes/rTHl403Tt3Xv8gs7k0Bxao8oyugnxYjRfcMnGOcoe62T68EGhCTCqm+z9e++oOFc7qgt5HcH4l78SeeomZ1sa1FZp7UAopXSEoTGgTwzXsx0lAfcgjoK2Hi4yoxcT5FxpsDbiMWCV2+Xko01bLV4TKp1NQwNCc3daYIeOh9cEBEwdAyD9Oasby5nI7+R9ERqSUNp6hDw/p+gKbs='

                // commit(types.USER_TOKEN,token)
                // setToken(token);

       //          commit(types.USER_SIGNIN,user)

       //          router.replace({ path: '/user' })

       //      }).catch((error) => {
       //         console.log(error)
       //         reject(error) 
       //      })
       //  })


    // ------------------------------------------------------------------------------------------------------------


        // 华美乐 登录接口
        // 运用 async await 特性请求数据

        async function loginDenglu(){
            return await http.get('/system/user/login',user)
        }
        loginDenglu().then( res => {
              console.log('登录信息2333333333333333')
              console.log(res)
            alert('登录成功')
            // 登录成功 存储鉴权
            var token='AES_PB53g0yfq4QQXGnpJkqpDxtrW11IJGGuaD4inbFdfaSaB6+sgE9iQXypZtg3DvrjXRWdDYaYV6SYIX2N3ju/8gODYqt/q0umQ+jGjV+F98Jkc08s1AsHML0AQq+0rWue2h6AHaci3wRdV0M3Vqcy4qw/Jes/rTHl403Tt3Xv8gs7k0Bxao8oyugnxYjRfcMnGOcoe62T68EGhCTCqm+z9e++oOFc7qgt5HcH4l78SeeomZ1sa1FZp7UAopXSEoTGgTwzXsx0lAfcgjoK2Hi4yoxcT5FxpsDbiMWCV2+Xko01bLV4TKp1NQwNCc3daYIeOh9cEBEwdAyD9Oasby5nI7+R9ERqSUNp6hDw/p+gKbs='

            commit('USER_TOKEN',token)
            setToken(token);

            commit('USER_SIGNIN',user)

            // router.replace({ path: '/user' })

            console.log(router)

            // router.push(router.query.redirect || '/')
        })

        // 不要再在这里做错误处理了，原因是已经全局配置统一处理了
        // .catch(function(error){
        //  console.log(error +' come from action.js')
        // })
    },
    loginOut ({commit}) {
      commit('USER_SIGNOUT')
    },
    getToken ({commit},token) {
      commit('USER_TOKEN',token)
    },
    usersignin ({commit},user) {
      commit('USER_SIGNIN',user)
    }
  },
  getters: {
    getloginState:state => {
      return state.loginState
    },
    getUserInfo:state => {
      return state.userInfo
    },
    getToken:state => {
      return state.token
    },
    direction:state =>{
      return state.direction
    }
  }
}

