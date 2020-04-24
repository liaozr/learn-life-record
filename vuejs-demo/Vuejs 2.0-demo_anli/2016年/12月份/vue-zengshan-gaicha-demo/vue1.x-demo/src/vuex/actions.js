
// Actions 是组件内用来分发 mutations 的函数。第一个参数固定为store。
// 在这里，当用户点击账单列表的某一个账单区域的时候，要调用dispatch('SHOW_DETAIL')。
// 这里的demo只涉及到一个简单的用户事件，
// 所以action.js也比较简单：


import { SHOW_USER_INFO } from './mutation-types' 
import { DELETE_USER_LIST } from './mutation-types' 
import { EDIT_USER_LIST } from './mutation-types' 
import { UPDATE_USER_LIST} from './mutation-types' 
import { ADD_USER} from './mutation-types' 
import { ADD_SAVE_USER} from './mutation-types' 
import { EDIT_SAVE_USER} from './mutation-types' 
import { CLOSE_USER} from './mutation-types' 

export const showUserinfo = makeAction('SHOW_USER_INFO') 

export const delete_user = makeAction('DELETE_USER_LIST') 

export const edit_user = makeAction('EDIT_USER_LIST') 

export const updateUser = makeAction('UPDATE_USER_LIST') 

export const addUser = makeAction('ADD_USER') 

export const addSaveUser = makeAction('ADD_SAVE_USER') 

export const editSaveUser = makeAction('EDIT_SAVE_USER') 

export const closeUser = makeAction('CLOSE_USER') 

function makeAction(type) { 
	return ({ dispatch }, ...args) => dispatch(type, ...args)
}
 