/**
 * Created by haoguo on 17/5/31.
 */
 var express = require('express');
 var router = express.Router();
 var fs = require('fs');
 var parseString = require('xml2js').parseString;
 var collinsSq=require('../lib/mongoose').collins;
 var xml = '';
 var myObj = '';
 router.get('/', function (req, res) {
    res.render('xmlRender');
});

 router.post('/resolveXml', function (req, res, next) {
    fs.readFile('./xml/collins.xml', function (err, buffer) {
        if (err) {
            res.send({code: 501, result: '解析失败'});
            return console.error(err.stack)
        }
        xml = buffer.toString('utf8');//获取本地XML结构
        parseString(xml, {explicitArray: false}, function (err, result) {
            myObj = JSON.stringify(result.collins.entry).replace(/\$/ig, 'attribute');
           // console.log(myObj);
            var str=[{"word":"word","headword":"2","inflection":"ok","sense":"4"},{"word":"word","headword":"2","inflection":"ok","ddd":"d"}];
           // res.send(200, {code: 200, result: myObj});
            collinsSq.create(JSON.parse(myObj),function(error,doc){
                if(doc){
                    res.send(200, {code: 200, result: doc});
                    //console.log(doc);
                }else{
                    res.send(200, {code: 501, result: doc});
                }
            })

        });
    })

});
 router.post('/add', function (req, res, next) {
    var reqData = JSON.parse(req.body.listBar);
   // console.log(reqData);JSON.parse(myObj)
    collinsSq.create(JSON.parse(myObj),function(error,doc){
        if(doc){
            res.send(200, {code: 200, result: doc});
        //console.log(doc);
    }else{
        res.send(200, {code: 501, result: doc});
    }
});});

/*router.post('/add', function (req, res, next) {

    var reqData = JSON.parse(req.body.listBar);

    collinsModel.create(reqData).then(function (result) {
            console.log(result);
            res.send(200, {"info": result});
        })
        .catch(function (error) {
            console.log(1);
        })
    });*/


    module.exports = router;