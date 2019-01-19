const express = require('express');
const middleware = require('../middleware/middleware')
const Feed = require('../models/feed');
const router = express.Router();

router.get("/create",middleware.isLoggedIn,(req,res)=>{
    res.render("Feed")
})

router.post("/create", middleware.isLoggedIn, (req, res) => {
  let heading = req.body.heading;
  let newPost = req.body.post;
  let author = {
    id: req.user._id,
    username: req.user.username,
    firstname: req.user.firstname
  }
  let post = { heading: heading, description: newLearning, author: author }
  Feed.create(post, (err, new_post) => {
    if (err) {
      return res.status(500).json({status:"error",message:err.message})
    }
    else {
      console.log(`Added new learning ${new_learning}`)
      res.status(200).json({status:"success",message:"Post successfully created"})
    }
  })
})

router.get("/view",(req,res)=>{
    Feed.find({},(err,newpost)=>{
        if(!err){
            return res.status(200).json({status:"success",data:newpost})
        }
        return res.status(500).json({status:"error",message:err.message})
    })
})



module.exports = router;

