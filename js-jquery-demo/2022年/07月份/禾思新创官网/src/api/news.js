import axios from 'axios';
export function getNewsList(params) {
	return axios({
		url: '/content/list',
		method: 'get',
		params,
	});
}
export function getNewsDetail(params) {
	return axios({
		url: '/content/get',
		method: 'get',
		params,
	});
}
