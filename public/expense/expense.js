window.addEventListener("DOMContentLoaded", async () => {

    const token = localStorage.getItem('token');
    
    //   USING PROMISES

    // axios.get("http://51.20.72.246:3000/expense/getExpenses", { headers: { 'Authorization': token } })
    //      .then((response) => {
    //        // console.log('dom');
    //         //console.log(isPremiumUser);
    //         for(let i=0; i<response.data.allExpenses.length; i++){
    //             showExpense(response.data.allExpenses[i]);
    //         }

    //      })
    //      .catch((error) => console.log(error))


    
    //  axios.get("http://51.20.72.246:3000/user/getUser", { headers: { 'Authorization': token } })
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
    const page = 1;
    const limit = localStorage.getItem('rowsPerPage');
    const response1 = await axios.get(`http://51.20.72.246:3000/expense/getExpenses?page=${page}&limit=${limit}`, { headers: { 'Authorization': token } });
    
    const response2 = await axios.get("http://51.20.72.246:3000/user/getUser", { headers: { 'Authorization': token } });
    

    for(let i=0; i<response1.data.allExpenses.length; i++){
        showExpense(response1.data.allExpenses[i]);

    }
    console.log(response1.data);
    showPagination(response1.data);

    const isPremiumUser = response2.data.user.isPremiumUser;
        if(isPremiumUser) {
            const par = document.getElementById('imp');
            const childToDelete = document.getElementById('rzp-button1');
            //const parentElement = document.querySelector('b');
            console.log(par);
            par.removeChild(childToDelete);

            document.getElementById('premiumTxt').innerHTML = 'Premium User';
            showLeaderboard();
            //showTimely();
        }





    // const response1 =  axios.get("http://51.20.72.246:3000/expense/getExpenses", { headers: { 'Authorization': token } });
    
    // const response2 =  axios.get("http://51.20.72.246:3000/user/getUser", { headers: { 'Authorization': token } });
    
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


} );

var flag2 = true;
function showPagination({
    currentPage,
    hasNextPage,
    nextPage,
    hasPreviousPage,
    previousPage,
    lastPage
}) {

    //if(flag2)
    //{
        console.log()
        flag2 = false;
        const pagination = document.getElementById('pagination');
        pagination.innerHTML = '';

        if(hasPreviousPage) {
            const btn2 = document.createElement('button');
            btn2.innerHTML = previousPage;
            btn2.addEventListener('click', () => getExpenses(previousPage));
            pagination.appendChild(btn2);
        }

            const btn1 = document.createElement('button');
            btn1.innerHTML = `<h3>${currentPage}</h3>`;
            btn1.addEventListener('click', () => getExpenses(currentPage));
            pagination.appendChild(btn1);

        if(hasNextPage) {
            const btn3 = document.createElement('button');
            btn3.innerHTML = nextPage;
            btn3.addEventListener('click', () => getExpenses(nextPage));
            pagination.appendChild(btn3);
        }
    //}
}

function getExpenses(page) {

    const token = localStorage.getItem('token');
    const limit = localStorage.getItem('rowsPerPage');
    axios.get(`http://51.20.72.246:3000/expense/getExpenses?page=${page}&limit=${limit}`, { headers: { 'Authorization': token } })
    .then((response1) => {

        for(let i=0; i<response1.data.allExpenses.length; i++){
        showExpense(response1.data.allExpenses[i]);
    }
    console.log('responseeeeeeeeeeee');
    console.log(response1.data);

        showPagination(response1.data);
    })
    .catch((err) => console.log(err));
}

