//function to display visibility of sections
function hideSearch() {
    event.preventDefault()
    let section1 = document.querySelector('.search'); // Add a dot for the class selector
    let section2 = document.querySelector('.results'); // Add a dot for the class selector
    section1.style.display = "none";
    section2.style.display = "block";
}

function hideResults() {
    let section1 = document.querySelector('.search'); // Add a dot for the class selector
    let section2 = document.querySelector('.results'); // Add a dot for the class selector
    section1.style.display = "block";
    section2.style.display = "none";
}

//CODE TO DISPLAY SEARCH RESULTS


// function to grab form field answers from home page

//functions to make API call

function authenticate() {
    return gapi.auth2.getAuthInstance()
        .signIn({scope: "https://www.googleapis.com/auth/youtube.force-ssl"})
        .then(function() { console.log("Sign-in successful"); },
              function(err) { console.error("Error signing in", err); });
  }
function loadClient() {
    gapi.client.setApiKey("YOUR_API_KEY");
    return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
        .then(function() { console.log("GAPI client loaded for API"); },
              function(err) { console.error("Error loading GAPI client for API", err); });
  }

function execute() {
    //authorize & load client
    authenticate().then(loadClient);

    //grab form field entries
    let songTitle = document.getElementById('song-title').value;
    let artist = document.getElementById('song-artist').value;

    //execute API call
    return gapi.client.youtube.search.list({
      "part": [
        "snippet"
      ],
      "maxResults": 48,
      "q": songTitle + artist + "cover",
      "type": [
        "video"
      ]
    })
        .then(function(response) {
                // Handle the results here (response.result has the parsed body).
                console.log("Response", response);
              },
              function(err) { console.error("Execute error", err); });
  }
  gapi.load("client:auth2", function() {
    gapi.auth2.init({client_id: "YOUR_CLIENT_ID"});
  });

//function to populate result cards


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