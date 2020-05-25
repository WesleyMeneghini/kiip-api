const config = require('../config');
const sgMail = require('@sendgrid/mail');

exports.send = async(to, subject, body) => {

    sgMail.setApiKey(config.sendgridkey);

    const msg = {
        to: to, 
        from: "wesley.meneghini@outlook.com",
        subject: subject,
        html: body
    };

    sgMail.send(msg)
}