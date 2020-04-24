// -------------------------------------------------------------------------------------------------

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

// -------------------------------------------------------------------------------------------------

// 导入axios
import axios from 'axios';

import fetch from '@a/fetch';

import http from '@a/http';

// 使用代理
const HOST = '/eidpws';
 
// -------------------------------------------------------------------------------------------------

// /eidpws 的接口数据都会映射到 config文件中的 index.js脚本文件里的 proxyTable：{

// }配置代理解决跨域问题的 ，如下面所示， /eidpws会映射到 http://192.168.1.112:8090 这个接口地址，

// 而/api 则会映射到 http://api.douban.com/v2 这个接口地址里面去的

// proxyTable: {
//   '/eidpws': {
//         target: 'http://192.168.1.112:8090',
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

// -------------------------------------------------------------------------------------------------

//  导出 请求数据 的fetch函数

// get请求

// 旧版本请求方案

export function fetchGet(url,canshu) {
  return new Promise((resolve, reject)=> {
      axios({
          method:'get',
          url:HOST+url,
          params:canshu
      }).then((response) => {
          resolve(response.data);
      }).catch((error) => {
         reject(error) 
      })
  })
}

// post 请求
export function fetchPost(url,canshu) {
  return new Promise((resolve, reject)=> {
      axios({
          method:"post",
          url:HOST+url,
          data:canshu  
      }).then(response => {
            resolve(response.data);
      }).catch((error) => {
          reject(error) 
      })
  })
}

// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------

// 获取 华美乐工地列表数据

export function gongdiLists(canshu) {
    return http.ajax('/sites/sitesRecord/querySitesRecordList','post',canshu)
}

export function tongzhi_gonggao(canshu) {
    return http.ajax('/app/inform/getInformList','post',canshu)
}

export function hetongxinxi(canshu) {
    return http.ajax('/app/contractInfo/findContractInfo','get',canshu)
}

export function getMenus(canshu) {
    return http.ajax('/system/auth/findAuthResource','get',canshu)
}


// -----------------------------------------------------------------------------------------------------------

//  要注意的是，在做 axios请求数据的时候， 以及 proxyTable 配置代理 的时候，
//  都是要重新 npm run dev之后才会有效果的

//  要注意的是，在做 axios请求数据的时候， 以及 proxyTable 配置代理 的时候，
//  都是要重新 npm run dev之后才会有效果的

// -----------------------------------------------------------------------------------------------------------

 