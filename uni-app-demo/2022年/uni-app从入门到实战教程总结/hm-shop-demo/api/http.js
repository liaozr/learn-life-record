// const BASE_URL = 'http://localhost:8082'
const BASE_URL = 'https://admin.hjtc123.com/cms'
export const request = (options)=>{
	return new Promise((resolve,reject)=>{
		uni.request({
			url:BASE_URL+options.url,
			method: options.method || 'GET',
			data: options.data || {},
			success: (res)=>{
				if(res.data.code !== 200) {
					return uni.showToast({
						title: '获取数据失败'
					})
				}
				resolve(res)
			},
			fail: (err)=>{
				uni.showToast({
					title: '请求接口失败'
				})
				reject(err)
			}
		})
	})
}