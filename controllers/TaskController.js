let { User, Task } = require('../models')
const lodash = require('lodash')
const Sequelize = require('sequelize');

module.exports.new_task = async function (req, res) {
    try {
        // here with search with the task title first if it already created with the same user id 
        // to make sure that we have no task title dublication with the same user
        let task = await Task.findOne({ where: { 'title': req.body.title, UserId: req.user_id } })
        if (task)
            throw new Error("Task already exists");

        req.body.UserId = req.user_id
        // here we create the task based on the details the user sent
        task = await Task.create(req.body)
        res.status(201).send({ task })
    } catch (error) {
        return res.status(400).send({
            status: 400,
            message: error.message
        })
    }

}


module.exports.update_task = async function (req, res) {
    try {
        // here we check if the task exists or not for this specific user
        let task = await Task.findOne({ where: { id: req.params.id, UserId: req.user_id } })
        // we return an error if the task is not found for this user
        if (!task)
            throw new Error("Wrong task ID");
        // we find first if we have and dublicate task name with the same name that the user requested and not the same task we edit
        let dub_task_name = await Task.findOne({
            where: {
                id: {
                    [Sequelize.Op.not]: req.params.id
                }, UserId: req.user_id, title: req.body.title
            }
        })
        // we return an error if we found a task with the same name for this user
        if (dub_task_name)
            throw new Error("Dublicated task name");

        task = await task.update(req.body)
        await task.save();

        res.status(200).send({ task })
    } catch (error) {
        return res.status(400).send({
            status: 400,
            message: error.message
        })
    }

}


module.exports.my_tasks = async function (req, res) {
    try {
        // here we find all task related to this user
        let tasks = await Task.findAll({ where: { UserId: req.user_id } })

        res.status(200).send({ tasks })
    } catch (error) {
        return res.status(400).send({
            status: 400,
            message: error.message
        })
    }

}

module.exports.get_task = async function (req, res) {
    try {
        // here we find the task by id and user id
        let task = await Task.findOne({ where: { id: req.params.id, UserId: req.user_id } })
        // we return an error if the task is not found for this user
        if (!task)
            throw new Error("Wrong task ID");

        res.status(200).send({ task })
    } catch (error) {
        return res.status(400).send({
            status: 400,
            message: error.message
        })
    }

}

module.exports.delete_task = async function (req, res) {
    try {
        // here we find the task by id and user id
        let task = await Task.findOne({ where: { id: req.params.id, UserId: req.user_id } })
        // we return an error if the task is not found for this user
        if (!task)
            throw new Error("Wrong task ID");

        await task.destroy();
        res.status(200).send({ message: "Task deleted successfully" })
    } catch (error) {
        return res.status(400).send({
            status: 400,
            message: error.message
        })
    }

}