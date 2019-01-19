const express = require('express');
const middleware = require('../middleware/middleware')
const Feed = require('../models/feed');
const router = express.Router();

router.get("/create",middleware.isLoggedIn,(req,res)=>{
    res.render("/feed/Feed")
})

router.post("/create", middleware.isLoggedIn, (req, res) => {
  let heading = req.body.heading;
  let newPost = req.body.description;
  let author = {
    id: req.user._id,
    username: req.user.username,
    firstname: req.user.firstname
  }
  let post = { heading: heading, description: newPost, author: author }
  Feed.create(post, (err, new_post) => {
    if (err) {
      return res.status(500).json({status:"error",message:err.message})
    }
    else {
      console.log(`Added new Post ${new_post}`)
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

// Edit Learning 
router.get('/:id/edit', middleware.checkFeedOwner, (req, res) => {
    Feed.findById(req.params.id, (err, post) => {
      res.render('edit', { post: post })
    }); 
  });

//
router.get('/:id', middleware.isLoggedIn, (req, res) => {
    Feed.findById(req.params.id).populate("comments").exec(function (err, found) {
      if (!err) {
        //render the show template
        res.render("show", { data: found })
      }
    })
  })
  
// Update Learning 
router.put('/:id', middleware.checkFeedOwner, (req, res) => {
    Feed.findByIdAndUpdate(req.params.id, req.body.post, (err, updatedPost) => {
      if (!err) {
        res.redirect(`/feed/${updatedPost._id}`)
      }
      else {
        console.log(err)
        res.redirect('/learning')
      }
    })
})
  
router.delete('/:id',middleware.checkFeedOwner,(req, res) => {
    Feed.findByIdAndRemove(req.params.id, (err) => {
      if (!err) {
        return res.status(200).json({status:"success",message:"Deleted Successfully"})
      }
      return res.status(500).json({status:"failure",message:err.message})
    })
  })
  
  

module.exports = router;
