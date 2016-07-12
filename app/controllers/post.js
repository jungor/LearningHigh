const express = require("express"),
  router = express.Router(),
  utils = require("../utils/utils"),
  sendData = utils.sendData,
  handleError = utils.handleError,
  db = require("../models");

module.exports = function (app) {
  app.use("/api/posts", router);
};

router.all("*", utils.requireAuth);

/**
 * @api {post} /posts Create a post
 * @apiName Create a post
 * @apiGroup post
 *
 * @apiParam {String} title 标题，只有type=0的时候需要传
 * @apiParam {String} body 内容
 * @apiParam {Number} type 用户名
 * @apiParam {Number} parentId 所属问题的id
 * @apiParam {Number} absParentId 所属页面的id
 *
 * @apiSuccessExample Success
 *     {
 *       "err": false,
 *       "data": {
 *         "id": 2,
 *         "body": "你好吗",
 *         "type": 0,
 *         "absParentId": "13",
 *         "title": "试试中文2",
 *         "authorId": 1,
 *         "updatedAt": "2016-07-12T13:51:57.000Z",
 *         "createdAt": "2016-07-12T13:51:57.000Z"
 *       }
 *     }
 * 
 * @apiErrorExample DatabaseError
 *     {
 *       "err": true,
 *       "msg": "数据库查询失败"
 *     }
 * 
 * @apiErrorExample ParamError
 *     {
 *       "err": true,
 *       "msg": "参数不符合要求"
 *     }
 */
router.post("/", (req, res)=>{
  let {title, body, type, parentId, absParentId} = req.body;
  type = parseInt(type);
  let newPost = null;
  switch (type) {
  case 0:
    newPost = {body, type, absParentId, title};
    break;
  case 1:
    newPost = {body, type, absParentId, parentId};
    break;
  case 2:
    newPost = {body, type, absParentId, parentId};
    break;
  default:
    handleError(res, {}, "参数不符合要求");
    break;
  }
  newPost.authorId = req.session.user.id;
  db.post.create(newPost).then(data=>{
    sendData(res, data);
  }).catch(err=>{
    handleError(res, err, "数据库查询失败");
  });
});
