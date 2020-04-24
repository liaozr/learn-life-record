<template>
    <div :class="lCss.loginBox">
          <div :class="lCss.loginIn">
              <div :class="lCss.centerIn">
                  <img :src="logo1" alt="" :class='lCss.logo' />
                  <div :class="lCss.loginForm">
                      <div :class="lCss.loginFormIn">
                            <div :class="lCss.loginFormRow">
                                  <span :class='lCss.loginTitle'>用户登录</span>
                            </div>
                            <div :class="lCss.loginFormRow">
                                  <icon iconname="icon-user" :classname="lCss.iconinfo"></icon>
                                  <input type="text" placeholder="请输入用户名" name="name" :value="userName" v-model="userName">
                            </div>


                            <div :class="lCss.loginFormRow">
                                  <icon iconname="icon-key"  :classname="lCss.iconinfo"></icon>
                                  <input type="password" placeholder="请输入密码" name="name" :value="passwd" v-model="passwd">
                            </div>
                            <div :class="lCss.errorTip" v-show="error">
                                {{error}}
                            </div>
                            <div :class="lCss.loginFormRow">
                                  <checkbx :datas="ckData" :events="checkedEevents"></checkbx>
                            </div>
                            <div :class="lCss.loginFormRow">
                                  <btn btnname="btn-red" @clickaction="clickAction">登录</btn>
                            </div>
                      </div>
                  </div>
              </div>
          </div>
    </div>
</template>

<script>
import lCss from "./login.css";
import logo1 from "asset/img/logo1.png";
import icon from "component/sprite/icon";
import btn from "component/sprite/button";
import checkbx from "component/checkbox/checkBox";
import {setUser} from "actions/index.js";
import storejs from "storejs";
export default {
  data: function () {
    return {
      lCss,
      logo1: logo1,
      ckData:[{label:"记住密码", checked: false}],
      checkedEevents: {
        checkClick: function(checked){
            this.$set("remember", checked);
        }
      },
      userName:storejs("userName") || "fn_456",
      passwd:storejs("passwd") || "123456",
      remember:false,
      error:""
    }
  },
  computed: {},
  ready: function () {
    console.log(storejs("userInfo"));
    if(storejs("userInfo"))  this.$router.go({path:"/index"});
    this.$nextTick(function () {
       this.$el.style.height = window.innerHeight + "px";
    });
    if(this.userName && this.passwd) {
      this.$set("ckData", [{label:"记住密码", checked: true}]);
      this.$set("remember", true);
    }
  },
  attached: function () {},
  methods: {
    clickAction: function(){
        if(!this.userName || this.userName == "") {
            this.showTips("请填写用户名"); return false;
        }
        else if(!this.passwd || this.passwd == "") {
            this.showTips("请填写密码"); return false;
        }
        // 记住用户名和密码
        if(this.remember) {
           storejs("userName", this.userName); storejs("passwd", this.passwd);
        }
        else {
          storejs("userName", ""); storejs("passwd", "");
        }

        this.loginAction();
    },

    loginAction: function(){
        this.$http.post(this.$Api + "login",{"user_code": this.userName,"passwd": this.passwd}).then((res) => {
              let d = res.json();
              if(d.code == 200) {
                storejs({"userInfo": d.data});
                setUser(this.$store, d.data);
                this.$router.go({path:"/index"});
              }
        },(error) => {
             this.showTips(error.msg);
        })
    },

    showTips: function(msg){
          this.$set("error", msg);
          setTimeout(()=>{
                this.$set("error", "");
          }, 2000);
    }
  },
  components: {icon, btn, checkbx}
}
</script>
