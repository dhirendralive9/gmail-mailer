const nodemailer = require("nodemailer");
const { google } = require('googleapis');
const axios = require('axios');
const errors = require('./error');    //central error files 
const status = require('./status');   //central status files 
const date = require('date-and-time');
const data = require('./data');
// console.log(data.keys)
const CLIENT_ID = data.keys.clientid;
const CLIENT_SECRET = data.keys.clientsecret;
const REDIRECT_URI = data.keys.redirectui;

var tt = {"id":8,"subject":"Thanks Again, Your order is being shipped","name":"Latrice J. French","template":"http://postal.webtobuzz.com:5000/uploads/template8.txt","text":"http://postal.webtobuzz.com:5000/uploads/template8.txt"};
var temp;
var phone;
var pNum = 0;
var orderno = () => {
  return Math.floor(Math.random() * 99999999);
}

const main = async (user,pass,token,fname,lname,email,template)=>{
    //  console.log(user,pass,token,fname,lname,email,template);

     const oAuth2Client = new google.auth.OAuth2(
      CLIENT_ID,
      CLIENT_SECRET,
      REDIRECT_URI
    );
    oAuth2Client.setCredentials({ refresh_token: token });

    const accessToken = await oAuth2Client.getAccessToken();
   
    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: user,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: token,
        accessToken: accessToken,
      },
    });

    const mailOptions = {
      from: `Delta Services <${user}>`,
      to: `${email}`,
      subject: 'Hello from gmail using API',
      text: 'Hello from gmail email using API',
      html: '<h2>hey how you doing mate</h2><img width="1px" height="1px" src="https://track.webtobuzz.com/image?campaign=default&id=11111&email=dhirendrabiswal9@live.com" />',
    };

    const result = await transport.sendMail(mailOptions);
    console.log(result);



}

module.exports.main = main;