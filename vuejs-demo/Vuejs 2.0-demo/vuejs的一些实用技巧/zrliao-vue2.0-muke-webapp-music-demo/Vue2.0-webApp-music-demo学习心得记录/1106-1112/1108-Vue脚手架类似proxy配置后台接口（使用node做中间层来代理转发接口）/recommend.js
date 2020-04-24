// ------------------------------------------------------------------------------------------------

// 用法

// ------------------------------------------------------------------------------------------------

export function getDiscList2() {

    const url = '/api/getDiscList'
    const data = Object.assign({}, commonParams, {
        platform: 'yqq',
        hostUin: 0,
        sin: 0,
        ein: 29,
        sortId: 5,
        needNewCode: 0,
        categoryId: 10000000,
        rnd: Math.random(),
        format:'json'  // 返回json格式
    })

    return axios.get(url, {
        params: data
    }).then((res) => {
        return Promise.resolve(res.data)
    })
}

// ------------------------------------------------------------------------------------------------

export function getMovie(canshu) {

    const url = '/api/getMovie'

    return axios.get(url, {
        params: canshu
    }).then((res) => {
        return Promise.resolve(res.data)
    })

}

// ------------------------------------------------------------------------------------------------
