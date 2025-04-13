import Movie from '../modal/Moive.js';


// POST -- Creating the movie
export const createMoive = async (req,res) => {
    try {
        const {name, description, duration, genre} = req.body;
        const posterURL = req.file.path;

        const newMovie = new Movie({
            name,
            description,
            duration,
            posterURL,
            genre
        });

        await newMovie.save();
        return res.status(201).json({
            success: true,
            message: "Movie created",
            movie: newMovie,
        })

    } catch (error) {
        console.log("something wrong while adding moive", error)
        return res.status(500).send({
            success: false,
            message: "Can't upload moive"
        })
    }
}


// Get --  Getting the movie
export const GetAllMoive = async (req,res) => {
    try {
        const movie = await Movie.find({})
        if(!movie) res.status(500).send({
            success: false,
            message: "List is empty"
        })
        return res.status(200).send({
            success: true,
            message: "movie getted",
            movie
        })
    } catch (error) {
        console.log("error while getting the movies", error)
        return res.status(500).send({
            success: false,
            message: "Error while getting the movies"
        })
    }
}