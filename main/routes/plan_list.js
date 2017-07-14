/**
 * Created by haoguo on 17/7/13.
 */
var express=require('express');
var router=express.Router();
var collinsSq=require('../lib/mongoose').collins;
router.get('/',function(req,res){
    //res.send('hello');
    res.render('plan_list',{title:'plan list'});
});


module.exports=router;