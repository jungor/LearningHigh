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
