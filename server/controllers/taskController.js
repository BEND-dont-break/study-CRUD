// const { trusted } = require('mongoose');
const db = require('../models/models.js');

const taskController = {};

taskController.getTasks = async (req, res, next) => {
  try {
    const taskData = await db.find({});
    console.log(taskData);
    res.locals.tasks = taskData;
    return next();
  } catch (error) {
    console.log('Error in getTasks middleware => ', error);
  }
}

taskController.createTask = async (req, res, next) => {
  try {
    const task = req.body.task;
    const taskSave = await db.create({task});
    console.log('taskSave => ', taskSave)
    res.locals.newTask = taskSave;
    return next();
  } catch (error) {
    console.log('Error in createTask middleware => ', error);
  }
}

module.exports = taskController;