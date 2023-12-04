
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

    /*return loadVids();

    function loadVids(){
        $.getJSON(URL, options, function(data){
            console.log(data);
        })
        return $.getJSON(URL, options);
    } */

}

function Generate() {
    let section1 = document.querySelector('.search'); 
    let section2 = document.querySelector('.results'); 
    section1.style.display = "none";
    section2.style.display = "block";
    
    // Call fetchSongs and handle the resolved data
    fetchSongs().then(function(data) {
        searchResults = data.items;
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

            //update audio source
            //const audioSource = `https://www.youtube.com/watch?v=${result.id.videoId}`;
            //card.querySelector('.link').src = audioSource;
        }

    })

}

function hideResults() {
    let section1 = document.querySelector('.search'); 
    let section2 = document.querySelector('.results'); 
    section1.style.display = "block";
    section2.style.display = "none";
}