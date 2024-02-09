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

taskController.deleteTask = async (req, res, next) => {
  try {
    const task = req.body.task
    const taskDelete = await db.deleteOne({task});
    return next();
  } catch (error) {
    console.log('Error in deleteTask middleware => ', error);
  }
}

taskController.updateStatus = async (req, res, next) => {
  try {
    const task = req.body.task;
    const compText = req.body.compText;
    let taskUpdate;
    let updated;
    switch (compText) {
      case 'Not Complete':
        taskUpdate = await db.updateOne({task}, {complete: true});
        break;
    
      case 'Complete':
        taskUpdate = await db.updateOne({task}, {complete: false});
        break;
    };
    updated = await db.findOne({task});
    res.locals.newStatus = updated;
    return next();
  } catch (error) {
    console.log('Error in updateStatus middleware => ', error);
  }
}

module.exports = taskController;