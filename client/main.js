document.addEventListener('DOMContentLoaded', () => {
  const body = document.querySelector('body');
  const form = body.appendChild(document.createElement('form'));
  const label = form.appendChild(document.createElement('label'));
  label.innerHTML = 'New Task';
  const input = form.appendChild(document.createElement('input'));
  const button = form.appendChild(document.createElement('button'));
  button.innerHTML = 'Submit';
  const div = body.appendChild(document.createElement('div'));
  div.appendChild(document.createElement('ul'));
  
  const task = new Task();
  button.onclick = async (event) => {
    event.preventDefault();
    task.create(input.value);
  }
  task.display();
})