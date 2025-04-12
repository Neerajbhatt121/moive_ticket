import Moive from '../modal/Moive.js';

export const createMoive = async (req,res) => {
    try {
        const {name, description, duration, genre} = req.body;
        const posterURL = req.file.path;

        const newMovie = new Moive({
            name,
            description,
            duration,
            posterURL,
            genre
        });

        await newMovie.save();
        res.status(201).json({
            success: true,
            message: "Movie created",
            movie: newMovie,
        })

    } catch (error) {
        console.log("something wrong while adding moive", error)
        res.status(500).send({
            success: false,
            message: "Can't upload moive"
        })
    }
}