
import * as types from './mutation-types'

export const  save = ({ commit }) => {
	commit(types.SAVE)
}
export const  datechange = ({ commit },date) => {
	commit(types.DATECHANGE,date)
}
export const totaltimechange = ({ commit },totaltime) => {
	commit(types.TOTALTIMECHANGE, totaltime)
}
export const commitchange = ({ commit },commitss) => {
	commit(types.COMMITCHANGE,commitss)
}

export const setNewplan = ({ commit }) => {
	commit(types.SETNEWPLAN)
}

export const deletePlan = ({ commit },index) => {
	commit(types.DELETEPLAN,index)
}

export const cancel = ({ commit }) => {
	commit(types.CANCEL)
}

 