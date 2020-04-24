
// -------------------------------------------------------------------------------------------------

// 导入axios
import axios from 'axios';

// 使用代理
const HOST2 = '/api';

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

// get请求 
export function fetchGet2(url,canshu) {
  return new Promise((resolve, reject)=> {
      axios({
          method:'get',
          url:HOST2+url,
          params:canshu
      }).then((response) => {
          resolve(response.data);
      }).catch((error) => {
          console.log(error)
      })
  })
}

// post 请求
export function fetchPost2(url,canshu) {
  return new Promise((resolve, reject)=> {
      axios({
          method:"post",
          url:HOST2+url,
          data:canshu  
      }).then(response => {
            resolve(response.data);
      }).catch((error) => {
          console.log(error)
      })
  })
}

// -------------------------------------------------------------------------------------------------

// 获取豆瓣app 的接口数据
export function fetchMoviesByType(canshu) {
  return fetchGet2(`/movie/coming_soon`,canshu)
}

// -----------------------------------------------------------------------------------------------------------

//  要注意的是，在做 axios请求数据的时候， 以及 proxyTable 配置代理 的时候，
//  都是要重新 npm run dev之后才会有效果的

//  要注意的是，在做 axios请求数据的时候， 以及 proxyTable 配置代理 的时候，
//  都是要重新 npm run dev之后才会有效果的



// -----------------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------------------

// 以下是通过 mockjs 模仿出来的数据


/*
* 获取首页列表信息
* */
export function indexGetList() {
    return new Promise((resolve, reject)=> {
        axios.get('/index/getList').then(function (response) {
            if(response.data.data.code ==1000){
                resolve(response.data.data.data);
            }
        }).catch((error) => {
           console.log(error)
        })
    })
}

// -----------------------------------------------------------------------------------------------------------

/*
* 获取首页图片
* */
export function indexGetImg() {

    return new Promise((resolve, reject)=> {
        axios.get('/index/getImgList').then(function (response) {
            if(response.data.data.code ==1000){
                resolve(response.data.data.data);
            }
        }).catch((error) => {
          console.log(error)
        })
    })
}

// -----------------------------------------------------------------------------------------------------------
