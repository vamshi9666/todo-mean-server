const express = require('express');
const router = express.Router();
const taskController = require('./../controllers/taskController')
 router.get('/',taskController.get_tasks)
 router.get('/:id',taskController.get_task)
 router.post('/',taskController.add_task)
 router.patch('/:id',taskController.update_task)
 router.delete('/:id',taskController.delete_task)
module.exports = router;