<template>
    <div class="download_container">
        <div class="download_content">
            <div class="page-left">
                <div class="logo">
                    <img src="../assets/images/jianshu_logo.1c609f8.jpg">
                </div>
                <div class="download_btn">
                    <ul class="download">
                        <li><a href="#"><i class="fa fa-android"></i>Android版</a></li>
                        <li><a href="#"><i class="fa fa-mobile"></i>iPhone版</a></li>
                    </ul>
                    <!-- <img src="../../assets/images/download_img1.png"> -->
                </div>
                <ul class="share_list">
                    <li>关注我们</li>
                    <li><i class="fa fa-qq"></i></li>
                    <li><i class="fa fa-weibo"></i></li>
                    <li><i class="fa fa-wechat"></i></li>
                </ul>    
            </div>
            <div class="app-img">
                <!-- <img src="../../assets/images/download_img2.png"> -->
            </div>    
        </div>
    </div>
</template>
<style>
    .download_content {
    width: 900px;
    margin: 0 auto;
    height: 568px;
    padding: 100px 0;
    text-align: center;
}
.page-left {
    padding-top: 50px;
    margin-right: 75px;
    text-align: center;
    display: inline-block;
    width: 347px;
    height: 457px;
}
.download_btn {
    margin-bottom: 15px;
}
.share_list {
    width: 347px;
    height: 22px;
    text-align: center;
}
.share_list li {
    display: inline-block;
    margin: 0 5px;
    color: #555;
}
.logo {
    /*background: url(../img/jianshu_logo.1c609f8.jpg);*/
    background-size: 100%;
    background-repeat: no-repeat;
    width: 252px;
    height: 123px;
    padding-bottom: 50px;
    border-bottom: 1px solid #e6e6e6;
    margin: 0 auto 60px;
}
.download_btn a {
    border-radius: 5px;
    text-align: center;
    line-height: 58px;
    display: inline-block;
    background-color: #8ef2a4;
    color: #fff;
    width: 180px;
    height: 58px;
    font-size: 20px;
}
.download_btn li {
    margin-bottom: 20px;
    list-style: none;
}
</style>