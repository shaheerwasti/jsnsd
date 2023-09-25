const url = require('url')
var express = require('express');
var router = express.Router();
var {boat} = require('../boatmodel');
const { log } = require('console');


router.get('/:id',(req,res,next)=>{
    const { pathname } = url.parse(req.url)
    let id = pathname.match(/^\/(\d+)$/)
  
    if (!id) {
    res.statusCode = 500
    return void res.end()
    } 
    
    boat.read(req.params.id,(err,result)=>{
        if(err){
            if(err.message === 'not found') next();
            else next(err);
        }
        else
        res.send(result);
    });

})

router.post('/',(req,res,next)=>{
    var id = boat.uid();
    console.log(req.body);
    boat.create(id,req.body, (err)=>{
     if(err){
        if(err.message === 'not found') next();
        if(err.message === 'unknown') {console.log('bingo');}
        else next(err);
     }else {
        res.status(201).send({id});
     }   
    })
})

router.post('/:id/update',(req,res,next)=>{
    boat.update(req.params.id,req.body,(err)=>{
        if(err){
            if(err.message ==='not found') next();
            else next(err);
        }else{
            res.status(204).send();
        }
    });
});

router.put('/:id',(req,res,next)=>{
    boat.create(req.params.id,req.body,(err)=>{
        if(err){
            if(err.message === 'resource exists') {
                model.bicycle.update(req.params.id,req.body,(err)=>{
                    if(err){
                        if(err.message==='not found') next();
                        else next(err);
                    }else{
                        res.status(204).json();
                    }
                });
            }
        }else{
            res.status(201).json({"msg":'created'});
        }
    })
})

router.delete('/:id',(req,res,next)=>{
    boat.del(req.params.id,(err)=>{
        if(err){
            if(err.message ==='not found') next();
            else next(err);
        }else{
            res.status(204).json({'msg':'deleted'})
        }
    })
})

module.exports = router;