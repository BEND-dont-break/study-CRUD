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
    console.log('Hit me!')
    console.log('Request => ', req.body);
    return next();
  } catch (error) {
    console.log('Error in createTask middleware => ', error);
  }
}

module.exports = taskController;