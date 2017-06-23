/**
 * Created by haoguo on 17/5/31.
 */
var express=require('express');
var router=express.Router();
router.get('/',function(req,res){
    res.render('index',{title:'首页'});
    //res.send('hello');
  /*  if(req.session.isVisit){
        req.session.isVisit++;
         res.send('<p> 第'+req.session.isVisit+'次来此页面</p>');
       /!* res.render('index',{
            count:'<p> 第'+req.session.isVisit+'次来此页面</p>'
        });*!/
    }else{
        req.session.isVisit=1;
      /!*  res.render('index',{
            count:'welcome'
        })*!/
        res.send('welcome');
    }*/
});

module.exports=router;