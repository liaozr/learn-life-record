
 
import * as types from '../mutation-types'

// 该模块的初始状态 
const state = { 
	topicnavlists:[
	  { 
		  type:'hot',
		  title:'热门' 
	  },
	  { 
		  type:'tuijian',
		  title:"推荐" 
	  }
    ],
    hot:[
        {   
        	img:require('../../assets/images/vue-demo-hot.jpg'),
        	type:'hot',
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
            img:require('../../assets/images/topic_3.jpg'),
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
        	img:require('../../assets/images/topic_3.jpg'),
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
        	img:require('../../assets/images/topic_1.jpg'),
            title:'推荐的诗',
            par:'诗，让你感受自己的心灵。\
                 岁的维持现场vdfsdfswesdsds 问问阿萨',            
            number:'4444',
            concern:'146.6',
            keys:'一般推荐的诗',
            time:'20160630'
        }
    ],
    curtopicarticle:[]
} 


// 相关的 mutations
const mutations = {
	[types.TOPICLISTCHANGE] (state,topictype){
        if(topictype=='hot')
        {
        	state.curtopicarticle=''
        	state.curtopicarticle=state.hot
        }
        else{
        	state.curtopicarticle=''
        	state.curtopicarticle=state.tuijian
        }
	},
	[types.INITTIPICLIST] (state)
	{
		state.curtopicarticle=''
        state.curtopicarticle=state.hot
	}
} 

export default { 
	state, 
	mutations 
}


