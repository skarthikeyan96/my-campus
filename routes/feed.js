const express = require('express');
const middleware = require('../middleware/middleware')
const Feed = require('../models/feed');
const router = express.Router();

router.get("/create",middleware.isLoggedIn,(req,res)=>{
  res.render("newFeed",{title: 'My Campus | Create a Post'})
})

router.post("/create", middleware.isLoggedIn, (req, res) => {
  let heading = req.body.heading;
  let newPost = req.body.description;
  let author = {
    id: req.user._id,
    username: req.user.username,
    FullName: req.user.FullName
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
      res.render("forum", {
        title: 'My Campus | Feed',
        data: newpost
      })
    } else {
      res.status(500).json({
        status: "error",
        message: err.message
      })
    }
  })
})

//
router.get('/view/:id', middleware.isLoggedIn, (req, res) => {
  Feed.findById(req.params.id, (err, data) => {
    if (!err) {
      //render the show template
      res.render("post", {
        post: data
      })
    } else {
      res.status(500).json({
        status: "error",
        message: err.message
      })
    }
  })
});

// Edit Learning
router.get('/view/:id/edit', middleware.checkFeedOwner, (req, res) => {
  Feed.findById(req.params.id, (err, post) => {
    res.render('editPost', { post: post })
  });
});



// Update Learning
router.put('/update/:id', middleware.checkFeedOwner, (req, res) => {
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
