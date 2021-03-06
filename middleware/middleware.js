let jwt = require('jsonwebtoken');

let checkToken = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
  if (token.startsWith('Bearer ')) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
  }

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
          console.log(err)
        return res.json({
          success: false,
          message: 'Token is not valid'
        });
      } else {
        req.decoded = decoded;
        console.log(decoded)
        next();
      }
    });
  } else {
    return res.json({
      success: false,
      message: 'Auth token is not supplied'
    });
  }
};

module.exports = {
  checkToken: checkToken,
  isLoggedIn : (req, res, next) =>{
    if (req.isAuthenticated()) {
      return next()
    }
    //res.status(500).json({status:"error",message:"UnAuthorized Access"})
    res.redirect('/user/login?ref=' + req.protocol + '://' + req.get('host') + req.originalUrl);
  },
  checkFeedOwner: (req, res, next) => {
    if (req.isAuthenticated()) {
        Feed.findById(req.params.id, (err, post) => {
            if (!err) {
                //user owns the campground
                if (post.author.id.equals(req.user._id)) {
                    next()
                } else {
                    res.redirect('back')
                }
            }
            else {
                res.redirect('back')
            }
        })
    }
    else {
        res.send("You should be logged in to do that")
    }
},
checkCommentOwner : (req, res, next) => {
  if (req.isAuthenticated()) {
    Comments.findById(req.params.commentid, (err, comment) => {
      if (!err) {
        //user owns the campground
        if (comment.author.id.equals(req.user._id)) {
          next()
        } else {
        //  req.flash("error","Permission Denied")  
          res.redirect('back')
        }
      }
      else {
        //req.flash("error",err.message)
        res.redirect('back')
      }
    })
  }
  else {
    res.send("You should be logged in to do that")
  }
},
checkAdmin :(req,res,next)=>{
  if(req.isAuthenticated){
    //user is authenthicated
    if(req.user.isAdmin == true){
      next()
    }
    else{
      res.redirect('back')
    }
  }
  else{
    res.redirect('back')
  }

}



}