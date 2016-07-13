var express = require('express'),
  router = express.Router(),
  utils = require('../utils/utils'),
  sendData = utils.sendData,
  handleError = utils.handleError,
  db = require('../models');

module.exports = function (app) {
  app.use('/api/pages', router);
};

/**
 * @api {get} /pages Retrieve a queston
 * @apiName Retrieve a queston
 * @apiGroup post
 *
 * @apiParam {String} coursewareId 课件id
  * @apiParam {Number} number 页码
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
 * @apiErrorExample Error
 *     {
 *       "err": true,
 *       "msg": "用户名已存在"
 *     }
 * 
 */
router.get('/', (req, res)=>{
  var {coursewareId, number} = req.query;
  db.page.findOne({
    where: {
      coursewareId,
      number
    }
  }).then(data=>{
    id 
    sendData(res, data)
  }).catch(err=>{
    handleError(res, err, "数据库查询错误");
  })
});
