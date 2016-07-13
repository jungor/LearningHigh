const express = require("express"),
  router = express.Router(),
  utils = require("../utils/utils"),
  sendData = utils.sendData,
  handleError = utils.handleError,
  db = require("../models");

module.exports = function (app) {
  app.use("/api/posts", router);
};

// let beautifyQuestion = (posts)=>{
//   console.log(JSON.stringify(posts));
//   let question = null;
//   for (let p of posts) {
//     if (p.type == 0) {
//       question = p;
//       break;
//     }
//   }
//   question.answers = [];
//   question.comments = [];
//   console.log(question);
//   for (let post of posts) {
//     if (post.parentId == question.id) {
//       if (post.type == 1) question.answers.push(post);
//       if (post.type == 2) question.comments.push(post);
//     }
//   }
//   for (let answer of question.answers) {
//     answer.comments = [];
//     for (let post of posts) {
//       if (answer.id == post.parentId) answer.comments.push(post);
//     }
//   }
//   return question;
// }


router.all("*", utils.requireAuth);

/**
 * @api {post} /posts Create a post
 * @apiName Create a post
 * @apiGroup post
 *
 * @apiParam {String} title 标题，只有type=0的时候需要传
 * @apiParam {String} body 内容
 * @apiParam {Number} type 类型
 * @apiParam {Number} parentId 所属上级元素的id
 * @apiParam {Number} absParentId 所属问题的id
 * @apiParam {Number} pageId 所属页面的id
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
  let {title, body, type, parentId, absParentId, pageId} = req.body;
  type = parseInt(type);
  let newPost = null;
  switch (type) {
  case 0:
    newPost = {body, type, absParentId, title, pageId};
    break;
  case 1:
    newPost = {body, type, absParentId, parentId, pageId};
    break;
  case 2:
    newPost = {body, type, absParentId, parentId, pageId};
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


/**
 * @api {get} /posts Retrieve  questions of a page
 * @apiName Retrieve questions of a page
 * @apiGroup post
 *
 * @apiSuccessExample Success
 *     {
 *       "err": false,
 *       "data": [
 *         {
 *           "id": 15,
 *           "title": "试试中文",
 *           "authorId": 1,
 *           "body": "你好吗",
 *           "type": 0,
 *           "parentId": null,
 *           "absParentId": 13,
 *           "createdAt": "2016-07-12T18:26:50.000Z",
 *           "updatedAt": "2016-07-12T18:26:50.000Z"
 *         },
 *         {
 *           "id": 1,
 *           "title": "t1",
 *           "authorId": 1,
 *           "body": "q1",
 *           "type": 0,
 *           "parentId": null,
 *           "absParentId": null,
 *           "createdAt": "2016-07-13T01:14:05.000Z",
 *           "updatedAt": "2016-07-13T01:14:05.000Z"
 *         },
 *         {
 *           "id": 9,
 *           "title": "t2",
 *           "authorId": 1,
 *           "body": "q2",
 *           "type": 0,
 *           "parentId": null,
 *           "absParentId": null,
 *           "createdAt": "2016-07-13T01:36:31.000Z",
 *           "updatedAt": "2016-07-13T01:36:31.000Z"
 *         }
 *       ]
 *     }
 * 
 * @apiErrorExample DatabaseError
 *     {
 *       "err": true,
 *       "msg": "数据库查询失败"
 *     }
 * 
 */
router.get('/', (req, res)=>{
  let {pageId} = req.query;
    db.post.findAll({
    where: {
      pageId,
      type: 0
    },
    order: 'createdAt'
  }).then(data=>{
    sendData(res, data)
  }).catch(err=>{
    handleError(res, err, "数据库查询失败")
  })
})


/**
 * @api {get} /posts/:questionId Retrieve a question
 * @apiName Retrieve a question
 * @apiGroup post
 *
 * @apiSuccessExample Success
 *     {
 *       "err": false,
 *       "data": [
 *         {
 *           "id": 1,
 *           "title": "t1",
 *           "authorId": 1,
 *           "body": "q1",
 *           "type": 0,
 *           "parentId": null,
 *           "absParentId": null,
 *           "createdAt": "2016-07-13T01:14:05.000Z",
 *           "updatedAt": "2016-07-13T01:14:05.000Z"
 *         },
 *         {
 *           "id": 2,
 *           "title": null,
 *           "authorId": 31,
 *           "body": "a1",
 *           "type": 1,
 *           "parentId": 1,
 *           "absParentId": 1,
 *           "createdAt": "2016-07-13T01:15:30.000Z",
 *           "updatedAt": "2016-07-13T01:15:30.000Z"
 *         },
 *         {
 *           "id": 3,
 *           "title": null,
 *           "authorId": 32,
 *           "body": "a2",
 *           "type": 1,
 *           "parentId": 1,
 *           "absParentId": 1,
 *           "createdAt": "2016-07-13T01:15:39.000Z",
 *           "updatedAt": "2016-07-13T01:15:39.000Z"
 *         },
 *         {
 *           "id": 4,
 *           "title": null,
 *           "authorId": 27,
 *           "body": "c1",
 *           "type": 2,
 *           "parentId": 1,
 *           "absParentId": 1,
 *           "createdAt": "2016-07-13T01:17:17.000Z",
 *           "updatedAt": "2016-07-13T01:17:17.000Z"
 *         },
 *         {
 *           "id": 5,
 *           "title": null,
 *           "authorId": 28,
 *           "body": "c2",
 *           "type": 2,
 *           "parentId": 2,
 *           "absParentId": 1,
 *           "createdAt": "2016-07-13T01:17:18.000Z",
 *           "updatedAt": "2016-07-13T01:17:18.000Z"
 *         },
 *         {
 *           "id": 6,
 *           "title": null,
 *           "authorId": 29,
 *           "body": "c3",
 *           "type": 2,
 *           "parentId": 3,
 *           "absParentId": 1,
 *           "createdAt": "2016-07-13T01:17:19.000Z",
 *           "updatedAt": "2016-07-13T01:17:19.000Z"
 *         }
 *       ]
 *     }
 * 
 * @apiErrorExample DatabaseError
 *     {
 *       "err": true,
 *       "msg": "数据库查询失败"
 *     }
 * 
 */
router.get('/:questionId', (req, res)=>{
  sendData(res, req.question);
})

router.param("questionId", (req, res, next, id)=>{
  db.post.findAll({
    where: {
      $or: [
        {id, type: 0}, {absParentId: id}
      ]
    },
    order: 'createdAt'
  }).then(data=>{
    req.question=data;
    next();
  }).catch(err=>{
    next(err);
  })
})
