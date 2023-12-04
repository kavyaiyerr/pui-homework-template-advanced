function fetchSongs() {
    var URL="https://www.googleapis.com/youtube/v3/search";
    var key= 'AIzaSyCGr4-POpx4JwHQp1u62GkZxgVDL8vplNA';


    let songTitle = document.getElementById('song-title').value;
    let artist = document.getElementById('song-artist').value;
    let searchquery = songTitle + 'by'+ artist + 'covers';

    var options = {
        key: key,
        maxResults: 12,
        q: searchquery,
        part: ["snippet"],
    }

    loadVids();

    function loadVids(){
        $.getJSON(URL, options, function(data){
            console.log(data);
        })
    }

}

function Generate() {
    let section1 = document.querySelector('.search'); // Add a dot for the class selector
    let section2 = document.querySelector('.results'); // Add a dot for the class selector
    section1.style.display = "none";
    section2.style.display = "block";
    console.log("generating");
    // let songTitle = document.getElementById('song-title').value;
    // let artist = document.getElementById('song-artist').value;
    // let searchquery = songTitle + 'by'+ artist + 'covers';
    // var opts = {
    //     maxResults: 12,
    //     key: 'AIzaSyCGr4-POpx4JwHQp1u62GkZxgVDL8vplNA'
    //   };
      
    //   search(searchquery, opts, function(err, results) {
    //     if(err) return console.log(err);
      
    //     console.dir(results);
    //   });
    fetchSongs();

}

function hideResults() {
    let section1 = document.querySelector('.search'); // Add a dot for the class selector
    let section2 = document.querySelector('.results'); // Add a dot for the class selector
    section1.style.display = "block";
    section2.style.display = "none";
}