const User = require('./../models/user');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')

const bcrypt = require('bcrypt')


exports.add_user = (req, res, next) => {
  User.find({
      username: req.body.username
    })
    .exec()
    .then(user => {
      if (user.length > 0) {
        return res.status(409).json({
          message: "username is already taken ! \n please try with another username ",

        })
      } else {
        bcrypt.hash(req.body.password, 5, (err, hash) => {
          if (err) {
            return res.status(500).json({
              message: "error in encrypting !",
              error: err
            })
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              username: req.body.username,
              password: hash
            });
            user.save()
              .then(result => {
                console.log(result)
                res.status(201).json({
                  message: " user created successfully !",
                  data: result
                })
              })
              .catch(err => {
                console.log(err)
                res.status(500).json({
                  message: "error in creating user ! ",
                  error: err
                })
              })
          }
        })
      }
    })
}

exports.login_user = (req,res,next)=>{
 
  User.find({ username: req.body.username })
    .exec()
    .then(user => {
      if (user.length < 1) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "Auth failed"
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              username:user[0].username,
            },
              "mysecret",  
              {
              expiresIn:"1h"
            }
          )
          return res.status(200).json({
            message: "Auth successful",
            token:token
          });
        }
        res.status(401).json({
          message: "Auth failed"
        });
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
   } 

