const fs = require('fs');
 var keys = [];

 fs.readFile(`./json/keys.json`,(err,data)=>{
     if(err){
         console.log(err)
     }else {
        keys = JSON.parse(data);
        
     }
   
 });

module.exports.keys = keys;

  module.exports.check = (req,res)=>{
      res.status(200).json({
          "clientid":`${(keys.clientid)?"ok":"notfound"}`,
          "clientsecret":`${(keys.clientsecret)?"ok":"notfound"}`,
          "redirecturi":`${(keys.redirecturi)?"ok":"notfound"}`
      })
  }
