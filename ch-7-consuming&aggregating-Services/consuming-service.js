'use strict'

const express = require('express');
const app = express();
const url = require('url')
app.use(express.json());
const { request } = require('undici');

app.get('/:id', async (req, res, next) => {
    const {id} = req.params;
    if(isNaN(id)){
      console.log(parseInt(id));
      res.status(500).end();
      return
    }
    try {
        const bicycleSrv = await request(`http://localhost:4040/${id}`, {
            method: 'GET'
          })
          const brandSrv = await request(`http://localhost:5050/${id}`, {
            method: 'GET'
          })

          
          if (bicycleSrv.statusCode !== 200 || brandSrv.statusCode !== 200) {
            console.error('Error making HTTP request:', bicycleSrv.statusCode!== 200 ? bicycleSrv.statusCode:  brandSrv.statusCode);
            res.status(bicycleSrv.statusCode!== 200 ? bicycleSrv.statusCode:  brandSrv.statusCode).json({ error: 'Request Failed' });
            return;
          }
          let rawData = '';
          let rawData1 = '';
          for await (const chunk of bicycleSrv.body) {
            rawData += chunk.toString();
          }
          for await (const chunk of brandSrv.body) {
            rawData1 += chunk.toString();
          }
      
          const bicycle = JSON.parse(rawData);
          const brand = JSON.parse(rawData1);
          let finalObj = {
            id: bicycle.id,
            color: bicycle.color,
            brand: brand.name,
          }
          res.set('Content-Type', 'application/json')
        res.status(bicycleSrv.statusCode ?? brandSrv.statusCode).json(finalObj)    
    } catch (error) {
        console.error('Error making HTTP request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
    }
    
})

app.listen(process.env?.PORT ?? 3000)

