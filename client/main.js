class Task {
  constructor(task, status) {
    this.task = task;
    this.status = status;
  }
  
  async read(newTask) {
    let tasks;
    try {
      const response = await fetch('/tasks');
      tasks = await response.json();
    } catch (error) {
      console.log('Error in main.js/read(): ', error);
    }

      tasks.forEach(el => {
        const taskWrapper = document.getElementById('taskWrapper');
        const taskDiv = taskWrapper.appendChild(document.createElement('div'));
        const taskTitle = taskDiv.appendChild(document.createElement('h3'));
        taskTitle.innerHTML = el.task;
        const taskStatus = taskDiv.appendChild(document.createElement('button'));
        taskStatus.setAttribute('id', el._id);
        taskStatus.innerHTML = el.completed ? 'Completed' : 'Not Completed';
        taskStatus.onclick = () => {
          if (taskStatus.innerHTML === 'Not Completed') {
            taskStatus.innerHTML = 'Completed';
          } else if (taskStatus.innerHTML === 'Completed') {
            taskStatus.innerHTML = 'Not Completed';
          }
          this.update(el._id, taskStatus.innerHTML);
        }
      })
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
        this.read(response);
      })
  }
  update(id, status) {
    if (status === 'Not Completed') {
      status = false;
    } else if (status === 'Completed') {
      status = true;
    }
    fetch('/tasks', {
      method: 'PATCH',
      headers: {
        'Content-Type': "application/json",
      },
      body: JSON.stringify({
        status,
        id,
      })
    })
    .then(response => response.json())
    .then(response => {
      console.log(response, 'updated in main.js')
    })
  }
  delete() {

  }
}

document.addEventListener('DOMContentLoaded', () => {
  const readTasks = new Task();
  readTasks.read();
  const body = document.querySelector('body');
  const form = body.appendChild(document.createElement('form'));
  const label = form.appendChild(document.createElement('label'));
  label.innerHTML = 'New Task';
  const input = form.appendChild(document.createElement('input'));
  const button = form.appendChild(document.createElement('button'));
  button.innerHTML = 'button';
  button.onclick = (e) => {
    e.preventDefault();
    const newTask = new Task(input.value);
    newTask.create();
  }

  const taskWrapper = body.appendChild(document.createElement('div'));
  taskWrapper.setAttribute('id', 'taskWrapper');
})