class Song {
    constructor(songTitle, songArtist, songImage, songLink) {
        this.title = songTitle;
        this.artist = songArtist;
        this.image = songImage;
        this.link = songLink;
    }
}

let songs;

//like button actions
const likeButton = document.querySelector('.like-btn');

//check local storage for cart array
const storedSongs = localStorage.getItem('songs');
if (storedSongs) {
    songs = JSON.parse(storedSongs);
} 
else {
    songs = [];
}

//update songs in local storage
function updateSongs() {
    localStorage.setItem('songs', JSON.stringify(songs));
    console.log(songs);
}

function likeSong(element) {
    //get attributes
    const image = document.querySelector('.image').src;
    const title = document.querySelector('.title').innerHTML;
    const artist = document.querySelector('.artist').innerHTML;
    const link = document.querySelector('.link').src;
    
    //create a new song instance
    const likedSong = new Song(title, artist, image, link);

    //add new instance to the song array
    songs.push(likedSong);

    //update songs in local storage
    updateSongs();

}