
/*
* 通用的配置，例如顶部的配置跟地址菜单
*
*
* */
import * as types from '../mutation-types'

// 该模块的初始状态 
const state = {
    commsettings:{
        isSearch:true,  //是否显示搜索
        isBack:false,   //是否显示返回
        isShare:false,  //是否显示分享
        title:'',  //显示标题内容
        isFooter:true,  //是否显示底部
        loading:false,  //是否显示loading,
        mark:false  //是否显示遮罩,
    }
};

// 相关的 mutations
const mutations = {
    [types.COMM_CONF](state,settings){
         state.commsettings=settings
    },
    [types.COMM_LOADING_STATUS](state,boolen){
         state.commsettings.loading=boolen;
    }
};
export default { 
    state, 
    mutations 
}