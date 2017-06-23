/**
 * Created by haoguo on 17/6/5.
 */
//player
var player = function (opt) {
    this.player = opt.dom.get(0);
    this.box = opt.dom;
    this.monitoring();
    this.btn = '';
};
player.prototype = {
    monitoring: function () {
        var _this = this;
        _this.box.on({
            play: function () {
                _this.btn.text('播放中');
            },
            pause: function () {
                _this.btn.text('播放');
            },
            ended: function () {
                _this.btn.text('播放');
            },
            error: function (e) {
            }
        });
    },
    setting: function (btn, src) {
        var _this = this;
        _this.btn = btn;
        _this.player.setAttribute('src', src);
        _this.player.volume = 1;
    },
    play: function () {
        var _this = this;
        _this.player.play();

    },
    stop:function(){
        var _this=this;
        _this.player.pause();
    }
};


//进度条
var progress = function (dom, time) {
    this.bar = dom;
    this.allTime = time;//总时间
    this.progressNum = 0;//当前时间进度
    this.timer = '';
    this.interval = 26;//时间间隔(ms)
};
progress.prototype = {
    start: function (callback1,callback2) {
        var _this = this;
        var addNum = _this.interval / 1000;
        auto();
        _this.timer = setInterval(auto, _this.interval);
        function auto() {

            if (_this.progressNum >= _this.allTime) {
                _this.stop();
                callback2(_this);
            } else {
                _this.progressNum += addNum;
                _this.bar.css('width', (_this.progressNum * 100 / _this.allTime) + '%');
                callback1(_this);
            }
        }
    },
    rest:function(){
        var _this=this;
        _this.stop();
        _this.bar.css('width', 0);
        _this.progressNum = 0;
    },
    pause: function () {
    },
    stop: function () {
        var _this = this;
        clearInterval(_this.timer);
    },
    progressIng: function () {
    }
};

//倒计时
var downTime = {
    cdTime: 5,
    timer: -1,
    opt: {},
    nowTime: '',
    overTime: 0,
    start: function () {
        var _this = this;
        _this.progress();
        _this.timer = setInterval(function () {
            _this.progress();
        }, 1000)
    },
    pause: function () {
        var _this = this;
        clearInterval(_this.timer);
    },
    stop: function () {
        var _this = this;
        clearInterval(_this.timer);
        _this._doCallback(_this.opt.endCall);
    },
    progress: function () {
        var _this = this;
        if (_this.cdTime == 0) {
            _this.stop();
        } else {
            _this.nowTime = _this.cdTime;
            _this._doCallback(_this.opt.startCall);
            _this.cdTime--;
            ++_this.overTime;

        }
    },
    rest: function (opt) {
        var _this = this;
        _this.opt = opt;
        clearInterval(_this.timer);
        _this.cdTime = _this.opt.cdTime || 5;
        _this.overTime = 0;
        _this.start();
    },
    //判断并执行回调
    _doCallback: function (callback) {
        if (callback && $.isFunction(callback)) {
            callback(this);
        }
    }
};

//正计时
function timer(){
    this.timer=null;
    this.sum=0;
}
timer.prototype={
      start:function(){
          var _this=this;
          clearInterval(_this.timer);
          _this.timer=setInterval(function () {
              _this.sum++;
          },1000);
      },
    stop:function(callback){
        var _this=this;
        clearInterval(_this.timer);
        _this._isCallback(callback);

    },
    rest:function(){
        var _this=this;
        clearInterval(_this.timer);
        _this.sum=0;
    },
    _isCallback:function(callback){
        if (callback && $.isFunction(callback)) {
            callback(this);
        }
    }
};

//日期格式化
Date.prototype.Format = function (fmt) { //
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "H+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};