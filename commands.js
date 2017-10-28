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
  "what songs do you know": "We know the following songs!\n"+getSongsList(songs),
  "song list": getSongsList(songs),
  "songs": getSongsList(songs),
  "help": "We can sing together!\nHere are the list of commands: \n> `Songs` \n> `What songs do you know?`` ",
  "hi": "Hi! You can write any song line you'd like! Or type `help` to explore more features.",
  "hello": "Hello! You can write any song line you'd like! Or type `help` to explore more features.",
  "get started": "Hello stranger! Pumba and I want to welcome you our fanpage! :D\n You can sing any Timon and Pumba song and we'll sing along!"
}
