function handleForgotPasswordSubmit(event) {

    event.preventDefault();

    const email = event.target.email.value;

    //const token = localStorage.getItem('token');
    axios.post('http://51.20.72.246:3000/password/forgotPassword', {email})
    .then((response) => {
        console.log(response);
    })
    .catch((err) => {
        console.log(err);
    });

}