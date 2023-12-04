//function to display visibility of sections
function hideSearch() {
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
//(reference: https://developers.google.com/youtube/v3/docs/search/list?apix_params=%7B%22part%22%3A%5B%22snippet%22%5D%2C%22maxResults%22%3A48%2C%22q%22%3A%22kiss%20you%20%2B%20one%20direction%20%2B%20cover%22%2C%22type%22%3A%5B%22video%22%5D%7D)

//functions to make API call

//function to load the YouTube API client with the API key
function authenticate() {
    console.log("ran");
    return gapi.auth2.getAuthInstance()
        .signIn({scope: "https://www.googleapis.com/auth/youtube.force-ssl"})
        .then(function() { console.log("Sign-in successful"); },
              function(err) { console.error("Error signing in", err); });
  }

  function loadClient() {
    console.log("ran");
    gapi.client.setApiKey("AIzaSyCGr4-POpx4JwHQp1u62GkZxgVDL8vplNA");
    return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
        .then(function() { console.log("GAPI client loaded for API"); },
              function(err) { console.error("Error loading GAPI client for API", err); });
  }

  // Make sure the client is loaded and sign-in is complete before calling this method.
  function execute(songTitle, artist) {
    console.log(gapi.client.youtube);
    return gapi.client.youtube.search.list({
      "part": ["snippet"],
                "maxResults": 48,
                "q": songTitle + artist + "cover",
                "type": ["video"]
    })
        .then(function(response) {
                // Handle the results here (response.result has the parsed body).
                console.log("Response", response);
              },
              function(err) { console.error("Execute error", err); });
  }
  gapi.load("client:auth2", function() {
    gapi.auth2.init({client_id: "1041864465316-pst5c0jk5dfs71gpb0720pkspeavuj8h.apps.googleusercontent.com"});
  });


//function to populate result cards
function generateCards() {
    //grab form field entries
    let songTitle = document.getElementById('song-title').value;
    let artist = document.getElementById('song-artist').value;
    execute(songTitle, artist)
        .then(function(response) {
            let searchResults = response.result.items;

            const allCards = document.querySelectorAll('.card');

            for (let i = 0; i < searchResults.length && i < allCards.length; i++) {
                const result = searchResults[i];
                const card = allCards[i];

                //update thumbnail
                const thumbnailUrl = result.snippet.thumbnails.medium.url;
                card.querySelector('.image').src = thumbnailUrl;
                card.querySelector('.image').alt = `Song ${i + 1}`;

                //update title and channel title
                const title = result.snippet.title;
                const channelTitle = result.snippet.channelTitle;
                card.querySelector('.title').textContent = title;
                card.querySelector('.artist').textContent = channelTitle;

                //update audio source
                const audioSource = `https://www.youtube.com/watch?v=${result.id.videoId}`;
                card.querySelector('.link').src = audioSource;
            }
        });
}

//get the form element
const form = document.querySelector('form');

//event listener for card generation
form.addEventListener('submit', function (event) {
  //prevent the default form submission
  event.preventDefault();

  //hide search part & display results part
  hideSearch();
  generateCards();
});

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