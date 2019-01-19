// API calls for adding task
postAPICall = (url, data, callback) => {
    fetch(url, {
            method: 'POST',
            headers: {
                "Content-type": "application/json",
                "token": app.user.token
            },
            body: JSON.stringify(data)
        }).then(res => res.json())
        .then(res => callback(null, res))
        .catch(err => callback(err, null));
};

createTask = (task) => {
    requestAPI(`${baseURL}/task/create`, task, (err, res) => {
        if (err) {
            console.log(err);
        } else {
            console.log(res);
        }
    })
};