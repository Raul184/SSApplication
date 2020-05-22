
exports.getAllTours = function(req, res, next) {
  return res.status(200).json({
    status: 'success' ,
    result: 10 ,
    data: {
      tours: 20
    }
  })
}


exports.getATour = function( req , res , next) {
  return res.status(200).send('cool')
}


exports.addATour = function( req , res , next ){
  return res.status(200).json({
    status: 'success' ,
    message: 'Tour saved'
  })
}



exports.updateATour = function( req , res , next) {
  return res.status(200).send('Patch route')
}



exports.deleteATour = function( req , res, next) {
  return res.send('File removed')
}

