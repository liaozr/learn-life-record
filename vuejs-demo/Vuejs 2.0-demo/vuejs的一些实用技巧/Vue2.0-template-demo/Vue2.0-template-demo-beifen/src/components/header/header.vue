 <template>
   <div class="header">
   	    <!-- <section class="header-goback" v-show=" $route.name !=='home' && $route.name !=='axiosdata' && $route.name !=='elmHome' && $route.name !=='user' && $route.name !=='login' &&  $route.name !== undefined   "  @click="goback">
            <span> < </span>
        </section> -->
        
        <section class="header-goback"  v-show="!$route.meta.navShow"  @click="goback">
            <span> < </span>
        </section>

        <span class="header-title" v-wechat-title="$route.meta.title" img-set="../static/images/favicon.ico" v-text='$route.meta.title'></span>
   </div>
</template>

<script>
    export default {
      data(){
        return{
          
        }
      },
      methods:{
         goback(){

            this.$store.dispatch("slideRight")
            this.$router.go(-1)
         }
      },
      computed:{
      }
    }

</script>

<style lang="scss" scoped>
    
   .header{
	   	&-goback{
		   	display: block;
		    top: 0.05rem;
		    position: absolute;
		    left: 0.32rem;
	    }
	    &-title{

	    }
   }

   svg:not(:root) {
    overflow: auto;
   }

</style>
