const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authenticate = (req, res, next) => {

    try {
        const token = req.header('Authorization');
        const user = jwt.verify(token, '9djd0ndsidsds0sdnsddd0sjsdjndsjsds0snsdienugnihwie');
        
        User.findByPk(user.userId)
        .then( (user) => {
            //console.log('uid===888888==='+user.id);
            req.user = user;
            next();
        })
        .catch((err) => {
            console.log(err);
            res.status(401).json('Error in auth in middleware');
        });
    }
    catch(error) {
        res.status(401).json({ success: true })
    }

}

module.exports = {
    authenticate
}