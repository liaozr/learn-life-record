import * as types from './mutation-types'

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
