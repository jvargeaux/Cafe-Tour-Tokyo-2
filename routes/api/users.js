const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const mongoose = require('mongoose');

const User = require('../../models/User');

// Get Users
router.get('/', (req, res) => {
  User.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => next(err));
});

// Register
router.post('/', (req, res) => {
  const { email, password, passwordRepeat, name } = req.body;

  // Validation
  let errors = [];
  if (!email || !password || !passwordRepeat) {
    errors.push("Please fill in all required fields.");
  }
  if (password !== passwordRepeat) {
    errors.push("Passwords don't match.");
  }
  if (password.length < 4) {
    errors.push("Passwords must be at least 4 characters.");
  }

  if (!errors.length) {
    // Async
    User.findOne({ email }, (err, obj) => {
      if (obj) {
        errors.push("That email is already in use.");
        res.status(400).send(errors);
      }
      else {
        // Created hashed password
        // SaltRounds = 10 (default)
        bcrypt.hash(password, 10, function(err, hash) {
          if (err) {
            console.log(err);
          }
          else {
            // Save user with hashed password
            const newUser = new User({
              email: email,
              password: hash,
              name: name
            });
            newUser.save()
            .then(user => {
              res.status(201).json({
                email: email,
                name: name
              });
            })
            .catch(err => {
              console.log(err);
              res.status(500).send("Unsuccessful. Problem adding user.");
            });
          }
        });
      }
    })
      .catch(err => console.log(err));
  }
  else {
    res.status(400).send(errors);
  }
});

// Update User
router.put('/:id', (req, res) => {

  console.log("Updating user...");

  let id = req.params.id;
  let favorites = req.body.favorites;

  User.findOne({ _id: id }, (err, obj) => {
    if (err) {
      console.log(err);
    }
    else {
      let updatedUser = obj;
      updatedUser.favorites = favorites;

      User.replaceOne({ _id: id }, updatedUser )
        .then(user => {
          console.log("Replaced user:");
          console.log(updatedUser);

          let responseUser = {
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            favorites: updatedUser.favorites
          }

          res.status(200).json(responseUser);
        })
        .catch(err => console.log(err));
    }
  })
    .catch(err => console.log(err));
});

// Get user info in comment
router.post('/comment', (req, res) => {
  const userIDs = req.body.userIDs.map(id => new mongoose.Types.ObjectId(id));

  User.find({ '_id': { $in: userIDs } }, (err, obj) => {
    if (obj) {
      let usersInfo = obj.map(user => {
        return {
          _id: user._id,
          name: user.name,
          email: user.email
        }
      });
      res.status(200).json(usersInfo);
    }
    else {
      res.status(400).json({ error: 'Couldn\'t find any users with requested IDs.' });
    }
  })
    .catch(err => console.log(err));
});

module.exports = router;
