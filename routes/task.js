const express = require('express');
const middleware = require('../middleware/middleware')
const Task = require('../models/task')
const TaskStatus = require("../models/task-status")
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
       fullname: req.user.fullname,
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
      res.render("tasks", {data:task});
    }
    else {
      res.status(500).json({status:"error", message: err.message})
    }
  })
})

router.get('/view/:id',middleware.isLoggedIn,(req,res)=>{
  Task.findById(req.params.id,(err, task)=>{
    if(!err){
      res.render("task", {task: task});
    } else {
      res.status(500).json({status:"error" , message: err.message});
    }
  })
})
router.get("/addStatus",isLoggedIn,(req,res)=>{
  res.send("getting status for task")
})
router.post("/addstatus",isLoggedIn,(req,res)=>{
  let status;
  if(req.user.isAdmin == true){
    status = "NONE" 
  }
  else if(req.user.isStudent == true && (!req.body.task_solution || req.body.task_solution.length == 0)){
    status = 'NO'
  }
  else{
    status = "YES"
  }
  let author = {
    id: req.user._id,
    username: req.user.username,
    fullname: req.user.fullname,
  }
 let 
})
module.exports = router;
