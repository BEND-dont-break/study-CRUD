const express = require ('express');
const app = express();
const controller = require('./controllers.js')
const path = require ('path');

app.use(express.json());

app.post('/', controller.createTask, (req, res) => {
    res.status(200).json(res.locals.newTask);
})

app.get('/', controller.getTasks, (req, res) => {
  res.status(200).json(res.locals.tasks);
})


app.use(express.static(path.join(__dirname, '../')));
app.listen(3000);