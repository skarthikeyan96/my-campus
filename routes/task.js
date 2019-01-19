const express = require('express');
const middleware = require('../middleware/middleware')
const Task = require('../models/task')
const router = express.Router();

router.get('/create', middleware.isLoggedIn, (req, res) => {
    res.render("newTask")
});

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
    Task.create(task, (err, new_task) => {
        if (err) {
          console.log(err)
        }
        else {
          console.log(`Added a new task`)
          res.status(200).json({status:"success",message:"Task created Successfully"})
        }
      })
});
router.get('/view', middleware.isLoggedIn, (req, res) => {
  Task.find({}, function (err, task) {
    if (!err) {
      res.send({data:task});
    }
    else {
      console.log(err);
    }
  })
})

module.exports = router;
