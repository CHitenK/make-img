// db/db.js
const mongoose = require('mongoose')
// Mongo数据库连接地址
const DB_URL = 'mongodb://cmk:chiminke@122.51.162.240:27017/myproject'

mongoose.connect(DB_URL)

mongoose.connection.on('connected',function() {
   console.log('Mongoose connection open to '+DB_URL);
});
/**
* 连接异常 error 数据库连接错误
*/
mongoose.connection.on('error',function(err) {
  console.log('Mongoose connection error: '+ err);
});
/**
* 连接断开 disconnected 连接异常断开
*/
mongoose.connection.on('disconnected',function() {
  console.log('Mongoose connection disconnected');
});

module.exports = mongoose