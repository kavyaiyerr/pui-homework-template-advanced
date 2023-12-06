function fetchSongs() {
    var URL="https://www.googleapis.com/youtube/v3/search";
    var key= 'AIzaSyCGr4-POpx4JwHQp1u62GkZxgVDL8vplNA';


    let songTitle = document.getElementById('song-title').value;
    let artist = document.getElementById('song-artist').value;
    let searchquery = songTitle + 'by'+ artist + 'covers';

    var options = {
        part: 'snippet',
        key: key,
        maxResults: 12,
        q: searchquery,
        type: 'video',
    }

    // Return a promise that resolves with the data
    return new Promise(function(resolve, reject) {
        $.getJSON(URL, options, function(data) {
            resolve(data);
        }).fail(function(jqXHR, textStatus, errorThrown) {
            reject(errorThrown);
        });
    });

}

function Generate() {    
    showResults();
    // Call fetchSongs and handle the resolved data
    fetchSongs().then(function(data) {
        searchResults = data.items;
        if (searchResults.length == 0) {
            document.getElementById('no-results').style.display = "block";
            document.getElementById('allcards').style.display = "none";
        }

        else {
            //populate cards
            let allCards = document.querySelectorAll('.card');
            console.log(allCards);

            for (let i = 0; i < searchResults.length && i < allCards.length; i++) {
                let result = searchResults[i];
                let card = allCards[i];
                console.log(card);

                //update thumbnail
                let thumbnailUrl = result.snippet.thumbnails.medium.url;
                card.querySelector('.image').src = thumbnailUrl;
                card.querySelector('.image').alt = `Song ${i + 1}`;


                //update title and channel title
                let title = result.snippet.title;
                let channelTitle = result.snippet.channelTitle;
                card.querySelector('.title').textContent = title;
                card.querySelector('.artist').textContent = channelTitle;

                //update image alt text
                card.querySelector('.image').alt = "Thumbnail of" + title + "by" + channelTitle;


                //update audio source
                //const audioSource = `https://www.youtube.com/watch?v=${result.id.videoId}`;
                //card.querySelector('.link').src = audioSource;
        }
        }

    })

}

//functions to toggle the different sections on the home screen
function hideResults() {
    let section1 = document.querySelector('#search'); 
    let section2 = document.querySelector('#results'); 
    section1.style.display = "block";
    section2.style.display = "none";
}

function showResults(data_length) {
    let section1 = document.querySelector('#search'); 
    let section2 = document.querySelector('#results'); 
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

//song class
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

// Add event listeners to all like buttons
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
    //get attributes
    let card = element.target.closest('.card');
    let image = card.querySelector('.image').src;
    let altText = cart.querySelector('.image').alt;
    let title = card.querySelector('.title').innerHTML;
    let artist = card.querySelector('.artist').innerHTML;
    let link = card.querySelector('.link').src;

    
    //create a new song instance
    let likedSong = new Song(title, artist, image, altText, link);

    //add new instance to the song array
    songs.push(likedSong);

    //update songs in local storage
    updateSongs();

}