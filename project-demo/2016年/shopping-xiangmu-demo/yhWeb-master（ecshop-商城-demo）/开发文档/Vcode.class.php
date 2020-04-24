--------------------------------

check_code    此代码来自OSCHINA

----------------------------

<?php
// +------------------------------------------------------------------------
// 验证码类，该类的对象能动态获取验证码图片,验证码字符保存在SESSION['code']中
// +------------------------------------------------------------------------
// 支持4种格式 数字 字母 汉字 混合
// +------------------------------------------------------------------------
// @Author : HelloChina(sanzi0930@163.com)
// +------------------------------------------------------------------------
// @Date: 2012年6月7日11:03:00
// +------------------------------------------------------------------------
// @version 1.0
// +------------------------------------------------------------------------


class Vcode
{
    protected $width; //验证码宽度
    protected $height; //验证码长度
    protected $codeNum; //验证码字符个数
    protected $codeType; //验证码类型
    protected $fontSize; //字符大小
    protected $fontType; //字体类型
    protected $codeStr; //中文内容
    protected $strNum; //中文个数
    protected $imageType; //输出图片类型
    protected $image; //图片资源
    protected $checkCode; //验证码内容

    /**
     *+--------------------------------------------------------------------------------
     * 取得验证码信息
     *+--------------------------------------------------------------------------------
     * @param integer $width 验证码宽度
     * @param integer $height 验证码高度
     * @param integer $codeNum 验证码字符个数
     * @param integer $codeType 验证码字符类型 1为数字 2为字母 3为汉字 4为混编
     * @param integer $fontSize 验证码字体的大小
     * @param string $fontType 验证码字体类型
     * @param string $imageType 验证码输出图片类型
     * @param string $codestr 中文验证码内容
     *+--------------------------------------------------------------------------------
     */
    public function __construct($width = 100, $height = 50, $codeNum = 4, $codeType = 4, $fontSize = 12, $fontType = 'heiti.ttf', $imageType = 'jpeg', $codeStr = '去我饿人他一哦平啊是的飞个好就看了在想才吧你吗')
    {
        $this->width = $width;
        $this->height = $height;
        $this->codeNum = $codeNum;
        $this->codeType = $codeType;
        $this->fontSize = $fontSize;
        $this->fontType = $fontType;
        $this->codeStr = $codeStr;
        $this->strNum = strlen($this->codeStr) / 3 - 1;
        $this->imageType = $imageType;
        $this->checkCode = $this->getCheckCode();
    }


    //+--------------------------------------------------------------------------------
    //* 生成验证码字符
    //+--------------------------------------------------------------------------------
    //* @return string
    //+--------------------------------------------------------------------------------
    public function __toString()
    {
        $string = implode('', $this->getCheckCode());
        $key_class = $_GET["key_class"];
        session_start();
        if ($key_class == 1) {
            $_SESSION["sLogin"] = $string;
        }
        if ($key_class == 2) {
            $_SESSION["sReg"] = $string;
        }
        if ($key_class == 3) {
            $_SESSION["sRec"] = $string;
        }
// $_SESSION["sLogin"]=$string;  //登陆session中
        $this->getImage();              //输出验证码
        return '';
    }

    protected function getCheckCode()
    {
        $string = array();
        switch ($this->codeType) {
            case 1:
//数字字符串
                $string = array_rand(range(0, 9), $this->codeNum);
                break;
            case 2:
//大字母字符串
                $string = array_rand(array_flip(range('A', 'Z')), $this->codeNum);
                break;
            case 3:
//汉字字符串

                for ($i = 0; $i < ($this->codeNum); $i++) {
                    $start = mt_rand(0, $this->strNum);
                    $string[$i] = self::msubstr($this->codeStr, $start);
                }
                break;
            case 4:
//混合字符串
                for ($i = 0; $i < ($this->codeNum); $i++) {
                    $rand = mt_rand(0, 2);
                    switch ($rand) {
                        case 0:
                            $ascii = mt_rand(48, 57);
                            $string[$i] = sprintf('%c', $ascii);
                            break;
                        case 1:
                            $ascii = mt_rand(97, 122);
                            $string[$i] = sprintf('%c', $ascii);
                            break;
                        case 2:
                            $start = mt_rand(0, $this->strNum);
                            $string[$i] = self::msubstr($this->codeStr, $start);
                            break;
                    }

                }

        }
        return $string;
    }
    //+--------------------------------------------------------------------------------
    //* 中文截取 ThinkPHP中的中文截取checkCode
    //+--------------------------------------------------------------------------------
    //* @return string
    //+--------------------------------------------------------------------------------
    static protected function msubstr($str, $start = 0, $length = 1, $charset = "utf-8")
    {
        if (function_exists("mb_substr"))
            $slice = mb_substr($str, $start, $length, $charset);
        elseif (function_exists('iconv_substr')) {
            $slice = iconv_substr($str, $start, $length, $charset);
        } else {
            $re['utf-8'] = "/[\x01-\x7f]|[\xc2-\xdf][\x80-\xbf]|[\xe0-\xef][\x80-\xbf]{2}|[\xf0-\xff][\x80-\xbf]{3}/";
            $re['gb2312'] = "/[\x01-\x7f]|[\xb0-\xf7][\xa0-\xfe]/";
            $re['gbk'] = "/[\x01-\x7f]|[\x81-\xfe][\x40-\xfe]/";
            $re['big5'] = "/[\x01-\x7f]|[\x81-\xfe]([\x40-\x7e]|\xa1-\xfe])/";
            preg_match_all($re[$charset], $str, $match);
            $slice = join("", array_slice($match[0], $start, $length));
        }
        return $slice;
    }
    //+--------------------------------------------------------------------------------
    //* 分配画布资源
    //+--------------------------------------------------------------------------------
    protected function createRes()
    {
        $this->image = imagecreatetruecolor($this->width, $this->height);
    }
    //+--------------------------------------------------------------------------------
    //* 填充背景颜色
    //+--------------------------------------------------------------sanzi0930@163.com------------------

