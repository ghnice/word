/**
 * Created by haoguo on 17/6/5.
 */
//第一版暂时不做登录
module.exports = {
    checkLogin: function checkLogin(req, res, next) {
        if (!req.session.user) {
            //未登录跳转到登录页面
            res.redirect('/signin');
            res.send(302);
            return next();
        }
        next();
        //res.redirect('http://google.com');
    },
    checkNotLogin: function checkNotLogin(req, res, next) {
        if (req.session.user) {
            return res.redirect('back');//返回之前的页面
        }
        next();
    }
};