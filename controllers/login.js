const User = require('../models/User');

const bcrypt = require('bcrypt');

exports.login = async (req, res, next) => {

try {

    const email = req.body.email;
    const password = req.body.password;

    const userExists = await User.findOne( { where: { email: email } } );
    
    if(!userExists) {
        return res.status(404).json("User does not found");
    }

    bcrypt.compare(password,userExists.password, (err, result) => {
        if(result == true) {
           return res.status(200).json("User logged in successfully");
        }
        else {
            return res.status(400).json("Password is incorrect");
        }
    });

   
    // else if(password!=userExists.password) {
    //     res.status(401).json("User not authorised");
    // }
    // else
    //     res.status(200).json("User logged in successfully");


}
catch(err) {
    res.status(500).json({error: err});
 }

}