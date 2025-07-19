import axios from "axios"
import { useEffect, useState } from "react"
import { Toaster } from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import HeroSection from "../Components/HeroSection"
import Layout from "../Components/Layout"
import { useTheme } from "../context/Theme"
import '../index.css'
import CurrentShows from "./user/CurrentShows"

const Homepage = () => {
  const [movie, setMovie] = useState([])
  const [movieLatest, setMovieLates] = useState([])
  const navigate = useNavigate()
  const { theme } = useTheme()
  const [page, setPage] = useState(1);
  const [loading, setIsloading] = useState(false);

  const getMoive = async () => {
    try {
      console.log("page  ...." , page)
      const res = await axios.get(`https://moive-ticket-1.onrender.com/api/v1/moive/getAllmoives/${page}`)
      setMovie(prev => [...prev, ...res.data.movie])
      setIsloading(false)
    } catch (error) {
      console.log(error)
    }
  }

  const getMoiveLatest = async () => {
    try {
      console.log("page  ...." , page)
      const res = await axios.get(`https://moive-ticket-1.onrender.com/api/v1/moive/getAllmoivesLatest`)
      setMovieLates(res.data.movie)
      setIsloading(false)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getMoiveLatest()
  },[])


  useEffect(() => {
    console.log("Updated movie list:", movie)
  }, [movie])

  // handling loadmore
  useEffect(() => {
  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 50) {
      setPage((prev) => prev + 1);
      setIsloading(true)
     console.log("Reached to end..........")
    }
  };

  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    getMoive()
  }, [page])
  

  return (
    <Layout title={"All movie and shows"}>
      <div>
        <Toaster />
      </div>
      <div
        className={`${
          theme === "night" ? "bg-black text-amber-100" : "bg-white text-black"
        } w-full h-full overflow-x-hidden`}
      >
        <HeroSection />
        <CurrentShows/>

        {movie.length > 0 && (
          <div
            className={`${
              theme === "night"
                ? "bg-black text-amber-100"
                : "bg-white text-black"
            } w-full   mt-5 " id="main-container`}
          >
            <div className='mb-8 text-1xl sm:text-2xl font-sans font-bold ml-5 '>
              Recently uploaded
            </div>
            <div className='w-[100%] pb-5 flex justify-start items-center  px-4 overflow-x-auto no-scrollbar'>
              {movieLatest.map((m, i) => (
                <div
                  key={i}
                  onClick={() => navigate(`/moiveDetails/${m._id}`)}
                  className=' w-[12rem] h-[10rem] sm:w-[18rem] sm:h-[14rem]  flex flex-col justify-between p-1 transform hover:scale-105 transition-transform duration-300 ease-in-out'
                >
                  <img
                    className='w-[100%] h-[100%]   object-cover overflow-y-hidden  rounded-[4px]'
                    src={m.posterURL}
                    alt='#'
                    srcSet=''
                  />
                  <div
                    className=' w-[14rem] sm:w-[16rem] bottom-8  flex flex-col  p-0 '
                  >
                    <div className='z-999 font-sans   font-bold  text-sm sm:text-2xl '>
                      {m.name}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
          </div>
        )}

        <div className='mb-5 text-1xl  sm:text-2xl font-sans font-bold ml-5 bg-transparent -top-5 z-99'>
          Recommended
        </div>

        {movie.length > 0 && (
          <div
            className={`${
              theme === "night"
                ? "bg-black text-amber-100"
                : "bg-white text-black"
            } w-full  mt-5 " id="main-container`}
          >
            <div className='w-[100%] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-2 px-2 '>
              {movie.map((m, i) => (
                <div
                  key={i}
                  onClick={() => navigate(`/moiveDetails/${m._id}`)}
                  className='aspect-[4/6] bg-transparent flex flex-col '
                >
                  <img
                    className='w-full h-[80%] object-cover'
                    src={m.posterURL}
                    alt='#'
                    srcSet=''
                  />

                  <div className='w-[100%] bg-transparent flex flex-col p-2 justify-around'>
                    <div className='font-sans font-bold text-2xl'>{m.name}</div>
                    <div className='font-sans font-light text-1xl'>
                      Type: {m.genre}
                    </div>
                    <div className='flex justify-between mt-2'>
                      <div className='font-sans font-light text-1xl'>
                        Rating: ⭐⭐⭐⭐⭐
                      </div>
                      <button className='w-[35%] aspect-video] p-1 bg- text-red-600 border-red-600 border-1  rounded-4xl hover:bg-red-500 hover:text-white'>
                        Book
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
              <div className="flex justify-center items-center">
                {loading &&  
                    <div className="animate-spin inline-block size-10 border-3 border-current border-t-transparent text-gray-400 rounded-full" role="status" aria-label="loading">
                      <span className="sr-only">Loading...</span>
                    </div>}
              </div>
          </div>
        )}
      </div>
    </Layout>
  )
}

export default Homepage
