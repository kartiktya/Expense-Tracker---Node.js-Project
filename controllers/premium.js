const User = require('../models/User');
const Expense = require('../models/Expense');
const sequelize = require('../util/database');



exports.showLeaderboard = async (req, res, next) => {

    try {

        const leaderboardUsers = await User.findAll({
            attributes: ['id', 'name', 'totalExpense'],
            order: [['totalExpense', 'DESC']]
        });
        res.status(200).json(leaderboardUsers);


        // USING JOINS AND GROUP BY
        // const leaderboardUsers = await User.findAll({
        //     attributes: ['id', 'name', [sequelize.fn('sum', sequelize.col('expenseAmount')), 'totalCost'] ],
        //     include: [
        //         {
        //             model: Expense,
        //             attributes: []
        //         }
        //     ],
        //     group: ['user.id'],
        //     order: [['totalCost', 'DESC']]
        // });

        // return res.status(200).json(leaderboardUsers);



        // USING GROUP BY        
        // const users = await User.findAll({
        //     attributes: ['id', 'name']
        // });
        // const userAggregatedExpenses = await Expense.findAll({
        //     attributes: ['userId', [sequelize.fn('sum', sequelize.col('expenseAmount')), 'total_cost']],
        //     group:['userId']
        // });

       // const userAggregatedExpenses = {};

        // expenses.forEach((expense) => {

        //     if(userAggregatedExpenses[expense.userId]) {
        //         userAggregatedExpenses[expense.userId] += expense.expenseAmount;
        //     }
        //     else {
        //         userAggregatedExpenses[expense.userId] = expense.expenseAmount;
        //     }

        // })
        // const userLeaderboardDetails = [];
        //     users.forEach((user) => {
        //         userLeaderboardDetails.push( { name: user.name, totalCost: userAggregatedExpenses[user.id] || 0 } );
        //     })
        //     //console.log(userLeaderboardDetails);
        //     userLeaderboardDetails.sort((a,b) => b.totalCost - a.totalCost)
            // return res.status(200).json(leaderboardUsers);

    }
    catch(err) {
        console.log(err);
        return res.status(500).json({ message: 'Something went wrong', error: err });
    }

}