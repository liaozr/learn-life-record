<template>
  <div :class="portalCss.headerView">
        <div :class="portalCss.logoBox"><img :src="logo" alt="" /></div>
        <div :class="portalCss.headerBars">
              <span :class="portalCss.who"><icon iconname="icon-user" :iconlabel="user.user_code || userName"></icon></span>
              <span :class="portalCss.operator">
                <span  @click="changePasswd"><icon iconname="icon-key" iconlabel="修改密码"></icon></span>
                <span  @click="loginOutAction"><icon iconname="icon-downaction" iconlabel="退出"></icon></span>
              </span>
        </div>



        <dialogtip :flag="exitTag" @dialogclick="confirmLogout" msg="你确定退出吗？">

        </dialogtip>
  </div>


</template>

<script>
import portalCss from './portal.css';
import logo from 'asset/img/logo.png';
import icon from "component/sprite/icon.vue";
import dialogtip from "component/dialog/dialogTip";
import storejs from "storejs";
import {getUser} from "stores/getters.js";
export default {
    data(){
      return {
        portalCss,
        logo: logo,
        exitTag: false,
        userName:"用户名"
      }
    },
    ready: function(){
        let userInfo = storejs("userInfo");
        if(userInfo) this.$set("userName", userInfo.user_code);
    },
    methods:{
      changePasswd: function(){

      },

      loginOutAction: function(){
          this.$set("exitTag", !this.exitTag)
      },

      confirmLogout: function(d, close) {
          if(d.action == "confirm") {
            storejs("userInfo", "");
            close();
            this.$router.go("/login");
          }
      }
    },
    vuex: {
        getters: {
           user: getUser
         }
    },
    components:{
      icon, dialogtip
    }

}
</script>
