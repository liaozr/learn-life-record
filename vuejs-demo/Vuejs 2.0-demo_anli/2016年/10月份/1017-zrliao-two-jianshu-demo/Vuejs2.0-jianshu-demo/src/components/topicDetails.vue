 <template>
	<div class="article-page">

	  <nav> <span class="search clearfloat"> <span class="input">
	    <input type="search" placeholder="搜索">
	    </span> <span class="search-icon"><i class="fa fa-search"></i></span> </span>
	  </nav>

	  <div class="article-list">
	    <ul class="btn-group">

	<!--       <li v-for='topic in topicnavlist' :class="{'active': topic.type==topiccurarticle[0].type}" > <a @click='topiclistchange(topic.type)' href="#" v-link="{name:'topicarticle'}" class="v-link-active" v-text='topic.title'></a>
	      </li> -->

	      <li v-for='topic in topicnavlist' @click="topiclistchange(topic.type)" :class="{'active': topic.type==topiccurarticle[0].type}" >
	        	  <router-link to='/topic/articleTopic' v-text='topic.title'></router-link>
	      </li>
	    </ul>
	  </div>

	  <div class="topic_article_container">
	     <router-view></router-view>	
	  </div>
	</div>
</template>

<script>
    // import {topicnavlist} from '../vuex/getters'
    // import {topiccurarticle} from '../vuex/getters'

    // import {topiclistchange} from '../vuex/actions'
    // import {initTopiclist} from '../vuex/actions'

    import { mapGetters, mapActions } from 'vuex'
	export default{
		data(){
			return{

			}
		},
		computed:{
           ...mapGetters(['topicnavlist','topiccurarticle'])
		},
		methods:{
            ...mapActions(['topiclistchange','initTopiclist'])
		},
		created() {
			this.initTopiclist()   //要先 执行这个this.getstarlist()，要不然上面那个getcurlist[0].type会报错的。
		} 
	}
</script>	

<style></style>