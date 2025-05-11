import axios from "axios"
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Layout from "../../Components/Layout"

const MoiveDetails = () => {
  const [resMov, setResMov] = useState()

  const { movId } = useParams()

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
      <div className='w-full overflow-x-hidden relative'>
        <div
          className='w-full h-[30rem]'
          style={{
            backgroundImage: resMov ? `url('${resMov.posterURL}')` : "none",
            backgroundSize: "cover",
          }}
        >
          <div className='w-full h-[30rem] flex px-15 justify-around items-center'>
                <div
                    className="w-[18rem] min-w-[10rem] h-[80%] z-10">
                    <img 
                        src={resMov.posterURL} alt="#"
                        className="w-full h-full object-cover overflow-hidden rounded-3xl "
                    />
                </div>
                <div className="w-[40rem] h-[100%] bg-amber-900 z-20">
                    <div>

                    </div>
                </div>
          </div>
        </div>
        <div
          className='w-full h-[30rem] absolute left-0 top-0'
          style={{
            backgroundImage:
              "linear-gradient(to right, black,black,transparent,black,black)",
          }}
        ></div>
      </div>
    </Layout>
  )
}

export default MoiveDetails
