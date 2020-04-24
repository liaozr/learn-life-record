
import { SHOW_DETAIL } from '../mutation-types' 
import { TOPICLISTCHANGE } from '../mutation-types' 
import {INITTIPICLIST} from '../mutation-types'

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
	[SHOW_DETAIL] (state, id) { 
		state.activeOrder = state.orders.find(function(ele) { //ele是 state.orders这个数组的每个数组成员
	    // ele.id则代表的是state.orders这个数组里面的各个成员（元素）的id值
		 return ele.id == id;   //在Order.vue组件里把actions showDetail(order.id) 传过来
		 // 返回值若为true的话，则代表的是 把Order这个组件里当前点击的这个数组成员 赋值给 state.activeOrder,
		 // 这样，state.activeOrder的值就是 组件Order当前点击的这个这个数组元素
		}); 
	},
	[TOPICLISTCHANGE] (state,topictype){
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
	[INITTIPICLIST] (state)
	{
		state.curtopicarticle=''
        state.curtopicarticle=state.hot
	}
} 

export default { 
	state, 
	mutations 
}


