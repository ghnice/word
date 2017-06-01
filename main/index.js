var express=require('express');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var app=express();
var path=require('path');

var bodyParser = require('body-parser');//bodyParser用于解析客户端请求的body中的内容,内部使用JSON编码处理,url编码处理以及对于文件的上传处理.

var config = require('config-lite');


app.set('views',path.join(__dirname,'views'));
app.engine("html",require("ejs").__express); // or   app.engine("html",require("ejs").renderFile);
//第二句是使在调用render函数时能自动为我们加上’.html’ 后缀。如果没有第二句，我们就得把res.render(‘users’)写成res.render(‘users.html’)，否则会报错。
//app.set("view engine","ejs");
app.set('view engine', 'html');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));//设置静态文件路径
app.use(session({
    secret: config.session.secret,// 通过设置 secret 来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改 建议使用 128 个字符的随机字符串
    resave: true,// 强制更新 session
    saveUninitialized: false,// 设置为 false，强制创建一个 session，即使用户未登录
    cookie: { maxAge: config.session.maxAge},// 过期时间，过期后 cookie 中的 session id 自动删除 //时长
    store: new MongoStore({// 将 session 存储到 mongodb
    url: config.mongodb// mongodb 地址
  })
}));


app.use('/',require('./routes/index'));
/*app.use('/word',require('./routes/word'));*/
app.use('/logging_data',require('./routes/logging_data'));

app.listen(config.part,function(){
	console.log('已启动'+new Date());
});
