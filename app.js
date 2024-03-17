const fs = require('fs'); // node file system, which is a core module
const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const morgan = require('morgan');

var cors = require('cors');

const sequelize = require('./util/database.js');

const User = require('./models/User.js');
const Expense = require('./models/Expense.js');
const Order = require('./models/Order.js');
const forgotPasswordRequest = require('./models/ForgotPasswordRequest.js');
const ExpenseFilesDownloaded = require('./models/ExpenseFilesDownloaded.js');

const app = express();

const accessLogStream = fs.createWriteStream(
    path.join(__dirname, 'access.log'), 
    { flags: 'a' }
);

app.use(cors());
app.use(helmet());
app.use(morgan('combined', { stream: accessLogStream }));

const userRoutes = require('./routes/user.js');
const expenseRoutes = require('./routes/expense.js');
const purchaseRoutes = require('./routes/purchase.js');
const premiumRoutes = require('./routes/premium.js');
const passwordRoutes = require('./routes/password.js');


app.use(bodyParser.json({ extended: false }));


app.use('/user', userRoutes);
app.use('/expense', expenseRoutes);
app.use('/purchase', purchaseRoutes);
app.use('/premium', premiumRoutes);
app.use('/password', passwordRoutes);


app.use('/', (req, res, next) => {

});

User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

User.hasMany(forgotPasswordRequest);
forgotPasswordRequest.belongsTo(User);

User.hasMany(ExpenseFilesDownloaded);
ExpenseFilesDownloaded.belongsTo(User);

sequelize
.sync()
//.sync({force: true})
.then()
.catch(err => console.log(err));

app.listen(process.env.PORT || 3000);