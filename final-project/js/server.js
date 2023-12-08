//function to access YouTube data
function fetchSongs() {
    //search URL
    var URL="https://www.googleapis.com/youtube/v3/search";
    //API key
    var key= 'AIzaSyCGr4-POpx4JwHQp1u62GkZxgVDL8vplNA';

    //getting user entries from form fields
    let songTitle = document.getElementById('song-title').value;
    let artist = document.getElementById('song-artist').value;

    //concatenating to create search query
    let searchquery = songTitle + 'by'+ artist + 'covers';

    //search specifications
    var options = {
        part: 'snippet',
        key: key,
        maxResults: 12, //pulling in 12 results
        q: searchquery,
        type: 'video',
    }

    //return a promise that resolves with the data
    return new Promise(function(resolve, reject) {
        $.getJSON(URL, options, function(data) {
            resolve(data);
        }).fail(function(jqXHR, textStatus, errorThrown) {
            reject(errorThrown);
        });
    });

}

//make globally accessible for regenerate function
let searchResults; //will store JSON with youtube data
let searchcounter = 0; //counter for how many times regenerate is called (incremented by 4 each time, to display next 4 search results)

//function to populate cards
function cardPopulate(cards, results, initialsearchnumber) {

    for (let i = 0; i < cards.length; i++) {

        //current search result from data
        let result = results[0];

        //only enter first conditional if regenerate has been pressed enough times for counter to exceed array of data
        if (i + initialsearchnumber > results.length - 1){

            //calculation to loop counter around to start at beginning of array again
            result = results[i + initialsearchnumber - results.length + 1];
        }

        else {
            result = results[i + initialsearchnumber];
        }

        //current card
        let card = cards[i];

        //update thumbnail
        let thumbnailUrl = result.snippet.thumbnails.medium.url;
        card.querySelector('.image').src = thumbnailUrl;
        card.querySelector('.image').style.width = "480px";
        card.querySelector('.image').style.width = "360px";
        card.querySelector('.image').alt = `Song ${i + 1}`;


        //update title and channel title
        let title = result.snippet.title;
        let channelTitle = result.snippet.channelTitle;
        card.querySelector('.title').textContent = title;
        card.querySelector('.artist').textContent = channelTitle;

        //update image alt text
        card.querySelector('.image').alt = "Thumbnail of" + title + "by" + channelTitle;


        //update audio source
        const audioSource = `https://www.youtube.com/watch?v=${result.id.videoId}`;
        card.querySelector('.ext-link').href = audioSource;
    }

}

function Generate() {    
    showResults();

    //back to initial search screen, no cards displayed yet, set counter back to 1
    searchcounter = 0;

    //call fetchSongs and handle the resolved data
    fetchSongs().then(function(data) {

        searchResults = Array.from(data.items); //make a copy of array since will be reordering

        if (searchResults.length == 0) {
            document.getElementById('no-results').style.display = "block";
            document.getElementById('allcards').style.display = "none";
        }

        else {
            //populate cards
            let allCards = document.querySelectorAll('.card');
            cardPopulate(allCards, searchResults, searchcounter);

        }

    })

}

//functions to toggle the different sections on the home screen
function hideResults() {

    //grab each of the sections
    let section1 = document.querySelector('#search'); 
    let section2 = document.querySelector('#results'); 

    //display search section, hide the results section
    section1.style.display = "flex";
    section2.style.display = "none";
}

function showResults() {

    //grab each of the sections
    let section1 = document.querySelector('#search'); 
    let section2 = document.querySelector('#results'); 

    //hide the search section
    section1.style.display = "none";

    //if form fields aren't filled display text
    if (document.getElementById('song-title').value.length == 0) {
        document.getElementById('no-results').style.display = "block";
        document.getElementById('allcards').style.display = "none";
    }

    //display section otherwise
    else {
        document.getElementById('no-results').style.display = "none";
        section2.style.display = "block";
        if (document.getElementById('allcards').style.display = "none") {
            document.getElementById('allcards').style.display = "block";
        }

    }
}

//LIKING SONGS

//class definition for a song
class Song {
    constructor(songTitle, songArtist, songImage, imageAlt, songLink) {
        this.title = songTitle;
        this.artist = songArtist;
        this.image = songImage;
        this.imageAlt = imageAlt;
        this.link = songLink;
    }
}

//like button actions
let likeButtons = document.querySelectorAll('.like-btn');

// Add event listeners for liking song & changing button color to all like buttons
likeButtons.forEach(button => {
    button.addEventListener('click', likeSong);
});

//check local storage for songs array
let storedSongs = localStorage.getItem('songs');
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
    
    //get card information
    let card = element.target.closest('.card');

    //change class to update button styling for a liked song
    card.querySelector(".heart").classList.add('liked');
    card.querySelector(".liked").classList.remove('heart');

    //grab all information from the card
    let image = card.querySelector('.image').src;
    let altText = card.querySelector('.image').alt;
    let title = card.querySelector('.title').innerHTML;
    let artist = card.querySelector('.artist').innerHTML;
    let link = card.querySelector('.ext-link').href;

    //create a new song instance
    let likedSong = new Song(title, artist, image, altText, link);

    //add new instance to the song array
    songs.push(likedSong);

    //update songs in local storage
    updateSongs();

}

function regenerate() {

    //first four cards have already been populate, want to display next 4
    searchcounter = searchcounter + 4;

    let allCards = document.querySelectorAll('.card');

    //populate cards
    cardPopulate(allCards, searchResults, searchcounter);
}
