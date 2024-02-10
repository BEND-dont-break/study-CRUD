const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, {
  dbName: 'To-Do'
})
  .then(console.log('Connected to Mongo!'))
  .catch(err => console.log(err));

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
  tasks: [{
    type: Schema.Types.ObjectId,
    ref: 'task'
  }]
});

userSchema.pre('save', async function(next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(this.password, salt);
    console.log('Pass, Hashed => ', this.password, hashedPass);
    this.password = hashedPass;
    return next();    
  } catch (error) {
    console.log('Error hashing password => ', error);
  };
});

const User = mongoose.model('user', userSchema);

const taskSchema = new Schema({
  task: {type: String, required: true},
  complete: {type: Boolean, default: false}
});

const Task = mongoose.model('task', taskSchema);


const sessionSchema = new Schema({
  cookieId : {type: String, required: true, unique: true},
  createdAt : {type: Date, expires: 3600, default: Date.now()}
});

const Session = mongoose.model('session', sessionSchema);

module.exports = {
  Task,
  User,
  Session
};