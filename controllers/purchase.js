const Razorpay = require('razorpay');
const Order = require('../models/Order');
require('dotenv').config();
//const env = require('../.env');
//const { or } = require('sequelize');

exports.purchasePremium = async (req, res, next) => {

    try {

        var rzp = new Razorpay({
            key_id : process.env.RAZORPAY_KEY_ID,
            key_secret : process.env.RAZORPAY_KEY_SECRET
        });
        const amount = 2500;

        rzp.orders.create( { amount, currency: 'INR' }, (err, order) => {
            if(err) {
                throw new Error(JSON.stringify(err));
            }
            req.user.createOrder({ orderId:  order.id, status: 'PENDING'})
            //OR
            //Order.create({ orderId:  order.id, status: 'PENDING', userId: req.user.id };)
            .then(() => {
                res.status(201).json({ order, key_id: rzp.key_id });
            })
            .catch((err) => {
                throw new Error(err);
            });
        });

    }
    catch(err) {
        console.log(err);
        res.status(403).json({ message: 'Something went wrong', error: err });
    }

}

exports.updateTransactionStatus = async (req, res, next) => {

    // try {

    //     const { payment_id, order_id } = req.body;

    //     Order.findOne( { where: { orderId: order_id } })
    //     .then((order) => {
    //         order.update( { paymentId: payment_id, status:'SUCCESSFUL' } )
    //         .then(() => {
    //             req.user.update( { isPremiumUser: true } )
    //             .then(() => {
    //                 res.status(202).json( { success: true, message: 'Transaction Successful' } );
    //             })
    //             .catch((err) => {
    //                 throw new Error(err);
    //             })
    //         })
    //         .catch((err) => {
    //             throw new Error(err);
    //         })
    //     })
    //     .catch((err) => {
    //         throw new Error(err);
    //     })

    // }
    // catch(err) {
    //     console.log(err);
    //     res.status(403).json({ message: 'Something went wrong', error: err });
    // }

    try {
        const { payment_id, order_id } = req.body;

        const order = await Order.findOne( { where: { orderId: order_id } });
        order.update( { paymentId: payment_id, status:'SUCCESSFUL' } );

        await req.user.update( { isPremiumUser: true } );
        res.status(202).json( { success: true, message: 'Transaction Successful' } );
    }
    catch(err) {
        console.log(err);
        res.status(403).json({ message: 'Something went wrong', error: err });
    }
}
