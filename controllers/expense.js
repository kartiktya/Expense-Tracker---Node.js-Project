const Expense = require('../models/Expense');

exports.addExpense =  async (req, res, next) => {
    try {

        const expenseAmount = req.body.expenseAmount;
        const description = req.body.description;
        const category = req.body.category;
        //console.log('h1');
        //console.log(req.user.id);
        const data = await Expense.create( { expenseAmount : expenseAmount, description : description, category : category, userId: req.user.id});
        res.status(201).json( { newExpenseDetail : data } );
        
        
    }
    catch(err) {
        res.status(500).json({ error: err });
    }

}

exports.getExpenses = async (req, res, next) => {
    
    try {
        //const data = await Expense.findAll({ where: { userId: req.user.id }});
        //or
        const data = await req.user.getExpenses();
    
        res.status(200).send({ allExpenses: data });
    }
    catch(err){
        res.status(500).json({ error: err });
    }
}

exports.deleteExpense = async (req, res, next) => {
    
    try {
        const expenseId = req.params.expenseId;
    
        await Expense.destroy({ where: { id: expenseId, userId: req.user.id }})

        //const expenseExists = await Expense.findByPk(expenseId);
        //await expenseExists.destroy();
        res.status(200).json({ success: true, message: 'Deleted User' });

        // Expense.findByPk(expenseId)
        //.then(user => {
        // return user.destroy();
    // })
    //   .then(result => {
    //     console.log('DESTROYED USER');
    //     res.send('deleted')
    //   })
    //   .catch(err => console.log(err));
    }
    catch(err) {
        res.status(500).json({ error: err });
    }
}