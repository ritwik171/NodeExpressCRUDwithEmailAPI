var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'demoapitesing@gmail.com',
    pass: 'password'
  }
});

var mailOptions = {
  from: 'demoapitesing@gmail.com',
  to: 'ritwik205@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'Hello Ritwik'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
