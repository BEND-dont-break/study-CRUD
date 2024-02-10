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
    let update;
    if (req.body.status) {
      update = await Task.findOneAndUpdate(
        { _id: req.body.id },
        { completed: true },
        { new: true }
      );
    } else if (!req.body.status) {
      update = await Task.findOneAndUpdate(
        { _id: req.body.id },
        { completed: false },
        { new: true }
      );
    }
    console.log(update, 'update in controller.updateTask')
    res.locals.status = update.completed;
    return next();
  } catch (error) {
    console.error('could not find task in db', error)
  }
}


controller.deleteTask = async (req, res, next) => {
  try {
    const deleted = await Task.deleteOne({
       _id: req.body.id 
    })
    res.locals.deleted = deleted;
    return next();
  } catch (error) {
    console.error('could not find task to delete', error)
  }
}
module.exports = controller;