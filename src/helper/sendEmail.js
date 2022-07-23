const nodemailer = require('nodemailer')
// const { google } = require('googleapis')
// const config = require('../config/oauth')
const jwt = require('jsonwebtoken')
const text = require('../helper/textEmail')

const sendMail = async ({ email, fullname, role }) => {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        type: 'OAuth2',
        user: process.env.GMAIL_ADDRESS,
        clientId: process.env.GMAIL_OAUTH_CLIENT_ID,
        clientSecret: process.env.GMAIL_OAUTH_CLIENT_SECRET,
        refreshToken: process.env.GMAIL_OAUTH_REFRESH_TOKEN,
        accessToken: process.env.GMAIL_OAUTH_ACCESS_TOKEN,
        expires: Number.parseInt(process.env.GMAIL_OAUTH_TOKEN_EXPIRE, 10)
      }
    })
    // create reusable transporter object using the default SMTP transport
    // const transporter = nodemailer.createTransport({
    //   host: 'smtp.gmail.com',
    //   port: 465,
    //   secure: true, // true for 465, false for other ports
    //   auth: {
    //     user: 'wahyu.purwanto258@gmail.com', // generated ethereal user
    //     pass: 'purwanto2508' // generated ethereal password
    //   }
    // })
    const token = jwt.sign({ email, fullname, role }, process.env.SECRET_KEY, {
      expiresIn: '24h'
    })
    // confirm.log(role);
    const info = await transporter.sendMail({
      from: '"HIRE JOBS BRO" <wahyu.aan2508@gmail.com>',
      to: email,
      subject: 'Hello ✔',
      html: text(token)
    })
    console.log(info)
    console.log('Message sent: %s', info.messageId)
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  sendMail
}
