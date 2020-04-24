
// vue-cli 脚手架工具  更改开发环境的默认端口

// 打开 build文件夹 ，build文件夹 下可以看到有个 dev-server.js这个文件。

// dev-server.js文件里面下， 最下面有段这样的代码

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:' + port + '\n')
})

// 要更改默认端口的话，
// module.exports = app.listen(8088, function (err) { 把这个port值代替为 具体的端口值即可


// 要更改默认端口的话，
// module.exports = app.listen(8088, function (err) { 把这个port值代替为 具体的端口值即可
