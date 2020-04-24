
import * as types from './mutation-types'


// index 模块
export const user_signin  = ({ commit },user_message) => {
	 commit(types.USER_SIGNIN,user_message)
}

export const quit_clear  = ({ commit }) => {
   commit(types.QUIT_CLEAR)
}
