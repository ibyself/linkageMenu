let express=require('express');
let cityModel=require('./model/cities');
let db=require('./db');
let app=express();
!(async()=>{
    await  db;
    //获取中国全部省份
    app.get('/getAllProvince',(request,response)=>{
        response.set('Access-Control-Allow-Origin','*');
        cityModel.find({level:1},{name:1,province:1,_id:0},(err,data)=>{
            if(!err){
                response.json({state:1,data});
            }else{
                console.log(err);
                response.json({state:0,err:'网络不稳定，稍后再试'});
            }
        })
    });
//获取某省下所有市信息
    app.get('/getCitiesByProvince',(request,response)=>{
        response.set('Access-Control-Allow-Origin','*');
        let {province}=request.query;
        cityModel.find({level:2,province},{name:1,city:1,_id:0},(err,data)=>{
            if(!err){
                response.json({state:1,data});
            }else{
                response.json({state:0,err:'网络不稳定，稍后再试'});
            }
        })
    });
    app.get('/getCountiesByProvinceAndCity',(request,response)=>{
        response.set('Access-Control-Allow-Origin','*');
        let {province,city} =request.query;
        cityModel.find({level:3,province,city},{name:1,code:1,_id:0},(err,data)=>{
            if(!err){
                response.json({state:1,data});
            }else{
                console.log(err);
                response.json({state:0,err:'网络不稳定，稍后再试'})
            }
        })
    });
})();
app.listen(3000,(err)=>{
    if(!err) console.log('服务器启动成功');
    else console.log(err);
});