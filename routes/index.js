var express = require('express');
const middleware = require('../middleware/middleware')
var router = express.Router();

/* GET home page. */
router.get('/', middleware.checkToken,function(req, res, next) {
  res.render('index', { title: 'My Campus' });
});

module.exports = router;
