const bcrypt = require('bcryptjs')
const {
    validateUser,
    isInvalidField,
    generateAuthToken
  } = require('../utils/common')
const BankUser = require('../models/BankUser')
const Tokens = require('../models/Tokens')


exports.signup = async (req, res) => {
    try {
        const { name, phone, password } = req.body
        const validFieldsToUpdate = [
            'name',
            'phone',
            'password'
        ]
        const receivedFields = Object.keys(req.body)
  
        const isInvalidFieldProvided = isInvalidField(
            receivedFields,
            validFieldsToUpdate
        )
        console.log('isInvalidFieldProvided', isInvalidFieldProvided) 
          
        if (isInvalidFieldProvided) {
            return res.status(401).send({
            signup_error: 'Invalid field.'
            })
        }

        const count = await BankUser.countDocuments({phone})
        if (count > 0) {
            return res.status(402).send({
                signup_error: 'User with this phone address already exists.'
            })
        }
    
        const hashedPassword = await bcrypt.hash(password, 8)
        const user = new BankUser({
            name,
            phone,
            password: hashedPassword
        })
        await user.save()
        res.status(201).send(user)
        
    } catch (error) {
        res.status(400).send({
            signup_error: 'Error while signing up..Try again later.'
        })
    }
}

exports.signin= async(req, res) => {
  try {
    const { phone, password } = req.body;
    const user = await validateUser(phone, password);
    if (user === null) {
      res.status(400).send({
        sigin_error: 'phone and password does not match.'
      });
    }
    const token = await generateAuthToken(user);
    const tokenObj = new Tokens({
        access_token: token,
        userId: user._id
    })
    
    await tokenObj.save()
    const resp = { phone, token, _id: user._id}
    res.send(resp);

  } catch (error) {
    res.status(400).send({
      signin_error: 'phone or password does not match.'
    });
  }
};


exports.logout =  async (req, res) => {
  try {
    const { _id } = req.user
    
    await Tokens.findOneAndRemove({userId: _id, access_token: req.token})
    res.send()
  } catch (error) {
    res.status(400).send({
      logout_error: 'Error while logging out..Try again later.'
    })
  }
}

