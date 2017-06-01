/**
 * Created by haoguo on 17/5/31.
 */
var config = require('config-lite');
var mongoose = require('mongoose');
mongoose.connect(config.mongodb);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
    /*  var collinsSchema = mongoose.Schema({
     name: String
     })*/
    //一次打开记录
});

//用户表
var userSchema = new mongoose.Schema({
    nickName: {type: 'string'},//昵称
    email: {type: 'string'},
    userId: {type: 'string'},//用户名
    passWord: {type: 'string'},
    createTime: 'string'
});
exports.user = mongoose.model('user', userSchema);

//collins表


var collinsSchema = new mongoose.Schema({
    "attribute": {"word-type": String},
    "head-word": {"attribute": {"search": String}, "word": String, "pron": String},
    "inflection": [String],
    "sense": [{
        "attribute": {"id": String},
        "posp": String,
        "hdgr": String,
        "def": {"_": String, "c": String},
        "tran": String,
        "example": {
            "ex": String,
            "tran": String
        }
    }]


});
/*exports.collins1 = mongoose.model('test1', collinsSchema);*/
exports.collins = mongoose.model('collins', collinsSchema);