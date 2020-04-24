
let dialogBase = {
    props:{
      flag: {                           // 控制对话框显示和隐藏外部开关
        type: Boolean,
        default: false
      },
      modalshow: {                     // 控制对话框显示和隐藏内部开关
        type: Boolean,
        default: false
      },
      events:{
        type: Object,
        default: function(){
          return {
            footerClick: function(d){

            }
          }
        }
      },
      buttons:{
        type: [],
        default: () => [{name:"取消", icon:"icon-close1", action:"close"},{name:"确定", icon:"icon-check", action:"confirm", type:"btn-primary"}],
      },
      title:{                          // 标题
        type: String,
        default:"标题"
      }
    },
    data: function () {
      return {
        btnEvent: {
          btnClick: function(d) {
            if(d.action == "close") this.hide()
            this.events.footerClick.call(this._context, d, this.hide);
            this.$dispatch("dialogclick", d, this.hide);
          }
        }
      }
    },
    computed: {},
    ready: function () {},
    attached: function () {},
    methods: {
      hide() {
          this.modalshow = false;
      }
    },
    watch:{
      "flag": function(){
          this.modalshow = !this.modalshow;
      }
    },
}

export default dialogBase
