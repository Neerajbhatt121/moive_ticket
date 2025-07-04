import axios from "axios"
import { useEffect, useState } from "react"
import toast, { Toaster } from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import HeroSection from "../Components/HeroSection"
import Layout from "../Components/Layout"
import { useTheme } from "../context/Theme"
import '../index.css'
import CurrentShows from "./user/CurrentShows"

const Homepage = () => {
  const [movie, setMovie] = useState([])
  const navigate = useNavigate()
  const { theme } = useTheme()

  const getMoive = async () => {
    try {
      const res = await axios.get("/api/v1/moive/getAllmoives")
      setMovie(res.data.movie)
      console.log(res.data.movie)
      console.log(movie)
      toast.success("toasted")
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getMoive()
  }, [])

  useEffect(() => {
    console.log("Updated movie list:", movie)
  }, [movie])

  return (
    <Layout title={"All movie and shows"}>
      <div>
        <Toaster />
      </div>
      <div
        className={`${
          theme === "night" ? "bg-black text-gray-200" : "bg-white text-black"
        } w-full h-full overflow-x-hidden`}
      >
        <HeroSection />

        <div
          className={`w-full h-8 mt-8 [&>*]:rounded-3xl [&>*]:w-[7rem]  [&>*]:ml-8 [&>*]:font-sans [&>*]:text-center [&>*]:pt-1 flex `}
        >
          <div className='bg-wheat text-black bg-gray-200'>Most Watch</div>
          <div className='bg-black text-white'>High Rated</div>
          <div className='bg-wheat text-black bg-gray-200'>Latest</div>
        </div>

        <CurrentShows/>

        {movie.length > 0 && (
          <div
            className={`${
              theme === "night"
                ? "bg-black text-amber-100"
                : "bg-white text-black"
            } w-full   mt-5 " id="main-container`}
          >
            <div className='mb-8  text-2xl font-sans font-bold ml-5 '>
              Recently uploaded
            </div>
            <div className='w-[100%] pb-10 flex justify-start items-center gap-1 px-4 overflow-x-auto no-scrollbar'>
              {movie.map((m, i) => (
                <div
                  key={i}
                  onClick={() => navigate(`/moiveDetails/${m._id}`)}
                  className=' w-[14rem] h-[11rem] sm:w-[18rem] sm:h-[14rem]  flex flex-col mb- justify-between p-1 transform hover:scale-105 transition-transform duration-300 ease-in-out'
                >
                  <img
                    className='w-[100%] h-[100%]   object-cover overflow-y-hidden shadow-black shadow-2xl rounded-2xl'
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

        <div className='mb-10  text-2xl font-sans font-bold ml-5 bg-transparent -top-5 z-99'
          style={{
            //background: linear-gradient(top, white 90%, rgba(255, 255, 255, 0) 100%);
          }}
        >
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
          </div>
        )}
      </div>
    </Layout>
  )
}

export default Homepage
