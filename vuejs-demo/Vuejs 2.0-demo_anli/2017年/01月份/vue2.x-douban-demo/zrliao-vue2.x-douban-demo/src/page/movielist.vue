<template>

  <section class="grid has-search-bar" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10" >
	    <h2>{{movieList.title}}</h2>
	    <div class="card" v-if="movieList.subjects.length > 0">
	      <router-link :to="{name: 'moviedetail', params: {id: item.id}}" class="item"
	                   v-for="item in movieList.subjects">
	        <div class="cover">
	          <div class="wp">
	            <img class="img-show" :src="item.images.medium"/>
	          </div>
	        </div>
	        <div class="info">
	          <h3>{{item.title}}</h3>
	        </div>
	      </router-link>
	    </div>
	    <spinner :show="loading"></spinner>
  </section>

</template>

<script>
  import spinner from './../components/spinner'

  import InfiniteScroll from 'vue-infinite-scroll'

  import {API_TYPE, fetchMoviesByType} from './../api/api'


  export default{
    data(){
      return {
        loading: true,
        type: '',
        movieList: {
          subjects: []
        },
        busy: false
      }
    },
    components: {
        spinner
    },
    directives: {
    	InfiniteScroll
    },
    computed: {
    },
    mounted(){
      this.type = this.$route.query.type;
      this.loadMore();
    },
    methods: {
      loadMore(){
        let start = this.movieList.subjects.length;
        this.busy = true;
        fetchMoviesByType(this.type, start)
                .then(data => {
                  this.movieList.title = data.title;
                  this.movieList.total = data.total;
                  this.movieList.subjects = this.movieList.subjects.concat(data.subjects);
                  if (this.movieList.subjects.length < this.movieList.total) {
                    this.busy = false;
                  }
                  this.loading = false;
                })
        }
    },
    destroyed(){
    }
  };
</script>