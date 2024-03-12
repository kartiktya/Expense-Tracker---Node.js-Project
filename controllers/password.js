const { createTransport } = require('nodemailer');

const uuid = require('uuid');
const bcrypt = require('bcrypt');

const User = require('../models/User.js');
const ForgotPasswordRequest = require('../models/ForgotPasswordRequest.js');

exports.forgotPassword = async (req, res, next) => {

    try {

        const email = req.body.email;
        //console.log(email);

        const User1 = await User.findOne({where : { email }});
        if(User1){
            const id = uuid.v4();
            await User1.createForgotPasswordRequest({ id , isActive: true })
                .catch(err => {
                    throw new Error(err)
                })


        const transporter = createTransport({
            host:'smtp-relay.brevo.com',
            port: 587,
            auth: {
                user: 'kartiktyagi953@gmail.com',
                pass: process.env.SMTP_KEY
            },
        });

        const mailOptions = {
            from: 'kartiktyagi953@gmail.com',
            to: req.body.email,
            subject: 'Reset Password',
            text: `Click here to reset your password: http://localhost:3000/password/resetPassword/${id}`,
            html: `<a href="http://localhost:3000/password/resetPassword/${id}">Reset password</a>`,
            //html: `<a href="https://www.google.com">Reset password</a>`,
        };

        transporter.sendMail(mailOptions, function(error, info) {
            if(error) {
                console.log(error);
                res.status(500).json({ error: error });
            }
            else {
                console.log('Email sent:' +info.response);
                res.status(200).json({ message: 'Password reset email sent'});
            }
        })
    }    
    else {
        throw new Error('User doesnt exist');
    }
    
    }
    
    catch(err) {
        console.log(err)
         res.status(500).json({ error: err });
     }

}


exports.resetPassword = async (req, res, next) => {

    const id = req.params.id;
    console.log('hhhhhhhhhhhhhhhhhh');
    //console.log(id);
    const resetPasswordRequest = await ForgotPasswordRequest.findOne({ where: { id }});
    resetPasswordRequest.update({ isActive: false});

    res.status(200).send(`<html>
                                    <script>
                                        function formsubmitted(e){
                                            e.preventDefault();
                                            console.log('called')
                                        }
                                    </script>

                                    <form action="/password/updatePassword/${id}" method="post">
                                        <label for="newPassword">Enter New password</label>
                                        <input name="newPassword" type="password" required></input>
                                        <button>reset password</button>
                                    </form>
                                </html>`
                                )
}


exports.updatePassword = async (req, res, next) => {

    try {
    
        const id = req.params.id;
        const {newPassword} = req.query;

        const forgotPasswordRequest = await ForgotPasswordRequest.findOne({ where: { id } });
        const user = await User.findOne({ where: { id: forgotPasswordRequest.userId } });
        if(user) {

            const saltRounds = 10;
                        bcrypt.genSalt(saltRounds, function(err, salt) {
                            if(err){
                                console.log(err);
                                throw new Error(err);
                            }
                            bcrypt.hash(newPassword, salt, function(err, hash) {
                                // Store hash in your password DB.
                                if(err){
                                    console.log(err);
                                    throw new Error(err);
                                }
                                user.update({ password: hash }).then(() => {
                                    res.status(201).json({message: 'Successfuly update the new password'})
                                })
                            });
                        });

        }
        else { 
            return res.status(404).json({ error: 'No user Exists', success: false})
        }

}
    catch(error){
        return res.status(403).json({ error, success: false } )
        }
}