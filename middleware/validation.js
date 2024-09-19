const Joi = require('joi')

const userRepository=require('../repository/userRepository')



exports.validate =function(repoName,schemaName){
    return function(req, res, next){
        let schema = getSchemaName(repoName,schemaName)
        const { error } = schema.validate(req.body)
        if (error) return res.status(422).send({ status: 422, message: error.details[0].path[0] + ' is not correct', error_message: error.details[0].message })
        next()
    }
}
  
exports.validateQ =function(repoName,schemaName){
    return function(req, res, next){
        let schema = getSchemaName(repoName,schemaName)
        const { error } = schema.validate(req.query)
        if (error) return res.status(422).send({ status: 422, message: error.details[0].path[0] + ' is not correct', error_message: error.details[0].message })
        next()
    }
}

function getSchemaName(repoName,schemaName) {
    switch (repoName) {
        case 'userRepository':
            return userRepository[schemaName]()
        default:
            break;
    }
}