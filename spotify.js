document.getElementById('tambah-playlist').addEventListener('click', function() {
    const inputSpotify = document.getElementById('spotify').value.trim();
    const spotifyIframe = document.getElementById('spotify-iframe');
    
    if (inputSpotify) {
        const playlistIdMatch = inputSpotify.match(/playlist\/([a-zA-Z0-9]+)(\?.*)?/);
        
        if (playlistIdMatch) {
            const playlistId = playlistIdMatch[1];
            spotifyIframe.src = `https://open.spotify.com/embed/playlist/${playlistId}`;
            saveSpotifyData();
        } else {
            alert('Invalid Spotify playlist URL. Please try again.');
        }
    } else {
        alert('Please enter a Spotify playlist URL.');
    }
    document.getElementById('spotify').value = "";
});

function saveSpotifyData() {
    const spotifyIframe = document.getElementById('spotify-iframe');
    localStorage.setItem("spotifyData", spotifyIframe.src);
}

function showPlaylist() {
    const spotifyIframe = document.getElementById('spotify-iframe');
    const savedSpotifyData = localStorage.getItem("spotifyData");
    if (savedSpotifyData) {
        spotifyIframe.src = savedSpotifyData;
    }
}

showPlaylist();