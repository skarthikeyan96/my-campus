const express = require('express');
const middleware = require('../middleware/middleware');
const announce = require("../models/announcement");
const router =  express.Router();

router.get("/create",middleware.isLoggedIn,middleware.checkAdmin,(req,res)=>{
    res.render("announce")
})
router.post("/create",middleware.isLoggedIn,middleware.checkAdmin,(req,res)=>{
    let author = {
        id: req.user._id,
        username: req.user.username,
        fullname: req.user.fullname,
      }
    heading = req.body.heading;
    description = req.body.description;
    let announcement = {heading,description,author};
    announce.create(announcement,(err,data)=>{
        if(!err){
            console.log(data)
            res.render("announce")
        }
        else{
            res.json({message:err})
        }
    })
})

router.get('/view',middleware.isLoggedIn,(req,res)=>{
    announce.find({},(err,announcement)=>{
        if(!err){
            console.log(announcement)
            res.render("showannounce",{data:announcement})
        }
        else{
            res.redirect("/feed/view")
        }
    })
})

module.exports = router;