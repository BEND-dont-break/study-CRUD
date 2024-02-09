const express = require('express');
const taskController = require('../controllers/taskController');
const router = express.Router();

router.get('/getTasks', taskController.getTasks,
(req, res) => res.status(200).json(res.locals.tasks));

router.post('/createTask', taskController.createTask,
(req, res) => res.status(200).json(res.locals.newTask));

router.post('/deleteTask', taskController.deleteTask,
(req, res) => res.status(200).end());

router.post('/updateStatus', taskController.updateStatus,
(req, res) => res.status(200).json(res.locals.newStatus));

module.exports = router;