let Song = require('../models/music');

exports.find = async () => {
    return await Song.find();
};

exports.addSong = async(req,res)=>{
    console.log("REQUEST RECIBIDO " +req.body)
    const {name,artist,url_video,votes} = req.body;
    const song = new Song({ name,artist,url_video,votes });
    try{
        await song.save();
        console.log("CANCION GUARDADA " + song)
        res.status(201).json(song);
    }
    catch(error){
        console.error(error);
        res.status(400).json({message: "Error al guardar canción"})
    }
}

exports.updateVotes = async (songId) => {
    const updatedSong = await Song.findByIdAndUpdate(
        songId,
        { $inc: { votes: 1 } },
        { new: true, runValidators: true }
    );
    return updatedSong;
};