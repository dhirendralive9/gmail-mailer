const fs = require('fs');
const axios = require('axios');
var ip;
const errorData = JSON.parse(fs.readFileSync(`./json/errors.json`));

const process = require('./process');
var unsend = [];
var unsendID = [];

axios.get('https://api.ipify.org?format=json')
  .then(function (response) {
    // handle success
    
    ip = response.data.ip;
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
    
  });

   errorSender = (errorLog)=>{
     if(process.pData){
       if(process.pData.status == 'active' && process.pData.link ){
         console.log(`Error log will be send on this address ${process.pData.link}`)
        //  here we willimplement a axios to send the error logs 
        axios.get(`${process.pData.link}/logger?id=${errorLog.id}&ip=${errorLog.ip}&status=${errorLog.status}&message=${errorLog.message}`)
           .then((res)=>{
             console.log(res.json());
           })
           .catch((error)=>{
             console.log(error);
             //error handling 
           })
           .then(()=>{
            //  always execute
           })
       }
     }
   }






module.exports.sender = (req,res)=>{
    res.json({...errorData});
}



module.exports.write = (err)=>{
   var id = errorData.length;
   var newError = {"id":id,"server":ip,"status":"error","message":err};
   console.log(newError);
   errorData.push(newError);
   errorSender(newError);
   fs.writeFile(`./json/errors.json`,JSON.stringify(errorData),error => console.log(error));
}


module.exports.email = (email,fname,lname)=>{
   newData = {"fname":fname,"lname":lname,"email":email}
   unsend.push(newData);
   fs.writeFile(`./json/unsend.json`,JSON.stringify(unsend),error => console.log(error));
}  

module.exports.ids = (user,pass,token)=>{
   var count = 0;
   newSender = {"user":user,"pass":pass,"token":token}
   unsendID.forEach(x => {
    if(x.user == newSender.user){
      count++;
    }
    if (count == 0){
      unsendID.push(newSender);
    }
   })
   fs.writeFile(`./json/unsender.json`,JSON.stringify(unsendID),error => console.log(error));
   count = 0; 
}