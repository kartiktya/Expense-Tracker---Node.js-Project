const express = require('express');
const bodyParser = require('body-parser');

var cors = require('cors');

const sequelize = require('./util/database.js');

const app = express();

app.use(cors());

const signupRoutes = require('./routes/signup.js');

app.use(bodyParser.json({ extended: false }));

app.use('/user', signupRoutes);

app.use('/', (req, res, next) => {

});

sequelize.sync()
.then()
.catch(err => console.log(err));

app.listen(3000);