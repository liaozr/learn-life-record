<template>
	<div class="article-page">

	  <nav> <span class="search clearfloat"> <span class="input">
	    <input type="search" placeholder="搜索">
	    </span> <span class="search-icon"><i class="fa fa-search"></i></span> </span>
	  </nav>

	  <div class="article-list">
	    <ul class="btn-group">

	      <li v-for='topic in topicnavlist' :class="{'active': topic.type==topiccurarticle[0].type}" > <a @click='topiclistchange(topic.type)' href="#" v-link="{name:'topicarticle'}" class="v-link-active" v-text='topic.title'></a></li>

	      <!-- <li> <a href="#" class="v-link-active">推荐</a></li> -->
	    </ul>
	  </div>

	  <div class="topic_article_container">
	     <router-view></router-view>	
	  </div>
	</div>
</template>

<script>
    import {topicnavlist} from '../vuex/getters'
    import {topiccurarticle} from '../vuex/getters'

    import {topiclistchange} from '../vuex/actions'
    import {initTopiclist} from '../vuex/actions'
	export default{
		data(){
			return{

			}
		},
		vuex:{
			getters:{
				topicnavlist,
				topiccurarticle
			},
			actions:{
				topiclistchange,
				initTopiclist
			}
		},
		created() {
			this.initTopiclist()
		}
	}
</script>	

<style></style>