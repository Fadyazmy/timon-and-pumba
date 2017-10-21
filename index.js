'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()
const FB = require('fb');

// custom
const interactions = require('./interactions');
const FB_AUTH = require('./FB_auth');
const lyrics = require('./songs/hakuna_matata').song;
const songs = require('./songs/index');

const token = FB_AUTH.GetAccessToken();
app.set('port', (process.env.PORT || 5000))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))


// interactions.getlNextline("who")

// index
app.get('/', function(req, res) {
  res.send('OK I\'m Here - chatbot in testing');
})

// for facebook verification
app.get('/webhook/', function(req, res) {
  if (req.query['hub.verify_token'] === 'my_voice_is_my_password_verify_me') {
    res.send(req.query['hub.challenge']);
  } else {
    res.send('Error, wrong token');
  }
})

// to post data
app.post('/webhook/', function(req, res) {
  console.log("REQ.BODY.entry[0]: ", req.body.entry[0]);
  let messaging_events = req.body.entry[0].messaging;

  for (let i = 0; i < messaging_events.length; i++) {
    let event = req.body.entry[0].messaging[i];
    let sender = event.sender.id;

    if (event.message && event.message.text) {
      let text = event.message.text;
      if (text === 'FADY') {
        console.log("\n\nFady when can I take off this hat!\n\n");

				interactions.sendTextMessage(sender, "it means no worries man! ;)")
        continue
      }

      // Reply with the next line of the song ;)
      interactions.sendTextMessage(sender, interactions.getlNextline(text));
    }
  }
  res.sendStatus(200);
})

// debug / find port
app.listen(app.get('port'), function() {
  console.log('running on port', app.get('port'))
})
