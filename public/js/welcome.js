// Define constants
const baseURL = `http://localhost:3000`;

// Define a fetch function
requestAPI = (url, data, callback) => {
  fetch(url, {
    method: 'POST',
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(data)
  }).then(res => res.json())
  .then(res => callback(null, res))
  .catch(err => callback(err, null));
}

makeLogin = (e) => {
  e.preventDefault();
  let data = {
    username: document.getElementById('li_uname').value,
    password: document.getElementById('li_pass').value
  };

  requestAPI(`${baseURL}/user/login`, data, (err, res) => {
    if (err) {
      console.error(err);
      showError(err.SERVER_MESSAGE);
    } else {
      console.log(res);
      showSuccess(res.SERVER_MESSAGE);

      // TODO: Save USER and Redirect

    }
  });
};

makeSignup = e => {
  e.preventDefault();
  let data = {
    name: document.getElementById('su_name').value,
    email: document.getElementById('su_email').value,
    username: document.getElementById('su_uname').value,
    password: document.getElementById('su_pass').value,
    isStudent: document.getElementById('su_user_type').value === 'admin' ? false : true,
    isAdmin: document.getElementById('su_user_type').value === 'admin' ? true : false
  };

  console.log(data);

  requestAPI(`${baseURL}/user/register`, data, (err, res) => {
    if (err) {
      console.error(err);
      showError(err.SERVER_MESSAGE);
    } else {
      console.log(res);
      showSuccess(res.SERVER_MESSAGE);
    }
  });


};

showError = (msg) => {
  let resBox = document.getElementById('feedback_box');
  resBox.innerHTML = msg;
  resBox.classList.remove('hidden', 'success');
  resBox.classList.add('error');
}

showSuccess = (msg) => {
  let resBox = document.getElementById('feedback_box');
  resBox.innerHTML = msg;
  resBox.classList.remove('hidden', 'error');
  resBox.classList.add('success');
}

