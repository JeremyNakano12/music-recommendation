document.addEventListener('DOMContentLoaded', () => {
    allSongs();
});

async function updateVotes(songId) {
    try {
        const response = await fetch(`http://localhost:3000/music/vote/${songId}`, {
            method: 'PUT'
        });
        const updatedSong = await response.json();

        const votesDisplay = document.getElementById(`votes-${songId}`);
        if (votesDisplay) {
            votesDisplay.textContent = `Votos: ${updatedSong.votes}`;
        }
    } catch (error) {
        console.error('Error al actualizar votos:', error);
    }
}

async function allSongs() {
    try {
        const response = await fetch('http://localhost:3000/music/all');
        const songs = await response.json();
        const songsListContainer = document.getElementById('songList');
        
        if (songs.length === 0) {
            songsListContainer.innerHTML = '<p>No hay canciones disponibles.</p>';
        } else {
            songs.forEach(song => {
                const songElement = document.createElement('div');
                songElement.id = `song-${song._id}`; 
                songElement.id = 'randomSong';
                songElement.innerHTML = `
                    <h3>${song.name} - ${song.artist}</h3>
                    <p><a href="${song.url_video}" target="_blank">${song.url_video}</a></p>
                    <br><p id="votes-${song._id}">Votos: ${song.votes}</p>
                    <button onclick="updateVotes('${song._id}')" class="get">
                        Votar
                    </button>
                `;
                
                songsListContainer.appendChild(songElement);
            });
        }
    } catch (error) {
        console.error('Error al cargar las canciones:', error);
        const songsListContainer = document.getElementById('songList');
        songsListContainer.innerHTML = '<p>Hubo un error al cargar las canciones.</p>';
    }
}