
// Get ALL Users
exports.getAllUsers = function(req, res, next) {
  return res.status(200).json({
    status: 'success' ,
    msg: 'All Users'
  })
}

exports.get1User = function( req , res , next) {
  return res.status(200).json({
    msg: 'User not found'
  })
}
// Create 1 User
exports.add1User = function( req , res , next ){
  return res.status(200).json({
    status: 'success' ,
    message: 'User saved'
  })
}


// Update 1 User
exports.update1User = function( req , res , next) {
  return res.status(200).send('Patch user')
}


// Delete 1 User
exports.delete1User = function( req , res, next) {
  return res.send('User removed')
}