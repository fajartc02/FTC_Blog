const User = require('../models/modelUser')

module.exports = {
  signin: (req, res) => {
    let isEmail = {
      email: req.body.email
    }
    User.findOne(isEmail)
      .then(user => {
        res.status(201).json({
          message: 'Success',
          data: user
        })
      })
      .catch(err => {
        res.status(401).json({
          message: 'Failed',
          err: err.message
        })
      })
  },

  signup: (req, res) => {
    let newUser = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    }
    User.create(newUser)
    .then(user => {
      res.status(201).json({
        message: 'Success',
        data: user
      })
    })
    .catch(err => {
      res.status(500).json({
        message: 'Failed',
        err: err.message
      })
    })
  }
}