class Song {
    constructor(songTitle, songArtist, songImage, imageAlt, songLink) {
        this.title = songTitle;
        this.artist = songArtist;
        this.image = songImage;
        this.imageAlt = imageAlt;
        this.link = songLink;
    }
}

let songs = [];


//add the appropriate information
function songInfo(song) {
    let songImage = song.element.querySelector(".image");
    songImage.src = song.image;
    songImage.alt = song.imageAlt;

    let songTitle = song.element.querySelector(".title");
    songTitle.innerHTML = song.title;

    let songArtist = song.element.querySelector(".artist");
    songArtist.innerHTML = song.artist;

    let songLink = song.element.querySelector(".link");
    songLink.innerHTML = song.link;

}

//check local storage for song array
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

//function to modify liked songs display
function likedMod(song) {
    let template = document.querySelector(".songs");
    let templateContent = template.content.cloneNode(true);
  
    //access & manipulate DOM
    song.element = templateContent.querySelector(".liked-item");
  
    let cartItems = document.querySelector(".song-display")
    
    //add to cart
    cartItems.append(song.element);
    songInfo(song);
    updateSongs();

    let remove = song.element.querySelector(".remove");
    //remove the roll when clicked
    remove.addEventListener("click", function(){
        removeSong(song);
    });

}

//removing a song
function removeSong(song) {
    let index = 0;
    for (let elem of songs) {
        if (elem == song) {
            break
        }
        else {
            index +=1;
        }
    }
    
    song.element.remove(song);
    songs.splice(index, 1);
    updateSongs();
  }

//call function on cart items
document.addEventListener("DOMContentLoaded", function() {
    for (let elem of songs) {
      likedMod(elem);
    }
  });