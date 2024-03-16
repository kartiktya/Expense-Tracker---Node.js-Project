const AWS = require('aws-sdk');

require('dotenv').config();

exports.uploadToS3 = async (data, fileNAme) => {

    const BUCKET_NAME = 'expensetracker50';
    const IAM_USER_KEY_ID = process.env.IAM_USER_KEY_ID;
    const IAM_USER_SECRET_KEY = process.env.IAM_USER_SECRET_KEY;

    let s3Bucket = new AWS.S3({
        accessKeyId: IAM_USER_KEY_ID,
        secretAccessKey: IAM_USER_SECRET_KEY
    });
    
    return new Promise((resolve, reject) => {

        // s3Bucket.createBucket(() => {
            var params = {
                Bucket: BUCKET_NAME,
                Key: fileNAme,
                Body: data,
                ACL: 'public-read'
            }
            s3Bucket.upload(params, (err, s3Response) => {
                if(err) {
                    console.log('Something went wrong');
                    reject(err);
                }
                else {
                    console.log('Success', s3Response);
                    resolve(s3Response.Location);
                }
    
            })

    });

   
        
}