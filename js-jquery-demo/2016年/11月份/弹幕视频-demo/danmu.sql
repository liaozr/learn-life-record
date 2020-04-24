-- phpMyAdmin SQL Dump
-- version phpStudy 2014
-- http://www.phpmyadmin.net
--
-- 主机: localhost
-- 生成日期: 2016 年 04 月 29 日 13:44
-- 服务器版本: 5.6.21
-- PHP 版本: 5.4.34

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- 数据库: `lrfbeyond_demo`
--

-- --------------------------------------------------------

--
-- 表的结构 `danmu`
--

CREATE TABLE IF NOT EXISTS `danmu` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `content` varchar(255) NOT NULL,
  `addtime` int(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=7 ;

--
-- 转存表中的数据 `danmu`
--

INSERT INTO `danmu` (`id`, `content`, `addtime`) VALUES
(1, '{ "text":"我的它旦撒旦撒","color":"#ffffff","size":"1","position":"0","time":3}', 1461907424),
(2, '{ "text":"的大噩噩噩噩鹅鹅鹅","color":"#ffffff","size":"1","position":"0","time":56}', 1461907432),
(3, '{ "text":"我的 ","color":"#ffffff","size":"1","position":"0","time":143}', 1461907440),
(4, '{ "text":"的撒的","color":"#ffffff","size":"1","position":"0","time":155}', 1461907441),
(5, '{ "text":"ds 三大旦撒","color":"#ffffff","size":"1","position":"0","time":124}', 1461908354),
(6, '{ "text":"helloweba.com欢迎您","color":"#ffffff","size":"1","position":"0","time":265}', 1461908369);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
