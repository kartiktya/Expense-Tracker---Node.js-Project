const User = require('../models/User');
const Expense = require('../models/Expense');



exports.showLeaderboard = async (req, res, next) => {

    try {

        const users = await User.findAll();
        const expenses = await Expense.findAll();

        const userAggregatedExpenses = {};

        expenses.forEach((expense) => {

            if(userAggregatedExpenses[expense.userId]) {
                userAggregatedExpenses[expense.userId] += expense.expenseAmount;
            }
            else {
                userAggregatedExpenses[expense.userId] = expense.expenseAmount;
            }

        })
        const userLeaderboardDetails = [];
            users.forEach((user) => {
                userLeaderboardDetails.push( { name: user.name, totalCost: userAggregatedExpenses[user.id] || 0 } );
            })
            //console.log(userLeaderboardDetails);
            userLeaderboardDetails.sort((a,b) => b.totalCost - a.totalCost)
            return res.status(200).json(userLeaderboardDetails);

    }
    catch(err) {
        console.log(err);
        return res.status(500).json({ message: 'Something went wrong', error: err });
    }

}