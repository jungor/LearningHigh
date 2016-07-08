var express = require('express'),
  router = express.Router(),
  utils = require('../utils/utils'),
  sendData = utils.sendData,
  handleError = utils.handleError
  db = require('../models');

module.exports = function (app) {
  app.use('/api/users', router);
};

// Create a user, use to register
router.post('/', (req, res, next)=>{
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
    err=>handleError(res, err, '用户名已存在')
  )
  .catch(
    err=>handleError(res, err, '数据库查询出错')
  )
})

// use to login in
router.post('/login', (req, res, next)=>{
  var username = req.body.username
  var password = req.body.password
  // console.log(`${username}请求登录系统`)
  db.user.findOne({
    attributes: ['id', 'username'],
    where: {
      $and: {username, password}
    }
  })
  .then(
    data=>{
      if (data) {
        req.session.user = data
        sendData(res, data)
      } else {
        handleError(res, true, '用户名或密码错误')
      }
    },
    err=>handleError(res, err, '数据库查询出错')
  )
  .catch(
    err=>handleError(res, err, '数据库查询出错')
  )
})

router.get('/logout', (req, res, next)=>{
  delete req.session.user
  sendData(res, null)
})