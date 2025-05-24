import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

const SeatBooking = () => {
  const movId = useParams()
  const [resMov, setResMov] = useState()
  const dates = []

  for (let i = 0; i < 7; i++) {
    const date = new Date()
    date.setDate(date.getDate() + i)
    dates.push(date)
  }

  const getDetails = async () => {
    try {
      console.log(movId.movId)

      const response = await axios.get(
        `http://localhost:5000/api/v1/moive/getMovieById/${movId.movId}`
      )
      // console.log("data here", response.data.movie.posterURL)
      setResMov(response.data.movie)
      console.log(resMov)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getDetails()
    console.log("kjsdjk", resMov)
  }, [])

  //   uI Seat

  const toatSeat = 50

  return (
    <div className='w-screen h-screen flex flex-col justify-evenly items-center'>
      <div className='text-3xl'>🎥 Choose the Date:</div>
      <div className='w-full flex justify-center'>
        {dates.map((m, i) => (
          <div
            key={i}
            className='w-22 h-22 m-2 rounded-2xl text-1xl font-bold text-white bg-purple-400 flex flex-col justify-center items-center'
          >
            <div>{m.toLocaleDateString("en-US", { weekday: "short" })}</div>
            <div>
              {m.getDate()} {m.toLocaleDateString("en-US", { month: "short" })}
            </div>
          </div>
        ))}
      </div>

      <div>show timing :- 9:00 - 11:00</div>

      <div className=''>
        <div className='w-[25rem] h-[6rem] bg-gray-100 flex '>
          <img
            className='w-[5rem] h-[5rem] rounded-2xl m-2'
            src={resMov?.posterURL}
            alt='#'
            srcSet=''
          />

          <div className='w-[100%] bg-gray-100 flex flex-col p-2 justify-around'>
            <div className='font-sans font-bold text-2xl'>{resMov?.name}</div>
            <div className='font-sans font-light text-1xl'>
              Type: {resMov?.genre}
            </div>
            <div className='font-sans font-light text-1xl'>
              Rating: ⭐⭐⭐⭐⭐
            </div>
          </div>
        </div>

        <div className='grid grid-cols-10 gap-2 bg-gray-500 p-4 rounded'>
          {Array.from({ length: toatSeat }).map((_,index) => {
            return (
              <div
                key={index}
               // onClick={() => handleSeatClick(index)}
                className={`bg-gray-400 w-8 h-8 rounded-md cursor-pointer`}
              ></div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default SeatBooking
