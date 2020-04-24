import fetch from '@a/fetch';
// 使用代理
const HOST = '/eidpws';

export default {
  ajax(url, type, canshu) {

		var opts = {
      method:type,
      baseURL: HOST,
			url:url,	
			timeout: 20000
		}
    if (type == 'get') {
       opts.params=canshu
    } else {
       opts.data=canshu
    }
    return new Promise((resolve, reject) => {
      fetch(opts).then((response) => {
      	console.log(response);
        resolve(response.data);
      }).catch((error) => { 
        reject(error)
      })

    })
  }
}


 











