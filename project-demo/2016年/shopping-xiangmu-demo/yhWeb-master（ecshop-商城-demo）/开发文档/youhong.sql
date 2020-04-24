-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: 2016-05-21 13:58:18
-- 服务器版本： 5.6.27
-- PHP Version: 5.5.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `youhong`
--

-- --------------------------------------------------------

--
-- 表的结构 `admin`
--

CREATE TABLE `admin` (
  `id` smallint(5) UNSIGNED NOT NULL,
  `adminName` varchar(20) NOT NULL,
  `adminPass` varchar(40) NOT NULL,
  `adminPower` tinyint(1) DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `admin`
--

INSERT INTO `admin` (`id`, `adminName`, `adminPass`, `adminPower`) VALUES
(2, 'admin1', 'e00cf25ad42683b3df678c61f42c6bda', 1),
(3, 'admin2', 'admin2', 1),
(5, 'admin', 'admin', 1),
(7, '2163880', '2163880', 1),
(8, 'ThinkPHP', 'ThinkPHP', 1),
(9, 'admin10', 'admin10', 1),
(10, 'admin11', 'admin', 1);

-- --------------------------------------------------------

--
-- 表的结构 `banner`
--

CREATE TABLE `banner` (
  `id` int(10) UNSIGNED NOT NULL,
  `typeId` int(10) UNSIGNED NOT NULL,
  `banner1` varchar(30) NOT NULL,
  `banner2` varchar(30) NOT NULL,
  `banner3` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `banner`
--

INSERT INTO `banner` (`id`, `typeId`, `banner1`, `banner2`, `banner3`) VALUES
(1, 23, 'fruit1.jpg', 'fruit1.jpg', 'fruit1.jpg'),
(2, 1, 'foodbanner1.jpg', 'foodbanner1.jpg', 'foodbanner1.jpg');

-- --------------------------------------------------------

--
-- 表的结构 `cart`
--

CREATE TABLE `cart` (
  `id` int(10) UNSIGNED NOT NULL,
  `goodsId` int(10) UNSIGNED NOT NULL COMMENT '商品Id',
  `userId` int(10) UNSIGNED NOT NULL COMMENT '用户Id',
  `property` varchar(50) DEFAULT NULL COMMENT '属性',
  `picName` varchar(255) NOT NULL COMMENT '商品图片',
  `goodsName` varchar(50) NOT NULL COMMENT '商品名称',
  `price` double(6,2) UNSIGNED NOT NULL COMMENT '单价',
  `number` int(10) UNSIGNED NOT NULL COMMENT '数量'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='购物车表';

--
-- 转存表中的数据 `cart`
--

INSERT INTO `cart` (`id`, `goodsId`, `userId`, `property`, `picName`, `goodsName`, `price`, `number`) VALUES
(77, 6, 56, NULL, '573d8bd49d7d4.jpg', '奥利奥威化饼干巧克棒', 16.00, 2);

-- --------------------------------------------------------

--
-- 表的结构 `category`
--

CREATE TABLE `category` (
  `id` int(10) UNSIGNED NOT NULL,
  `typeId` int(10) UNSIGNED NOT NULL,
  `poster1` varchar(30) NOT NULL,
  `poster2` varchar(30) NOT NULL,
  `poster3` varchar(30) NOT NULL,
  `poster4` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `category`
--

INSERT INTO `category` (`id`, `typeId`, `poster1`, `poster2`, `poster3`, `poster4`) VALUES
(1, 1, 'food1.jpeg', 'food2.jpeg', 'food3.jpeg', 'food4.jpg');

-- --------------------------------------------------------

--
-- 表的结构 `collection`
--

CREATE TABLE `collection` (
  `id` int(10) UNSIGNED NOT NULL,
  `goodsId` int(10) UNSIGNED NOT NULL COMMENT '商品ID',
  `userId` int(10) UNSIGNED NOT NULL COMMENT '用户Id',
  `goodsName` varchar(50) NOT NULL COMMENT '商品名称',
  `picName` varchar(50) NOT NULL COMMENT '商品图片',
  `price` float(6,2) UNSIGNED NOT NULL COMMENT '商品价格'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='会员收藏表';

--
-- 转存表中的数据 `collection`
--

INSERT INTO `collection` (`id`, `goodsId`, `userId`, `goodsName`, `picName`, `price`) VALUES
(1, 2, 7, '达利园瑞士卷蛋卷包装', '254_P_1454022571771.png', 10.00);

-- --------------------------------------------------------

--
-- 表的结构 `goods`
--

CREATE TABLE `goods` (
  `id` int(10) UNSIGNED NOT NULL,
  `typeId` int(10) UNSIGNED NOT NULL,
  `path` varchar(50) NOT NULL COMMENT '路径',
  `goodsName` varchar(50) NOT NULL,
  `brands` varchar(20) DEFAULT NULL,
  `brandsImg` varchar(30) NOT NULL,
  `descr` text,
  `property` varchar(255) DEFAULT NULL COMMENT '商品属性',
  `price` double(6,2) UNSIGNED NOT NULL,
  `priceLower` double(6,2) UNSIGNED DEFAULT NULL,
  `picName` varchar(255) NOT NULL COMMENT '商品图片',
  `state` tinyint(4) NOT NULL DEFAULT '1' COMMENT '商品状态1:新商品2:在售3:下架',
  `stock` int(10) UNSIGNED NOT NULL DEFAULT '0' COMMENT '库存',
  `sales` int(10) UNSIGNED NOT NULL DEFAULT '0',
  `click` int(10) UNSIGNED NOT NULL DEFAULT '0' COMMENT '点击率',
  `addTime` int(12) UNSIGNED NOT NULL,
  `isLimitime` tinyint(4) NOT NULL DEFAULT '0' COMMENT '限时',
  `isDiscount` tinyint(4) NOT NULL DEFAULT '0' COMMENT '折扣',
  `isHot` tinyint(4) NOT NULL DEFAULT '0' COMMENT '热门',
  `isImport` tinyint(4) NOT NULL DEFAULT '0' COMMENT '进口',
  `recommend` tinyint(4) NOT NULL DEFAULT '0' COMMENT '推荐'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='商品表';

--
-- 转存表中的数据 `goods`
--

INSERT INTO `goods` (`id`, `typeId`, `path`, `goodsName`, `brands`, `brandsImg`, `descr`, `property`, `price`, `priceLower`, `picName`, `state`, `stock`, `sales`, `click`, `addTime`, `isLimitime`, `isDiscount`, `isHot`, `isImport`, `recommend`) VALUES
(1, 38, '25,33', '苹果iPhone 6S ', 'iPhone(苹果)', 'applelogo.png', '苹果(IOS)6s iPhone 6S 4.7英寸三网通4G 玫瑰金色16GB官方标配', '1:0,2:1,3:2,4:1', 4888.00, NULL, '217_G_1454013403103.jpg', 2, 0, 0, 31, 1461761609, 0, 0, 1, 0, 0),
(2, 8, '1,2', '达利园瑞士卷蛋卷包装', '达利园', 'daliyuan.png', '达利园瑞士卷香蕉味3斤提手装', '', 10.00, NULL, '254_P_1454022571771.png', 2, 998, 300, 32, 1461808987, 1, 0, 0, 0, 0),
(3, 43, '1,42', '德亚全脂纯牛奶', '德亚', '', '德亚全脂纯牛奶200ml*48盒', '', 189.00, 0.00, '5721de81c9763.jpg', 3, 322, 200, 0, 1461837441, 0, 1, 1, 0, 0),
(4, 48, '1,21', 'Lay''s乐事薯片', '乐事', 'leshilogo.jpg', 'Lay''s乐事 孜然爆羊排味 40g', '', 3.00, 0.00, '5721f8f1c517e.jpg', 2, 323, 100, 11, 1461844209, 0, 1, 0, 0, 0),
(5, 51, '26,49', '完达山金装育儿健奶粉', '完达山', '', '完达山 金装育儿健奶粉 2段婴幼儿配方奶粉 400G', '', 25.00, 0.00, '5721fb61c92b1.jpg', 2, 36, 0, 6, 1461844833, 0, 1, 1, 0, 0),
(6, 5, '1,2', '奥利奥威化饼干巧克棒', '奥利奥', 'oreologo.png', '奥利奥威化饼干巧克棒原味巧克力味64g', '5:3,6:0', 16.00, 0.00, '573d8bd49d7d4.jpg', 2, 6666, 232, 39, 1461845580, 1, 0, 0, 0, 0),
(7, 78, '28,77', '维达3层抽取式纸面巾', '维达', '', '维达倍韧系列3层抽取式纸面巾', '', 5.80, 0.00, '57285a5c1e7bb.jpg', 2, 2323, 0, 1, 1462262364, 0, 0, 0, 0, 0),
(8, 79, '28,74', '立白超洁清新无磷洗衣粉', '立白', '', '立白 超洁清新无磷洗衣粉', '', 9.80, 0.00, '57285b7baf1fc.jpg', 2, 6060, 0, 0, 1462262651, 0, 0, 0, 0, 0),
(9, 80, '25,35', '华硕 E202笔记本', '华硕(ASUS)', '', '华硕 E202 11.6英寸(赛扬N3050双核/4G/500G/集显)X205TA3735白色官方标配', '', 2380.00, 0.00, '57285cb709d97.jpg', 2, 250, 0, 0, 1462262967, 0, 0, 0, 0, 0),
(10, 82, '23,81', '新鲜猪肉猪排骨', '双汇', '', '新鲜猪肉 猪排骨 500g', '', 18.00, 0.00, '57285dbb38351.jpg', 2, 500, 0, 0, 1462263227, 0, 0, 0, 0, 0),
(11, 84, '23,83', '海南香蕉500g', '', '', '新鲜水果 香蕉 海南香蕉 500g', '', 4.50, 3.80, '57285e10c1637.jpg', 1, 600, 0, 0, 1462263312, 0, 0, 0, 0, 0),
(12, 70, '24,65', '欧莱雅致透净颜洁面乳', '欧莱雅(OREAL)', '', 'L’OREAL 欧莱雅 致透净颜洁面乳 125mL', '', 110.00, 95.00, '57285ef05cfec.jpg', 1, 605, 0, 0, 1462263536, 0, 0, 0, 0, 0),
(13, 86, '24,85', '海飞丝去屑洗发露', '海飞丝', '', '海飞丝 去屑洗发露 清爽去油型 200ml', '', 26.00, 23.80, '5728601014d74.jpg', 2, 1230, 0, 0, 1462263824, 0, 0, 0, 0, 0),
(21, 89, '1,88', '福临门 苏北米 清香米 中粮出品 大米 5kg', '福临门', '', '福临门 苏北米 清香米 中粮出品 大米 5kg', NULL, 29.90, 0.00, '57359738d729a.jpg', 3, 123, 0, 0, 1463129913, 1, 0, 0, 0, 0),
(22, 38, '25,33', '华为 P9 全网通 3GB+32GB版 流光金 移动联通电信4G手机 双卡双待', '华为', '', '华为 P9 全网通 3GB+32GB版 流光金 移动联通电信4G手机 双卡双待', NULL, 3188.00, 0.00, '573ec8ed0d4b1.jpg', 1, 322, 0, 0, 1463732461, 0, 0, 0, 0, 0);

-- --------------------------------------------------------

--
-- 表的结构 `goods_img`
--

CREATE TABLE `goods_img` (
  `id` int(10) UNSIGNED NOT NULL,
  `goodsId` int(10) UNSIGNED DEFAULT NULL,
  `typeId` int(10) UNSIGNED DEFAULT NULL,
  `picName` varchar(255) NOT NULL,
  `picDetail` varchar(255) NOT NULL,
  `picPure` varchar(255) NOT NULL COMMENT '纯图片',
  `picTurn` varchar(255) NOT NULL COMMENT '轮播图片'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='商品图片';

--
-- 转存表中的数据 `goods_img`
--

INSERT INTO `goods_img` (`id`, `goodsId`, `typeId`, `picName`, `picDetail`, `picPure`, `picTurn`) VALUES
(1, 21, 89, '57359738d729a.jpg', '57359738ef940.jpg', '573597390d814.jpg', ''),
(2, 6, 5, '573dc049dc03b.jpg', '573dc049e1244.jpg,573dc049ea6b6.jpg,573dc049def1b.jpg,573dc049e7fa6.jpg', '', '');

-- --------------------------------------------------------

--
-- 表的结构 `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `goodsId` int(11) NOT NULL,
  `userId` int(10) UNSIGNED NOT NULL,
  `goodsName` varchar(32) DEFAULT NULL,
  `linkMan` varchar(32) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `code` char(6) DEFAULT NULL,
  `phone` varchar(16) NOT NULL,
  `addTime` int(12) UNSIGNED NOT NULL,
  `number` tinyint(3) UNSIGNED NOT NULL COMMENT '数量',
  `total` double(8,2) UNSIGNED NOT NULL,
  `status` tinyint(1) UNSIGNED DEFAULT '1' COMMENT '1:新订单2:已发货:3:已收货'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `orders`
--

INSERT INTO `orders` (`id`, `goodsId`, `userId`, `goodsName`, `linkMan`, `address`, `code`, `phone`, `addTime`, `number`, `total`, `status`) VALUES
(10, 31, 0, '', '李晓乐', '北京昌平回龙观', '', '6817236578', 20140716, 1, 273.00, 1),
(14, 49, 0, '', '贾楠', '郑州金水', '450000', '15037140546', 20140717, 1, 234.00, 2),
(15, 49, 0, '', '贾楠', '郑州金水', '450000', '15037140546', 20140820, 1, 35.00, 2),
(16, 49, 0, '', '贾楠', '郑州金水', '450000', '', 20150120, 1, 35.00, 1),
(17, 49, 0, '', '贾楠', '郑州金水', '450000', '15037140546', 20150312, 1, 48.00, 2),
(18, 49, 0, '', '贾楠', '郑州金水', '450000', '15037140546', 20140717, 1, 234.00, 2),
(19, 49, 0, '', '贾楠', '郑州金水', '450000', '15037140546', 20140717, 1, 99.00, 3),
(20, 46, 0, '', '赵三1', '郑州市国基路102', '450000', '13245454235', 20140910, 1, 1368.00, 3),
(22, 1, 7, '苹果iPhone 6S ', '2163880', '河南省漯河市源汇区', '462000', '15639505278', 1463043459, 1, 4888.00, 1),
(13, 23, 7, '加大', '爱的就死机', '爱上的季节', '462000', '13569695381', 1236547800, 1, 66.00, 1),
(25, 1, 7, '苹果iPhone 6S ', '2163880', '河南省漯河市源汇区', '462000', '15639505278', 1463706390, 0, 19552.00, 1),
(26, 1, 56, '苹果iPhone 6S ', 'qwer123456', NULL, NULL, '13658954126', 1463801896, 0, 14664.00, 1);

--
-- 触发器 `orders`
--
DELIMITER $$
CREATE TRIGGER `addorders` AFTER INSERT ON `orders` FOR EACH ROW BEGIN
IF stock>0 THEN
UPDATE goods SET stock=stock-NEW.number WHERE id=NEW.goodsId;
END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- 表的结构 `property`
--

CREATE TABLE `property` (
  `id` int(10) UNSIGNED NOT NULL,
  `typeId` int(10) UNSIGNED NOT NULL COMMENT '分类Id',
  `propertyName` varchar(32) NOT NULL COMMENT '属性名',
  `propertyValue` varchar(255) NOT NULL COMMENT '属性值',
  `version` tinyint(3) UNSIGNED NOT NULL DEFAULT '0' COMMENT '是否影响商品型号'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='商品属性表';

--
-- 转存表中的数据 `property`
--

INSERT INTO `property` (`id`, `typeId`, `propertyName`, `propertyValue`, `version`) VALUES
(1, 38, '网络', '移动4G,联通4G,电信4G,三网通', 0),
(2, 38, '热点', '以旧换新,骁龙芯片,双卡双待,老人手机,指纹识别,VoLTE,Apple Pay,金属机身,2K屏,快速充电,拍照神器', 0),
(3, 38, '屏幕尺寸', '5.6英寸及以上,5.5-5.1英寸,5.0-4.6英寸,4.5-3.1英寸,3.0英寸及以下', 0),
(4, 38, '系统', '\r\n安卓(Android),苹果(IOS),微软(WindowsPhone),无,其他', 0),
(5, 2, '糕点种类', '曲奇饼干,夹心饼干,酥性饼干,威化饼干', 0),
(6, 2, '包装方式', '包装,散装', 0),
(7, 1, '内存', '16G,64G,128G', 1);

-- --------------------------------------------------------

--
-- 表的结构 `subject`
--

CREATE TABLE `subject` (
  `id` int(10) UNSIGNED NOT NULL,
  `typeId` int(10) UNSIGNED DEFAULT NULL,
  `name` varchar(32) DEFAULT NULL COMMENT '专题名',
  `picName` varchar(255) NOT NULL COMMENT '专题图片',
  `banner` varchar(255) DEFAULT NULL,
  `link` varchar(255) NOT NULL COMMENT '专题链接',
  `addTime` int(12) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='专题';

--
-- 转存表中的数据 `subject`
--

INSERT INTO `subject` (`id`, `typeId`, `name`, `picName`, `banner`, `link`, `addTime`) VALUES
(1, NULL, '东北大米', '5729aaa83bbb3.jpg', NULL, '?goodsId=', 1462348664),
(2, NULL, '美妆', '5729abd284801.jpg', NULL, '?goodsId=', 1462348754);

-- --------------------------------------------------------

--
-- 表的结构 `type`
--

CREATE TABLE `type` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(20) NOT NULL,
  `pid` int(10) UNSIGNED NOT NULL,
  `path` varchar(16) DEFAULT NULL COMMENT '路径'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='商品分类';

--
-- 转存表中的数据 `type`
--

INSERT INTO `type` (`id`, `name`, `pid`, `path`) VALUES
(1, '食品、饮料、酒类', 0, '0'),
(2, '饼干/糕点', 1, '1,'),
(3, '饼干', 2, '1,2'),
(4, '曲奇', 2, '1,2'),
(5, '威化', 2, '1,2'),
(6, '薄脆', 2, '1,2'),
(7, '夹心', 2, '1,2'),
(8, '蛋卷', 2, '1,2'),
(9, '礼品/礼盒', 1, '1,'),
(10, '零食', 9, '1,9'),
(11, '坚果礼盒', 9, '1,9'),
(12, '饼干礼盒', 9, '1,9'),
(13, '糖巧礼盒', 9, '1,9'),
(14, '酒礼盒', 9, '1,9'),
(15, '糖果/巧克力', 1, '1,'),
(16, '奶糖', 15, '1,15'),
(17, '棒棒糖', 15, '1,15'),
(18, '口香糖', 15, '1,15'),
(19, '薄荷糖', 15, '1,15'),
(20, '果冻', 15, '1,15'),
(21, '零食/坚果/蜜饯', 1, '1,'),
(22, '炒货', 21, '1,21'),
(23, '生鲜、蔬菜、水果', 0, '0'),
(24, '个护美妆、清洁用品', 0, '0'),
(25, '手机、数码、电脑办公', 0, '0'),
(26, '母婴、童装、玩具乐器', 0, '0'),
(27, '男装、女装、配饰', 0, '0'),
(28, '家居、厨卫、生活百货', 0, '0'),
(29, '鞋靴、箱包、户外运动', 0, '0'),
(30, '家用电器、汽车用品', 0, '0'),
(31, '营养健康、成人用品', 0, '0'),
(32, '旅游、票务、图书音像', 0, '0'),
(33, '手机通讯/配件', 25, '25,'),
(34, '数码配件', 25, '25,'),
(35, '电脑整机', 25, '25,'),
(36, '办公用品/设备', 25, '25,'),
(37, '设备/组件/周边配件', 25, '25,'),
(38, '手机', 33, '25,33'),
(39, '对讲机', 33, '25,33'),
(40, '苹果配件', 33, '25,33'),
(41, '移动电源', 33, '25,33'),
(42, '牛奶/乳品', 1, '1,'),
(43, '纯牛奶', 42, '1,42'),
(44, '酸奶', 42, '1,42'),
(45, '儿童奶', 42, '1,42'),
(46, '豆奶', 42, '1,42'),
(47, '乳酸菌饮料', 42, '1,42'),
(48, '薯片', 21, '1,21'),
(49, '奶粉', 26, '26,'),
(50, '1段', 49, '26,49'),
(51, '2段', 49, '26,49'),
(52, '3段', 49, '26,49'),
(53, '4段', 49, '26,49'),
(54, '特殊配方', 49, '26,49'),
(55, '海鲜', 23, '23,'),
(56, '蔬菜', 23, '23,'),
(57, '鱼类', 55, '23,55'),
(58, '虾类', 55, '23,55'),
(59, '海参', 55, '23,55'),
(60, '叶菜类', 56, '23,56'),
(61, '根类', 56, '23,56'),
(62, '瓜类', 56, '23,56'),
(63, '其它', 56, '23,56'),
(64, '彩妆', 24, '24,'),
(65, '面部护理', 24, '24,'),
(66, '眼部彩妆', 64, '24,64'),
(67, ' 面部彩妆', 64, '24,64'),
(68, '彩妆套装', 64, '24,64'),
(69, '面部护理', 65, '24,65'),
(70, '洁面', 65, '24,65'),
(85, '美发护发', 24, '24,'),
(72, '面膜', 65, '24,65'),
(73, '卸妆', 65, '24,65'),
(74, '衣物清洁护理', 28, '28,'),
(75, '清洁卫浴', 28, '28,'),
(76, '童装/童鞋', 26, '26,'),
(77, '纸品/湿巾 ', 28, '28,'),
(78, '软包抽纸 ', 77, '28,77'),
(79, '洗衣粉', 74, '28,74'),
(80, '笔记本', 35, '25,35'),
(81, '肉类', 23, '23,'),
(82, '猪肉', 81, '23,81'),
(83, '水果', 23, '23,'),
(84, '香蕉', 83, '23,83'),
(86, '洗发露', 85, '24,85'),
(87, '猕猴桃', 83, '23,83'),
(89, '大米', 88, '1,88'),
(88, '米/面/油/干货', 1, '1,');

-- --------------------------------------------------------

--
-- 表的结构 `user`
--

CREATE TABLE `user` (
  `id` int(10) UNSIGNED NOT NULL,
  `userName` varchar(30) NOT NULL,
  `passWord` char(32) NOT NULL,
  `trueName` varchar(20) NOT NULL,
  `sex` enum('男','女','保密') NOT NULL DEFAULT '保密',
  `idCard` int(18) DEFAULT NULL,
  `email` varchar(50) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `face` varchar(50) DEFAULT NULL,
  `regTime` int(12) UNSIGNED NOT NULL,
  `activeFlag` tinyint(1) DEFAULT '0',
  `address` varchar(50) DEFAULT NULL COMMENT '默认地址',
  `code` int(10) UNSIGNED DEFAULT NULL COMMENT '邮编'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `user`
--

INSERT INTO `user` (`id`, `userName`, `passWord`, `trueName`, `sex`, `idCard`, `email`, `phone`, `face`, `regTime`, `activeFlag`, `address`, `code`) VALUES
(7, '2163880', 'sd2163880', '段沛源', '保密', NULL, 'wudi2163880@qq.com', '15639505278', '57329b8b2737d.jpg', 1462934411, 1, '河南省漯河市源汇区', 462000),
(15, '531105703@qq.com', 'sd2163880', '张三', '', NULL, '531105703@qq.com', '13569695381', '57329ba3da07c.jpg', 1462934435, 0, NULL, NULL),
(46, 'asdasdad@163.com', 'sd2163880', '王五', '', NULL, 'asdasdad@163.com', '13569695381', '57329bafab907.jpg', 1462934447, 0, NULL, NULL),
(47, 'asdf2163880', '2163880', '王老五', '', NULL, 'asdadd21321@qq.com', '12345678901', '57329bb861391.jpg', 1462934456, 0, NULL, NULL),
(48, '123546454@545', '2131321', '大叔', '保密', NULL, '513135131', '1231566', NULL, 20160318, 1, NULL, NULL),
(49, 'dpy123456', '2163880', '', '保密', NULL, '23658285@qq.com', '13688888888', NULL, 1463035359, 0, NULL, NULL),
(56, 'qwer123456', '2163880', '', '保密', NULL, '13698542@qq.com', '13658954126', NULL, 1463801102, 0, NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `adminName` (`adminName`);

--
-- Indexes for table `banner`
--
ALTER TABLE `banner`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `collection`
--
ALTER TABLE `collection`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `goods`
--
ALTER TABLE `goods`
  ADD PRIMARY KEY (`id`),
  ADD KEY `typeId` (`typeId`),
  ADD KEY `typeId_2` (`typeId`),
  ADD KEY `path` (`path`);

--
-- Indexes for table `goods_img`
--
ALTER TABLE `goods_img`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `property`
--
ALTER TABLE `property`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `subject`
--
ALTER TABLE `subject`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `type`
--
ALTER TABLE `type`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`userName`),
  ADD UNIQUE KEY `username_2` (`userName`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `admin`
--
ALTER TABLE `admin`
  MODIFY `id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
--
-- 使用表AUTO_INCREMENT `banner`
--
ALTER TABLE `banner`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- 使用表AUTO_INCREMENT `cart`
--
ALTER TABLE `cart`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=78;
--
-- 使用表AUTO_INCREMENT `category`
--
ALTER TABLE `category`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- 使用表AUTO_INCREMENT `collection`
--
ALTER TABLE `collection`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- 使用表AUTO_INCREMENT `goods`
--
ALTER TABLE `goods`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;
--
-- 使用表AUTO_INCREMENT `goods_img`
--
ALTER TABLE `goods_img`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- 使用表AUTO_INCREMENT `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;
--
-- 使用表AUTO_INCREMENT `property`
--
ALTER TABLE `property`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- 使用表AUTO_INCREMENT `subject`
--
ALTER TABLE `subject`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- 使用表AUTO_INCREMENT `type`
--
ALTER TABLE `type`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=90;
--
-- 使用表AUTO_INCREMENT `user`
--
ALTER TABLE `user`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
