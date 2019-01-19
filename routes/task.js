const express = require('express');
const middleware = require('../middleware/middleware')
const Task = require('../models/task')
const router = express.Router();

router.get('/create',middleware.isLoggedIn,(req,res)=>{
    res.render("task")
})
router.post('/create',middleware.isLoggedIn,(req,res)=>{
    let heading = req.body.heading;
    let description = req.body.description;
    let author = {
       id: req.user._id,
       username: req.user.username,
        firstname: req.user.firstname
     }
    let Deadline = req.body.deadline
    let task = { heading: heading, description: description, author: author,deadline:Deadline }
    Post.create(post, (err, new_task) => {
        if (err) {
          console.log(err)
        }
        else {
          console.log(`Added a new task`)
          res.status(200).json({status:"success",message:"Task created Successfully"})
        }
      })
})

module.exports = router;