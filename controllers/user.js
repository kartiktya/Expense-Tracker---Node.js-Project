const User = require('../models/User');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.signup =  async (req, res, next) => {

    try {

        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;
        //console.log('h1');

        const emailExists = await User.findOne({ where : { email : email } });
        console.log(emailExists);
        if(!emailExists) {

            const saltRounds = 10;
        
            bcrypt.hash(password, saltRounds, async (err, hash) => {

            const data = await User.create( { name : name, email : email, password : hash});

            res.status(201).json( { newUserDetail : data } );

            });

        }
        else {
            res.status(409).json( { message: 'Email already exists'})
        }

        
        
    }
    catch(err) {
        res.status(500).json({error: err});
    }

}


function generateAccessToken(id, name) {
    return jwt.sign( { userId: id, name: name }, '9djd0ndsidsds0sdnsddd0sjsdjndsjsds0snsdienugnihwie' );
}

exports.login = async (req, res, next) => {

    try {
    
        const email = req.body.email;
        const password = req.body.password;
    
        const userExists = await User.findOne( { where: { email: email } } );
        
        if(!userExists) {
            return res.status(404).json({ message:'User does not found' });
        }
    
        bcrypt.compare(password, userExists.password, (err, result) => {
            if(result == true) {
               return res.status(200).json({ message: 'User logged in successfully', token: generateAccessToken(userExists.id, userExists.name), user: userExists });
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


exports.getUser = async (req, res, next) => {
    const user = req.user;
    res.status(200).json({ user: user });
}