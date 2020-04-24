<?php
    $base64_string1 = $_REQUEST["img1"];
	$base64_string2=$_REQUEST["img2"];
    $savename1 = uniqid().'a'.'.jpeg';//localResizeIMG压缩后的图片都是jpeg格式
	  $savename2 = uniqid().'b'.'.jpeg';
    $savepath1 = 'uploadIMG/'.$savename1; 
	$savepath2 = 'uploadIMG/'.$savename2; 
    $image1 = base64_to_img( $base64_string1, $savepath1);
	$image2 = base64_to_img( $base64_string2, $savepath2);
    if($image){
        echo '{"status":1,"content":"上传成功","url":"'.$image.'"}';
    }else{
        echo '{"status":0,"content":"上传失败"}';
    } 

    function base64_to_img( $base64_string, $output_file ) {
        $ifp = fopen( $output_file, "wb" ); 
        fwrite( $ifp, base64_decode( $base64_string) ); 
        fclose( $ifp ); 
        return( $output_file ); 
    } 
?>