<template>
  <div ref="appContainer" class="app-container" :class="{'nofooter':$route.name == 'newsDetail'}">
    <div class="layout-header">
		<van-nav-bar :title="$route.meta.title">
			<template v-if="$route.name == 'newsDetail' " #left>
			  <van-icon @click="routeBack" name="arrow-left" />
			</template>
      <template v-else #left>
      	<div @click="needSlidebar" class="leftNav"></div>
      </template>
      <template v-if="$route.name == 'newsDetail' " #right>
        <span @click="showShare = true"  class="share"></span>
      </template>
		</van-nav-bar>
    </div>

	<van-share-sheet
	  v-model="showShare"
	  title="立即分享给好友"
	  :options="options"
	  @select="onSelect"
	/>
  <van-popup v-model="wechatshow">
     <div class="wechat">
        <div class="title">微信扫一扫：分享</div>
        <qrcode :value="qrcodeUrl" tag="img" :options="{ width: 180 }"></qrcode>
        <div class="tips">
          <p>微信里点"发现"，扫一下</p>
          <p>二维码便可将文本分享至朋友圈。</p>
        </div>
     </div>
  </van-popup>
  <van-popup v-model="qrcodeshow">
     <div class="wechat">
        <qrcode :value="qrcodeUrl"  tag="img" :options="{ width: 180 }"></qrcode>
        <div class="tips">
          <p>可将二维码图片保存本地分享</p>
        </div>
     </div>
  </van-popup>

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
    <div v-if="footerShow && $route.name !== 'newsDetail' " class="layout-footer">
      <div @click="gotoIndex('index')" class="list index" :class="{'active':$route.name == 'Home'}"></div>
      <div class="list" :class="{'active':$route.name == 'intoHuamei'}">
        <van-dropdown-menu  direction="up" active-color="#C000FF">
          <van-dropdown-item @change="menuChange(1,value1,option1)" @open="menuOpen(1,value1,option1)" v-model="value1" :options="option1" />
         </van-dropdown-menu>
      </div>
      <div class="list" :class="{'active':['meituanOperate','brandOperate','meitiOperate','siyuOperate'].includes($route.name)}">
       <van-dropdown-menu  direction="up" active-color="#C000FF">
         <van-dropdown-item @change="menuChange(2,value2,option2)" @open="menuOpen(2,value2,option2)" v-model="value2" :options="option2" />
        </van-dropdown-menu>
      </div>
      <div class="list" :class="{'active':['marketCase','contactUs','news','newsDetail'].includes($route.name)}">
       <van-dropdown-menu  direction="up" active-color="#C000FF">
         <van-dropdown-item @change="menuChange(3,value3,option3)" @open="menuOpen(3,value3,option3)" v-model="value3" :options="option3" />
        </van-dropdown-menu>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant'
