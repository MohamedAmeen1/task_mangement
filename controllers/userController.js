let userService = require('../services/userService')
let {User} = require('../models')
const lodash = require('lodash')

module.exports.signup = async function (req, res) {
    try {
        let user = await User.findOne({ where: {'email':req.body.email} })
        if (user)
            throw new Error("User already exists");

        req.body.password = await userService.encrypt_password(req.body.password)
        user = await User.create(req.body)

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
        let user = await User.findOne({ where: {'email':req.body.email} })
        console.log(user);
        
        if (!user) 
            throw new Error("Log In failed. A user with this email address doesn't exist");

        const valid = await bcrypt.compare(req.body.password, user.password);
        if (!valid) 
            throw new Error("Wrong Password")

        let token = userService.genrate_token(user)
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
