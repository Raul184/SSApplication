const UserModel = require('./../models/users');

exports.signup = async ( req , res , next ) => {
  try {
    const newUser = await UserModel.create( req.body )  

    return res.status(200).json({
      status: 'success' ,
      data: {
        user: newUser
      }
    })
  } 
  catch (error) {
    return res.status(404).json({
      status: 'failed' ,
      msg: error
    })  
  }
}