const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    {join} = require('path'),
    http = require('http'),
    morgan = require('morgan'),
    {port} = require('./config');

app.use(morgan('dev'));

app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1');
  // res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', express.static(join(__dirname, 'public')));


app.use('/', require('./router/index'));

http.createServer(app).listen(port, () => {
  console.log(port+'端口服务启动成功');
});
