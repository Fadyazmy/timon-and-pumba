const songs = require('./songs/index');

function getAllSongs(songs){
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
  "what songs do you know": getAllSongs(songs),
  "song list": getAllSongs(songs),
  "songs": getAllSongs(songs)
}
