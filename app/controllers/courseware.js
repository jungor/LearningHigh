var express = require('express'),
  router = express.Router(),
  multer  = require('multer'),
  storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'courseware')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
  // upload = multer({ dest: 'public/pdf' }),
  utils = require('../utils/utils'),
  sendData = utils.sendData,
  handleError = utils.handleError,

  db = require('../models');


module.exports = function (app) {
  app.use('/api/coursewares', router);
};

router.all('*', utils.requireAuth)

// Create a courseware, use to register
router.post('/', upload.single('courseware'), (req, res, next)=>{
  // var {username, } = req.body
  // db.courseware.create({
  //   username,
  //   password
  // })
  // .then(
  //   data=>{
  //     req.session.user = data
  //     sendData(res, data)
  //   },
  //   err=>handleError(res, err, '用户名已存在')
  // )
  // .catch(
  //   err=>handleError(res, err, '数据库查询出错')
  // )
  var {categoryId} = req.body
  db.courseware.create({

  })
  console.log(req.file)
  sendData(res, req.file)
})
