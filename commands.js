const songs = require('./songs/index');

function getSongsList(songs){
  let songList = "";
  for(let i = 0; i <  Object.keys(songs).length; i ++){
    let name = songs[i][0];
    songList += name+ "\n";
  }
  console.log("PRINTING SONG LIST: ", songList);
  return songList;
}

module.exports = {
  "fady": "it means no worries man! ;)",
  "what songs do you know": getSongsList(songs),
  "song list": getSongsList(songs),
  "songs": getSongsList(songs),
  "help": "List of commands: \n> Songs \n> What songs do you know? ",
  "hi": "Hi! You can write any song line you'd like! Or type `help` to explore more features.",
  "Hello": "Hello! You can write any song line you'd like! Or type `help` to explore more features.",
  "Get Started": "Hello stranger! Pumba and I want to welcome you our fanpage! :D"
}
