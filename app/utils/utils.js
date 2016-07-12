exports.handleError = (res, err, msg)=>{
  console.log({err})
  res.json({err: true, msg});
};
exports.sendData = (res, data)=>{
  res.json({err: false, data});
};

exports.requireAuth = (req, res, next)=>{
  if (req.session.user) {
    console.log(`${req.session.user.username}正在访问${req.originalUrl}`);
    next();
  } else {
    console.log(`未登录用户正在访问${req.originalUrl}`);
    exports.handleError(res, "未登录");
  }
};
