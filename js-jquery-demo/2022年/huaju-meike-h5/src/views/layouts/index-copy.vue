<template>
  <div class="app-container">
    <div class="layout-header">
		<van-nav-bar :title="$route.meta.title">
			<template #left>
				<div @click="needSlidebar" class="leftNav"></div>
			</template>
		</van-nav-bar>
    </div>
	<transition name="toggle-cart">
		<div v-if="slideShow" class="layout_slider">
			<div @click="close" class="close">
				<img src="~/assets/images/common/icon12.png" alt="">
			</div>
			<div class="slideBar">
			   <div @click="routeTo(item)" v-for="item in navList" :key="item.id" class="list" :class="{'active':item.code == $route.name}">{{item.name}}</div>
			</div>
			<div @click="close" class="slidebg"></div>
		</div>
	</transition>
	<!-- <backTop @backtoTop="backtoTop">
		<div class="backTop">回到顶部</div>
	</backTop> -->
    <div class="layout-content">
      <keep-alive v-if="$route.meta.keepAlive">
        <router-view></router-view>
      </keep-alive>
      <router-view v-else></router-view>
    </div>
    <div class="layout-footer">
      <div @click="gotoIndex('index')" class="list index" :class="{'active':$route.name == 'Home'}"></div>
      <div class="list" :class="{'active':$route.name == 'intoHuamei'}">
        <van-dropdown-menu  direction="up" active-color="#C000FF">
          <van-dropdown-item @change="menuChange(1,value1)" @open="menuOpen(1,value1)" v-model="value1" :options="option1" />
         </van-dropdown-menu>
      </div>
      <div class="list" :class="{'active':['meituanOperate','brandOperate','meitiOperate','siyuOperate'].includes($route.name)}">
       <van-dropdown-menu  direction="up" active-color="#C000FF">
         <van-dropdown-item @change="menuChange(2,value2)" @open="menuOpen(2,value2)" v-model="value2" :options="option2" />
        </van-dropdown-menu>
      </div>
      <div class="list" :class="{'active':$route.name == 'yingxiao'}">
       <van-dropdown-menu  direction="up" active-color="#C000FF">
         <van-dropdown-item @change="menuChange(3,value3)" @open="menuOpen(3,value3)" v-model="value3" :options="option3" />
        </van-dropdown-menu>
      </div>
    </div>
  </div>
</template>

<script>
// import TabBar from '@/components/TabBar'
import { Toast } from 'vant'
import backTop from '@/components/backTop.vue'

