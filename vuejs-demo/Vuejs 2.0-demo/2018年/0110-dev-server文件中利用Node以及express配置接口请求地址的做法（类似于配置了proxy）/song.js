
// 在项目中使用的路径就是 '/api/lyric' 这个了

import { commonParams } from 'assets/js/config'
import axios from 'axios'

export function getLyric(mid) {

  const url = '/api/lyric'
  
  const data = Object.assign({}, commonParams, {
    songmid: mid,
    platform: 'yqq',
    hostUin: 0,
    needNewCode: 0,
    categoryId: 10000000,
    pcachetime: +new Date(),
    format: 'json'
  })

  return axios.get(url,{params:data}).then((res) =>{
     return Promise.resolve(res.data)
  })

}
