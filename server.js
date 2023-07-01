const express = require('express');

const serverConfig = require('./config/server.config.js')

const app = express();

app.listen(serverConfig.PORT, () => {
    console.log(`The Server is running on http://localhost:${serverConfig.PORT}`);
})