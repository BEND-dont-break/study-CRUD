const mongoDB = require('mongoose');
const mongo_URI = 'mongodb+srv://ninaskyttis:hejsan@cluster0.tgzbbrx.mongodb.net/';
const Schema = mongoDB.Schema;
mongoDB.connect(mongo_URI,{dbName: 'TaskApp'})

const newTaskSchema = new Schema ({
  task: String,
  completed : Boolean
})

const Task = mongoDB.model('task', newTaskSchema);

module.exports = Task;