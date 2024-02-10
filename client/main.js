class Task {
  constructor(task, status, id) {
    if (!task && !status && !id) this.read();
    else {
      this.task = task;
      this.status = status;
      this.id = id;
      let taskList = document.getElementById('taskList');
      taskList.appendChild(document.createElement('li'))
      const title = taskList.appendChild(document.createElement('h3'));
      const taskStatus = taskList.appendChild(document.createElement('button'));
      const deleteButton = taskList.appendChild(document.createElement('button'));
      taskStatus.setAttribute('id', this.id);
      deleteButton.setAttribute('class', this.id);
      deleteButton.innerHTML = 'Delete';
      deleteButton.onclick = (e) => {
        e.preventDefault();
        this.delete(this.id);
      }
      title.innerHTML = this.task;
      this.status ? taskStatus.innerHTML = 'Completed' : taskStatus.innerHTML = 'Not Completed';
      taskStatus.onclick = (e) => {
        e.preventDefault();
        if (taskStatus.innerHTML === 'Not Completed') {
          taskStatus.innerHTML = 'Completed';
        } else if (taskStatus.innerHTML === 'Completed') {
          taskStatus.innerHTML = 'Not Completed';
        }
        this.update(this.id, taskStatus.innerHTML);
      }
    }
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
        console.log(el.completed, 'el.status inside forEach')
        new Task(el.task, el.completed, el._id);
      })
  } 
  update(id, status) {
    console.log('being invoked')
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
      const updatedButton = document.getElementById(response._id);
      console.log('updatedButton.innerText', updatedButton.innerHTML);
      response.status ? updatedButton.innerHTML = 'Completed' : updatedButton.innerHTML = 'Not Completed';
    })
  }
  delete(id) {
    const itemToDelete = document.getElementsByClassName(id);
    fetch('/tasks', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id })
    })
    .then(response => response.json)
    .then(response => console.log(response, 'response in delete func'))
    .catch(error => {
      console.log(error, 'error in delete func')
    })
      location.reload();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const body = document.querySelector('body');
  const form = body.appendChild(document.createElement('form'));
  const label = form.appendChild(document.createElement('label'));
  label.innerHTML = 'New Task';
  const input = form.appendChild(document.createElement('input'));
  const button = form.appendChild(document.createElement('button'));
  button.innerHTML = 'button';
  button.onclick = (e) => {
    console.log(input.value, 'input.value')
    e.preventDefault();
      fetch('/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ task: input.value }),
      })
        .then(response => response.json())
        .then(response => {
          const newTask = new Task(response.task, response.completed, response._id)
        })
    }

  const taskWrapper = body.appendChild(document.createElement('div'));
  const taskList = taskWrapper.appendChild(document.createElement('ul'));
  taskList.setAttribute('id', 'taskList');
  const readTasks = new Task();
  // readTasks.read();
})