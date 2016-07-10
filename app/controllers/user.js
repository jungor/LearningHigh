var express = require('express'),
  router = express.Router(),
  utils = require('../utils/utils'),
  sendData = utils.sendData,
  handleError = utils.handleError,
  db = require('../models');

module.exports = function (app) {
  app.use('/api/users', router);
};

/**
 * @api {post} /users Register
 * @apiName Register
 * @apiGroup user
 *
 * @apiParam {String} username 用户名
 * @apiParam {String} password 密码
 *
 * @apiSuccessExample Success
 *     {
 *       "err": false,
 *       "data": {
 *         "id": 27,
 *         "username": "test6",
 *         "password": "123",
 *         "updatedAt": "2016-07-08T17:48:51.000Z",
 *         "createdAt": "2016-07-08T17:48:51.000Z"
 *       }
 *     }
 *
 * @apiErrorExample Error
 *     {
 *       "err": true,
 *       "msg": "用户名已存在"
 *     }
 */
router.post('/', (req, res)=>{
  var username = req.body.username;
  var password = req.body.password;
  db.user.create({
    username,
    password
  }).then(data=>{
    req.session.user = data;
    sendData(res, data);
  },err=>{
    handleError(res, err, '用户名已存在');
  }).catch(err=>{
    handleError(res, err, '数据库查询出错');
  });
});

/**
 * @api {post} /users/login Login
 * @apiName Login
 * @apiGroup user
 *
 * @apiParam {String} username 用户名
 * @apiParam {String} password 密码
 *
 * @apiSuccessExample Success
 *     {
 *       "err": false,
 *       "data": {
 *         "id": 27,
 *         "username": "test6",
 *         "password": "123",
 *         "updatedAt": "2016-07-08T17:48:51.000Z",
 *         "createdAt": "2016-07-08T17:48:51.000Z"
 *       }
 *     }
 *
 * @apiErrorExample Error
 *     {
 *       "err": true,
 *       "msg": "用户名或密码错误"
 *     }
 */
router.post('/login', (req, res)=>{
  var username = req.body.username;
  var password = req.body.password;
  db.user.findOne({
    attributes: ['id', 'username'],
    where: {
      $and: {username, password}
    }
  }).then(data=>{
    if (data) {
      req.session.user = data;
      sendData(res, data);
    } else {
      handleError(res, true, '用户名或密码错误');
    }
  },err=>{
    handleError(res, err, '数据库查询出错');
  }).catch(err=>{
    handleError(res, err, '数据库查询出错');
  });
});

router.get('/logout', (req, res)=>{
  delete req.session.user;
  sendData(res, null);
});
