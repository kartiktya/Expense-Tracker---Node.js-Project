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
// function  uploadToS3(data, fileNAme) {

//     const BUCKET_NAME = 'expensetracker50';
//     const IAM_USER_KEY_ID = 'AKIAYS2NSXYPPCDCTT3X';
//     const IAM_USER_SECRET_KEY = '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';

//     let s3Bucket = new AWS.S3({
//         accessKeyId: IAM_USER_KEY_ID,
//         secretAccessKey: IAM_USER_SECRET_KEY
//     });
    
//     return new Promise((resolve, reject) => {

//         // s3Bucket.createBucket(() => {
//             var params = {
//                 Bucket: BUCKET_NAME,
//                 Key: fileNAme,
//                 Body: data,
//                 ACL: 'public-read'
//             }
//             s3Bucket.upload(params, (err, s3Response) => {
//                 if(err) {
//                     console.log('Something went wrong');
//                     reject(err);
//                 }
//                 else {
//                     console.log('Success', s3Response);
//                     resolve(s3Response.Location);
//                 }
    
//             })

//     });

   
        
// }


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