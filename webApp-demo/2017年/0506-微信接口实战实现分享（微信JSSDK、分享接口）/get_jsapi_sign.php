 <?php
	   /**
     * 用于微信JS-SDK
     */
    include_once 'includeRedPackApp.php';
    include_once SERVICE_PATH.'/lib/config/WxShare.config.php';
    include_once SERVICE_PATH.'/wxapi/Wx_Common_Util.php';
    $share_url = $_POST['share_url'];
    $share_url =  explode('#',$share_url);
    $wxBaseInterface_util = new WxBaseInterface_util();
    $signPackage = $wxBaseInterface_util->getSignPackage($share_url[0]);
    $shareData = array(
        'share_app_url'=>WxShare::SHARE_APP_URL,
        'share_app_title' => WxShare::SHARE_APP_TITLE,
        'share_app_imgurl' => WxShare::SHARE_APP_IMGURL,
        'share_app_desc' => WxShare::SHARE_APP_DESC
    );
    if($signPackage) {
    	//向前台返回一个json对象
        echo json_encode(array('message'=>'js签名成功','data'=>$signPackage, 'shareData'=>$shareData,'code'=>0));
    } else {
        echo json_encode(array('message'=>'js签名失败','data'=>array(),'code'=>-1));
    }
    exit();
?>
