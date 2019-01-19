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
    req.flash("error","Please login first")
    res.redirect('/login')
  }

}