import backTop from '@/components/backTop.vue'
export default {
  name: 'AppLayout',
  data() {
    return {
	  showShare: false,
      wechatshow: false,
      qrcodeshow: false,
      qrcodeUrl: '',
	  options: [
        { name: '微信', icon: 'wechat' },
        { name: '微博', icon: 'weibo' },
        { name: '复制链接', icon: 'link' },
        { name: '二维码', icon: 'qrcode' }
	  ],
	  slideShow: false,
      footerShow: true,
	  navList: [
		 {
		   name: '首页',
		   code: 'Home',
		   path: '/home'
		 },
		 {
		   name: '走进华美',
		   code: 'intoHuamei',
		   path: '/into-huamei'
		 },
		 {
		   name: '美团代运营',
		   code: 'meituanOperate',
		   path: '/meituan-operate'
		 },
		 {
		   name: '品牌运营',
		   code: 'brandOperate',
		   path: '/brand-operate'
		 },
		 {
		   name: '新媒体运营',
		   code: 'meitiOperate',
		   path: '/meiti-operate'
		 },
		 {
		   name: '私域运营',
		   code: 'siyuOperate',
		   path: '/siyu-operate'
		 },
		 {
		   name: '营销案例',
		   code: 'marketCase',
		   path: '/market-case'
		 },
		 {
		   name: '新闻资讯',
		   code: 'news',
		   path: '/news'
		 },
		 {
		   name: '联系我们',
		   code: 'contactUs',
		   path: '/contact-us'
		 }
	  ],
      tabbars: [
      ],
      value1: 0,
      value2: 0,
      value3: 0,
      option2: [
        { text: '美团代运营', value: 0, path: '/meituan-operate' },
        { text: '品牌运营', value: 1, path: '/brand-operate' },
        { text: '新媒体运营', value: 2, path: '/meiti-operate' },
        { text: '私域运营', value: 3, path: '/siyu-operate' }
      ],
      option3: [
        { text: '营销案例', value: 0, path: '/market-case' },
        { text: '新闻资讯', value: 1, path: '/news' },
        { text: '联系我们', value: 2, path: '/contact-us' }
      ],
      option1: [
        { text: '走进华美', value: 0, path: '/into-huamei' },
        { text: '公司文化', value: 1, path: '/into-huamei/culture' },
        { text: '团队风采', value: 2, path: '/into-huamei/elegant' },
        { text: '公司荣誉', value: 3, path: '/into-huamei/honor' }
      ],
	  oldNavType: 0
    }
  },
  components: {
    backTop
  },
  mounted() {
    console.log(111)
    console.log(this.$route)
    const path = this.$route.path
    const _this = this
    this.option1.forEach((item) => {
      if (item.path == path) {
        this.value1 = item.value
      }
    })
    this.option2.forEach((item) => {
      if (item.path == path) {
        this.value2 = item.value
      }
    })
    this.option3.forEach((item) => {
      if (item.path == path) {
        this.value3 = item.value
      }
    })
	if (this.$route.name == 'newsDetail') {
      this.value3 = 1
	}
  },
  methods: {
	gotoNews(){
	   this.value3 = 1 
	}, 
    onSelect(option) {
      console.log(option)
      if (option.icon == 'wechat') {
        this.qrcodeUrl = window.location.href
        this.wechatshow = true
      }
      if (option.icon == 'weibo') {
        const share = {
          title: '分享标题',
          image_url: '',
          share_url: window.location.href
        }
        location.replace('https://service.weibo.com/share/share.php?url=' + encodeURIComponent(share.share_url) + '&title=' + share.title + '&appkey=277159429&&ralateUid=&pic=' + share.image_url + '&searchPic=true')
      }
      if (option.icon == 'link') {
        Toast('复制成功')
        const url = window.location.href
        this.copyText(url)
      }
      if (option.icon == 'qrcode') {
        this.qrcodeUrl = window.location.href
        this.qrcodeshow = true
      }
      this.showShare = false
    },
    copyText(text) {
      const input = document.createElement('input')
      document.body.appendChild(input)
      input.setAttribute('readonly', 'readonly')
      input.setAttribute('value', text)
      input.select()
      input.setSelectionRange(0, text.length)
      try {
        document.execCommand('copy')
      } catch (err) { }
      document.body.removeChild(input)
    },
    routeBack() {
	  this.$router.push({
		  path: '/news'
	  })
    },
    menuEvent(type, value, arr) {
      let huameiType = ''
      let path = ''
      if (type == 1) {
		  if (value == 0) {
          huameiType = ''
		  }
		  if (value == 1) {
          huameiType = 'section3'
		  }
		  if (value == 2) {
          huameiType = 'section4'
		  }
		  if (value == 3) {
          huameiType = 'section6'
		  }
		  this.$store.dispatch('sethuemeiType', huameiType)
      }
      arr.forEach((item) => {
		   if (item.value == value) {
			 path = item.path
		   }
      })
      this.$router.push({
		  path: path
      })
    },
    menuChange(type, value, arr) {
	  this.menuEvent(type, value, arr)
    },
    menuOpen(type, value, arr) {
	  this.menuEvent(type, value, arr)
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
	  if (code == 'intoHuamei') {
        this.value1 = 0
        this.$store.dispatch('sethuemeiType', '')
	  }
	  if (code == 'meituanOperate') {
	  	this.value2 = 0
	  }
	  if (code == 'brandOperate') {
	  	this.value2 = 1
	  }
	  if (code == 'meitiOperate') {
	  	this.value2 = 2
	  }
	  if (code == 'siyuOperate') {
	  	this.value2 = 3
	  }
      if (code == 'marketCase') {
    	this.value3 = 0
      }
      if (code == 'contactUs') {
    	this.value3 = 2
      }
      if (code == 'news') {
    	this.value3 = 1
      }
	  this.$router.push({
        path: item.path
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
  .wechat{
    width:200px;
    height:auto;
    padding: 6px;
    box-sizing: border-box;
    .title{
      font-size:14px;
      text-align: center;
      margin-top:10px;
    }
    .tips{
      margin-top:0px;
      font-size: 12px;
      text-align: center;
      margin-top:-10px;
    }
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
 .layout-header{
   .van-nav-bar__left, .van-nav-bar__right{
     font-size: 20px;;
   }
   .van-nav-bar .van-icon {
      color:#323233;
   }
   span.share{
     width:18px;
     height:18px;
     background: url('~assets/images/news/icon1.png') no-repeat;
     background-size: 100%;
   }
 }
</style>
