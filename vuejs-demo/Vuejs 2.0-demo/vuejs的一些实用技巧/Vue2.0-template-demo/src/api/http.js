import fetch from '@a/fetch';
// 使用代理
const HOST = '/eidpws';

export default {
  ajax(url, type, canshu) {

		var opts = {
			method:type,
			baseURL: HOST,
			url: HOST + url,	 
			timeout: 5000
		}
    if (type == 'get') {
       opts.params=canshu
    } else {
       opts.data=canshu
    }
    return new Promise((resolve, reject) => {
      fetch(opts).then((response) => {
        resolve(response.data);
      }).catch((error) => {
        reject(error)
      })

    })
  }
}

// ------------------------------------------------------------------------------------------------------------------------

// export default{
// 	get(url,canshu) {
// 	  return new Promise((resolve, reject)=> {
// 	      fetch({
// 	      	    method:'get',
// 		        baseURL:HOST,
// 		        url: HOST+url,
// 		        params:canshu,
// 		        timeout:5000
// 		  }).then((response) => {
// 		        resolve(response.data);
// 		  }).catch((error) => {
// 		       reject(error)
// 		  })

// 	  })
// 	},
// 	post(url,canshu) {
// 	  return new Promise((resolve, reject)=> {
// 	      fetch({
// 	      	    method:'post',
// 		        baseURL:HOST,
// 		        url: HOST+url,
// 		        data:canshu,
// 		        timeout:5000
// 		  }).then((response) => {
// 		        resolve(response.data);
// 		  }).catch((error) => {
// 		       reject(error)
// 		  })

// 	  })
// 	}
// }


// ------------------------------------------------------------------------------------------------------------------------


// 杭州LCY女神  封装的axios写法

// import qs from 'qs'

// 引入我们需要的一个库, 为什么需要用到 qs, 后面会说到

// export default {
//     post(url, data) {
//         return axios({
//             method: 'post', // 请求协议
//             url: url, // 请求的地址
//             data: qs.stringify(data), // post 请求的数据
//             timeout: 30000, // 超时时间, 单位毫秒
//             headers: {
//                 'X-Requested-With': 'XMLHttpRequest',
//                 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
//             }
//         })
//     },
//     get(url, params) {
//         return axios({
//             method: 'get',
//             url: url,
//             params, // get 请求时带的参数
//             timeout: 30000,
//             headers: {
//                 'X-Requested-With': 'XMLHttpRequest'
//             }
//         })
//     }
// }

// 这里的 data 为什么需要用qs.stringify(data)包一下,

// 主要是配合下面headers里的Content-Type, 转成表单提交, 让后端可以直接用 $_POST 拿到数据

// 这样, 一个大概的封装就完成了

// ------------------------------------------------------------------------------------------------------------------------



 











