const { check } = require('express-validator');

exports.check_signUp = [
    check('name')
        .not()
        .isEmpty()
        .withMessage('Name is required'),
     check('phone')
        .isLength({ min: 11 })
        .isLength({ max: 11 })
        .withMessage('Account Number must be 11 digits'),
    check('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),
   
];
exports.check_account = [
     check('account')
        .isLength({ min: 11 })
        .isLength({ max: 11 })
        .withMessage('Account Number must be 11 digits'),
    check('bvn')
        .isLength({ min: 10})
        .withMessage('BVN must be 10 characters long'),
   
];

exports.check_signIn = [
     check('account')
        .isLength({ min: 11 })
        .withMessage('Account Number must be at least 11 characters long'),
    check('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),
   
];