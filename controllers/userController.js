let userService = require('../services/userService')
let {User} = require('../models')
const lodash = require('lodash')

module.exports.signup = async function (req, res) {
    try {
        // here we check first if this email is used before or not to return an error
        let user = await User.findOne({ where: {'email':req.body.email} })
        if (user)
            throw new Error("User already exists");
        // here we encrypt the user password before saving to DB
        req.body.password = await userService.encrypt_password(req.body.password)
        // here we create a new user and save it to DB
        user = await User.create(req.body)
        // return only the wanted data to the user
        res.send({user: lodash.pick(user,['id','name','phone','email'])})
    } catch (error) {
        return res.status(400).send({
            status: 400,
            message: error.message
        })
    }

}


module.exports.signin =async function (req, res) {
    try {
        // here we search for the user email first
        let user = await User.findOne({ where: {'email':req.body.email} })
        // if the email does not exists we return an error
        if (!user) 
            throw new Error("Log In failed. A user with this email address doesn't exist");
        // here we validate the password
        const valid = await bcrypt.compare(req.body.password, user.password);
        // if not valid password we return error
        if (!valid) 
            throw new Error("Wrong Password")
        // then we generate the token for the user
        let token = userService.genrate_token(user)
        // return the token to the user with the needed info for the user
        return res.send({
            "authToken": token,
            status: 200,
            user: lodash.pick(user, ['id', 'name', 'email', 'phone'])
        })
    
    } catch (error) {
        return res.status(400).send({
            status: 400,
            message: error.message
        })
    }
}
