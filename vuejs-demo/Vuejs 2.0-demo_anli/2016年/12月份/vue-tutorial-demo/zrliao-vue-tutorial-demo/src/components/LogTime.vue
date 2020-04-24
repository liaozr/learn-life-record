<template>
  <div class="form-horizontal">

      <div class="form-group">
          <div class="col-sm-6">
            <label>日期</label>
            <input
              type="date"
              class="form-control"
              :value='date'
              @input='datechange($event.target.value)'
              placeholder="Date"
            />
          </div>
          <div class="col-sm-6">
            <label>时间</label>
            <input
              type="number"
              class="form-control"
              :value='totaltime'
              @input='totaltimechange($event.target.value)'
              placeholder="Hours"
            />
          </div>
      </div>

      <div class="form-group">
          <div class="col-sm-12">
            <label>备注</label>
            <input
              type="text"
              class="form-control"
              :value='commitss'
              @input='commitchange($event.target.value)'
              placeholder="Comment"
            />
          </div>
      </div>

      <button class="btn btn-primary" @click="save()">保存</button>
 
      <button class="btn btn-danger" @click="cancel">取消</button>
      <hr>
  </div>
</template>

<script>
    import { mapActions } from 'vuex'
    export default{
      data() {
        return{
            date:'',
            totaltime:'',
            commitss:''
        }
      },
      methods:{
        ...mapActions(['datechange','totaltimechange','commitchange','setNewplan']),
        save(){

          // this.$store.dispatch('save')
          // this.$router.push({ path: '/time-entries' })

          // this.$router.go(-1)
          
          // 也可以这么写的
          this.$store.dispatch('save', 100).then(() => {
              this.$router.push({ path: '/time-entries' })
          })

        },
        cancel(){
          this.$store.dispatch('cancel',100).then(() =>{
             this.$router.push({path:'/time-entries'})
          })
        }
      },
      mounted(){
         this.setNewplan()
      }
    }
</script>
