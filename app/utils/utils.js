exports.handleError = handleError = (res, err, msg)=>
  res.json({err, msg})
exports.sendData = (res, data)=>
  res.json({err:null, data})
exports.requireAuth = (req, res, next)=>{
  if (req.session.user) {
    console.log(`${req.session.user.username}正在访问接口${req.originalUrl}`)
    next()
  } else {
    exports.handleError(res, true, '未登录')
  }
}
