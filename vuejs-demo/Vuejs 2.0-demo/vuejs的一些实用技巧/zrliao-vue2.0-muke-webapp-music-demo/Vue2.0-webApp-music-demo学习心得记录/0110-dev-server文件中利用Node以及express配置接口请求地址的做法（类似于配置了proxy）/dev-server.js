
// ----------------------------------------------------------------------------------------

// 在 var app = express()
// 这段代码后面添加后面的那些代码


// zrliao新增的脚本代码
// ----------------------------------------------------------------------------------------

// 后端接口代理，做法是跟配置proxy是一样的

var apiRoutes = express.Router()

apiRoutes.get('/lyric', function (req, res) {
  var url = 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg'
  axios.get(url, {
    headers: {
      referer:'https://c.y.qq.com/',
      host:'c.y.qq.com'
    },
    params: req.query
  }).then((response) => {

    var ret = response.data
    if(typeof ret == 'string'){
      var reg = /^\w+\(({[^()]+})\)$/
      var matches = ret.match(reg)
      if (matches) {
        ret = JSON.parse(matches[1])
      }
    }
    res.json(ret)
  }).catch((e) => {
    console.log(e)
  })
})

app.use('/api', apiRoutes)

// ----------------------------------------------------------------------------------------
