const User = require('../models/User');

exports.login = async (req, res, next) => {

try {

    const email = req.body.email;
    const password = req.body.password;

    const userExists = await User.findOne( { where: { email: email , password: password } } );
    
    if(!userExists) {
        res.status(404).json("User does not found");
    }
    // else if(password!=passwordExists) {
    //     res.json("Password does not match");
    // }
    else
        res.status(200).json("User logged in successfully");


}
catch(err) {
    res.status(500).json({error: err});
 }

}