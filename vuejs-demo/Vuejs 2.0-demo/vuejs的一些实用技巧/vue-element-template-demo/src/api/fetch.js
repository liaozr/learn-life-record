import axios from 'axios';
import store from '@s/store'
import router from '@r'  // 导入路由
import { getToken } from '@u/auth';
import {Message} from 'element-ui'

// 全局axios默认值
// axios.defaults.baseURL = 'https://api.example.com';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';



const service = axios.create({
    baseURL: process.env.BASE_API, // api的base_url
    timeout: 1000*20,                 // 请求超时时间
    headers: {
        'Content-Type': 'application/json;charset=UTF-8'
    }
    // headers: {
    //   'Content-Type':'multipart/form-data'
    // }
});

axios.defaults.timeout = 20000;
// -------------------------------------------------------------------------------------------------------------

// 在请求或响应被then或catch处理前拦截它们。
// 添加请求拦截器
// request拦截器
service.interceptors.request.use(config => {

  // 在发送请求之前做些什么

  // Do something before request is sent
  // if (store.state.globalState.token) {

  //   // 在实例已创建后修改默认值
  //   config.headers['auth'] = getToken(); // 让每个请求携带token--['auth']为自定义key 请根据实际情况自行修改
  // }

  // if ( getToken() ) {
  //   // 在实例已创建后修改默认值
  //   config.headers['auth'] = getToken(); // 让每个请求携带token--['auth']为自定义key 请根据实际情况自行修改
  // }

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

  console.log(888)
  console.log(JSON.stringify(response))
  // alert(response.data.cose)
  // token 已过期，重定向到登录页面  
  if (response.data.code == '1034')
  {  
      Message.error({message:'由于您长时间未进行操作，出于安全考虑，会话已关闭，请重新登录！'});
      setTimeout(function(){
         window.location.href=response.data.data
      },2000)

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

      console.log(7777)
      console.log(JSON.stringify(error))
 
      if(error.response.status == '504'){
         //alert("服务器连接超时,请重新连接！")
         Message.error({message:'服务器连接超时,请重新连接!'});
         
      }
      else if(error.response.status == '401' || error.response.status == '400' ){
        
          // store.dispatch('loginOut'); //可能是token过期，清除它
          // router.replace({ //跳转到登录页面
          //     path: '/login',
          //     query: { redirect: router.currentRoute.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
          // });

          //alert("服务器连接超时,请重新连接！")
          Message.error({message:'服务器连接超时,请重新连接!'});
      }
      else if(error.response.status == '404'){
          //alert("服务器连接超时,请重新连接！")
          Message.error({message:'服务器连接超时,请重新连接!'});
      }
      else{

          if(error.response.data.msg){
             //alert(error.response.data.msg);
             Message.error({message:error.response.data.msg});
          }else{
            //alert('服务器连接超时,请重新连接！');
            Message.error({message:'服务器连接超时,请重新连接!'});
          }

      }
      // 打印出 请求头的一些信息
      console.log(error.response.headers);

    } else {
        //alert('服务器连接超时,请重新连接！');
        Message.error({message:'服务器连接超时,请重新连接!'});
        // 在设置触发错误的请求时发生了一些事情
        // console.log(error.message);
    }

    // 打印出一些 axios的实例配置信息
    console.log(error.config);

    //  打印出 错误对象
    // console.log(error.response)
    //  返回错误状态
    return Promise.reject(error); 

  }
)

export default service;

