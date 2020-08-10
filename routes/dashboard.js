const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();


// Token Format
// Authorization: Bearer <access_token>

// Verify Token Middleware
function verifyToken(req, res, next) {
  // Get auth header value
  const bearerHeader = req.headers['authorization'];

  if (typeof bearerHeader !== 'undefined') {
    let bearerTokenString = bearerHeader.substring(bearerHeader.indexOf('Bearer ')).split(';')[0];
    let bearerToken = bearerHeader.split('Bearer ')[1];
    req.token = bearerToken;
    next();
  }
  else {
    res.sendStatus(403);
  }
}

router.get('/', verifyToken, (req, res) => {
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if (err) {
      res.sendStatus(403);
    }
    else {
      User.findOne({ email: authData.user.email }, (err, obj) => {
        if (obj) {
          const userInfo = {
            name: obj.name,
            email: obj.email
          }
          res.status(200).json(userInfo);
        }
        else {
          res.status(500).send("Problem finding user info.");
        }
      })
        .catch(err => {
          res.status(500).send(err);
        });
    }
  });
});

module.exports = router;
