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