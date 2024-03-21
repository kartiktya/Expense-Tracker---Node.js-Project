function handleForgotPasswordSubmit(event) {

    event.preventDefault();

    const email = event.target.email.value;

    //const token = localStorage.getItem('token');
    axios.post('http://13.50.238.166:3000/password/forgotPassword', {email})
    .then((response) => {
        console.log(response);
    })
    .catch((err) => {
        console.log(err);
    });

}