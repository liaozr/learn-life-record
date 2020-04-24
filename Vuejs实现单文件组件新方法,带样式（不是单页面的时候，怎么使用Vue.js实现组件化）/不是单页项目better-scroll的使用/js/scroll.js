
// 项目的公共组件，为了后期维护的好找，所有的组件都得写上 组件名字，方便查找

// ---------------------------------------------------------------------------------------------------
//heredoc方法输出注释中的组件代码
function heredoc(fn){
  return fn.toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1];
}
// ---------------------------------------------------------------------------------------------------

//scroll组件
document.write(heredoc(function(){
/*
<style>
</style>
<script type="text/x-template" id="scroll">
    <div ref='wrapper'>
       <slot></slot>    
    </div>
</script>
<script>
    Vue.component('scroll', {
        template: "#scroll",
        props: {
            probeType: {
                type: Number,
                default: 1
            },
            click: {
                type: Boolean,
                default: true
            },
            scrollX: {
                type: Boolean,
                default: false
            },
            lists: {
                type: Array,
                default: []
            },
            listenScroll: {
                type: Boolean,
                default: false
            },
            pullup: {
                type: Boolean,
                default: false
            },
            pulldown: {
                type: Boolean,
                default: false
            },
            beforeScroll: {
                type: Boolean,
                default: false
            },
            refreshDelay: {
                type: Number,
                default: 20
            }
        },
        methods: {
            initScroll: function() {
                var _this2 = this;
                if (!this.$refs.wrapper) {
                    return;
                }
                this.scroll = new BScroll(this.$refs.wrapper, {
                    probeType: this.probeType,
                    click: this.click
                });
                if (this.listenScroll) {
                    var _this = this;
                    this.scroll.on("scroll", function (pos) {
                        _this.$emit('scrollpos', pos);
                    });
                }
                if (this.pullup) {
                    this.scroll.on('scrollEnd',function () {
                        if (_this2.scroll.y <= _this2.scroll.maxScrollY + 50) {
                            _this2.$emit('scrollToEnd');
                        }
                    });
                }
                if (this.pulldown) {
                    this.scroll.on('touchend', function (pos) {
                        if (pos.y > 50) {
                            _this2.$emit('pulldown');
                        }
                    });
                }
                if (this.beforeScroll) {
                    this.scroll.on('beforeScrollStart', function () {
                        _this2.$emit('beforeScroll');
                    });
                }
            },
            enable: function() {
                this.scroll && this.scroll.enable();
            },
            disable: function() {
                this.scroll && this.scroll.disable();
            },
            refresh: function() {
                this.scroll && this.scroll.refresh();
            },
            scrollTo: function() {
                this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments);
            },
            scrollToElement: function() {
                this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments);
            }
        },
        watch: {
            lists:function() {
                var _this3 = this;
                setTimeout(function () {
                    _this3.refresh();
                }, this.refreshDelay);
            }
        },
        mounted:function() {
            var _this4 = this;
            setTimeout(function () {
                _this4.initScroll();
            }, 20);
        }
    });
</script>
*/})) // 这里不能换行，否则会报错

// ---------------------------------------------------------------------------------------------------

 

       