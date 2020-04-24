var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

const HOST2 = '"/api"';

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: HOST2
})
