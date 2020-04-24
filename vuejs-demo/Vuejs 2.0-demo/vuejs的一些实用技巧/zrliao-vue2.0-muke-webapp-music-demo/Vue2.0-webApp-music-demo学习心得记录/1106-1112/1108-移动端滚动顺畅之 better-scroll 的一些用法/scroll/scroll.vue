
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

                    //  better-scroll 组件的初始化
                    this.scroll = new BScroll(this.$refs.wrapper,{
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

             // 监听 lists 数据的变化，数据发生变化， 则 执行 刷新 better-scroll 组件的 方法。

             setTimeout(() =>{

                 this.refresh()

                 // refresh() 是刷新 整个 better-scroll组件，让它 重新 获取 组件内 的 宽高 属性。
                // 从而 冲高 容器的 高度等等，从而 获取列表滚动的条件。

             },20)

          }
        },
        mounted(){

            // 在 mounted 钩子里面 初 始 化 better-scroll 组件。
            setTimeout(() =>{
                this.initScroll()
            },20)

        }
    }
</script>
