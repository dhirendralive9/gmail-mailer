const data = require('./data');

const check = (req,res)=>{
    data.check(req,res);
}

module.exports.check = check;