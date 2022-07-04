const {validationResult} = require('express-validator')

exports.validationResult =(req, res, next) =>{
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(422).json({signup_error: errors.array()[0].msg})
    }
    next();
 
}