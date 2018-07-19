const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.MAILSERVER,
  port: process.env.MAILPORT,
  secure: true, // use SSL
  auth: {
    user: process.env.MAILUSER,
    pass: process.env.MAILPASS
  }
});

exports.sendWelcomeMail = (user)=>{
  const data = {
    from: '"Diet Calc 🍉" <dietcalc@dr.com>',
    to: user.email, 
    subject: 'Verifica tu Cuenta de Diet Calc', 
    //text: `Hola ${user.username}, bienvenido a nuestra Iron App`,
    html: `<h1>Bienvenido a Diet Calc</h1>
    <p>Hola ${user.username}, porfavor verifica tu cuenta haciendo click <a href="http://dietcalc.herokuapp.com/confirm/${user.confirmationCode}">aquí</a></p>
    `
  }
  transporter.sendMail(data)
    .then(info => console.log(info))
    .catch(error => console.log(error))
}