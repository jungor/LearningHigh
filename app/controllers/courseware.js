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
    sendData(res, data);
  }).catch(err=>{
    handleError(res, err, '数据库错误');
  })
});


/**
 * @api {get} /coursewares Search
 * @apiName Search
 * @apiGroup courseware
 *
 * @apiParam {String} key 关键词
 * @apiParam {String} pageId 结果页的页数，用于分页，默认1
 *
 * @apiSuccessExample Success
 *     {
 *       "err": false,
 *       "data": [
 *         {
 *           "id": 4,
 *           "name": "test1.pdf",
 *           "url": "/courseware/test1.pdf",
 *           "categoryId": 1,
 *           "createdAt": "2016-07-12T15:02:00.000Z",
 *           "updatedAt": "2016-07-12T15:02:00.000Z"
 *         },
 *         {
 *           "id": 5,
 *           "name": "test2.pdf",
 *           "url": "/courseware/test2.pdf",
 *           "categoryId": 1,
 *           "createdAt": "2016-07-12T15:02:22.000Z",
 *           "updatedAt": "2016-07-12T15:02:22.000Z"
 *         },
 *         {
 *           "id": 6,
 *           "name": "test3.pdf",
 *           "url": "/courseware/test3.pdf",
 *           "categoryId": 1,
 *           "createdAt": "2016-07-12T15:02:34.000Z",
 *           "updatedAt": "2016-07-12T15:02:34.000Z"
 *         },
 *         {
 *           "id": 8,
 *           "name": "test4.pdf",
 *           "url": "/courseware/test4.pdf",
 *           "categoryId": 1,
 *           "createdAt": "2016-07-12T15:03:18.000Z",
 *           "updatedAt": "2016-07-12T15:03:18.000Z"
 *         },
 *         {
 *           "id": 9,
 *           "name": "test5.pdf",
 *           "url": "/courseware/test5.pdf",
 *           "categoryId": 1,
 *           "createdAt": "2016-07-12T15:03:27.000Z",
 *           "updatedAt": "2016-07-12T15:03:27.000Z"
 *         },
 *         {
 *           "id": 11,
 *           "name": "test6.pdf",
 *           "url": "/courseware/test6.pdf",
 *           "categoryId": 1,
 *           "createdAt": "2016-07-12T15:03:48.000Z",
 *           "updatedAt": "2016-07-12T15:03:48.000Z"
 *         },
 *         {
 *           "id": 12,
 *           "name": "test7.pdf",
 *           "url": "/courseware/test7.pdf",
 *           "categoryId": 1,
 *           "createdAt": "2016-07-12T15:03:57.000Z",
 *           "updatedAt": "2016-07-12T15:03:57.000Z"
 *         }
 *       ]
 *     }
 *
 */
router.get('/', (req, res)=>{
  let {key, pageId} = req.query;
  const limit = 2;
  if (!pageId) pageId = 1;
  db.courseware.findAll({
    offset:limit*(pageId-1),
    limit,
    where: {
      name: {
        $like: `%${key}%`
      }
    }
  }).then(data=>{
    sendData(res, data);
  }).catch(err=>{
    handleError(res, err, '数据库错误');
  })
})


