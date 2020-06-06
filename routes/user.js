const express = require('express');
const router = express.Router();

const usersController = require('./../controllers/usersController');
const authController = require('./../controllers/authController');

const {
  getAllUsers ,
  add1User ,
  update1User ,
  delete1User ,
  get1User, 
  updateMe ,
  deleteMe
} = usersController
const { signup , login , forgotPass , resetPass , updatePass , protect} = authController;


router.post( '/signup' , signup )
router.post( '/login' , login )

router.post( '/forgotPass' , forgotPass )
router.patch( '/resetPass/:token' , resetPass )

// User logged in
router.patch( '/updateMyPass' , protect , updatePass )
router.patch( '/updateMe' , protect , updateMe )
router.delete( '/deleteMe' , protect , deleteMe )
//  ADMIN 
router.get('/', getAllUsers );
router.post('/', add1User );
router.get( '/:id' , get1User );
router.patch('/:id', update1User );
router.delete('/:id', delete1User );



module.exports = router;