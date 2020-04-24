
// Actions 是组件内用来分发 mutations 的函数。第一个参数固定为store。
// 在这里，当用户点击账单列表的某一个账单区域的时候，要调用dispatch('SHOW_DETAIL')。
// 这里的demo只涉及到一个简单的用户事件，
// 所以action.js也比较简单：


import { SHOW_DETAIL } from './mutation-types' 

export const showDetail = makeAction('SHOW_DETAIL') 

function makeAction(type) { 
	return ({ dispatch }, ...args) => dispatch(type, ...args)
}
 