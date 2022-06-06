const fs = require('fs');
const data = [];const ph = {};
installer = ()=>{
        fs.writeFile(`./json/sender.json`,JSON.stringify(data),error => console.log(error));
        fs.writeFile(`./json/list.json`,JSON.stringify(data),error => console.log(error));
        fs.writeFile(`./json/templates.json`,JSON.stringify(data),error => console.log(error));
        fs.writeFile(`./json/status.json`,JSON.stringify(data),error => console.log(error));
        fs.writeFile(`./json/errors.json`,JSON.stringify(data),error => console.log(error));
        fs.writeFile(`./json/dataQueue.json`,JSON.stringify(data),error => console.log(error));
        fs.writeFile(`./json/process.json`,JSON.stringify(data),error => console.log(error));
        fs.writeFile(`./json/keys.json`,JSON.stringify(data),error => console.log(error));
        fs.writeFile(`./json/phone.json`,JSON.stringify(ph),error => console.log(error));
        console.log("All the required Files are created");
    
   
}
installer();