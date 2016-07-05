var express = require('express'),
  router = express.Router(),
  utils = require('../utils/utils'),
  sendData = utils.sendData,
  handleError = utils.handleError
  db = require('../models');

module.exports = function (app) {
  app.use('/api/posts', router);
};

router.all('*', utils.requireAuth)


// Create a post, use to register
router.post('/', (req, res, next)=>{
  var authorId = req.session.user.id
  // var title = req.body.title || null
  // var body = req.body.body
  // var type = req.body.type
  // var parentId = req.body.parentId || null
  // var absParentId = req.body.absParentId || null
  var {title, body, type, parentId, absParentId} = req.body
  var isValid = true;
  type = parseInt(type)
  switch (type) {
  case 0:
    if (!title) isValid = false
    break
  case 1:
    if (!parentId || !absParentId) isValid = false
    break
  default:
    isValid = false
    break
  }
  if (!isValid) {
    handleError(res, err, '参数不符合要求')
  }
  db.post.create({authorId, title, body, type, parentId, absParentId})
  .then(
    data=>{
      sendData(res, data)
    },
    err=>handleError(res, err, '数据库查询失败')
  )
  .catch(
    err=>handleError(res, err, '数据库查询失败')
  )
})

// use to login in
router.post('/posts/login', (req, res, next)=>{
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

router.get('/posts/logout', (req, res, next)=>{
  delete req.session.user
  sendData(res, null)
})