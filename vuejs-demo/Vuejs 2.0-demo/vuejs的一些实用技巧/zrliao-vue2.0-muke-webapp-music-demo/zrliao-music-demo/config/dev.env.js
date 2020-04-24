var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

// const HOST2 = '"/eidpws"';
const HOST2 = '"/splcloud"';

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: HOST2
})
