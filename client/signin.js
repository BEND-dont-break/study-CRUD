document.addEventListener('DOMContentLoaded', () => {
  const body = document.querySelector('body');
  const h1 = body.appendChild(document.createElement('h1'));
  h1.innerHTML = 'Sign In to Task Manager!';
  const signInForm = body.appendChild(document.createElement('form'));
  const usernameLabel = signInForm.appendChild(document.createElement('label'));
  usernameLabel.innerHTML = 'Username';
  const usernameInput = signInForm.appendChild(document.createElement('input'));
  const passwordLabel = signInForm.appendChild(document.createElement('label'));
  passwordLabel.innerHTML = 'Password';
  const passwordInput = signInForm.appendChild(document.createElement('input'));
  const submitButton = signInForm.appendChild(document.createElement('button'));
  submitButton.innerHTML = 'Sign In';

  const signUpLink = body.appendChild(document.createElement('a'));
  signUpLink.innerHTML = 'No account? Sign up here!';
  signUpLink.setAttribute('href', 'http://localhost:3000/user/signup');

  submitButton.onclick = async event => {
    event.preventDefault();
    const jsonData = await fetch('/user/signin', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        username: usernameInput.value,
        password: passwordInput.value
      })
    })
    console.log(jsonData)
      const data = await jsonData.json();
      alert(data);
      location.reload();
  }
})

