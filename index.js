function handleFormSubmit(event) {

    event.preventDefault();

    const name = event.target.name.value;
    const email = event.target.email.value;
    const password = event.target.password.value;

    let userObject = {
        name: name,
        email: email,
        password: password
    };

    axios.post("http://localhost:3000/user/signup", userObject)
    .then((response) => {
        console.log(response);
    })
    .catch((error)=> {
        document.body.innerHTML = document.body.innerHTML + '<h4> Something went wrong </h4>'
        console.log(error);
     });
}

function handleLoginSubmit(event) {

    event.preventDefault();

    const email = event.target.email.value;
    const password = event.target.password.value;

    let userObject = {
        email: email,
        password: password
    };

    axios.post("http://localhost:3000/user/login", userObject)
    .then((response) => {
        console.log(response.status);
        if(response.status==200)
        alert('User logged in successfully');
    })
    .catch((error)=> {
        document.body.innerHTML = document.body.innerHTML + '<h4> User not found </h4>'
        console.log(error);
     });
}
