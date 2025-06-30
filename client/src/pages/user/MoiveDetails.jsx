import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Layout from "../../Components/Layout"
import { useTheme } from "../../context/Theme"

const MoiveDetails = () => {
  const [resMov, setResMov] = useState()
  const { movId } = useParams()
  const [similer, setSimilar] = useState([])
  const [resSimilar, setSimiResponse] = useState([])
  const {theme} = useTheme()
  const navigate = useNavigate()

  const getDetails = async () => {
    console.log("Id here", movId)
    try {
      console.log(movId)
      const response = await axios.get(
        `http://localhost:5000/api/v1/moive/getMovieById/${movId}`
      )
      console.log("data here", response.data.movie.posterURL)
      setResMov(response.data.movie)
      setSimilar(response?.data?.movie?.genre)
      console.log("lllllllllllllllllllllllll",response.data.movie.genre, similer)
    } catch (error) {
      console.log(error)
    }
  }


  const getSimilar = async () => {
    console.log("similar", similer)
    try {
        const resSimilar = await axios.get(`http://localhost:5000/api/v1/moive/getSimilarMovie/${encodeURIComponent(JSON.stringify(similer))}`)
        console.log("resSimilar", resSimilar)
        setSimiResponse(resSimilar?.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getDetails()
  }, [])
  useEffect(() => console.log(resMov), [resMov])

  useEffect(() => {
  if (similer) {
    getSimilar()
  }
}, [similer])

  return (
    <Layout title={"movie details"}>
      <div className={`${theme === 'night' ? "bg-black text-amber-100" : "bg-white text-black"}`}>
      { resMov && (
        <div className='w-full overflow-x-hidden relative'>
        <div
          className='w-full h-[30rem]'
          style={{
            backgroundImage: resMov ? `url('${resMov.posterURL}')` : "none",
            backgroundSize: "cover",
          }}
        >
          <div className='w-full h-[30rem] flex px-15 justify-center items-center'>
                <div
                    className="w-60 min-w-[10rem] sm:ml-5 md: h-[90%] z-10">
                    <img 
                        src={resMov.posterURL} alt="#"
                        className="w-full h-[80%] sm:h-full object-cover overflow-hidden rounded-xl "
                    />
                </div>
                <div className="w-[50rem] h-[100%] bg-transparent z-20 p-10 flex flex-col justify-evenly">
                    <div className="text-4xl text-white font-medium font-sans">{resMov.name}</div>
                    <br />
                    <div className="text-[12px] sm:text-[15px] md:text-1xl text-white font-extralight ">Type: {resMov.genre}</div>
                    <div className="text-1xl text-white font-normal line-clamp-2">Description: {resMov.description}</div>
                    <div className="text-1xl text-white font-normal">Languages: {resMov.language ? (resMov.language) : ("Hindi, English, Telgue, Russian")}</div>
                    <br />
                    <div className="text-1xl text-white font-normal">Per Seat: ${resMov.price}</div>
                    <button 
                      onClick={() => navigate(`/booking/${movId}`)}
                      className="sm:30 md:w-60 h-12 bg-red-400 rounded text-white font-light ">
                      Book Now</button>
                </div>
          </div>
        </div>
        <div
          className='w-full h-[30rem] absolute left-0 top-0'
          style={{
            backgroundImage:
              "linear-gradient(to right, black,black,black,transparent,black,black,black)",
          }}
        ></div>
      </div>
      )}

        
          {resSimilar && (
        <div className={`${theme === 'night' ? "bg-black text-amber-100" : "bg-white text-black"} w-full  mt-5 " id="main-container`}>
          <div className="w-[100%] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-2 px-2 ">
              {resSimilar.map((m,i) => (
                <div
                  key={i}
                  onClick={() => navigate(`/moiveDetails/${m._id}`)}
                  className="aspect-[4/6] bg-transparent flex flex-col ">
                    <img 
                        className="w-full h-[80%] object-cover"
                        src={m.posterURL} alt="#" srcSet=""
                    />

                    <div className="w-[100%] bg-transparent flex flex-col p-2 justify-around">
                        <div className="font-sans font-bold text-2xl">{m.name}</div>
                        <div className="font-sans font-light text-1xl">Type: {m.genre}</div>
                        <div className="flex justify-between mt-2">
                          <div className="font-sans font-light text-1xl">Rating: ⭐⭐⭐⭐⭐</div>
                          <button
                            onClick={() => navigate(`/moiveDetails/${m._id}`)}
                          className="w-[35%] aspect-video] p-1 bg- text-red-600 border-red-600 border-1  rounded-4xl hover:bg-red-500 hover:text-white">Book</button>
                        </div>
                    </div>                                   

                </div>
              ))}
          </div>
        </div>
      )}
        </div>

      
    </Layout>
  )
}

export default MoiveDetails
