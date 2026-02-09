const https = require('https'); 
const app = require('./app'); 
const path = require('path'); 
const fs = require('fs'); 
const { connectDB } = require('./config/db/sequelize');
const { initializeSocket } = require('./socket/socket');
const mongoConnect = require('./config/db/mongoose');


//connectDB(); 
mongoConnect(); 

const server = https.createServer(
    {
        key: fs.readFileSync(path.resolve(__dirname, '../cert', 'key.pem')), 
        cert: fs.readFileSync(path.resolve(__dirname, '../cert', 'cert.pem'))
    },
    app
)

initializeSocket(server)

server.listen(process.env.PORT); 

server.on('listening', () => {
    console.log(`server listening on port ${process.env.PORT}`)
})

server.on('error', (err) => {
    console.log(err)
    process.exit(1)
})
