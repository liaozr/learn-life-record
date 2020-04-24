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
  import {fetchSearchMovies} from './../api/api';

  export default{
    components: {
      spinner
    },
    directives: {
      InfiniteScroll
    },
    data(){
      return {
        loading: true,
        query: '',
        movieList: {
          subjects: []
        },
        busy: false
      }
    },
    mounted(){
      this.query = this.$route.query.query;
      this.loadMore()
    },
    watch: {
      '$route': 'loadAgain'
    },
    methods: {
      loadAgain(){
        this.movieList.subjects = [];
        this.busy = false;
        this.query = this.$route.query.query;
        this.loadMore();
      },
      loadMore(){
        let start = this.movieList.subjects.length;
        this.busy = true;
        fetchSearchMovies(this.query, start)
                .then(data => {
                  console.log(data)
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
<style lang="scss">

</style>