<?php
return array(
    //'配置项'=>'配置值'
    'DEFAULT_MODULE' => 'Home', //默认模块
    'URL_MODEL' => 2,   //URL模式
    'SESSION_AUTO_START' => true,
    'MODULE_ALLOW_LIST' => array('Home', 'Admin'),
    'URL_HTML_SUFFIX' => 'shtml|html|xml',
    'SHOW_PAGE_TRACE' => true,
    //是否开启session
    'HTML_CACHE_ON' => true,
    'HTML_CACHE_TIME' => 60,
//   全局静态缓存有效期（秒）
    'HTML_FILE_SUFFIX' => '.shtml',
    'LOG_RECORD' => true, // 开启日志记录
    'LOG_LEVEL' => 'EMERG,ALERT,CRIT,ERR', // 只记录EMERG ALERT CRIT ERR 错误
);