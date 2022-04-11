import api from './index'
// axios
import request from '@/utils/request'

// 登录
export function login(data) {
  return request({
    url: api.Login,
    method: 'post',
    data
  })
}
// 用户信息 post 方法
export function getUserInfo(data) {
  return request({
    url: api.UserInfo,
    method: 'post',
    data,
    hideloading: true
  })
}
// 用户名称 get 方法
export function getUserName(params) {
  return request({
    url: api.UserName,
    method: 'get',
    params,
    hideloading: true
  })
}
export function getNewsList(params) {
  return request({
    url: api.NewsList,
    method: 'get',
    params,
    hideloading: true
  })
}
export function getNewsDetail(params) {
  return request({
    url: api.NewsDetail,
    method: 'get',
    params,
    hideloading: false
  })
}
