// const { trusted } = require('mongoose');
const db = require('../models/models.js');

const taskController = {};

taskController.getTasks = async (req, res, next) => {
  try {
    const userTasks = await db.User.findOne({_id: req.cookies.ssid});
    console.log('User Tasks => ', userTasks);
    const populated = await userTasks.populate('tasks');
    console.log('Populated => ', populated);
    const taskData = await db.Task.find({});
    res.locals.tasks = populated.tasks;
    return next();
  } catch (error) {
    console.log('Error in getTasks middleware => ', error);
  }
}

taskController.createTask = async (req, res, next) => {
  try {
    const task = req.body.task;
    const {user_id} = req.cookies
    const taskSave = await db.Task.create({task});
    const user = await db.User.findOne({user_id});
    const tasks = [...user.tasks];
    tasks.push(taskSave._id)
    const userTask = await db.User.updateOne({user_id}, {tasks})
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
    const taskDelete = await db.Task.deleteOne({task});
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
        taskUpdate = await db.Task.updateOne({task}, {complete: true});
        break;
    
      case 'Complete':
        taskUpdate = await db.updateOne({task}, {complete: false});
        break;
    };
    updated = await db.Task.findOne({task});
    res.locals.newStatus = updated;
    return next();
  } catch (error) {
    console.log('Error in updateStatus middleware => ', error);
  }
}

module.exports = taskController;