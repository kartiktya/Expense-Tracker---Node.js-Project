function handleLoginSubmit(event) {

    event.preventDefault();

    const email = event.target.email.value;
    const password = event.target.password.value;

    let loginDetails = {
        email: email,
        password: password
    };

    axios.post("http://13.50.238.166:3000/user/login", loginDetails)
    .then((response) => {
        //console.log(response.data.user.isPremiumUser);
        var isPremiumUser = response.data.user.isPremiumUser;
        if(response.status===200)
        alert('User logged in successfully');
        localStorage.setItem('token', response.data.token);
        window.location.href = '../expense/expense.html';

        // const childToDelete = document.getElementById('rzp-button1');
        // const parentElement = document.querySelector('b');
        // //console.log(parentElement);
        // parentElement.removeChild(childToDelete);

        // document.getElementById('premiumTxt').innerHTML = 'Premium User';

        
    })
    .catch((error)=> {
        document.body.innerHTML = document.body.innerHTML + `<h4 style="color:red;"> ${error.message} </h4>`
        //console.log(error);
     });
}