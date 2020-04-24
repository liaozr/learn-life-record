 <template>
	<div class="article-page">
	  <nav> 
	  	<span class="nav-text fir">
	  		<a href='javascript:void(0)'>发现</a>

	  	</span> 
	  	<span class="nav-text">
	  		<router-link to='/jingxuan'>2015精选</router-link>	
	  	</span>

	  	<span class="search clearfloat">
		  	<span class="input">
		       <input type="search" placeholder="搜索">
		    </span>
		    <span class="search-icon"><i class="fa fa-search"></i></span> 
	    </span> 
	  </nav>

	  <div class="article-list">
	    <ul class="btn-group">
           
	       <!--  <li v-for='nav in getnavlists' :class="{'active': getcurlist[0].type==nav.type}">
	           <a @click="getterlists(nav.type)" v-link="{name:'article'}" class="v-link-active" v-text='nav.title'></a>
	        </li> -->

          <!--      <router-link activeClass="active" v-for='(nav,index) in getnavlists' :to="'/' + nav.link " tag='li' @click="selected(index)"><a v-text='nav.title'></a></router-link> -->

	         <li v-for='nav in getnavlists' @click="getterlists(nav.type)" :class="{'active': getcurlist[0].type==nav.type}" >
	        	  <router-link to='/index/article' v-text='nav.title'></router-link>
	        </li>
 	    </ul>
	    <transition name='display'>           
                  <router-view></router-view>
        </transition>
	  </div>
	</div>
</template>		

<style></style>



<script>
    import { mapGetters, mapActions,mapMutations } from 'vuex'
	export default{
		data(){
			return {
				
			}
		},
		computed:{
           ...mapGetters(['getnavlists','getcurlist'])
		},
		methods:{
            // ...mapActions(['getterlists','getstartlist']),
            ...mapActions(['getstartlist']),
            ...mapMutations(['getterlists'])
		},
		created() {
			this.getstartlist()   //要先 执行这个this.getstarlist()，要不然上面那个getcurlist[0].type会报错的。
		} 
	}
</script>

<style>
.btn-group li.active{
	background-color:#de533a;
}
.btn-group li.active .active {
    background-color: #de533a;
}
.btn-group .active {
    background-color:white;
}
</style>