function handleExpenseSubmit(event) {

    event.preventDefault();

    const expenseAmount = event.target.amount.value;
    const description = event.target.description.value;
    const category = event.target.category.value;
    const rowsPerPage = event.target.rowsPerPage.value;
    console.log(rowsPerPage);
    localStorage.setItem('rowsPerPage', rowsPerPage);

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
    axios.post("http://51.20.72.246:3000/expense/addExpense", expenseObject, { headers: {'Authorization': token} })
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
        axios.delete(`http://51.20.72.246:3000/expense/deleteExpense/${id}`, { headers: {'Authorization': token} })
                    .then((response)=>{
        
                        const childToDelete = event.target.parentElement;
                        userList.removeChild(childToDelete);
    
                    })
        
                    .catch((error)=>console.log("ERROR"))           

    });


}

document.getElementById('rzp-button1').onclick = async function(e) {
            

    const token = localStorage.getItem('token');
    const response = await axios.get('http://51.20.72.246:3000/purchase/premiumMembership', { headers: { 'Authorization':token } })
    console.log(response);
    
    var options = {
        'key' : response.data.key_id,
        'order_id': response.data.order.id,
        'handler': function(response) {

            axios.post('http://51.20.72.246:3000/purchase/updateTransactionStatus', {
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
            //showTimely();
            
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
        axios.post('http://51.20.72.246:3000/purchase/updateFailedTransactionStatus', data, { headers: { 'Authorization':token } })
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
        axios.get('http://51.20.72.246:3000/premium/showLeaderboard', { headers: { 'Authorization': token } })
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



function downloadExpense() {

    // const dailyBtn = document.createElement('button');
    // const weeklyBtn = document.createElement('button');
    // const monthlyBtn = document.createElement('button');
    // const downloadBtn = document.createElement('button');

    // dailyBtn.innerHTML = 'Daily';
    // dailyBtn.setAttribute('id','dailyBtn');

    // weeklyBtn.innerHTML = 'Weekly';
    // weeklyBtn.setAttribute('id','weeklyBtn');

    // monthlyBtn.innerHTML = 'Monthly';
    // monthlyBtn.setAttribute('id','monthlyBtn');

    // downloadBtn.innerHTML = 'Download';
    // downloadBtn.setAttribute('id','downloadBtn');

    // document.getElementById('showTimelyBtn').appendChild(dailyBtn);
    // document.getElementById('showTimelyBtn').appendChild(weeklyBtn);
    // document.getElementById('showTimelyBtn').appendChild(monthlyBtn);
    // document.getElementById('showTimelyBtn').appendChild(downloadBtn);

    
    // downloadBtn.addEventListener('click', (event) => {

        const token = localStorage.getItem('token');
        axios.get('http://51.20.72.246:3000/user/downloadExpense', { headers: { 'Authorization': token } })
        .then((response) => {
            console.log('hhhhhhhhhhh');
            if(response.status === 200) {
                console.log('111111111111111111');
                var a = document.createElement('a');
                a.href = response.data.fileUrl;
                console.log(a.href);
                a.download = 'myExpense.csv';
                a.click();
            }
            else {
                throw new Error(response.data.message);
            }
            
        })
        .catch((error) => {
            console.log(error);
        })

    //})
}


var flag1 = true;
function viewExpenseFilesDownloaded() {
   
    if(flag1) {

        flag = false;
        const token = localStorage.getItem('token');
        axios.get('http://51.20.72.246:3000/user/viewExpenseFilesDownloaded', { headers: { 'Authorization': token } })
        .then((response) => {

            const ul = document.getElementById('viewExpenseFilesDownloaded');

            const newH1 = document.createElement('h1');
            newH1.innerHTML = 'Expense Files Downloaded';

            ul.appendChild(newH1);
            
            

            for(let i=0; i<response.data.length; i++) {

                const newLi = document.createElement('li');
                const newA = document.createElement('a');
                //newA.href = `Url: ${response.data[i].url}, Date: ${response.data[i].createdAt}`;
                newA.href = `${response.data[i].url}`;
                newA.innerHTML = `${response.data[i].createdAt}`;

                newLi.appendChild(newA);
                ul.appendChild(newLi);
            }

        })
        .catch((error) => {
            console.log(error);
        })
    }

}