var express = require('express'),
  router = express.Router(),
  utils = require('../utils/utils'),
  sendData = utils.sendData,
  handleError = utils.handleError
  db = require('../models');

module.exports = function (app) {
  app.use('/', router);
};

// Create a user, use to register
router.post('/api/users', (req, res, next)=>{
  var username = req.body.username
  var password = req.body.password
  db.user.create({
    username,
    password
  })
  .then(
    data=>{
      req.session.user = data
      sendData(res, data)
    },
    err=>handleError(res, err)
  )
  .catch(
    err=>handleError(res, err)
  )
})

// use to login in
router.post('/api/users/login', (req, res, next)=>{
  var username = req.body.username
  var password = req.body.password
  console.log(`${username}请求登录系统`)
  db.user.findOne({
    attributes: ['id', 'username'],
    where: {
      $and: {username, password}
    }
  })
  .then(
    data=>{
      if (data) {
        req.session.use = data
        sendData(res, data)
      } else {
        handleError(res, true)
      }
    },
    err=>handleError(res, err)
  )
  .catch(
    err=>handleError(res, err)
  )
})

router.get('/api/users/logout', (req, res, next)=>{
  delete req.session.user
  sendData(res, null)
})