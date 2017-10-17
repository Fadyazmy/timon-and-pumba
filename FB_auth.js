const config = require('./config');

module.exports = {
  GetAccessToken: function() {
    FB.api('oauth/access_token', {
      client_id: config.client_id,
      client_secret: config.client_secret,
      grant_type: 'client_credentials',
    }, function(res) {
      if (!res || res.error) {
        console.log(!res
          ? 'error occurred'
          : res.error);
        return;
      }
      return res.access_token;
    });
  },
}
