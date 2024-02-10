class Task {
  constructor() {
    const body = document.querySelector('body');
    const h2 = body.appendChild(document.createElement('h2'));
    h2.innerHTML = 'Task List';
    const mainTaskDiv = body.appendChild(document.createElement('div'));
    mainTaskDiv.setAttribute('id', 'mainTask');
  }

  display() {
    const mainTaskDiv = document.querySelector('#mainTask');
    fetch('/main/getTasks')
    .then(data => data.json())
    .then(tasks => {
      tasks.forEach((element, index) => {
        const taskDiv = mainTaskDiv.appendChild(document.createElement('div'));
        taskDiv.setAttribute('id', `taskDiv${index}`);
        taskDiv.setAttribute('class', 'taskDiv');
        const taskInfo = taskDiv.appendChild(document.createElement('h3'));
        taskInfo.setAttribute(`id`, `taskInfo${index}`);
        const compStatus = taskDiv.appendChild(document.createElement('p'));
        compStatus.setAttribute('id', `compStatus${index}`);
        taskInfo.innerHTML = element.task;
        switch (element.complete) {
          case false:
            compStatus.innerHTML = 'Not Complete'
            compStatus.style.color = 'red';
            break;
        
          case true:
            compStatus.innerHTML = 'Complete'
            compStatus.style.color = 'green';
            break;
        };
        // Create button to delete task
        const deleteButton = taskDiv.appendChild(document.createElement('button'));
        deleteButton.innerHTML = 'Remove Task';
        deleteButton.onclick = (event) => {
          event.preventDefault();
          this.delete(index);
        }
        // Create button to update status
        const updateButton = taskDiv.appendChild(document.createElement('button'));
        updateButton.innerHTML = 'Update Completed Status'
        updateButton.onclick = (event) => {
          event.preventDefault();
          this.updateStatus(index);
        }
      });
    });
  }


  create(task) {
    const body = document.querySelector('body');
    fetch('/main/createTask', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({task})
    })
    .then(() => {
      location.reload();
    });
  }

  delete(id) {
    // Query releveant parts of DOM
    const taskDiv = document.querySelector(`#taskDiv${id}`);
    const taskInfo = document.querySelector(`#taskInfo${id}`);
    const task = taskInfo.innerHTML

    // Send POST to backend
    fetch('/main/deleteTask', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({task})
    })
    .then(() => {
      taskDiv.remove();
    })
  }

  updateStatus(index) {
    const taskDivs = document.querySelectorAll('.taskDiv');
    const taskInfo = document.querySelector(`#taskInfo${index}`);
    const task = taskInfo.innerHTML
    const compStatus = document.querySelector(`#compStatus${index}`);
    const compText = compStatus.innerHTML;
    const taskDiv = document.querySelector(`#taskDiv${index}`);
    fetch('/main/updateStatus', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({task, compText})
    })
      .then(data => data.json())
      .then(task => {
        while (taskDiv.firstChild) {
          taskDiv.removeChild(taskDiv.firstChild);
        };
        const taskInfo = taskDiv.appendChild(document.createElement('h3'));
        taskInfo.setAttribute(`id`, `taskInfo${index}`);
        const compStatus = taskDiv.appendChild(document.createElement('p'));
        compStatus.setAttribute('id', `compStatus${index}`);
        taskInfo.innerHTML = task.task;
        switch (task.complete) {
          case false:
            compStatus.innerHTML = 'Not Complete';
            compStatus.style.color = 'red';
            break;
        
          case true:
            compStatus.innerHTML = 'Complete';
            compStatus.style.color = 'green';
            break;
        };
        // Create button to delete task
        const deleteButton = taskDiv.appendChild(document.createElement('button'));
        deleteButton.innerHTML = 'Remove Task';
        deleteButton.onclick = (event) => {
          event.preventDefault();
          this.delete(index);
        }
        // Create button to update status
        const updateButton = taskDiv.appendChild(document.createElement('button'));
        updateButton.innerHTML = 'Update Completed Status'
        updateButton.onclick = (event) => {
          event.preventDefault();
          this.updateStatus(index);
        };
      })

  }
}
