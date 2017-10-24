var express = require('express');
var router = express.Router();

// custom
const interactions = require('.././interactions');
const commands = require('.././commands');


router.get('/', function(req, res) {
  if (req.query['hub.verify_token'] === 'my_voice_is_my_password_verify_me') {
    res.send(req.query['hub.challenge']);
  } else {
    res.send('Error, wrong token');
  }
});

router.post('/', function(req, res) {
  console.log("REQ.BODY.entry[0]: ", req.body.entry[0]);
  let messaging_events = req.body.entry[0].messaging;

  for (let i = 0; i < messaging_events.length; i++) {
    let event = req.body.entry[0].messaging[i];
    let sender = event.sender.id;

    // IF NORMAL MESSAGE
    if (event.message && event.message.text) {
      let text = event.message.text;

      // if text matches command
      var filteredText = commands[interactions.removePunctAndLowerCase(text)]
      if (filteredText) {
          interactions.typingBubble(sender, 150, interactions.sendTextMessage(sender, filteredText));
        continue
      }
      else {
        // Reply with song name and next line ;)
        interactions.sendTextMessage(sender, interactions.getlNextline(text));
      }
    }
    else if (event.postback && event.postback.payload){
      interactions.messPostback(sender, event.postback);
    }
  }
  res.sendStatus(200);
});

module.exports = router;
