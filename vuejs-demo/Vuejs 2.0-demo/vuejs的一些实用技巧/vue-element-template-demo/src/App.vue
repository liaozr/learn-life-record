 <template>
    <div id="app" ref="countryGardenApp">
        <router-view v-if="isRouterAlive"></router-view>
    </div>
</template>

<script>
  export default {
    name: 'App',
    provide (){
      return {
         reload:this.reload
      }
    },
    data() {
      return {
        isRouterAlive:true
      }
    },
    components: {
    },
    methods: {
      reload () {
         this.isRouterAlive = false
         this.$nextTick(function(){
          this.isRouterAlive = true
         })
      }   
    }
  }
</script>

<style lang="scss">
</style>