const express = require('express');
const middleware = require('../middleware/middleware');
const Resource = require('../models/resource');
const router = express.Router();

router.get('/create', (req, res) => {
    res.render("newResource");
});

router.post('/create', (req, res) => {
    let data = req.body;
    let resource = {
        title: data.title,
        url: data.url,
        description: data.description,
        author: data.author
    };
    Resource.create(resource, (err, new_resource) => {
        if (err) {
            res.status(400).json({
                status: "error",
                message: "Unable to create a resource"
            });
        } else {
            res.status(200).json({
                status: "success",
                message: "Resource created Successfully"
            });
        }
    })
});

router.get('/view', (req, res) => {
    resource.find({}, function (err, resource) {
        if (!err) {
            res.render("resources", {
                data: resource
            });
        } else {
            res.status(500).json({
                status: "error",
                message: err.message
            })
        }
    })
})

module.exports = router;
