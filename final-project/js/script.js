//CODE TO DISPLAY SEARCH RESULTS

// function to grab form field answers from home page
function onSubmit() {
    console.log("form-submitted");
    const songTitle = document.getElementById('song-title').value;
    const artist = document.getElementById('song-artist').value;

  
    //search for YouTube covers based on the title/artist
    // searchCovers(songTitle, artist);
  
  }
  
  // function to search YouTube covers based on the provided song title and artist
  function searchCovers(songTitle, artist) {
    console.log('here');
    // gapi.client.youtube.search.list({
    //   part: 'snippet',
    //   q: `${songTitle} ${artist} cover`,
    //   type: 'video',
    // })
    // .then(response => {
    //   // Handle the response and update the results page with the obtained covers
    //   const videos = response.result.items;
    //   updateResultsPage(videos);
    //   console.log(response);
    // })

    //error handling?
  }
  
  // function to update the results page with cover information
  function updateResultsPage(videos) {
    //select all four cards
    const cards = document.querySelectorAll('.card');

    //loop through cards and update content
    for (let i = 0; i < cards.length; i++) {
        let currVid = videos[i];

        //grab all the elements of the card
        let image = cards[i].querySelector('.image');
        let title = cards[i].querySelector('.title');
        let artist = cards[i].querySelector('.artist');
        let audio = cards[i].querySelector('audio');

        //update card content
        image.src = currVid.snippet.thumbnails.default.url;
        title.textContent = currVid.snippet.title;
        artist.textContent = currVid.snippet.channelTitle;
        audio.src = `https://www.youtube.com/watch?v=${video.id.videoId}`;
        
      } 
  }
  
  
  // function to regenerate recommendations on the results page
  function regenerateSong() {
    const songTitle = document.getElementById('song-title').value;
    const artist = document.getElementById('song-artist').value;
  
    //search for YouTube covers based on the title/artist (how do i get the next four from the list?)
    //global counter for #times regenerate is pressed?
    //remove from top and add it to bottom of list once the four cards have loaded?
    searchCovers(songTitle, artist);
  }


//CODE FOR LIKING SONGS
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
const likeButtons = document.querySelectorAll('.like-btn');

// Add event listeners to all like buttons
likeButtons.forEach(button => {
    button.addEventListener('click', likeSong);
});

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
    const card = element.target.closest('.card');
    const image = card.querySelector('.image').src;
    const title = card.querySelector('.title').innerHTML;
    const artist = card.querySelector('.artist').innerHTML;
    const link = card.querySelector('.link').src;

    
    //create a new song instance
    const likedSong = new Song(title, artist, image, link);

    //add new instance to the song array
    songs.push(likedSong);

    //update songs in local storage
    updateSongs();

}