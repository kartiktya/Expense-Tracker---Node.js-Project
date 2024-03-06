
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
        //console.log(response.status);
        if(response.status===200)
        alert('User logged in successfully');
        window.location.href = './expense.html';
    })
    .catch((error)=> {
        document.body.innerHTML = document.body.innerHTML + `<h4 style="color:red;"> ${error.message} </h4>`
        //console.log(error);
     });
}



window.addEventListener("DOMContentLoaded", () => {
   
    axios.get("http://localhost:3000/expense/getExpenses")
         .then((response) => {
            
            for(let i=0; i<response.data.allExpenses.length; i++){
                showExpense(response.data.allExpenses[i]);
            }

         })
         .catch((error) => console.log(error))

} )


function handleExpenseSubmit(event) {

    event.preventDefault();

    const expenseAmount = event.target.amount.value;
    const description = event.target.description.value;
    const category = event.target.category.value;

    let expenseObject = {
        expenseAmount: expenseAmount,
        description: description,
        category : category
    };

    axios.post("http://localhost:3000/expense/addExpense", expenseObject)
    .then((response) => {
        console.log(response.data.newExpenseDetail);
        showExpense(response.data.newExpenseDetail);
    })
    .catch((error)=> {
        document.body.innerHTML = document.body.innerHTML + `<h4 style="color:red;"> ${error.message} </h4>`
        //console.log(error);
     });
}

function showExpense(obj) {
    
    const newLi = document.createElement("li");
    newLi.innerHTML = obj.expenseAmount +" " +obj.description+" "+obj.category; 

    const userList = document.querySelector("ul");
    userList.appendChild(newLi);

    // const userList = document.querySelector("ul");
    // userList.innerHTML = userList.innerHTML + `<li> ${userObject.userName}-${userObject.userEmail}-${userObject.userPhone}`;


    //DELETE FUNCTIONALITY
    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "Delete";

    newLi.appendChild(deleteBtn);


    deleteBtn.addEventListener("click", function(event){
        
        var id = obj.id;

        axios.delete(`http://localhost:3000/expense/deleteExpense/${id}`)
                    .then((response)=>{
        
                        const childToDelete = event.target.parentElement;
                        userList.removeChild(childToDelete);
    
                    })
        
                    .catch((error)=>console.log("ERROR"))           

    });


}
