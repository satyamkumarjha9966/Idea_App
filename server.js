const express = require('express');
const serverConfig = require('./config/server.config.js')
const mongoose = require('mongoose')
const dbConfig = require('./config/db.config.js')
const userModel = require('./Models/user.model.js')

const app = express();

// logic to connect to mongodb and create ADMIN user
// Need to have the mongodb 
mongoose.connect(dbConfig.DB_URL)
const db = mongoose.connection;

db.on('err', () => {
    console.log("Error come to connect with DB");
})

db.once("open", () => {
    console.log("DB is Connected");

    init();
})

async function init() {
    // Check if the admin user already present 
    let admin = await userModel.findOne({
        userId: "admin"
    })
    if(admin) {
        console.log("Admin user already present");
        return;
    }

    // Initialize the mongo DB
    // Need to create the ADMIN user once the DB connected
    admin = await userModel.create({
        name : " Satyam Jhs",
        userId : "admin",
        email: "satyamkumarjha9696@gmail.com",
        userType: "ADMIN",
        password: "sat1"
    });
    console.log(admin);
}


app.listen(serverConfig.PORT, () => {
    console.log(`The Server is running on http://localhost:${serverConfig.PORT}`);
})