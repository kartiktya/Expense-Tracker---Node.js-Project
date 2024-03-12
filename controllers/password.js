//const Sib = require('sib-api-v3-sdk');

//require('dotenv').config();


const SibApiV3Sdk = require('sib-api-v3-sdk');
//const SibApiV3Sdk = require('@getbrevo/brevo');
const dotenv = require('dotenv').config();


const defaultClient = SibApiV3Sdk.ApiClient.instance;

var apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.SENDBLUE_API_KEY1;



exports.forgotPassword = async (req, res, next) => {
 
    try {


        // let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

        // let apiKey = apiInstance.authentications['apiKey'];
        // apiKey.apiKey = process.env.SENDBLUE_API_KEY1;

        // let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail(); 

        // sendSmtpEmail.subject = "My {{params.subject}}";
        // sendSmtpEmail.htmlContent = "<html><body><h1>This is my first transactional email {{params.parameter}}</h1></body></html>";
        // sendSmtpEmail.sender = {"name":"John Doe","email":"kartiktyagi953@gmail.com"};
        // sendSmtpEmail.to = [{"email":"kartiktyagi95@gmail.com","name":"Jane Doe"}];
        // //sendSmtpEmail.cc = [{"email":"example2@example2.com","name":"Janice Doe"}];
        // //sendSmtpEmail.bcc = [{"name":"John Doe","email":"example@example.com"}];
        // //sendSmtpEmail.replyTo = {"email":"replyto@domain.com","name":"John Doe"};
        // //sendSmtpEmail.headers = {"Some-Custom-Name":"unique-id-1234"};
        // sendSmtpEmail.params = {"parameter":"My param value","subject":"New Subject"};

        // apiInstance.sendTransacEmail(sendSmtpEmail).then(function(data) {
        // console.log('API called successfully. Returned data: ' + JSON.stringify(data));

        // res.status(201).json({ message: data });

        // }, function(error) {
        // console.error(error);
        // });




        const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

        const sender = {
            email: 'test@gmail.com',
            name: 'test'
        }; 

        const receivers = [
                {
                    email: req.body.email,
                },
            ];

        
        const sendEmail = await apiInstance.sendTransacEmail({
            sender,
            to: receivers,
            subject: 'Forgot Password',
            textContent: `Your new password is:`
        });

            res.status(201).json({ message: response });




        // const email = req.body.email;
        // //console.log(email);

        // var client = Sib.ApiClient.instance;
        // //console.log(email);
        // var apiKey = client.authentications['api-key'];
        
        // apiKey.apiKey =  process.env.SENDBLUE_API_KEY;
        
        // const tranEmailApi = new Sib.TransactionalEmailsApi()
        // console.log(apiKey.apiKey);
        // const sender = {
        //     email: 'kartiktyagi953@gmail.com',
        //     name: 'Kartik'
        // }; 

        // const receivers = [
        //     {
        //         email: 'kartiktyagi95@gmail.com'
        //     },
        // ]

        // const data = await tranEmailApi.sendTransacEmail({
        //     sender,
        //     to: receivers,
        //     subject: 'Forgot Password',
        //     textContent: `Your new password is:`
        // });
        // return res.status(201).json({ message: data });
        // .then((response) => {
        //     console.log(response);
        //     res.status(201).json({ message: response });
        // })
        // .catch((err) => {
        //     console.log(err);
        // })

        
        
    }
    catch(err) {
       console.log(err)
        res.status(500).json({ error: err });
    }


}