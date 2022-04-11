<template>
  <div class="container">
     <div class="banner">
        <img src="~/assets/images/contact-us/banner.png" alt="">
     </div>
     <div class="section section1">
        <div class="section_box flex-column-center">
          <div class="imglogo">
            <img src="~/assets/images/contact-us/logo.png" alt="">
          </div>
          <div class="desc">
            华钜美科（深圳）信息科技有限公司，
            是一家专注美业领域数字化转型服务企业，
            提供从品牌包装到营销推广等一体化全域运营解决方案，
            以“互联网+”对传统行业进行优化升级转型，助力品牌快速匹配适合的线上渠道。
          </div>
          <div class="line"></div>
          <div class="list">
             <div class="img">
               <img src="~/assets/images/contact-us/icon1.png" alt="">
             </div>
             <div class="title">深圳市龙华新区汇海广场C座1306</div>
          </div>
          <div class="list">
             <div class="img">
               <img src="~/assets/images/contact-us/icon2.png" alt="">
             </div>
             <div class="title">18107307073</div>
          </div>
          <div class="list">
             <div class="img">
               <img src="~/assets/images/contact-us/icon3.png" alt="">
             </div>
             <div class="title">hjmk@hjmk1000.onexmail.com</div>
          </div>
          <baidu-map  class="map" :center="{lng: 114.033979, lat: 22.663336}" :zoom="zoom" @ready="handler">
            <bm-marker :position="{lng:  114.033979, lat: 22.663336}" :dragging="true" @click="infoWindowOpen" animation="BMAP_ANIMATION_BOUNCE">
               <bm-info-window :show="show" @close="infoWindowClose2" @open="infoWindowOpen2">
                 <p class="tel" v-text="infoWindow.tel"></p>
                 <p class="address" v-text="infoWindow.address"></p>
               </bm-info-window>
            </bm-marker>
            <bm-info-window
:position="{lng:  114.033979, lat: 22.663336}"
title="华钜美科（深圳）信息科技有限公司"
            :show="infoWindow.show"
@close="infoWindowClose"
@open="infoWindowOpen">
               <p class="tel" v-text="infoWindow.tel"></p>
               <p class="address" v-text="infoWindow.address"></p>
            </bm-info-window>
          </baidu-map>
        </div>
     </div>
     <pagefooter></pagefooter>
  </div>
</template>
<script>
export default {
  data() {
    return {
      center: { lng: 114.033979, lat: 22.663336 },
      zoom: 15,
      show: false,
      infoWindow: {
        show: true,
        tel: '18107307073',
        address: '深圳市龙华新区汇海广场C座1306'
      }
    }
  },
  computed: {
  },
  mounted() {
    this.$nextTick(() => {
      this.$wow.init()
    })
  },
  methods: {
    handler({ BMap, map }) {
      console.log(BMap, map)
      this.center.lng = 114.033979
      this.center.lat = 22.663336
      this.zoom = 14
    },
    infoWindowClose2() {
      this.show = false
    },
    infoWindowOpen2() {
      this.show = true
    },
    infoWindowClose(e) {
      this.infoWindow.show = false
    },
    infoWindowOpen(e) {
      this.infoWindow.show = true
    },
    clear() {
      this.infoWindow.tel = ''
      this.infoWindow.address = ''
    }
  }
}
</script>
<style lang="scss" scoped>
   .container{
     .section1{
       .section_box{
          .imglogo{
            img{
              width:170px;
              height:51px;
            }
          }
          .desc{
            font-size: 13px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #999999;
            width:95%;
            margin-top:30px;
            line-height: 25px;
          }
          .line{
            width: 23px;
            height: 2px;
            background-color: #C000FF;
            margin-top:15px;
          }
          .list{
            margin-top:20px;
            text-align: center;
            img{
               width:50px;
               height:50px;
            }
            .title{
              font-size: 14px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              color: #666666;
              margin-top:10px;
              margin-bottom:10px;
            }
          }
          .map{
            width: 100%;
            height: 350px;
            margin-top:20px;
            p.tel{
              background: url('~assets/images/contact-us/7.png') no-repeat;
              background-size: 16px 16px;
              padding-left:20px;
            }
            p.address{
              background: url('~assets/images/contact-us/6.png') no-repeat;
              background-size: 16px 16px;
              padding-left:20px;
            }
          }
       }
     }
  }
</style>
