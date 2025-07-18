import Movie from '../modal/Moive.js';


// POST -- Creating the movie
export const createMoive = async (req,res) => {
    console.log("Request Body:", JSON.stringify(req.body, null, 2));
    console.log("body genre", req.body)
    try {
        const {name, description, duration,price, genre} = req.body;
        console.log("genre ", genre, genre.split(","))
        
        if(!req.file){
            return res.status(101).send({
                message: "image problem"
            })
        }
        const posterURL = req.file.path || req.file.secure_url;
        const genreArray = genre.split(",");
        console.log("Arraygen", genreArray)

        const newMovie = new Movie({
            name,
            description,
            duration,
            price,
            posterURL,
            genre:genreArray
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
        const page = req.params.page
        const total = 10
        const movie = await Movie.find({})
            .skip((page-1)*total)
            .limit(total)
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

export const GetAllMoiveList = async (req,res) => {
    try {
        // const page = req.params.page
        // const total = 6
        const movie = await Movie.find({})
            .limit(8)
            .sort({createdAt:-1})
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

// GET -- Getting movie by id
export const GetAllMoiveById = async (req,res) => {
    try {
        const {movieId} = req.params;
        const movie = await Movie.findById({_id: movieId})
        if(!movie) res.status(500).send({
            success: false,
            message: "not that movie exist"
        })
        return res.status(200).send({
            success: true,
            message: "movie getted",
            movie
        })
    } catch (error) {
        console.log("error while getting the movie", error)
        return res.status(500).send({
            success: false,
            message: "Error while getting the movie"
        })
    }
}

// GET -- Get movie by categories
export const GetMoivebyCAtegories = async (req,res) => {
    try {
        const movie = await Movie.find({genre: "Action"})
        if(!movie) res.status(500).send({
            success: false,
            message: "not that movie exist"
        })
        return res.status(200).send({
            success: true,
            message: "movie getted",
            movie
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: "Error while getting by catogoires"
        })
    }
}

// GET -- Getting movie by name or keywords
export const GetMovieBySearchKeyword = async (req,res) => {
    try {
        const {keyword} = req.params
        const result = await Movie.find({
            $or: [
            {name:{$regex :keyword, $options:"i"}},
            {discription:{$regex :keyword, $options:"i"}},
            {genre:{$regex :keyword, $options:"i"}}
            ]
        })
        res.json(result)
    } catch (error) {
        console.log("Error while GetMovieBySearchKeyword",error)
        return res.status(500).send({
            success: false,
            message: "Error while getting the movie"
        })
    }
}


// GET -- Getting movie by similar
export const GetMovieSimilar = async (req,res) => {
    try {
        const {similer} = req.params
        const genreArray = JSON.parse(similer)
        console.log("sdfsdf",genreArray, similer)
        const genres = JSON.parse(similer);
            // Create a regex array
            const regexArray = genres.map((g) => ({
                genre: { $regex: g, $options: "i" }
            }));
            console.log("regrex",regexArray)
        const result = await Movie.find({
            // $or: [
            // {genre:{$regex :regexArray, $options:"i"}}
            // ]
           // genre: {$in : regexArray}
           $or: regexArray
        }).limit(6)
        
        res.json(result)
    } catch (error) {
        console.log("Error while similar movies",error)
        return res.status(500).send({
            success: false,
            message: "Error while getting the movie"
        })
    }
}