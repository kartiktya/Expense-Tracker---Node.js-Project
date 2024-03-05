const User = require('../models/User');

const bcrypt = require('bcrypt');


exports.addUser =  async (req, res, next) => {

try {

    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    //console.log('h1');
    const saltRounds = 10;
    bcrypt.hash(password, saltRounds, async (err, hash) => {
        const data = await User.create( { name : name, email : email, password : hash});
        res.status(201).json( { newUserDetail : data } );

    });
    
}
catch(err) {
    res.status(500).json({error: err});
 }

}