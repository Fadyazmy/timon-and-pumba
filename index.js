'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();
const FB = require('fb');

// custom
const interactions = require('./interactions');
const FB_AUTH = require('./FB_auth');
const songs = require('./songs/index');
const commands = require('./commands');
var webhookRoutes = require('./routes/webhook');
const token = FB_AUTH.GetAccessToken();

app.set('port', (process.env.PORT || 5000));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/webhook', webhookRoutes);
// index
app.get('/', function(req, res) {
  res.send('OK I\'m Here - chatbot in testing');
});

// console.log(interactions.getlNextline("And the land iz darc"))
// console.log("TESTING commands; ", commands['fady']);


// debug / find port
app.listen(app.get('port'), function() {
  console.log('running on port', app.get('port'))
});
