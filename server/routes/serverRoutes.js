let express = require('express');
const router = express.Router();
let musicController = require("../controller/musicController")

router.get('/random', async (req, res) => {
    try {
        const songs = await musicController.find();
        if (songs.length === 0) {
            throw new Error('No hay canciones disponibles');
        }
        const randomIndex = Math.floor(Math.random() * songs.length);
        res.status(200).json(songs[randomIndex]); 
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener las canciones', error });
    }
});

router.get('/all', async (req, res) => {
    try {
        const songs = await musicController.find();
        if (songs.length === 0) {
            throw new Error('No hay canciones disponibles');
        }
        res.status(200).json(songs); 
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener las canciones', error });
    }
});

router.put('/vote/:id', async (req, res) => {
    try {
        const songId = req.params.id;
        console.log('Actualizando votos para la canción:', songId);

        const updatedSong = await musicController.updateVotes(songId);

        if (!updatedSong) {
            return res.status(404).json({ message: 'Canción no encontrada' });
        }
        
        res.json(updatedSong);
    } catch (error) {
        console.error('Error en la actualización:', error);
        res.status(500).json({ 
            message: 'Error al actualizar votos',
            error: error.message 
        });
    }
});


router.post('/', musicController.addSong)

module.exports = router;