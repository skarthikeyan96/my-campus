var express = require('express');
const middleware = require('../middleware/middleware')
var router = express.Router();

router.get('/create',middleware.isLoggedIn,(req,res)=>{
    res.render("newPost")
})
router.post('/create',middleware.isLoggedIn,(req,res)=>{
    let content = req.body.content;
    
})
module.exports = router;