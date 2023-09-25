'use strict'

const express = require('express');
const app = express();
const {boat} = require('./model')
const {uid} = boat;



app.delete('/boat/:id',(req,res,next)=>{
    let id = req.params.id;
    boat.del(id,(err,data)=>{
     if(err){
         if(err.message==='not found'){
             next()
             return
         }
         next(err)
         return
     }
     res.status(204).end()
    })
 })

app.get('/boat/:id',(req,res,next)=>{
   let id = req.params.id;
   boat.read(id,(err,data)=>{
    if(err){
        if(err.message==='not found'){
            next()
            return
        }
        next(err)
        return
    }
    res.json(data);
   })
})


app.use((_req,res)=>{
    res.status(404).json({message:'not found'})
})

app.use((err,_req,res,_next)=>{
    res.status(err.status ?? 500).json({message : 'internal server error'})
})

app.listen(process.env?.PORT ?? 3000)