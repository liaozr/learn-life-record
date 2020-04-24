<template>
  <div id="app">
      <cHeader></cHeader>
      <div class="content">
      	  
          <span style='margin-top:20px;display:inline-block;'>这里是登录页</span>

          <div class="cccc">
             <div class="tr">
               <label for="username">用户名：</label>
               <input type="text" v-model='username'>
             </div>

             <div class="tr">
               <label for="username">密码：</label>
               <input type="password" v-model='userpass'>
             </div>

             <div class="tr">
                <div @click='login' class="login">登录</div>
             </div>
          </div>


      	  <div @click='dianji($event)' class="bb">代码块代码块代码块代码块代码块代码块代码块</div>

      	  <div class="aa"><label for="">1213</label><input type="text"></div>

      	  <button>按钮</button>

      	  <div class="cc">111111111111111111</div>
      	  <img src="~assets/images/aaa.png" />
      	  <div class="image"></div>

      	  <div class="aaa">{{xxx}}</div>

      </div>
  </div>	
</template>	

<script>

   import cHeader from '@c/header/header'
   import * as utils_types from '@u/index'

   import { mapActions } from 'vuex'

   import { getToken, setToken, removeToken } from '@u/auth';

   import http from '@a/http'

   
   export default {
        name: 'app',
        data() {
          return{
              xxx:'',
              items:[ '1', '2','3','4'],
              imgitems:[
                   {
                    url:require('assets/images/ccc1.png')
                   },
                   {
                    url:require('assets/images/ccc2.png')
                   },
                   {
                    url:require('assets/images/ccc3.png')
                   }
              ],
              username:'',
              userpass:'',
              clickFlag:true
          }
        },
        components:{
          cHeader
        },
        methods:{
          login(){
            if(this.username !== '' && this.userpass !== ''){
              var user={
                tenantId: 'humello',
                userName: this.username,
                password: this.userpass,
                userType: 10,
                esn: '',
                clientId: '63e4205c2c06c68f1241e0426a49f271'

              }
              var _this=this;

              if( this.clickFlag ){

                  this.clickFlag=false;

                  async function loginDenglu(){
                    return await http.ajax('/system/user/login','get',user)
                  }  
                  
                  loginDenglu().then( res => {
                      console.log('登录信息2333333333333333')
                      console.log(res)
                      alert('登录成功')
                      // 登录成功 存储鉴权
                      var token='AES_PB53g0yfq4QQXGnpJkqpDxtrW11IJGGuaD4inbFdfaSaB6+sgE9iQXypZtg3DvrjXRWdDYaYV6SYIX2N3ju/8gODYqt/q0umQ+jGjV+F98Jkc08s1AsHML0AQq+0rWue2h6AHaci3wRdV0M3Vqcy4qw/Jes/rTHl403Tt3Xv8gs7k0Bxao8oyugnxYjRfcMnGOcoe62T68EGhCTCqm+z9e++oOFc7qgt5HcH4l78SeeomZ1sa1FZp7UAopXSEoTGgTwzXsx0lAfcgjoK2Hi4yoxcT5FxpsDbiMWCV2+Xko01bLV4TKp1NQwNCc3daYIeOh9cEBEwdAyD9Oasby5nI7+R9ERqSUNp6hDw/p+gKbs='

                      this.$store.dispatch('getToken',token)
                      setToken(token);
                      this.$store.dispatch('usersignin',user)
                      
                      // 登录成功后，跳转到相应的路由。
                      let redirect = decodeURIComponent(this.$route.query.redirect || '/');
                      this.$router.push({
                        path: redirect
                      })
                      // this.$router.push(this.$route.query.redirect || '/')
                  }).then(function(){
                     _this.clickFlag=true;
                  })

              }
              
            }else{
              alert('请先填写登录信息')
            }
          },
        	dianji(e){
        	},
          auth(){

          }
        },
        mounted(){
        }
    }
	 
</script>

<style lang='scss' scoped>
	#app{
       @include center;
	}
	.bb{
		width:100px;
		height:35px;
		@include text-overflow(2)
		@include opacity(0.6)
		@include border-radius(10px)
		@include posi-abs(0px, 0px, 0px, 0px)
		@include text-indent(2);
		@include posi-rel;

		@include border(all,red)
		@include margin(top,20px)
	}
	label,input{
		@include  inline-block(middle)
	}
	button{
		@include disabled
		@include prefix(transform, rotate(45deg), webkit ms);
		@include float(left,30px)
	}
	.cc{
		@include size
		@include padding(top,30px)

		@include background('~assets/images/ccc.png',right center,50px 50px)

		/*background-image:url('~assets/images/aaa.png');*/

	}
  .cccc{
    border-bottom:1px solid red;
    padding-bottom:20px;
    .tr{
      margin-top:34px;
      input{
        height:30px;
        line-height:30px;
        border:1px solid #ddd;
      }
    }

  }

  .login{
    width:80px;
    height:40px;
    line-height:40px;
    text-align:center;
     margin:0 auto;
     border:1px solid #ccc;
     border-radius:5px;
  }
  
	
</style>

 