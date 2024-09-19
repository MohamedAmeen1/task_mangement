const express =require('express')
const router=express.Router()
const userController=require('../controllers/userController')
const validationMiddleware=require('../middleware/validation')

// here the endpoint for the sign up and the sign in and i added middleware to validate 
// the object schema for each request with joi validation
router.post('/signup', validationMiddleware.validate('userRepository','SignupSchema'), userController.signup)
router.post('/signin', validationMiddleware.validate('userRepository','SigninSchema'), userController.signin)


module.exports=router;
// this is the swagger docs for the signup an signin 
/**
 * @typedef userSignUp
 * @property {string} email.required
 * @property {string} name.required
 * @property {string} password.required
 * @property {string} phone.required
 */
/**
 * This function comment is parsed by doctrine
 * add new user
 * @route post /user/signup
 * @group user - Operations about user
 * @param {userSignUp.model} user.body.required
 * @returns {object} 200 success -{  status:200,  message:"verification email has been sent" } 
 * @returns {object} 400 failed -{  status:400,  message:" This email is Taken" } 
 * @returns {Error}  default - Unexpected error
 * 
 */
//-------------------------------------------------sign in--------------------------------------
/**
 * @typedef userSignIn
 * @property {string} email.required
 * @property {string} password.required
 */
/**
 * This function comment is parsed by doctrine
 * user signin
 * @route post /user/signin
 * @group user - Operations about user
 * @param {userSignIn.model} user.body.required
 * @returns {object} 200 success -{  status:200,"authToken": "token", user:"object" } 
 * @returns {object} 400 failed -{  status:400,  message:"Wrong Password" } 
 * @returns {Error}  default - Unexpected error
 * 
 */