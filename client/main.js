class Task {
  constructor(task, status) {
    this.task = task;
    this.status = status;
  }
  read() {
    // fetch('/')
    //   .then(response => response.json())
    //   .then(console.log(response))
    //   .catch(err => {
    //     console.log('error in create func main.js: ', err)
    //   })
    // const taskList = document.createElement('div').setAttribute('id', 'taskList');

    // const div = taskList.appendChild(document.createElement('div').setAttribute('class', 'taskItem'));
  }
  create() {
    fetch('/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ task: this.task }),
    })
      .then(response => response.json())
      .then(response => {
        console.log(response, 'response in main.js');
      })
  }
  update() {

  }
  delete() {

  }
}

document.addEventListener('DOMContentLoaded', () => {
  const readTasks = new Task();
  readTasks.update();
  const body = document.querySelector('body');
  const form = body.appendChild(document.createElement('form'));
  const label = form.appendChild(document.createElement('label'));
  label.innerHTML = 'New Task';
  const input = form.appendChild(document.createElement('input'));
  const button = form.appendChild(document.createElement('button'));
  button.innerHTML = 'button';
  button.onclick = (e) => {
    console.log('hi')
    e.preventDefault();
    const newTask = new Task(input.value);
    newTask.create();
  }
  const div = body.appendChild(document.createElement('div'));
  div.appendChild(document.createElement('ul'));
})