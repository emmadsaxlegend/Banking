const express = require('express')
const authMiddleware = require('../middleware/auth')
const Router = express.Router()
const {signup, signin, logout} = require('../controllers/authController')
const {check_signUp, check_signIn} = require('../validators/auth_check')
const {validationResult} = require('../validators/index_Validator')



Router.post('/signup', check_signUp, validationResult, signup)
Router.post('/signin', signin)
Router.post('/logout', authMiddleware, logout)


module.exports = Router