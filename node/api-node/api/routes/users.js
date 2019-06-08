const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user-schema')

// POST a new user
router.post('/signup', (req, res, next) => {
  User.find({email: req.body.email})
  .exec()
  .then(user => {
    if (user.length >= 1) {
      console.log(`${req.body.email} already exists`);
      return res.status(409).json({
        message: `${req.body.email} already exists`
      });
    } else {
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
          return res.status(500).json({error: err});
        } else {
          const user = new User({
            _id: new mongoose.Types.ObjectId(),
            email: req.body.email,
            password: hash
          });
          user.save()
          .then(result => {
            console.log(`User Created:\n_id:\ ${result._id}\nemail:\ ${result.email}`)
            res.status(201).json({
              message: 'User Created:',
              _id: result._id,
              email: result.email
            });
          })
          .catch(err => {
            console.log(err)
            res.status(500).json({error: err});
          });
        };
      });
    };
  });
});

// POST login // Check db for user. If exists = create token
router.post('/login', (req, res, next) => {
  User.find({email: req.body.email})
  .exec()
  .then(user => {
    if (user.length < 1) {
      console.log('Auth failed');
      return res.status(401).json({message: 'Auth failed'});
    } else {
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          console.log('Auth failed');
          return res.status(401).json({message: 'Auth failed'});
        } else if (result) {
          const token = jwt.sign({userId: user[0]._id, email: user[0].email},
          process.env.JWT_KEY, {expiresIn: '1h'});
          console.log('Auth Successful');
          return res.status(200).json({
            message: 'Auth Successful',
            token: token
          });
        } else {
          console.log('Auth failed');
          res.status(401).json({message: 'Auth failed'});
        };
      });
    };
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({error: err});
  });
});

// DELETE a user by ID
router.delete('/:userId', (req, res, next) => {
  User.remove({_id: req.params.userId})
  .exec()
  .then(result => {
    if (result) {
      console.log(`User ${req.body.email} was deleted`);
      res.status(200).json({
        message: `User ${req.body.email} was deleted`,
        request: {
          type: 'POST',
          url: `http://localhost:4000/users`,
          body: {
            email: 'String',
            password: 'String'
          }
        }
      });
    } else {
      console.log('No user entry for that ID yo');
      res.status(404).json({message: 'No user entry for that ID yo'})
    }
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({error: err});
  });
});

module.exports = router;