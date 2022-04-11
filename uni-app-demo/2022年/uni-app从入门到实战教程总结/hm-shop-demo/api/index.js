import { request } from './http.js'
export function getNewsList(params) {
  return request({
    url: '/content/list',
    method: 'get',
    params
  })
}