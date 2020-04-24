
// -------------------------------------------------------------------------------------------------

// 导入axios
import axios from 'axios';

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


// 获取工地成员
export function gongdiMember(canshu) {
  return fetchGet(`/app/sitesEmp/findSitesEmpList`,canshu)
}

// 获取 vuejs api 数据
// export function vuejsdata(url,canshu) {
//   return new Promise((resolve, reject)=> {
//       axios({
//           method: 'get',
//           url: 'https://www.vue-js.com/api/v1/topics',
//           params: canshu
//       }).then((response) => {
//           resolve(response.data);
//       }).catch((error) => {
//           console.log(error)
//       })
//   })
// }

// 获取通知公告
export function tongzhi_gonggao(canshu) {
  return fetchPost(`/app/inform/getInformList`,canshu)
}

// -----------------------------------------------------------------------------------------------------------

//  要注意的是，在做 axios请求数据的时候， 以及 proxyTable 配置代理 的时候，
//  都是要重新 npm run dev之后才会有效果的

//  要注意的是，在做 axios请求数据的时候， 以及 proxyTable 配置代理 的时候，
//  都是要重新 npm run dev之后才会有效果的

// -----------------------------------------------------------------------------------------------------------

 