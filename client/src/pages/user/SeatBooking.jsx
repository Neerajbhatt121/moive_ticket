import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

const SeatBooking = () => {
  const movId = useParams()
  const [resMov, setResMov] = useState()
  const [instaceDate, setInstanceDate] = useState(0)
  const [selectedSeats, setSelectedSeats] = useState([]);
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

  const handleSeatClick = (index) => {
  if (selectedSeats.includes(index)) {
    // Deselect the seat
    setSelectedSeats(selectedSeats.filter(seat => seat !== index));
  } else {
    // Select the seat
    setSelectedSeats([...selectedSeats, index]);
  }
};


  // Getting the movie instance for today
  const GettingInstance = async () => {
    try {
      const date = dates[instaceDate].toISOString().split('T')[0];
      console.log("xxxxxxxxxxxxxxxxxxxxx", date)
      const instance = await axios.get(`http://localhost:5000/api/v1/instance/getInstance/${date}`)
      console.log(instance)
    } catch (error) {
      console.log("Can't get the instance of movie",error)
    }
  }

 useEffect(() => {
  GettingInstance()
 },[instaceDate])


  const toatSeat = 50

  return (
    <div className='w-screen h-screen flex flex-col justify-evenly items-center'>
      <div className='text-3xl'>🎥 Choose the Date:</div>
      <div className='w-full flex justify-center'>
        {dates.map((m, i) => (
          <div
            key={i}
            className={`w-20 aspect-square m-2 rounded-2xl text-1xl font-bold text-gray-600 ${i==instaceDate? 'bg-purple-400 text-white' : 'bg-gray-200 '}  flex flex-col justify-center items-center`}
            onClick={() => setInstanceDate(i)}
          >
            <div>{m.toLocaleDateString("en-US", { weekday: "short" })}</div>
            <div className="text-center">
               {m.getDate()} {m.toLocaleDateString("en-US", { month: "short" })}
            </div>
          </div>
        ))}
      </div>

      <div>show timing :- 9:00 - 11:00</div>

      <div className='w-full  flex justify-evenly flex-wrap '>
        <div className='w-[25rem] h-[6rem] bg-gray-100 flex '>
          <img
            className='w-[5rem] h-[5rem] rounded-2xl m-2'
            src={resMov?.posterURL}
            alt='#'
            srcSet=''
          />
          <div className='w-full bg-gray-100 flex flex-col p-2 justify-around'>
            <div className='font-sans font-bold text-2xl'>{resMov?.name}</div>
            <div className='font-sans font-light text-1xl'>
              Type: {resMov?.genre}
            </div>
            <div className='font-sans font-light text-1xl'>
              Rating: ⭐⭐⭐⭐⭐
            </div>
          </div>
        </div>

        <div className='flex flex-col items-center '>
          <div className='w-[70%] h-5 bg-gray-400 rounded-t-full  text-center flex justify-center'></div>
          <div className='grid grid-cols-10 gap-4 bg-[#F8F3F3] p-4 rounded'>
            {Array.from({ length: toatSeat }).map((_, index) => {
              return (
                <div
                  key={index}
                   onClick={() => handleSeatClick(index)}
                  className={`w-7 h-7  ${selectedSeats.includes(index) ? 'bg-yellow-300' : 'bg-green-500'} rounded-md cursor-pointer`}
                ></div>
              )
            })}
          </div>
        </div>
      </div>

      <div className="w-[65%] relative">
        <div className='w-70 h-10 border-1 text-center p-1 relative l-0 -top-10 hover:bg-black hover:text-white'>
          Proceed to Payment
        </div>
      </div>

      <div  className="w-[80%] h-0.5 bg-black "/>

    </div>
  )
}

export default SeatBooking