export default {
  name: 'AppLayout',
  data() {
    return {
	  slideShow: false,
	  navList: [
		 {
		   name: '首页',
		   code: 'Home'
		 },
		 {
		   name: '走进华美',
		   code: 'intoHuamei'
		 },
		 {
		   name: '美团代运营',
		   code: 'meituanOperate'
		 },
		 {
		   name: '品牌运营',
		   code: 'brandOperate'
		 },
		 {
		   name: '新媒体运营',
		   code: 'meitiOperate'
		 },
		 {
		   name: '私域运营',
		   code: 'siyuOperate'
		 },
		 {
		   name: '营销案例',
		   code: 'marketingCase'
		 },
		 {
		   name: '新闻资讯',
		   code: 'news'
		 },
		 {
		   name: '联系我们',
		   code: 'contactUs'
		 }
	  ],
      tabbars: [
      ],
      value1: 0,
      value2: 0,
      value3: 0,
      option2: [
        { text: '美团代运营', value: 0 },
        { text: '品牌运营', value: 1 },
        { text: '新媒体运营', value: 2 },
        { text: '私域运营', value: 3 }
      ],
      option3: [
        { text: '营销案例', value: 0 },
        { text: '新闻资讯', value: 1 },
        { text: '联系我们', value: 2 }
      ],
      option1: [
        { text: '走进华美', value: 0 },
        { text: '公司文化', value: 1 },
        { text: '团队风采', value: 2 },
        { text: '公司荣誉', value: 3 }
      ],
	  oldNavType: 0
    }
  },
  components: {
    backTop
  },
  mounted() {
  },
  methods: {
    menuChange(type, value) {
      let path = '/home'
      if (type == 1) {
        switch (value) {
          case 0:
		 this.$store.dispatch('sethuemeiType', '')
            path = '/into-huamei'
            break
          case 1:
		 this.$store.dispatch('sethuemeiType', 'section3')
            path = '/into-huamei/culture'
            break
          case 2:
		 this.$store.dispatch('sethuemeiType', 'section4')
		 path = '/into-huamei/elegant'
		 break
          case 3:
		 this.$store.dispatch('sethuemeiType', 'section6')
		 path = '/into-huamei/honor'
		 break
          default:
            console.log('default')
        }
      }
      if (type == 2) {
        switch (value) {
		 case 0:
		  path = '/meituan-operate'
		  break
		 case 1:
		  path = '/brand-operate'
		  break
		 case 2:
		  path = '/meiti-operate'
		  break
		  case 3:
		   path = '/siyu-operate'
		   break
		 default:
		  console.log('default')
        }
      }
      if (type == 3) {
      }
      this.$router.push({
	  path: path
      })
    },
    menuOpen(type, value) {
      let path = '/home'
      if (type == 1) {
	  if (value == 0) {
	    path = '/into-huamei'
	  	this.$store.dispatch('sethuemeiType', '')
	  }
	  if (value == 1) {
          path = '/into-huamei/culture'
	  	this.$store.dispatch('sethuemeiType', 'section3')
	  }
	  if (value == 2) {
          path = '/into-huamei/elegant'
	  	this.$store.dispatch('sethuemeiType', 'section4')
	  }
	  if (value == 3) {
          path = '/into-huamei/honor'
	  	this.$store.dispatch('sethuemeiType', 'section6')
	  }
      }
      if (type == 2) {
	  if (value == 0) {
          path = '/meituan-operate'
	  }
	  if (value == 1) {
          path = '/brand-operate'
	  }
	  if (value == 2) {
          path = '/meiti-operate'
	  }
	  if (value == 3) {
          path = '/siyu-operate'
	  }
      }
      this.$router.push({
        path: path
      })
    },
    backtoTop(move) {
      clearTimeout(this.timer)
      cancelAnimationFrame(this.timer)
      const fn = () => {
		  const scrollY = document.documentElement.scrollTop
		  if (scrollY > 0) {
          document.documentElement.scrollTop = scrollY - move
          requestAnimationFrame(fn) || setTimeout(fn, 1000 / 60)
		  } else {
          cancelAnimationFrame(this.timer) || clearTimeout(this.timer)
		  }
      }
      this.timer = requestAnimationFrame(fn) || setTimeout(fn, 1000 / 60)
    },
    routeTo(item) {
	  this.slideShow = false
	  const code = item.code
	  let path = '/'
	  switch (code) {
	     case 'Home':
		    path = '/home'
		    break
	     case 'intoHuamei':
		    this.value1 = 0
          this.$store.dispatch('sethuemeiType', '')
		    path = '/into-huamei'
		    break
		 case 'meituanOperate':
		  this.value2 = 0
		  path = '/meituan-operate'
		  break
		  case 'brandOperate':
		  this.value2 = 1
		  path = '/brand-operate'
		  break
		 case 'meitiOperate':
		  this.value2 = 2
		  path = '/meiti-operate'
		  break
		  case 'siyuOperate':
		  this.value2 = 3
		  path = '/siyu-operate'
		   break
		  default:
		  console.log('default')
	  }
	  this.$router.push({
        path: path
	  })
    },
    close() {
	  this.slideShow = false
    },
    needSlidebar() {
	  this.slideShow = true
    },
    gotoIndex(type) {
	  this.value1 = 0
	  this.value2 = 0
	  this.value3 = 0
	  if (localStorage.huameiType) {
        localStorage.removeItem('huameiType')
	  }
	  if (type == 'index') {
		  this.$router.push({
			  path: '/'
		  })
	  }
    }
  }
}
</script>
<style lang="scss">
	.backTop{
		width:50px;
		height:50px;
		position: fixed;
		z-index:100;
		right:20px;
		bottom:80px;
		background-color: yellow;
	}

	.fade-enter-active, .fade-leave-active {
	  transition: opacity .5s;
	}
	.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
	  opacity: 0;
	}
	.toggle-cart-enter-active {
		transition: all 0.4s linear;
	}
	.toggle-cart-leave-active {
		transition: all 0.4s linear;
	}
	.toggle-cart-enter {
		transform: translateX(-200%);
	}
	.toggle-cart-leave-active {
		transform: translateX(-200%);
	}

  .layout_slider{
	   position: fixed;
	   overflow: hidden;
	   left:0;
	   right:0;
	   top:0;
       bottom:0;
	   background-color: rgba(0,0,0,0.8);
	   z-index:999;
	   .close{
		   width:18px;
		   height:18px;
		   img{
			 width:18px;
			 height:18px;
		   }
		   position: absolute;
		   left:55%;
		   top:2%;
	   }
	  .slidebg{
		position: fixed;
		left:180px;
		top:0;
		right:0;
		bottom:0px;
		z-index:1000;
	  }
	  .slideBar{
		  position: fixed;
		  left:0;
		  top:0;
		  bottom:0px;
		  width:180px;
		  z-index:1000;
		  background: #FFFFFF;
		  box-shadow: 6px 0px 20px 0px rgba(23, 26, 26, 0.2);
		  .list{
			  width:100%;
			  height:50px;
			  line-height: 50px;
			  font-size:14px;
			  font-family: Microsoft YaHei;
			  font-weight: 400;
			  border-bottom: 1px solid #ECECEC;
			  box-sizing: border-box;
			  text-indent: 4em;
			  color: #333333;
			  &.active{
				  color: #C000FF;
			  }
		  }
		}
    }
  .leftNav{
    background: url('~assets/images/common/icon0.png') no-repeat;
    background-size:18px 18px;
    width:18px;
    height:18px;
  }
 .layout-footer{
    display: flex;
    position: fixed;
    left:0;
    right:0;
    width:100%;
    bottom:0;
    height:50px;
    z-index:200;
    background: #FFFFFF;
    box-shadow: 0px -2px 40px 0px rgba(0, 0, 0, 0.1);
    .list{
      box-sizing: border-box;
      text-align: center;
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      width:29%;
      line-height:50px;
      &:not(:last-child){
        border-right:.5px solid#ECECEC;
      }
      &.index{
        width:50px;
        height:100%;
         background: url('~assets/images/common/icon2.png') no-repeat;
         background-size:18px 18px;
         background-position: center center;
		 &.active{
		   background: url('~assets/images/common/icon1.png') no-repeat;
		   background-size:18px 18px;
		   background-position: center center;
		 }
      }
    }
  }
 .layout-footer .list.active .van-dropdown-menu__title--down .van-ellipsis{
    color:#C000FF;
 }
</style>
