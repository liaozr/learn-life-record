import { request } from './http.js'
export function getNewsList(data) {
  return request({
    url: '/content/list',
    method: 'get',
    data
  })
}