const FB = require('fb');

module.exports = {
  GetAccessToken: function() {
    FB.api('oauth/access_token', {
      client_id: process.env.FB_PAGE_APP_ID,
      client_secret: process.env.FB_PAGE_APP_SECRET,
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
