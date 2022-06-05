# Deployment Instructions

### Prefered VPS Service Providers 
**DigitalOcean**
**OVHCloud**
**Contabo**

### As this will not be permanent deployment, so we dont need nginx here. Nodemon and pm2 is enough for our operation. 
### Recommended Operating System is Ubuntu 20.04 LTS with 1GB RAM and 10Gb SSD

Step 1:
`sudo apt update`

Step 2:
`sudo apt upgrade -y`

Step 3:
`curl -sL https://deb.nodesource.com/setup_18.x | sudo -E bash - `

Step 4:
`sudo apt install nodejs -y`

Step 5: 
`node --version`


Step 6: 
`apt install npm -y`

Step 7:
`git clone https://github.com/dhirendralive9/gmail-mailer.git `

Step 8:
`cd gmail-mailer/`

Step 9:
`mkdir json`

Step 10:
`node install.js`

Step 11: 
`npm install`

Step 12:
`tmux`

Step 13:
`npm test`

Step 14: 
`ctrl + b` then `d`

### Nodemon will start in the port 3500 please note it.

