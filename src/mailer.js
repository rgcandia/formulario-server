const nodemailer = require('nodemailer');
require('dotenv').config();
const {USER_EMAIL,PASSWORD_EMAIL} = process.env;
const transport = nodemailer.createTransport({
    host:'smtp.gmail.com',
    port:465,
    secure:true,
    auth:{
        user:USER_EMAIL,
        pass:PASSWORD_EMAIL,
    }
});

module.exports= transport;