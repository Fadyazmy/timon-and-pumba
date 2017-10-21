const request = require('request')
const token = process.env.FB_PAGE_ACCESS_TOKEN
const songs = require('./songs/index');

module.exports = {
  checkifEqual: function(string1, string2) {
    return string1.replace(/[^a-zA-Z ]/gi, "").toLowerCase() === string2.replace(/[^a-zA-Z ]/gi, "").toLowerCase();
  },
  getlNextline: function(line) {
    for (let i = 0; i < Object.keys(songs).length; i++ ){
      // return string if match in song[i]
      // console.log("LOGING: ", songs[i][1]);
        var indexIThink = (songs[i])[1].findIndex(item => this.checkifEqual(line, item))
        if (indexIThink != -1){
          // console.log( "ANSWER: ",songs[i][1][indexIThink + 1]);
          let name = songs[i][0];
          let nextline = songs[i][1][indexIThink + 1];
          let response = "["+songs[i][0]+"]"+ "\n\n"+ nextline;
          return response;
      }
    }
  },
  sendTextMessage: function(sender, text) {
    let messageData = {
      text: text
    }
    request({
      url: 'https://graph.facebook.com/v2.10/me/messages',
      qs: {
        access_token: token
      },
      method: 'POST',
      json: {
        recipient: {
          id: sender
        },
        message: messageData,
      }
    }, function(error, response, body) {
      if (error) {
        console.log('Error sending messages: ', error)
      } else if (response.body.error) {
        console.log('Error: ', response.body.error)
      }
    })
  },
  sendGenericMessage: function(sender) {
    let messageData = {
      "attachment": {
        "type": "template",
        "payload": {
          "template_type": "generic",
          "elements": [{
            "title": "First card",
            "subtitle": "Element #1 of an hscroll",
            "image_url": "http://messengerdemo.parseapp.com/img/rift.png",
            "buttons": [{
              "type": "web_url",
              "url": "https://www.messenger.com",
              "title": "web url"
            }, {
              "type": "postback",
              "title": "Postback",
              "payload": "Payload for first element in a generic bubble",
            }],
          }, {
            "title": "Second card",
            "subtitle": "Element #2 of an hscroll",
            "image_url": "http://messengerdemo.parseapp.com/img/gearvr.png",
            "buttons": [{
              "type": "postback",
              "title": "Postback",
              "payload": "Payload for second element in a generic bubble",
            }],
          }]
        }
      }
    }
    request({
      url: 'https://graph.facebook.com/v2.10/me/messages',
      qs: {
        access_token: token
      },
      method: 'POST',
      json: {
        recipient: {
          id: sender
        },
        message: messageData,
      }
    }, function(error, response, body) {
      if (error) {
        console.log('Error sending messages: ', error)
      } else if (response.body.error) {
        console.log('Error: ', response.body.error)
      }
    })
  }
};
