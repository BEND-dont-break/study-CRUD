const Task = require('./models.js')

const controller = {};

controller.createTask = async (req, res, next) => {
  try {
    const newTask = await Task.create({
      task: req.body.task,
    })
    res.locals.newTask = newTask;
    return next();
  } catch (error) {
    console.error('Error in controller.createTask ', error)
    // return next(error);
  }
}


controller.getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find();
    console.log(tasks);
  } catch (error) {
    console.error('Error in controller.getTasks ', error);
  }
}


module.exports = controller;