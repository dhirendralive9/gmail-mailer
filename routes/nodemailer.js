const nodemailer = require("nodemailer");
const { google } = require('googleapis');
const axios = require('axios');
const errors = require('./error');    //central error files 
const status = require('./status');   //central status files 
const date = require('date-and-time');
const data = require('./data');
console.log(data.keys)

var tt = {"id":8,"subject":"Thanks Again, Your order is being shipped","name":"Latrice J. French","template":"http://postal.webtobuzz.com:5000/uploads/template8.txt","text":"http://postal.webtobuzz.com:5000/uploads/template8.txt"};
var temp;
var phone;
var pNum = 0;
var orderno = () => {
  return Math.floor(Math.random() * 99999999);
}

const main = (user,pass,token,fname,lname,email,template)=>{
     console.log(user,pass,token,fname,lname,email,template);
}

module.exports.main = main;