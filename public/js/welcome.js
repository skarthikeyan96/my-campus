// Define constants
const baseURL = `http://localhost:3000`;

// Define a fetch function
requestAPI = (url, data, callback) => {
  console.log(data);
  fetch(url, {
    method: 'POST',
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(data)
  }).then(res => {
    console.log(res);
    return res.json()
  }).then(res => {
    console.log(res);
    callback(res);
  }).catch(err => {
    console.log(err);

    callback(err);
  });
}

makeLogin = (e) => {
  console.log('test');

  e.preventDefault();
  let data = {
    username: document.getElementById('li_uname').value,
    password: document.getElementById('li_pass').value
  };

  requestAPI(`${baseURL}/user/login`, data, (err, res) => {
    if (err) {
      console.error(err);

    } else {
      console.log(res);

    }
  });
};

document.getElementById('login_form').addEventListener('submit', e => makeLogin(e));


