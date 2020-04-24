// 第一步：加入 store

// store 存储应用所需的数据。所有组件都从 store 中读取数据。

// <!-- State（状态），Mutations（变更） 和 Actions（动作）。 -->

import Vue from 'vue'
import Vuex from 'vuex'

import { GETTERSLISTS,GETSTARTLIST } from './mutation-types'

import { getterlists } from './mutation-types'
import { TOPICLISTCHANGE } from './mutation-types'
import { INITTIPICLIST } from './mutation-types'

// 导入各个模块的初始状态state 和 mutations 
 
// 告诉 vue '使用' vuex
Vue.use(Vuex)

const store = new Vuex.Store({

	state: {
		navlist:[
			  {
		         type:'hot',
		         title:'热门'          
			  },
		      {
		         type:'new',
		         title:'新上榜'
			  },
			  {
		         type:'day',
		         title:'日报'
			  },
			  {
		         type:'hotseven',
		         title:'七日热门'
			  },
			  {
		         type:'hotmonth',
		         title:'三十日热门'
			  },
			  {
		         type:'jiang',
		         title:'有奖活动'
			  },
			  {
		         type:'chuban',
		         title:'简书出版'
			  },
			  {
		         type:'boke',
		         title:'简书播客'
			  },
			    {
		         type:'rewen',
		         title:'时事热闻'
			  },
			  {
		         type:'jingxuan',
		         title:'专题精选'
			  }
		],
		hot:[
			  {
		       type:'hot',
			     id:1,
		       name:'阿俊',
		       time:'大约6小时之前',
		       title:'我不是学霸，只是比你努力一点而已2333333',
		       readnum:3398,
		       pinglun:258,
		       like:232,
		       dashang:68,
		       imgbg:require('../assets/images/bonus_3.jpg')
			  },
			  {
			   id:2,
		       name:'阿俊2',
		       time:'大约5小时之前',
		       title:'Learn by doing222222',
		       readnum:3398,
		       pinglun:258,
		       like:232,
		       dashang:168,
		       imgbg:require('../assets/images/bonus_3.jpg')
			  },
			  {
			   id:3,
		       name:'阿俊3',
		       time:'大约4小时之前',
		       title:'Learn by doing33333',
		       readnum:398,
		       pinglun:58,
		       like:32,
		       dashang:8,
		       imgbg:require('../assets/images/bonus_3.jpg')
			  }    
		],
		new:[
			  {
			     type:'new',
		       id:1,
		       name:'阿俊0000',
		       time:'大约6小时之前',
		       title:'爱美的女生们，六款超高性价比的变美神器你都有了吗new？',
		       readnum:23333,
		       pinglun:258,
		       like:232,
		       dashang:68,
		      imgbg:require('../assets/images/vue-demo-new.jpg')
			  },
			  {
			   id:2,
		       name:'阿俊2111',
		       time:'大约5小时之前',
		       title:'Learn by',
		       readnum:2444444,
		       pinglun:258,
		       like:232,
		       dashang:168,
		        imgbg:require('../assets/images/vue-demo-new.jpg')
			  },
			  {
			   id:3,
		       name:'阿俊33333',
		       time:'大约4小时之前',
		       title:'Learn 233333333333',
		       readnum:398,
		       pinglun:58,
		       like:32,
		       dashang:8,
		      imgbg:require('../assets/images/vue-demo-new.jpg')
			  }    
		],
	    day:[
			  {
		       type:'day',
			     id:1,
		       name:'asasd阿俊',
		       time:'大约6小时之前',
		       title:'毕业9年，我才学懂的道理',
		       readnum:3398,
		       pinglun:258,
		       like:232,
		       dashang:68,
		      imgbg:require('../assets/images/vue-demo-daily.jpg')
			  },
			  {
			   id:2,
		       name:'wwwwww阿俊2',
		       time:'大约5小时之前',
		       title:'ppppppppppppppppp',
		       readnum:3398,
		       pinglun:258,
		       like:232,
		       dashang:168,
		      imgbg:require('../assets/images/vue-demo-daily.jpg')
			  },
			  {
			   id:3,
		       name:'eeeeee阿俊3',
		       time:'大约4小时之前',
		       title:'zzzzzzzzzzz',
		       readnum:398,
		       pinglun:58,
		       like:32,
		       dashang:8,
		      imgbg:require('../assets/images/vue-demo-daily.jpg')
			  }    
		],
		topicnavlists:[
		  { 
			  type:'hott',
			  title:'热门' 
		  },
		  { 
			  type:'tuijian',
			  title:"推荐" 
		  }
	    ],
        topichot:[
	        {   
	        	img:require('../assets/images/vue-demo-hot.jpg'),
	        	type:'hott',
	            title:'热门的游戏',
	            par:'玩转简书的第一步，从这个专题开始。\
	                  想上首页热门榜么？好内容想被更多人看到么？来投稿吧！\
	                  如果被拒也不要灰心哦～入选文章会进一个队列挨个上首页，请耐心等待。\
	                  投稿必须原创。如果发现有非...',            
	            number:'1111',
	            concern:'121.7',
	            keys:'故事、连载',
	            time:'20160620'        
	        },
	        {
	            img:require('../assets/images/topic_3.jpg'),
	            title:'热门的诗',
	            par:'诗，让你感受自己的心灵。\
	                 专题主编：苏锦年 投稿须知：\
	                 1.本专题收录古诗、词、现代诗以及诗词点评及指导。\
	                 2.内容必须为原创，切勿用其他诗人的诗句。\
	                 3.文章排版整洁，注意...',            
	            number:'22222',
	            concern:'146.6',
	            keys:'诗',
	            time:'20160630'
	        }
        ],
        tuijian:[
	        {   
	        	img:require('../assets/images/topic_3.jpg'),
	        	type:'tuijian',
	            title:'推荐的游戏',
	            par:'玩转简书的第一步，从这个专题开始。\
	                 sds撒旦撒旦撒水电水电水电所得税水电是',            
	            number:'33333',
	            concern:'121.7',
	            keys:'推荐的故事',
	            time:'20160620'        
	        },
	        {
	        	img:require('../assets/images/topic_1.jpg'),
	            title:'推荐的诗',
	            par:'诗，让你感受自己的心灵。\
	                 岁的维持现场vdfsdfswesdsds 问问阿萨',            
	            number:'4444',
	            concern:'146.6',
	            keys:'一般推荐的诗',
	            time:'20160630'
	        }
        ],
		curlisttype:[
		],
		curtopicarticle:[]
	},

	actions: {
		// getterlists ({ commit }, gettercan) {
		// 	commit('GETTERSLISTS', gettercan)
		// },
		getstartlist ({ commit }) {
			commit('GETSTARTLIST')
		},
		topiclistchange ({ commit }, topictype) {
			commit('TOPICLISTCHANGE', topictype)
		},
		initTopiclist ({ commit }) {
			commit('INITTIPICLIST')
		}
	},
	mutations: {
			 
		[getterlists](state,gettercan)
		{
	       if(gettercan == 'hot')
	       {       
	       	    state.curlisttype=''
	            state.curlisttype=state.hot
	       }
	       else if(gettercan == 'new'){
	           state.curlisttype=''
	           state.curlisttype=state.new  
	       }
	       else if(gettercan == 'day'){
	           state.curlisttype=''
	           state.curlisttype=state.day
	       }
		},	 
		// [GETTERSLISTS](state,gettercan)
		// {
	 //       if(gettercan == 'hot')
	 //       {       
	 //       	    state.curlisttype=''
	 //            state.curlisttype=state.hot
	 //       }
	 //       else if(gettercan == 'new'){
	 //           state.curlisttype=''
	 //           state.curlisttype=state.new  
	 //       }
	 //       else if(gettercan == 'day'){
	 //           state.curlisttype=''
	 //           state.curlisttype=state.day
	 //       }
		// },
	    [GETSTARTLIST] (state)
	    {
	      state.curlisttype=''
	      state.curlisttype=state.hot
	    },

	    [TOPICLISTCHANGE] (state,topictype){
	        if(topictype=='hott')
	        {
	        	state.curtopicarticle=''
	        	state.curtopicarticle=state.topichot
	        }
	        else{
	        	state.curtopicarticle=''
	        	state.curtopicarticle=state.tuijian
	        }
	    },
		[INITTIPICLIST] (state)
		{
			state.curtopicarticle=''
	        state.curtopicarticle=state.topichot
		}
	},
	getters: {
		getlists: (state) => {
		    return state.curlisttype
		},
		getnavlists: (state) => {
		    return state.navlist
		},
		getcurlist: (state) => {
		    return state.curlisttype
		},
		// 专题模块
		topicnavlist: (state) => {
		    return state.topicnavlists
		},
		gettopiclist: (state) => {
		    return state.curtopicarticle
		},
		topiccurarticle: (state) => {
		    return state.curtopicarticle
		}

	}
})

export default store


 