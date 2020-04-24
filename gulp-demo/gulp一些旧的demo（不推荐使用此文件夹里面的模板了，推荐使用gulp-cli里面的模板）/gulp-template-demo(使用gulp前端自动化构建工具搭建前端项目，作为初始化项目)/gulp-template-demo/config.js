// 存放未编译的文件夹
const ROOT_DEV ='src';
// 存放编译过后的文件夹
const ROOT_BUILD ='build';
// 存放打包后的文件夹    
const ROOT_ZIP ='zip';

// --------------------------------------------------------------------------------------------------

// gulpfile.js里面的 代理配置是不用去修改的 gulp.task('server'
// 只需要修改 这个  config里面的代理配置即可。

// --------------------------------------------------------------------------------------------------

// 配置proxyTable的一些注意点：

// 1、配置代理ip的时候，如果是有端口号的话，要把这个端口号带上的，不然接口是不通的。

// 如请求的接口地址为这个：
// http://192.168.1.104:8090/eidpws/app/sitesEmp/findSitesEmpList?sitesRecordId=1

// 代理ip target: 'http://192.168.1.104:8090' 得是这个才对的

// 2、代理ip的接口名字 为 '/eidpws'才对的，记着这里的代理ip的接口名字
// 是 要加上 / 斜杠号的，不加上这个斜杠号 也是会报接口404错误的。
// 是 要加上 / 斜杠号的，不加上这个斜杠号 也是会报接口404错误的。

// 3、页面中使用ajax 调用后台接口数据的时候，接口地址应该要这么写
// $.ajax('/eidpws/app/sitesEmp/findSitesEmpList',{
// })
// 这里要注意的是，'/eidpws/app...' 开头是要怎么写的，不这么写的话，
// 访问出来的接口地址也是会错误的，所以这里要注意一下的。

// --------------------------------------------------------------------------------------------------

module.exports = {
    // 端口号设置
    port: 8090,
    
    // 代理请求设置
    proxyTable: {
        // 代理ip
        target: 'http://192.168.1.104:8090',
        // 代理ip接口名字
        inner: '/eidpws'
    },

    rootDev: ROOT_DEV,
    rootBuild: ROOT_BUILD,
    rootZip: ROOT_ZIP,

    // 未编译的路径
    dev: {
        html : ROOT_DEV + '/**/*.html',
        css  : ROOT_DEV + '/assets/css/*.{scss,css}',
        scss : ROOT_DEV + '/assets/css/**/*.scss',
        js   : ROOT_DEV + '/assets/js/**/*.js',
        lib  : ROOT_DEV + '/assets/lib/**/*',
        image: [ROOT_DEV + '/assets/images/**/*.{png,jpg,gif,ico}', '!'+ ROOT_DEV + '/assets/images/sprite/**/'],
        tpl  : ROOT_DEV + '/**/*.tpl',
    },

    // 编译过后的路径
    build: {
        html : ROOT_BUILD + '',
        css  : ROOT_BUILD + '/assets/css/',
        js   : ROOT_BUILD + '/assets/js/',
        lib  : ROOT_BUILD + '/assets/lib/',
        image: ROOT_BUILD + '/assets/images/',
        zip  : ROOT_BUILD + '/**/*'
    },

    // 雪碧图
    sprite: ROOT_DEV + '/assets/images/sprite'
};

