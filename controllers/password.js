const { createTransport } = require('nodemailer');

exports.forgotPassword = async (req, res, next) => {

    try {

        const email = req.body.email;
        //console.log(email);

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
            text: `Click here to reset your password:`
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
    catch(err) {
        console.log(err)
         res.status(500).json({ error: err });
     }

}