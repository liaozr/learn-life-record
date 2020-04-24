<template>
	<div class="article-page">
	  <nav> 
	  	<span class="nav-text fir"><a link='javascript:void(0)'>发现</a></span> 
	  	<span class="nav-text"><a  v-link="{name:'jingxuan'}">2015精选</a></span>
	  	<span class="search clearfloat">
		  	<span class="input">
		       <input type="search" placeholder="搜索">
		    </span>
		    <span class="search-icon"><i class="fa fa-search"></i></span> 
	    </span> 
	  </nav>

	  <div class="article-list">
	    <ul class="btn-group" v-if="getcurlist[0].type">
	    <!--   <li class="active"> <a @click="getterlists(hot)" v-link="{name:'article'}"  class="v-link-active">热门</a></li> -->

	     <!--  <li v-for='nav in getnavlists' :class="{'active': getcurlist[0].type==nav.type}">
	         <a @click="getterlists(nav.type)" v-link="{name:'article'}" class="v-link-active" v-text='nav.title'></a>
	      </li>  -->
           
	        <li v-for='nav in getnavlists' :class="{'active': getcurlist[0].type==nav.type}">
	           <a @click="getterlists(nav.type)" v-link="{name:'article'}" class="v-link-active" v-text='nav.title'></a>
	        </li>
	       
 	    </ul>
	    <router-view></router-view>	
	  </div>
	</div>
</template>		

<style></style>



<script>
    import { getcurlist }  from '../vuex/getters'
    import { getnavlists } from '../vuex/getters'

    import { getterlists } from '../vuex/actions'
    import { getstartlist } from '../vuex/actions'
	export default{
		data(){
			return {
				
			}
		},
		created(){
			this.getstartlist()
		},
		vuex:{
			actions:{
				getterlists,
				getstartlist
			},
			getters:{
                getnavlists,
                getcurlist
			}
		}	 
	}
</script>

