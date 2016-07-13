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
 * @api {get} /pages Retrieve a page
 * @apiName Retrieve a page
 * @apiGroup page
 *
 * @apiParam {String} coursewareId 课件id
  * @apiParam {Number} number 页码
 *
 * @apiSuccessExample Success
 *     {
 *       "err": false,
 *       "data": {
 *          "id": 37,
 *          "coursewareId": 6,
 *          "number": 3,
 *          "createdAt": "2016-07-12T15:02:34.000Z",
 *          "updatedAt": "2016-07-12T15:02:34.000Z"
 *       }
 *     }
 * @apiErrorExample Error
 *     {
 *       "err": true,
 *       "msg": "数据库查询错误"
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
    sendData(res, data)
  }).catch(err=>{
    handleError(res, err, "数据库查询错误");
  })
});
