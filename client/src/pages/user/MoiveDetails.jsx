import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Layout from "../../Components/Layout"

const MoiveDetails = () => {
  const [resMov, setResMov] = useState()
  const { movId } = useParams()
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
      console.log(resMov)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getDetails()
  }, [])
  useEffect(() => console.log(resMov), [resMov])

  return (
    <Layout title={"movie details"}>
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
                    className="w-[16rem] min-w-[10rem] h-[90%] z-10">
                    <img 
                        src={resMov.posterURL} alt="#"
                        className="w-full h-full object-cover overflow-hidden rounded-xl "
                    />
                </div>
                <div className="w-[50rem] h-[100%] bg-transparent z-20 p-10 flex flex-col justify-evenly">
                    <div className="text-4xl text-white font-medium font-sans">{resMov.name}</div>
                    <br />
                    <div className="text-1xl text-white font-extralight">Type: {resMov.genre}</div>
                    <div className="text-1xl text-white font-normal">Description: {resMov.description}</div>
                    <div className="text-1xl text-white font-normal">Languages: {resMov.language ? (resMov.language) : ("Hindi, English, Telgue, Russian")}</div>
                    <br />
                    <div className="text-1xl text-white font-normal">Per Seat: ${resMov.price}</div>
                    <button 
                      onClick={() => navigate(`/bokking/${movId}`)}
                      className="w-60 h-12 bg-red-400 rounded text-white font-light ">
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
    </Layout>
  )
}

export default MoiveDetails
