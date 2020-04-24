/**
 * Created by linhaifeng on 2016/11/15.
 */


// comm.js 模块的

export const commConf = state => {
    return state.comm.commsettings
}
export const loading = state => {
    return state.comm.commsettings.loading
}
export const mark = state => {
    return state.comm.commsettings.mark
}

// index.js 模块 
export const imgs = state => {
    return state.index.shouye.imgs
}
export const listdata = state => {
    return state.index.shouye.lists
}

// home.js模块
export const info = state => {
    return state.home.info
}
 
 