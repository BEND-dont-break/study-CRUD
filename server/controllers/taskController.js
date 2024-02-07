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

module.exports = taskController;