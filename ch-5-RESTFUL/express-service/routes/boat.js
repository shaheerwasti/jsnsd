const url = require('url')
var express = require('express');
var router = express.Router();
var {boat} = require('../modelboat');


router.get('/:id',(req,res,next)=>{
    const { pathname } = url.parse(req.url)
    let id = pathname.match(/^\/(\d+)$/)
  
    if (!id) {
    res.statusCode = 500
    return void res.end()
    } 
    
    boat.read(req.params.id,(err,result)=>{
        err?err.message === 'not found'?next():next(err):res.send(result);
    })

})

module.exports = router;