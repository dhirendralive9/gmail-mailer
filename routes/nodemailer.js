const nodemailer = require("nodemailer");
const { google } = require('googleapis');
const axios = require('axios');
const errors = require('./error');    //central error files 
const status = require('./status');   //central status files 
const date = require('date-and-time');
const data = require('./data');

// console.log(data.keys)

const REDIRECT_URI = "https://developers.google.com/oauthplayground";


var temp;
var phone;
var pNum = 0;
var orderno = () => {
  return Math.floor(Math.random() * 99999999);
}

const sender = async(user,pass,token,clientid,clientsecret,fname,lname,email,template,temp)=>{
   try {
    const oAuth2Client = new google.auth.OAuth2(
      clientid,
      clientsecret,
      REDIRECT_URI
    );
    oAuth2Client.setCredentials({ refresh_token: token });

    const accessToken = await oAuth2Client.getAccessToken();
    
    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: user,
        clientId: clientid,
        clientSecret: clientsecret,
        refreshToken: token,
        accessToken: accessToken,
      },
    });

    const mailOptions = {
      from: `Delta Services <${user}>`,
      to: `${email}`,
      subject: `Hi ${fname},${template.subject}`,
      text: `${temp}`,
      html: `${temp}`,
    };

    const result = await transport.sendMail(mailOptions);
    //console.log(result);
    status.writeStatus(result);

   } catch (error) {
     console.log(error)
     errors.write(error);
     errors.email(email,fname,lname);
     errors.ids(user,pass,token);
   }
}

const fetchTemplate = (user,pass,token,clientid,clientsecret,fname,lname,email,template)=>{
  axios
  .get(`${template.template}`)
  .then(res => {
    let name = `${fname} ${lname}`;
    temp = res.data.toString().replace(/#name/g,name).replace(/#orderno/g,`${orderno()}`).replace(/#orderno/g,`${orderno()}`).replace(/#date/g,date.format(new Date(), 'MM/DD/YYYY')).replace(/#phone/g,phone);
    sender(user,pass,token,clientid,clientsecret,fname,lname,email,template,temp);
  })
  .catch(error => {
    console.error(error)
  })

}





const main =(user,pass,token,clientid,clientsecret,fname,lname,email,template)=>{
    
  axios.get(`${data.phone.link}`)
  .then( (response) =>{
    // handle success 
    var tData = response.data;
    
  if(tData.length == 1){
    phone = response.data[pNum][pNum];
  }else if(tData.length ==2){
    if(pNum !=1){
      phone = response.data[pNum][pNum];
      pNum =1
    }else if(pNum == 1) {
      phone = response.data[pNum][pNum];
      pNum =0;
    }
  }else if (tData.length >2){
      if(pNum == 0){
          phone = response.data[pNum][pNum];
          pNum++;
      }else if(pNum >=1 && pNum <=(tData.length-1)){
          phone = response.data[pNum][pNum];
          pNum++;
      }else if(pNum == tData.length){
          pNum = 0;
          phone = response.data[pNum][pNum];
      }
  }
   
  fetchTemplate(user,pass,token,clientid,clientsecret,fname,lname,email,template);
   }


  
  )
  .catch((error)=> {
    // handle error
    console.log(error);
  })
  .then( ()=> {
    // always executed 
    console.log(phone);
  });


     
}

module.exports.main = main;