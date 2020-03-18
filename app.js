// app.js

// [LOAD PACKAGES]
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

// [CONFIGURE APP TO USE bodyParser]
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// [CONFIGURE SERVER PORT]
const port = process.env.PORT || 3000;

// DEFINE MODEL
const song = require('./models/song');

// [CONFIGURE ROUTER]
const routes = require('./routes/routes');

app.use('/', routes);

// [RUN SERVER]
const server = app.listen(port, function () {
    console.log("Express server has started on port " + port)
});

// [ CONFIGURE mongoose ]

// CONNECT TO MONGODB SERVER
const db = mongoose.connection;
db.on('error', console.error);
db.once('open', function () {
    // CONNECTED TO MONGODB SERVER
    console.log("Connected to mongod server");
});

mongoose.connect(process.env.MONGODB_URI);

// node schedule
