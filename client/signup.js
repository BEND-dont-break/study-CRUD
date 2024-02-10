document.addEventListener('DOMContentLoaded', () => {
  const body = document.querySelector('body');
  const h1 = body.appendChild(document.createElement('h1'));
  h1.innerHTML = 'Sign Up!';
  const signUpForm = body.appendChild(document.createElement('form'));
  const usernameLabel = signUpForm.appendChild(document.createElement('label'));
  usernameLabel.innerHTML = 'Username';
  const usernameInput = signUpForm.appendChild(document.createElement('input'));
  const passwordLabel = signUpForm.appendChild(document.createElement('label'));
  passwordLabel.innerHTML = 'Password';
  const passwordInput = signUpForm.appendChild(document.createElement('input'));
  const submitButton = signUpForm.appendChild(document.createElement('button'));
  submitButton.innerHTML = 'Sign Up';

  submitButton.onclick = event => {
    event.preventDefault();
    fetch('/user/signup', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        username: usernameInput.value,
        password: passwordInput.value
      })
    })
    .then(data => data.json())
    .then(parsed => {
      alert(parsed);
      location.reload();
    })
  }
})