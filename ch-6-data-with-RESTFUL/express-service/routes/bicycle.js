var express = require('express');
var router = express.Router();
var model = require('../model');

router.get('/:id',(req,res,next)=>{
    model.bicycle.read(req.params.id,(err,result)=>{
        if(err){
            if(err.message === 'not found') next();
            else next(err);
        }
        else
        res.send(result);
    });
});

router.post('/',(req,res,next)=>{
    var id = model.bicycle.uid();
    model.bicycle.create(id,req.body, (err)=>{
     if(err){
        if(err.message === 'not found') next();
        else next(err);
     }else {
        res.status(201).send({id});
     }   
    })
})

router.post('/:id/update',(req,res,next)=>{
    model.bicycle.update(req.params.id,req.body,(err)=>{
        if(err){
            if(err.message ==='not found') next();
            else next(err);
        }else{
            res.status(204).send();
        }
    });
});

router.put('/:id',(req,res,next)=>{
    model.bicycle.create(req.params.id,req.body,(err)=>{
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
    model.bicycle.del(req.params.id,(err)=>{
        if(err){
            if(err.message ==='not found') next();
            else next(err);
        }else{
            res.status(204).json({'msg':'deleted'})
        }
    })
})

module.exports = router;
