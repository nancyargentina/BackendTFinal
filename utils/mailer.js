const nodemailer= require('nodemailer')
require("dotenv").config();

const transporter = nodemailer.createTransport({
    host: process.env.mailerHost,
    port: process.env.mailerPort,
    auth: {
        user:process.env.mailerUser,
        pass: process.env.mailerPass
    }
});

let sendEmail = async (mailOptions) => {
    try {
        const info = await transporter.sendMail(mailOptions)
        console.log(info)
     } catch (error) {
        console.log(error)
     }
}

module.exports = sendEmail;