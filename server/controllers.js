const Task = require('./models.js')

const controller = {};

controller.createTask = async (req, res, next) => {
  try {
    const newTask = await Task.create({
      task: req.body.task,
      completed: false,
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
    res.locals.tasks = tasks;
    return next();
  } catch (error) {
    console.error('Error in controller.getTasks ', error);
  }
}


controller.updateTask = async (req, res, next) => {
  console.log(req.body, 'req.body in updatetask');
  try {
    const update = await Task.findOneAndUpdate(
      { _id: req.body.id }, 
      { completed: true }, 
      { new: true }
    );
    console.log(update, 'updated one')
    
  } catch (error) {
    console.error('could not find task in db', error)
  }
}

module.exports = controller;