const Joi = require('joi')

const userRepository=require('../repository/userRepository')
const taskRepository=require('../repository/taskRepository')



exports.validate =function(repoName,schemaName){
    return function(req, res, next){
        // here we get the needed Repository schema from the passed Repository name and schema name
        let schema = getSchemaName(repoName,schemaName)
        // here we validate the request body against the schema with joi validation
        const { error } = schema.validate(req.body)
        // here we return an error with code 422 if an error happend with joi validation
        if (error) return res.status(422).send({ status: 422, message: error.details[0].path[0] + ' is not correct', error_message: error.details[0].message })
        next()
    }
}
  

function getSchemaName(repoName,schemaName) {
    switch (repoName) {
        case 'userRepository':
            return userRepository[schemaName]()
        case 'taskRepository':
            return taskRepository[schemaName]()
        default:
            break;
    }
}