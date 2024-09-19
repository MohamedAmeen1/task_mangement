const Joi = require('joi')
const taskRepository = {
    newTaskSchema: function () {
        let schema = Joi.object({
            title: Joi.string().min(2).max(30).required(),
            description: Joi.string(),
            due_date: Joi.date().required(),
            status: Joi.string().equal('pending', 'inprogress', 'completed')
        })
        return schema
    },
    editTaskSchema: function () {
        let schema = Joi.object({
            title: Joi.string().min(2).max(30),
            description: Joi.string(),
            due_date: Joi.date(),
            status: Joi.string().equal('pending', 'inprogress', 'completed')
        })
        return schema
    },
}

module.exports = taskRepository;