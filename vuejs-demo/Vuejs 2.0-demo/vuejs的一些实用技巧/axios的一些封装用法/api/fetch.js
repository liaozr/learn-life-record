import axios from 'axios';
import store from '@vuex/store'
import router from '@r'  // 导入路由
import { getToken } from '@u/auth';


// -----------------------------------------------------------------------
// 全局axios默认值

// axios.defaults.baseURL = 'https://api.example.com';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// -----------------------------------------------------------------------

// 在config/下有dev.env.js和prod.env.js这两个配置文件。

// 用它来区分不同环境的配置参数。

// //dev.env.js
// module.exports = {
//   NODE_ENV: '"development"',
//   BASE_API: '"https://easy-mock.com/mock/5950a2419adc231f356a6636/vue-admin"',
// }

// //prod.env.js
// module.exports = {
//   NODE_ENV: '"production"',
//   BASE_API: '"https://prod-xxx"',
// }

// -----------------------------------------------------------------------

// 由于axios每一个都是一个实例，你的请求都是基于这个实例来的，

// 所以所以配置的参数属性都继承了下来.

// //api.xxx.js

// import fetch from '@/utils/fetch';
// export function getInfo(token) {
//   return fetch({
//     url: '/user/info',
//     method: 'get',
//     params: { token }
//   });
// }

//你可以直接这样使用，之前拦截器写的东西都是生效的，
//它自动会有一个你之前配置的baseURL,
//但你说我这个请求baseURL和其它的不同,
//这也是很方便的，你可以字请求内部修改，
//它会自动覆盖你在创建实例时候写的参数如

// export function getInfo(token) {
//   return fetch({
//     baseURL: https://api2-xxxx.com
//     url: '/user/info',
//     method: 'get',
//     params: { token }
//   });
// }

// -----------------------------------------------------------------------
  
  // 配置示例配置示例配置示例

  // // config 中 index.js文件
  // proxyTable: {
  //   '/eidpws': {
  //         target: 'http://192.168.1.91:8090',
  //         changeOrigin: true,
  //         pathRewrite: {
  //           '^/eidpws': ''
  //         }
  //    },
  //    '/api': {
  //         target: 'http://api.douban.com/v2',
  //         changeOrigin: true,
  //         pathRewrite: {
  //           '^/api': ''
  //         }
  //    }
  // }
  

  // // config中 dev.env.js页面

  // const HOST2 = '"/api"';  // 记得 config 文件夹中的index.js 接口配置写法 是这样子的
                              // 不然接口配置信息是会报错的

  // module.exports = merge(prodEnv, {
  //   NODE_ENV: '"development"',
  //   BASE_API: HOST2
  // })

// -----------------------------------------------------------------------


// 封装axios 
// 每一个请求都是要带token来验证权限的，这样封装以下的话我们就不用
// 每个请求都手动来塞token，或者来做异常处理，一劳永逸。

// -------------------------------------------------------------------

// 可以使用自定义配置新建一个 axios 实例
// 创建axios实例

// `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
// 它可以通过设置一个 `baseURL` 便于为 axios 实例的方法传递相对 URL

// `headers` 是即将被发送的自定义请求头
// headers: {&amp;#39;X-Requested-With&amp;#39;: &amp;#39;XMLHttpRequest&amp;#39;},


// // `params` 是即将与请求一起发送的 URL 参数
// // 必须是一个无格式对象(plain object)或 URLSearchParams 对象
// params: {
//   ID: 12345
// },

// data参数 是作为 请求主体被发送的数据，适用于post


// `timeout` 指定请求超时的毫秒数(0 表示无超时时间)
// 如果请求话费了超过 `timeout` 的时间，请求将被中断
//timeout: 1000,

// 覆写库的超时默认值
// 现在，在超时前，所有请求都会等待 2.5 秒

// instance.defaults.timeout = 2500;

// 为已知需要花费很长时间的请求覆写超时设置

// service.get(&#39;/longRequest&#39;, {
//   timeout: 5000
// });


// -------------------------------------------------------------------------------------------------------------

// 某个请求的响应包含以下信息
// {
// // `data` 由服务器提供的响应
// data: {},

// // `status` 来自服务器响应的 HTTP 状态码
// status: 200,

// // `statusText` 来自服务器响应的 HTTP 状态信息
// statusText: &#39;OK&#39;,

// // `headers` 服务器响应的头
// headers: {},

// // `config` 是为请求提供的配置信息
// config: {}
// }


