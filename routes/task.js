const express =require('express')
const router=express.Router()
const TaskController=require('../controllers/TaskController')
const validationMiddleware=require('../middleware/validation')

// this is the routes for the task management and the apis that needs body validation
// like newtask or edit task is validated with the validation middleware 
router.post('/newTask', validationMiddleware.validate('taskRepository','newTaskSchema'), TaskController.new_task)
router.get('/myTasks', TaskController.my_tasks)
router.get('/:id', TaskController.get_task)
router.put('/:id', validationMiddleware.validate('taskRepository','editTaskSchema'), TaskController.update_task)
router.delete('/:id', TaskController.delete_task)


module.exports=router;
// this is the swagger docs for task routes
/**
 * @typedef newTask
 * @property {string} title.required
 * @property {string} description
 * @property {string} due_date.required - date time formated 
 * @property {string} status.required - enum must be in 'pending', 'inprogress', 'completed'
 */
/**
 * This function comment is parsed by doctrine
 * add new task
 * @route post /task/newTask
 * @group tasks - Operations about task
 * @param {newTask.model} task.body.required
 * @returns {object} 201 success -{  status:200,  message:"Task created successfully " }
 * @security JWT 
 * @returns {object} 400 failed -{  status:400,  message:"" } 
 * @returns {Error}  default - Unexpected error
 * 
 */

   //----------------------------------myTasks---------------------------------------------
/**
 * This function comment is parsed by doctrine
 * @route get /task/myTasks
 * @group tasks - Operations about task
 * @returns {object} 200 success -{ tasks} 
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */


    //----------------------------------get task---------------------------------------------
/**
 * This function comment is parsed by doctrine
 * @route get /task/{id}
 * @group tasks - Operations about task
 * @param {id} id.path
 * @returns {object} 200 success -{ task} return task details
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */



    //----------------------------------edit task---------------------------------------------
/**
 * @typedef editTask
 * @property {string} title
 * @property {string} description
 * @property {string} due_date - date time formated 
 * @property {string} status - enum must be in 'pending', 'inprogress', 'completed'
 */
/**
 * This function comment is parsed by doctrine
 * add new task
 * @route put /task/{id}
 * @group tasks - Operations about task
 * @param {id} id.path
 * @param {editTask.model} task.body.required
 * @returns {object} 200 success -{ task} return task details
 * @security JWT 
 * @returns {object} 400 failed -{  status:400,  message:"" } 
 * @returns {Error}  default - Unexpected error
 * 
 */

    //----------------------------------delete task---------------------------------------------

/**
 * This function comment is parsed by doctrine
 * @route delete /task/{id}
 * @group tasks - Operations about task
 * @param {id} id.path
 * @returns {object} 200 success -{ message: Task deleted successfully}
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */