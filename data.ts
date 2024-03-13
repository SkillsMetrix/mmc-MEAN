const express = require('express')
const router = express.Router()
const axios = require('axios')
const registry=require('./registry.json')

router.all('/:apiName/:path', (req, res) => {
    console.log(req.params.apiName);
    if(registry.services[req.params.apiName]){
    axios.get(registry.services[req.params.apiName].url + req.params.path).then(
        (response) => {
            console.log(registry.services[req.params.apiName].url + req.params.path);
            
        res.send(response.data)
    })
    }else{
    res.send('No Api Found')
    }

})
module.exports = router



{
    "services":{
        "testapi": {
            "apiName":"testapi",
            "host": "http://localhost",
            "port": 4000,
            "url": "http://localhost:4000/"
        }
    }
}
