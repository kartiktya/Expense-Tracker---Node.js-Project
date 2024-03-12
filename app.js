const express = require('express');
const bodyParser = require('body-parser');

var cors = require('cors');

const sequelize = require('./util/database.js');

const User = require('./models/User.js');
const Expense = require('./models/Expense.js');
const Order = require('./models/Order.js');

const app = express();

app.use(cors());

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

sequelize
.sync()
//.sync({force: true})
.then()
.catch(err => console.log(err));

app.listen(3000);