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

createTask = (e) => {
    e.preventDefault();
    let task = {
        heading: document.getElementById('nt_heading').value,
        description: document.getElementById('nt_description').value,
        deadline: document.getElementById('nt_deaddline').value,
    };

    console.log(task);

    postAPICall(`${baseURL}/task/create`, task, (err, res) => {
        if (err) {
            console.log(err);
            showError(err.message);
        } else {
            console.log(res);
            showSuccess(res.message);
        }
    })
};

createPost = (e) => {
    e.preventDefault();
    let feed = {
        heading: document.getElementById('nf_heading').value,
        description: document.getElementById('nf_description').value
    };

    console.log(feed);

    postAPICall(`${baseURL}/feed/create`, feed, (err, res) => {
        if (err) {
            console.log(err);
            showError(err.message);
        } else {
            console.log(res);
            showSuccess(res.message);
        }
    })

    e.target.reset();
};

createResource = (e) => {
    e.preventDefault();
    let resource = {
        title: document.getElementById('nr_title').value,
        description: document.getElementById('nr_description').value,
        url: document.getElementById('nr_url').value,
        author: app.user.id
    };

    console.log(resource);

    postAPICall(`${baseURL}/resource/create`, resource, (err, res) => {
        if (err) {
            console.log(err);
            showError(err.message);
        } else {
            console.log(res);
            showSuccess(res.message);
        }
    })
    e.target.reset();
};

