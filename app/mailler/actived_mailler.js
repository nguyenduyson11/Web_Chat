const nodemailer = require("nodemailer");

module.exports = async function send_mail(email,token,content,url) {
  let transporter = nodemailer.createTransport({
    service:'gmail',
    secure: false,
    auth: {
      user: 'nguyenduyson60@gmail.com',
      pass: '01236004760V',
    },
    tls:{
      rejectUnauthorrized:false 
    }
  });

  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>',
    to: `${email}`,
    subject: "Hello ✔",
    text: "Hello world?",
    html: `${content}: <a href="http://localhost:3000/${url}/${token}">Click me</a>`
  });

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}
