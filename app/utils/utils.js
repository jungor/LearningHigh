exports.handleError = (res, err)=>
  res.json({err, msg:'err'})
exports.sendData = (res, data)=>
  res.json({err:null, data})
exports.requireAuth = (req, res, next)=>
  req.session.user ? next() : handleError(res, true)