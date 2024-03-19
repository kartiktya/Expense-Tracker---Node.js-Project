const Expense = require('../models/Expense');
const ExpenseFilesDownloaded = require('../models/ExpenseFilesDownloaded');

const sequelize = require('../util/database');

const AWS = require('aws-sdk');

const UserServices = require('../services/UserServices');
const S3Services = require('../services/S3Services');

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
    
    // try {
    //     //const data = await Expense.findAll({ where: { userId: req.user.id }});
    //     //or
    //     const data = await req.user.getExpenses();
    
    //     res.status(200).send({ allExpenses: data });
    // }
    // catch(err){
    //     res.status(500).json({ error: err });
    // }
    
    try {
        const page = +req.query.page ;
        console.log(page);
        let totalExpenses;
        const itemsPerPage = 10;

        Expense.count()
        .then((total) => {
            totalExpenses = total;
            return Expense.findAll( { where: { userId: req.user.id } }, {
                offset: (page - 1) * itemsPerPage,
                limit: itemsPerPage
            });
        })
        .then((expenses) => {
            console.log(expenses.length);
            res.json({
                allExpenses: expenses,
                currentPage: page,
                hasNextPage: itemsPerPage * page < totalExpenses,
                nextPage: page + 1,
                hasPreviousPage: page > 1,
                previousPage: page - 1,
                lastPage: Math.ceil(totalExpenses/itemsPerPage)
            });
        })
        .catch((err) => console.log(err));
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

exports.downloadExpense = async (req, res, next) => {

    try {
        //const expenses = await req.user.getExpenses();
        const expenses = await UserServices.getExpenses(req);
        console.log(expenses);
        const stringifiedExpenses = JSON.stringify(expenses);
        //const fileNAme = 'Expense.txt';
        const fileNAme = `Expense${req.user.id}/${new Date()}.txt`;
        const fileUrl = await S3Services.uploadToS3(stringifiedExpenses, fileNAme);
        //console.log(fileUrl);
        const data = await ExpenseFilesDownloaded.create({ url: fileUrl, userId: req.user.id });
        res.status(200).json({ fileUrl, success: true });
    }
    catch(err) {
        console.log(err);
        res.status(500).json({ fileUrl: '', error: err });
    }


}


exports.viewExpenseFilesDownloaded = async (req, res, next) => {

   try {
        const data = await ExpenseFilesDownloaded.findAll({ where: { userId: req.user.id } });
        console.log(data);
        res.status(200).json(data);
   }
   catch(err){
    console.log(err);
        res.status(500).json({ error: err });
    }
}