// 使用then时，你将接收下面这样的响应：
// axios.get(&#39;/user/12345&#39;)
// .then(function(response) {
// console.log(response.data);
// console.log(response.status);
// console.log(response.statusText);
// console.log(response.headers);
// console.log(response.config);
// });

// 在使用catch时，或传递rejection callback作为then的第二个参数时，响应可以通过error对象可被使用，正如在错误处理这一节所讲


// -------------------------------------------------------------------------------------------------------------

// 服务器返回的状态码 集合参考

// case 401:
// err.message = '未授权，请登录'
// break

// case 403:
// err.message = '拒绝访问'
// break

// case 404:
// err.message = `请求地址出错: ${err.response.config.url}`
// break

// case 408:
// err.message = '请求超时'
// break

// case 500:
// err.message = '服务器内部错误'
// break

// case 501:
// err.message = '服务未实现'
// break

// case 502:
// err.message = '网关错误'
// break

// case 503:
// err.message = '服务不可用'
// break

// case 504:
// err.message = '网关超时'
// break

// -------------------------------------------------------------------------------------------------------------


// 全局axios默认值

// axios.defaults.baseURL = 'https://api.example.com';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const service = axios.create({
    baseURL: process.env.BASE_API, // api的base_url
    timeout: 5000                 // 请求超时时间
});

axios.defaults.timeout = 5000;

// -------------------------------------------------------------------------------------------------------------

// 在请求或响应被then或catch处理前拦截它们。
// 添加请求拦截器
// request拦截器
service.interceptors.request.use(config => {

  // 在发送请求之前做些什么

  // Do something before request is sent
  if (store.state.globalState.token) {

    // 在实例已创建后修改默认值
    config.headers['auth'] = getToken(); // 让每个请求携带token--['auth']为自定义key 请根据实际情况自行修改
  }
  return config;
}, error => {

    // 打印出一些 axios的实例配置信息
    console.log(error.config);

    return Promise.reject(error);
})

// -------------------------------------------------------------------------------------------------------------

// 添加响应拦截器
// respone拦截器
service.interceptors.response.use( response => {

  // token 已过期，重定向到登录页面  
  if (response.data.code == 4){  
      localStorage.clear() 

      // router.replace({  
      //                 path: '/signin',  
      //                 query: {redirect: router.currentRoute.fullPath}  
      // })  
  }

  // 对响应数据做点什么
  return response  

  // 这里的return response返回的是一个对象, 内容如下:
  // {
  //   // 服务器提供的响应
  //   data: {},
  //   // 服务器响应的HTTP状态代码
  //   status: 200,
  //   // 服务器响应的HTTP状态消息
  //   statusText: 'OK',
  //   // 服务器响应头
  //   headers: {},
  //   // axios 的配置
  //   config: {}
  // }

// ------------------------------------------------------------------------------------------


  /**
  * 下面的注释为通过response自定义code来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
  * 如通过xmlhttprequest 状态码标识 逻辑可写在下面error中
  */
//  const res = response.data;
//     if (res.code !== 20000) {
//       Message({
//         message: res.message,
//         type: 'error',
//         duration: 5 * 1000
//       });
//       // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
//       if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
//         MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
//           confirmButtonText: '重新登录',
//           cancelButtonText: '取消',
//           type: 'warning'
//         }).then(() => {
//           store.dispatch('FedLogOut').then(() => {
//             location.reload();// 为了重新实例化vue-router对象 避免bug
//           });
//         })
//       }
//       return Promise.reject(error);
//     } else {
//       return response.data;
//     }
  },error => {

    if (error.response) {

      // 请求已发出，但服务器响应的状态码不在 2xx 范围内
      // 打印出 错误的 一些提示信息

      if(error.response.status == '504'){
         alert("服务器连接超时")
      }
      else if(error.response.status == '401' || error.response.status == '400' ){
        
          store.dispatch('loginOut'); //可能是token过期，清除它
          router.replace({ //跳转到登录页面
              path: '/login',
              query: { redirect: router.currentRoute.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
          });
      }
      else if(error.response.status == '404'){
         alert("请求地址出错")
      }
      else{
        alert(error.response.data.errorMsg);
      }
      // 打印出 请求头的一些信息
      console.log(error.response.headers);

    } else {
        alert('网络异常,请检查网络连接');
        // 在设置触发错误的请求时发生了一些事情
        console.log(error.message);
    }

    // 打印出一些 axios的实例配置信息
    console.log(error.config);

    //  打印出 错误对象
    console.log(error.response)
    //  返回错误状态
    return Promise.reject(error); 

  }
)

export default service;

