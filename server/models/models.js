const mongoose = require('mongoose');

require('dotenv').config()

mongoose.connect(process.env.MONGO_URI, {
  dbName: 'To-Do'
})
  .then(console.log('Connected to Mongo!'))
  .catch(err => console.log(err));

const Schema = mongoose.Schema;

const taskSchema = new Schema({
  task: {type: String, required: true}
});

const Task = mongoose.model('task', taskSchema);

module.exports = Task;