const Account = require('../models/Account')


exports.account =async (req, res) => {
    const { account_no, bank_name, bvn } = req.body
    try {
        const account = new Account({
            account_no,
            bank_name,
            bvn,
            userId: req.user._id
        })
        await account.save()
        res.status(201).send({ account })
    } catch (error) {
        res.status(400).send({
            add_error: 'Error while creating account'
        })
    }
}