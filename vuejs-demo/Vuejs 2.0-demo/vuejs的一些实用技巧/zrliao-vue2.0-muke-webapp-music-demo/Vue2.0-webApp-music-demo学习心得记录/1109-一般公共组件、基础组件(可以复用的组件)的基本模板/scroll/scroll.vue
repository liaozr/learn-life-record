<template>
  <div ref='wrapper'>
     <slot></slot>    
  </div>
</template>

<script>
    import BScroll from 'better-scroll'
    export default{
        data(){
            return{

            }
        },
        props:{
            probeType:{
                type:Number,
                default:1
            },
            click:{
                type:Boolean,
                default:true
            },
            lists:{
                type:Array,
                default:[]
            }
        },
        methods:{
            initScroll(){
                if(!this.$refs.wrapper){
                   return
                }else{
                    this.scroll=new BScroll(this.$refs.wrapper,{
                        probeType:this.probeType,
                        click:this.click
                    })
                }
            },
            enable(){
                this.scroll && this.scroll.enable()
            },
            disable(){
                this.scroll && this.scroll.disable()
            },
            refresh(){
                this.scroll && this.scroll.refresh()
            },
            test(){
                console.log("测试父子组件中的ref 与 children 属性的 通信")
            }
        },
        watch:{
          lists(){
             setTimeout(() =>{
                 this.refresh()
             },20)
          }
        },
        mounted(){
            setTimeout(() =>{
                this.initScroll()
                console.log("qqqqqq")
                console.log(this.lists)
                console.log("bbbbbbbbbbbbb")
            },20)
        }
    }
</script>
