//const Razorpay = require("razorpay");

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
        
        document.body.innerHTML = document.body.innerHTML + '<h4 style="text-align:center; color:blue;"> Successfully created. You can login now. </h4>'
        window.location.href = './login.html';
    })
    .catch((error)=> {
        document.body.innerHTML = document.body.innerHTML + '<h4 style="text-align:center; color:red;"> Something went wrong </h4>'
        console.log(error);
     });
}

function handleLoginSubmit(event) {

    event.preventDefault();

    const email = event.target.email.value;
    const password = event.target.password.value;

    let loginDetails = {
        email: email,
        password: password
    };

    axios.post("http://localhost:3000/user/login", loginDetails)
    .then((response) => {
        //console.log(response.data.user.isPremiumUser);
        var isPremiumUser = response.data.user.isPremiumUser;
        if(response.status===200)
        alert('User logged in successfully');
        localStorage.setItem('token', response.data.token);
        window.location.href = './expense.html';

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



window.addEventListener("DOMContentLoaded", async () => {

    const token = localStorage.getItem('token');
    
    //   USING PROMISES

    // axios.get("http://localhost:3000/expense/getExpenses", { headers: { 'Authorization': token } })
    //      .then((response) => {
    //        // console.log('dom');
    //         //console.log(isPremiumUser);
    //         for(let i=0; i<response.data.allExpenses.length; i++){
    //             showExpense(response.data.allExpenses[i]);
    //         }

    //      })
    //      .catch((error) => console.log(error))


    
    //  axios.get("http://localhost:3000/user/getUser", { headers: { 'Authorization': token } })
    //  .then((response) => {
    //     console.log('dommmm');
    //     //console.log(response.data.user.isPremiumUser);
    //     const isPremiumUser = response.data.user.isPremiumUser;
    //     if(isPremiumUser) {
    //         const par = document.getElementById('imp');
    //         const childToDelete = document.getElementById('rzp-button1');
    //         const parentElement = document.querySelector('b');
    //         console.log(par);
    //         par.removeChild(childToDelete);

    //         document.getElementById('premiumTxt').innerHTML = 'Premium User';
    //     }
        

    //  })
    //  .catch((error) => console.log(error))


    // USING ASYNC AWAIT
    const response1 = await axios.get("http://localhost:3000/expense/getExpenses", { headers: { 'Authorization': token } });
    
    const response2 = await axios.get("http://localhost:3000/user/getUser", { headers: { 'Authorization': token } });
    
    
    for(let i=0; i<response1.data.allExpenses.length; i++){
        showExpense(response1.data.allExpenses[i]);

    }

    const isPremiumUser = response2.data.user.isPremiumUser;
        if(isPremiumUser) {
            const par = document.getElementById('imp');
            const childToDelete = document.getElementById('rzp-button1');
            const parentElement = document.querySelector('b');
            console.log(par);
            par.removeChild(childToDelete);

            document.getElementById('premiumTxt').innerHTML = 'Premium User';
            showLeaderboard();
        }







    // const response1 =  axios.get("http://localhost:3000/expense/getExpenses", { headers: { 'Authorization': token } });
    
    // const response2 =  axios.get("http://localhost:3000/user/getUser", { headers: { 'Authorization': token } });
    
    // Promise.all([response1, response2])
    // .then(() => {

    //     for(let i=0; i<response1.data.allExpenses.length; i++){
    //         showExpense(response1.data.allExpenses[i]);


    //         const isPremiumUser = response2.data.user.isPremiumUser;
    //         if(isPremiumUser) {
    //             const par = document.getElementById('imp');
    //             const childToDelete = document.getElementById('rzp-button1');
    //             const parentElement = document.querySelector('b');
    //             console.log(par);
    //             par.removeChild(childToDelete);

    //             document.getElementById('premiumTxt').innerHTML = 'Premium User';
    //         }
    //     }      
    // })
    // .catch((err) => console.log(err));


} )


function handleExpenseSubmit(event) {

    event.preventDefault();

    const expenseAmount = event.target.amount.value;
    const description = event.target.description.value;
    const category = event.target.category.value;

    document.getElementById('expense-amount').value = null;
    document.querySelector('#description').value = ' ';
    document.getElementById('category').value = ' ';

    let expenseObject = {
        expenseAmount: expenseAmount,
        description: description,
        category : category
    };

    const token = localStorage.getItem('token');
    //console.log(token);
    axios.post("http://localhost:3000/expense/addExpense", expenseObject, { headers: {'Authorization': token} })
    .then((response) => {
        console.log(response.data.newExpenseDetail);
        showExpense(response.data.newExpenseDetail);
        
    })
    .catch((error)=> {
        document.body.innerHTML = document.body.innerHTML + `<h4 style="color:red;"> ${error.message} </h4>`
       
     });
}

function showExpense(obj) {

    // const newH1 = document.createElement('h1');
    // newH1.innerHTML = 'Expenses';

    // document.getElementById('expenseHeading').appendChild(newH1);
    
    const newLi = document.createElement("li");
    newLi.innerHTML = obj.expenseAmount +" " +obj.description+" "+obj.category; 

    const userList = document.getElementById("allExpensesList");
    console.log(userList);
    userList.appendChild(newLi);

    // const userList = document.querySelector("ul");
    // userList.innerHTML = userList.innerHTML + `<li> ${userObject.userName}-${userObject.userEmail}-${userObject.userPhone}`;


    //DELETE FUNCTIONALITY
    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "Delete";
    deleteBtn.setAttribute('class','btn btn-danger');
    deleteBtn.setAttribute('id','deleteBtn');

    newLi.appendChild(deleteBtn);


    deleteBtn.addEventListener("click", function(event){
        
        var id = obj.id;
        const token = localStorage.getItem('token');
        axios.delete(`http://localhost:3000/expense/deleteExpense/${id}`, { headers: {'Authorization': token} })
                    .then((response)=>{
        
                        const childToDelete = event.target.parentElement;
                        userList.removeChild(childToDelete);
    
                    })
        
                    .catch((error)=>console.log("ERROR"))           

    });


}


document.getElementById('rzp-button1').onclick = async function(e) {
            

    const token = localStorage.getItem('token');
    const response = await axios.get('http://localhost:3000/purchase/premiumMembership', { headers: { 'Authorization':token } })
    console.log(response);
    
    var options = {
        'key' : response.data.key_id,
        'order_id': response.data.order.id,
        'handler': function(response) {

            axios.post('http://localhost:3000/purchase/updateTransactionStatus', {
                order_id : options.order_id,
                payment_id: response.razorpay_payment_id
            }, { headers: {'Authorization': token} })

            window.alert('You are a Premium User Now');
            
            const childToDelete = e.target.parentElement;
            const parentElement = document.querySelector('b');
            //console.log(parentElement);
            parentElement.removeChild(childToDelete);

            document.getElementById('premiumTxt').innerHTML = 'Premium User';
            showLeaderboard();
            
        }
    };

    const rzp1 = new Razorpay(options);
    rzp1.open();

    e.preventDefault();
    //console.log('hhhhhhhhhhh1111111111');
    rzp1.on('payment.failed', (response) => {
        console.log('hhhhhhhhhhh');
        console.log(response.error.metadata.order_id);
        console.log(response.error.metadata.payment_id);
        const data = {
            order_id: response.error.metadata.order_id ,
            payment_id: response.error.metadata.payment_id
        }
        axios.post('http://localhost:3000/purchase/updateFailedTransactionStatus', data, { headers: { 'Authorization':token } })
        .then(() => {
            alert('Something went wrong');
        })
        .catch((err) => {
            console.log(err);
        })
        
    });

}

function showLeaderboard() {

    const btn = document.createElement('button');
    btn.innerHTML = 'Leaderboard';

    document.getElementById('leaderboard').appendChild(btn);

    btn.onclick = async function(event) {

        const token = localStorage.getItem('token');
        axios.get('http://localhost:3000/premium/showLeaderboard', { headers: { 'Authorization': token } })
        .then((response) => {
            console.log(response);
            //console.log(response.data[3].name)
            
            const newH1 = document.createElement('h1');
            newH1.innerHTML = 'LEADERBOARD';
            const leaderboardUnorderedList = document.getElementById('leaderboardList');

            leaderboardUnorderedList.appendChild(newH1);

            for(let i=0 ;i<=response.data.length; i++) {

            const newLi = document.createElement('li');
        
            if(response.data[i].totalExpense === null) {
                response.data[i].totalExpense = 0;
            }

            newLi.innerHTML = `Name: ${response.data[i].name} Total Cost: ${response.data[i].totalExpense}`;

            
            leaderboardUnorderedList.appendChild(newLi);

            }
        })
        .catch((err) => {
            console.log(err);
        })

    }
}