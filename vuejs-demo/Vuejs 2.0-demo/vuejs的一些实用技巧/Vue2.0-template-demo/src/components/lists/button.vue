<template>
  <button class="qui-btn" @click="btnClickEvent">
    <slot name="icon"></slot>
    <span>{{msg}}</span>
  </button>
</template>

<script>
  export default {
    props: {
      msg: {
        default: '下载'
      }
    },
    methods: {
      btnClickEvent: function(){
        this.$emit('btnClickEvent');
      }
    }
  }
</script>
<style scoped lang='scss'>

    /*QUI button*/
    .qui-btn{
        position: relative;
        display: inline-block;
        border-radius: 2px;
        border:1px solid #C3C8CC;
        color: #000;
        box-sizing: border-box;
        font-size: 0;
        z-index:1;
    }
    .qui-btn .ico{
        display: inline-block;
        background-size: 100% 100%;
        position: relative;
        /*top:50%;*/
        /*-webkit-transform: translateY(-50%);*/
        /*transform: translateY(-50%);*/
        margin-right: 3px;
        width: 20px;
        height: 20px;
        vertical-align: -4px;
    }
    .qui-btn span {
        font-size: 14px;
        display: inline-block;
        height: 100%;
        /*line-height: 2;*/
        box-sizing: border-box;
    }
    .qui-btn.bor{
        border-color: transparent;
    }
    .bor:after{
        content: '';
        position: absolute;
        z-index: 1;
        border-radius:4px;
        background-color: transparent;
        border: 1px solid #C3C8CC;
        width: 200%;
        height: 200%;
        -webkit-transform:scale(.5);
        transform:scale(.5);
        -webkit-transform-origin: 0 0;
        transform-origin: 0 0;
        /*box-sizing: border-box;*/
        /*left: 0;*/
        /*top: 0;*/
        padding: 1px;
        left: -1px;
        top: -1px;
    }
    /*小尺寸按钮*/
    .qui-btn.small{
        min-width: 60px;
        text-align: center;
        height: 30px;
        line-height: 30px;
        /*margin: 0 5px;*/
    }
    /*带icon的按钮*/
    .qui-btn.icon{
        padding: 0 10px;
        min-width: auto;
        width: auto;
    }
    /*大尺寸按钮--一行展示一个*/
    .qui-btn.large{
        text-align: center;
        height: 40px;
        line-height: 40px;
        /*margin: 0 12px;*/
        display: block;
        width: 100%;
    }
    .qui-btn.large span {
        font-size: 18px;
    }
    /*中尺寸按钮--一行多个*/
    .qui-btn.middle{
        text-align: center;
        height: 40px;
        line-height: 40px;
        margin: 0 6px;
        flex: 1;
        padding: 0;
    }
    .qui-btn.middle span {
        font-size: 18px;
    }

    /*带背景色的按钮*/
    .qui-btn.bg:before{
        content: '';
        display: block;
        position: absolute;
        background-color: #eee;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        z-index: -1;
    }
    .qui-btn.bg.bor:before{
        padding: 1px;
        left: -1px;
        top: -1px;
    }

</style>

