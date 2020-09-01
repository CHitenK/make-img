const Koa = require('koa')
const app = new Koa()
const bodyParser = require('koa-bodyparser')
const makeImgRoter = require('./serve_modules/make-img')
app.use(bodyParser())
app.use(makeImgRoter.routes())
app.listen(2020, '0.0.0.0', function() {
  console.log('----------------------2020端口启动了-------------------------')
})