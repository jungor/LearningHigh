const express = require('express'),
  router = express.Router(),
  multer  = require('multer'),
  storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/courseware');
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  }),
  upload = multer({ storage: storage }),
  utils = require('../utils/utils'),
  sendData = utils.sendData,
  handleError = utils.handleError,

  db = require('../models');


module.exports = function (app) {
  app.use('/api/coursewares', router);
};

router.all('*', utils.requireAuth);

/**
 * @api {post} /coursewares Upload
 * @apiName Upload
 * @apiGroup courseware
 *
 * @apiParam {Number} categoryId 分类
 * @apiParam {Number} pageCount 页数
 * @apiParam {File} courseware 课件
 *
 * @apiSuccessExample Success
 *     {
 *       "err": false,
 *       "data": [
 *        ...
 *       ]
 *     }
 *
 * @apiErrorExample Error
 *     {
 *       "err": true,
 *       "msg": "上传失败"
 *     }
 */
router.post('/', upload.single('courseware'), (req, res)=>{
  let {categoryId, pageCount} = req.body;
  let name = req.file.originalname;
  console.log(`${name}上传成功`);
  let url = `/courseware/${name}`;
  db.courseware.create({
    categoryId,
    name,
    pageCount,
    url
  }).then(data=>{
    // console.log(data);
    let {pageCount} = req.body;
    let coursewareId = data.dataValues.id;
    let bulk = [];
    for (let number = 1; number <= pageCount; number++) {
      bulk.push({
        coursewareId,
        number
      })
    }
    return db.page.bulkCreate(bulk);
  }).then(data=>{
    sendData(res, data)
  }).catch(err=>{
    handleError(res, '数据库错误')
  })
});