    protected function bgColor()
    {
        $write = imagecolorallocate($this->image, 255, 255, 255);
        imagefill($this->image, 0, 0, $write);
    }
    //+--------------------------------------------------------------------------------
    //* 背景线条
    //+--------------------------------------------------------------------------------
    protected function filledLine()
    {
//横线

        $lineColor1 = imagecolorallocate($this->image, 0xda, 0xd9, 0xd1);
        for ($j = 3; $j <= $this->height - 3; $j = $j + 3) {
            imageline($this->image, 2, $j, $this->width - 2, $j, $lineColor1);
        }
//竖线
        $lineColor2 = imagecolorallocate($this->image, 0xda, 0xd9, 0xd1);
        for ($j = 2; $j < 100; $j = $j + 6) {
            imageline($this->image, $j, 0, $j + 8, $this->height, $lineColor2);
        }
    }



    //+--------------------------------------------------------------------------------
    //* 画边框
    //+--------------------------------------------------------------------------------
    protected function bgBorder()
    {
        $bordercolor = imagecolorallocate($this->image, 0x9d, 0x9e, 0x96);
        imagerectangle($this->image, 0, 0, $this->width - 1, $this->height - 1, $bordercolor);
    }



    //+--------------------------------------------------------------------------------
    //* 字符颜色 $this->getCheckCode()
    //+--------------------------------------------------------------------------------
    protected function textColor()
    {
        $fontColor[] = imagecolorallocate($this->image, 0x15, 0x15, 0x15);
        $fontColor[] = imagecolorallocate($this->image, 0x95, 0x1e, 0x04);
        $fontColor[] = imagecolorallocate($this->image, 0x93, 0x14, 0xa9);
        $fontColor[] = imagecolorallocate($this->image, 0x12, 0x81, 0x0a);
        $fontColor[] = imagecolorallocate($this->image, 0x06, 0x3a, 0xd5);
        return $fontColor;
    }


    //+--------------------------------------------------------------------------------
    //* 把字符写到画布上去
    //+--------------------------------------------------------------------------------


    protected function writeText()
    {
        $fontColor = $this->textColor();
        $rndstring = $this->getCheckCode();

        for ($i = 0; $i < 4; $i++) {
            $c = mt_rand(-30, 30);
            $x = floor($this->width / $this->codeNum) * $i + 5;
            $y = $this->height / 2 + $this->fontSize / 2;
            imagettftext($this->image, $this->fontSize, $c, $x, $y, $fontColor[$i], $this->fontType, $rndstring[$i]);
        }
    }
    //+--------------------------------------------------------------------------------
    //* 输出图片格式
    //+--------------------------------------------------------------------------------
    protected function output()
    {
        $func = 'image' . $this->imageType;
        $header = 'Content-type:image/' . $this->imageType;
        if (function_exists($func)) {
            header($header);
            $func($this->image);
        } else {
            echo '本系统不支持此方法';
            return false;
        }
    }
    //+--------------------------------------------------------------------------------
    //* 输出验证码
    //+--------------------------------------------------------------------------------
    protected function getImage()
    {
        $this->createRes();
        $this->bgColor();
        $this->bgBorder();
        $this->filledline();
        $this->writeText();
        $this->output();
    }
    //+--------------------------------------------------------------------------------
    //* 销毁图片
    //+--------------------------------------------------------------------------------
    public function __destruct()
    {
        imagedestroy($this->image);
    }


}


$code = new Vcode();
echo $code;


?>

