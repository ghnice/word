/**
 * Created by haoguo on 17/5/31.
 */
var express=require('express');
var router=express.Router();
var collinsSq=require('../lib/mongoose').collins;
router.get('/',function(req,res){
    //res.send('hello');
    res.render('learn_word',{title:'learn word'});
});

router.post('/all_list_word',function(req,res){
    collinsSq.find({},null,{limit:20},function(error,doc){
        if(doc){
            res.send(200,{code:200,result:doc});
        }else{
            res.send(200, {code: 501, result: doc});
        }
    })
});

module.exports=router;