
import * as types from './mutation-types'

// 我们可以把 ajax 相关的调用方法封装成一个api.js
import api from './../api/api.js'

// comm模块
export const comm_conf  = ({ commit },settings) => {
	commit(types.COMM_CONF,settings)
}
// --------------------------------------------------------------------------------------

// index 模块
export const indexGetList  = ({ commit }) => {
	 commit(types.COMM_LOADING_STATUS,true)
     api.indexGetList(function (res) {
         commit(types.INDEX_GET_LIST_SUCCESS,res)
     })
}
export const indexGetImg  = ({ commit }) => {
	api.indexGetImg(function (res) {
		 commit(types.INDEX_GET_IMG_SUCCESS, res);
		 // 这里让loading变为false的actions分发是不能够写在api的外面的、
		 // 理由是等图片加载完（也就是 INDEX_GET_IMG_SUCCESS 这个动作执行完，图片加载完 再执行  这个LOADING_STATUS这个commit动作的）

		 // 你直接把这个LOADING_STATUS这个要执行的commit动作放到外面是不会出现数据加载中的这个loading效果的
         commit(types.COMM_LOADING_STATUS,false);
    })
}

// home 模块
export const getHomeIndex  = ({ commit },uid) => {

	    commit(types.COMM_LOADING_STATUS,true);

      api.getHomeIndex(uid,function (res) {
            commit(types.HOME_GET_INFO,res);
            commit(types.COMM_LOADING_STATUS,false)
      })
}

 