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

const token = FB_AUTH.GetAccessToken();

app.set('port', (process.env.PORT || 5000))

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({
  extended: false
}))

// index
app.get('/', function(req, res) {
  res.send('OK I\'m Here - chatbot in testing')
})

// for facebook verification
app.get('/webhook/', function(req, res) {
  if (req.query['hub.verify_token'] === 'my_voice_is_my_password_verify_me') {
    res.send(req.query['hub.challenge'])
  } else {
    res.send('Error, wrong token')
  }
})

function checkifEqual(string1, string2) {
  return string1.replace(/[^a-zA-Z ]/gi, "").toLowerCase() === string2.replace(/[^a-zA-Z ]/gi, "").toLowerCase();
}


// to post data
app.post('/webhook/', function(req, res) {
  console.log("REQ.BODY.entry[0]: ", req.body.entry[0]);
  let messaging_events = req.body.entry[0].messaging
  for (let i = 0; i < messaging_events.length; i++) {
    let event = req.body.entry[0].messaging[i]
    let sender = event.sender.id
    if (event.message && event.message.text) {
      let text = event.message.text
      if (text === 'FADY') {
        console.log("\n\nGENERIC: Welcome to chatbot\n\n")
        // interactions.sendGenericMessage(sender)
        var regex = new RegExp(text);
        console.log("\nDOES IT EXIST? FOR:", regex , "\nANSWER: ",regex.test(lyrics), "\n\n######\n\n");
				interactions.sendTextMessage(sender, "it means no worries! ;)")
        continue
      }

      var indexIThink = lyrics.findIndex(item => checkifEqual(text, item))
      interactions.sendTextMessage(sender, lyrics[indexIThink + 1])
    }
    if (event.postback) {
      let text = JSON.stringify(event.postback)
      interactions.sendTextMessage(sender, "Postback received: " + text.substring(0, 200), token)
      continue
    }
  }
  res.sendStatus(200)
})

// debug / find port
app.listen(app.get('port'), function() {
  console.log('running on port', app.get('port'))
})
