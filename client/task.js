class Task {
  constructor(el) {
    const body = document.querySelector('body');
    const mainTaskDiv = body.appendChild(document.createElement('div'));
    const h2 = body.appendChild(document.createElement('h2'));
    h2.innerText = 'Task List';
  }

  display() {
    const body = document.querySelector('body');
    fetch('/getTasks')
    .then(data => data.json())
    .then(tasks => {
      tasks.forEach(element => {
        const taskDiv = body.appendChild(document.createElement('div'));
        const taskInfo = taskDiv.appendChild(document.createElement('h3'));
        const compStatus = taskDiv.appendChild(document.createElement('p'));
        taskInfo.innerText = element.task;
        switch (element.complete) {
          case false:
            compStatus.innerText = 'Not Complete'
            break;
        
          case true:
            compStatus.innerText = 'Complete'
            break;
        };
      });
    });
  }

  create(task) {
    fetch('/createTask', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(task)
    })
    // .then(() => this.display());
  }

}
