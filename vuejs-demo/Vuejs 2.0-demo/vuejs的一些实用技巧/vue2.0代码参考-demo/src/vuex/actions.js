
import * as types from './mutation-types'

export const showUserinfo  = ({ commit }) => {
	commit(types.SHOW_USER_INFO)
}

export const edit_user  = ({ commit },index) => {
	commit(types.EDIT_USER,index)
}

export const updateUser  = ({ commit }) => {
	commit(types.UPDATE_USER_LIST)
}

export const addUser  = ({ commit }) => {
	commit(types.ADD_USER)
}

export const addSaveUser  = ({ commit }) => {
	commit(types.ADD_SAVE_USER)
}

export const editSaveUser  = ({ commit }) => {
	commit(types.EDIT_SAVE_USER)
}

export const closeUser  = ({ commit }) => {
	commit(types.CLOSE_USER)
}

export const delete_user = ({ commit },user) => {
	commit(types.SHANCHU_USER,user)
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


export const changename  = ({ commit },name) => {
	commit(types.CHANGENAME,name)
}

export const changeage  = ({ commit },age) => {
	commit(types.CHANGEAGE,age)
}

export const changetel  = ({ commit },tel) => {
	commit(types.CHANGETEL,tel)
}





 