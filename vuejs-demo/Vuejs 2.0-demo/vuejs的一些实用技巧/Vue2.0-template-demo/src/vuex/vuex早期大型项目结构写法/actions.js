import * as types from './mutation-types'
// 导入axios  从而进行异步请求数据
import axios from 'axios'

import router from '../router'  // 导入路由

import fetch from '@a/fetch';

import http from '@a/http';

import { setToken } from '@u/auth'

// 使用代理
const HOST = '/eidpws';

// -----------------------------------------------------------------------------------------

// 路由切换

export const slideLeft  = ({ commit }) => {
	commit(types.SLIDELEFT)
}

export const slideRight  = ({ commit }) => {
	commit(types.SLIDERIGHT )
}

export const fade  = ({ commit }) => {
	commit(types.FADE )
}
// -----------------------------------------------------------------------------------------

export const delete_user  = ({ commit },index) => {
	commit(types.SHANCHU_USER,index)
}

export const addSaveUser  = ({ commit }) => {
	commit(types.ADD_SAVE_USER )
}

export const addUser  = ({ commit } ) => {
	commit(types.ADD_USER )
}

export const commitname  = ({ commit },name) => {
	commit(types.COMMITNAME,name)
}

export const commitage  = ({ commit },age) => {
	commit(types.COMMITAGE,age)
}

export const committel  = ({ commit },tel) => {
	commit(types.COMMITTEL,tel)
}

export const edit_user  = ({ commit },index) => {
	commit(types.EDIT_USER,index)
}

// ----------------------------------------------------------------------------------------

// 登录模块

export const login  = ({ commit },user) => {

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

   //      	let data = response.data;
   //      	console.log('登录信息')
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

    		commit(types.USER_TOKEN,token)
    		setToken(token);

        commit(types.USER_SIGNIN,user)

        router.replace({ path: '/user' })

    })
    // 不要再在这里做错误处理了，原因是已经全局配置统一处理了
    // .catch(function(error){
    // 	console.log(error +' come from action.js')
    // })

}

// ------------------------------------------------------------------------------------------------------------

export const loginOut  = ({ commit }) => {
	commit(types.USER_SIGNOUT)
}

// -----------------------------------------------------------------------------------------


// 通常使用 actions 异步请求数据，再使用 mutations 将请求到的数据提交给 state
// 通常使用 actions 异步请求数据，再使用 mutations 将请求到的数据提交给 state
// 通常使用 actions 异步请求数据，再使用 mutations 将请求到的数据提交给 state

//store里面形式

// actions: {
//   // ...
//   actionB ({ dispatch, commit }) {
//     return dispatch('actionA').then(() => {
//       commit('someOtherMutation')
//     })
//   }
// }

// //组件里面形式
// store.dispatch('actionA').then(() => {
//   // ...
// })


// -----------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------

// 通常使用 actions 异步请求数据，再使用 mutations 将请求到的数据提交给 state
// 通常使用 actions 异步请求数据，再使用 mutations 将请求到的数据提交给 state
// 通常使用 actions 异步请求数据，再使用 mutations 将请求到的数据提交给 state

//  以下是一些参考的配置
// actions 主要是做异步处理的，所以我们将 ajax 请求放在 actions 里面处理

// -----------------------------------------------------------------------------------------

// 倘若组件里 是这样子 触发 fetchTopics的话，有个 then的回调

// this.$store.dispatch('fetchTopics',vuedata).then(function(resp){
//     alert(resp)
// })

// 则action 要 这么写，用Promise的机制，然后，获取数据成功后，
//  加多个 resolve("数据请求成功") resolve()这个方法

export const fetchTopics  = ({ commit },canshu) => {

	return new Promise((resolve, reject)=> {

	    // 先是 触发  FETCH_TOPICS_REQ 这个 mutations
        commit(types.FETCH_TOPICS_REQ);

        // actions 异步请求数据
	    axios({
	        method: 'get',
	        url: 'https://www.vue-js.com/api/v1/topics',
	        params:canshu
	    }).then((response) => {
	         
	         // 数据响应成功，把接口的值先 赋给 data变量
	        let data = response.data.data;
	        console.log(data)
	        
	        // 然后再触发  FETCH_TOPICS_SUC 这个 mutations 并把data参数 传过去
	        commit(types.FETCH_TOPICS_SUC,data)

	        resolve("数据请求成功");

	    }).catch((error) => {
	        
	        // 响应失败的时候，触发 FETCH_TOPICS_ERR 这个 mutations 并把error参数传过去

	        commit(types.FETCH_TOPICS_ERR, error);

	        console.log(error)
	    })
    })
}

export const mock  = ({ commit }) => {

    return new Promise((resolve, reject)=> {
        axios.get('/index/getList').then(function (response) {
            if(response.data.data.code ==1000){

                // resolve(response.data.data.data);

                let data = response.data.data.data;
		        console.log(data)
		        
		        // 然后再触发  FETCH_TOPICS_SUC 这个 mutations 并把data参数 传过去
		        commit(types.FETCH_MOCK_SUC,data)

            }
        }).catch((error) => {
          console.log(error)
        })
    })
}

// 倘若组件里 是这样子 触发 fetchTopics的话，
// this.$store.dispatch('fetchTopics',vuedata); 
// 则只需要 下面那部分代码即可，无需要加上Promise机制


// export const fetchTopics  = ({ commit },canshu) => {
    
//     // 先是 触发  FETCH_TOPICS_REQ 这个 mutations
//     commit(types.FETCH_TOPICS_REQ);
    
//     // actions 异步请求数据
//     axios({
//         method: 'get',
//         url: 'https://www.vue-js.com/api/v1/topics',
//         params:canshu
//     }).then((response) => {
         
//          // 数据响应成功，把接口的值先 赋给 data变量
//         let data = response.data.data;
//         console.log(data)
        
//         // 然后再触发  FETCH_TOPICS_SUC 这个 mutations 并把data参数 传过去
//         commit(types.FETCH_TOPICS_SUC,data)

//     }).catch((error) => {
        
//         // 响应失败的时候，触发 FETCH_TOPICS_ERR 这个 mutations 并把error参数传过去

//         commit(types.FETCH_TOPICS_ERR, error);

//         console.log(error)
//     })
// }



// -----------------------------------------------------------------------------------------


// 利用 async / await 这个 JavaScript 即将到来的新特性，我们可以像这样组合 action

// 假设 getData() 和 getOtherData() 返回的是 Promise

// actions: {
//   async actionA ({ commit }) {
//     commit('gotData', await getData())
//   },
//   async actionB ({ dispatch, commit }) {
//     await dispatch('actionA') // 等待 actionA 完成
//     commit('gotOtherData', await getOtherData())
//   }
// }

// -----------------------------------------------------------------------------------------
