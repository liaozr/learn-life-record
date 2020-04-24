
import * as types from './mutation-types'

export const  getterlists = ({ commit }, gettercan) => {
		commit(types.GETTERSLISTS, gettercan)
}
export const  getstartlist = ({ commit }) => {
	commit(types.GETSTARTLIST)
}
export const topiclistchange = ({ commit }, topictype) => {
	commit(types.TOPICLISTCHANGE, topictype)
}
export const initTopiclist = ({ commit }) => {
	commit(types.INITTIPICLIST)
}