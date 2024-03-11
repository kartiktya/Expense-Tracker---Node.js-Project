const Expense = require('../models/Expense');

const sequelize = require('../util/database');

exports.addExpense =  async (req, res, next) => {
    try {

        var t = await sequelize.transaction();

        const expenseAmount = req.body.expenseAmount;
        const description = req.body.description;
        const category = req.body.category;

        const data = await Expense.create( { expenseAmount : expenseAmount, description : description, category : category, userId: req.user.id}, { transaction: t });
       
        const totalExpense = Number(req.user.totalExpense) + Number(expenseAmount);
       
        await req.user.update({ totalExpense: totalExpense }, { transaction: t });

        await t.commit();

        res.status(201).json( { newExpenseDetail : data } );
        
        
    }
    catch(err) {
        await t.rollback();
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
        var t = await sequelize.transaction();
       
        const expenseId = req.params.expenseId;

        const expense = await Expense.findByPk(expenseId);
 
        await Expense.destroy({ where: { id: expenseId, userId: req.user.id }}, {transaction: t});

        const totalExpense = Number(req.user.totalExpense) - Number(expense.expenseAmount);
        // console.log('hiiiiiiiiiiiiiiiiii');
        // console.log(totalExpense);
        
        await req.user.update({ totalExpense: totalExpense }, { transaction: t });

        await t.commit();
        res.status(200).json({ success: true, message: 'Deleted User' });

        
    }
    catch(err) {
        await t.rollback();
        res.status(500).json({ error: err });
    }
}