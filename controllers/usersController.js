

exports.getAllUsers = function(req, res, next) {
  return res.status(200).json({
    status: 'success' ,
    result: 10 ,
    data: {
      tours: 20
    }
  })
}