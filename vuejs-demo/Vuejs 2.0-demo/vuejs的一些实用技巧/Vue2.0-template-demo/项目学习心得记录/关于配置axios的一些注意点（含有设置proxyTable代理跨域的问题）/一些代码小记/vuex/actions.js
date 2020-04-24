import * as types from './mutation-types'
// 导入axios  从而进行异步请求数据
import axios from 'axios'

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
