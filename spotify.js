document.getElementById('tambah-playlist').addEventListener('click', function() {
    const inputSpotify = document.getElementById('spotify').value.trim();
    const iframe = document.getElementById('spotify-iframe');
    
    if (inputSpotify) {
        const playlistIdMatch = inputSpotify.match(/playlist\/([a-zA-Z0-9]+)(\?.*)?/);
        
        if (playlistIdMatch) {
            const playlistId = playlistIdMatch[1];
            iframe.src = `https://open.spotify.com/embed/playlist/${playlistId}`;
        } else {
            alert('Invalid Spotify playlist URL. Please try again.');
        }
    } else {
        alert('Please enter a Spotify playlist URL.');
    }
    inputSpotify.value = "";
    saveData();
});
function saveData(){
    localStorage.setItem("data", iframe.innerHTML)
}
function showPlaylist(){
    iframe.innerHTML = localStorage.getItem("data");
}
showPlaylist();