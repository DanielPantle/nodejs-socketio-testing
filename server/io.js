'use strict';

const express = require('express');
const socket = require('socket.io');
//const path = require('path');

const PORT = process.env.PORT || 4000;

// app setup
var app = express();
var server = app.listen(PORT, function() {
    console.log('listening on port', PORT);
});

// static files
app.use(express.static('public'));

// socket setup
exports.io = socket(server);
