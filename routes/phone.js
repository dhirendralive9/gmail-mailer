const phoneJS = require('./data');

module.exports.addPhone = (req,res) =>{
   phoneJS.phoneFetch(req,res);
}

