var express = require('express');
const middleware = require('../middleware/middleware')
var router = express.Router();

router.get('/create',(req,res)=>{
    res.send("create get route for post")
})
module.exports = router;