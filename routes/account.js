const express = require('express')
const authMiddleware = require('../middleware/auth')
const Account = require('../models/Account')
const {account} = require('../controllers/accountController');
const {check_account} = require('../validators/auth_check')
const {validationResult} = require('../validators/index_Validator')



const Router = express.Router()

// Get account details by user phone
Router.get('/account',authMiddleware, async (req, res) => {
    try {
        const accountDetails = await Account.findOne({userId: req.user._id})
        if(accountDetails){
            res.send({ account: accountDetails })
        } else {
            res.status(400).send({
                get_error: 'Account details does not exist'
            })
        }
    } catch (error) {
        res.status(400).send({
            get_error: 'Error while getting account details'
        })
    }  
})

// add new account of user
Router.post('/account', authMiddleware, account)

Router.patch('/account', authMiddleware, async (req, res) => {
    const { bvn } = req.body
    try {
        const accountDetails = await Account.findOneAndUpdate({userId: req.user._id}, { bvn }, { new: true })

        res.send({ account : accountDetails})
    } catch (error) {
        res.status(400).send({
            update_error: 'Error while updating account..Try again later.'
        })
    }
})
module.exports = Router