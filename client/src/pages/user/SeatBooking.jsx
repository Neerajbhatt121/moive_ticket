import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useAuth } from "../../context/Auth"

const SeatBooking = () => {
  const movId = useParams()
  const [resMov, setResMov] = useState()
  const [instaceDate, setInstanceDate] = useState(0)
  const [selectedSeats, setSelectedSeats] = useState([])
  const [instanceRes, setInstanceRes] = useState()
  const {auth} = useAuth()

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
      // console.log("data here", response.data)
      setResMov(response.data.movie)
      console.log(resMov)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getDetails()
  }, [])

  //   uI Seat
  const handleSeatClick = (index,s) => {
    if (selectedSeats.includes(s)) {
      // Deselect the seat
      setSelectedSeats(selectedSeats.filter((seat) => seat !== s))
    } else {
      // Select the seat
      setSelectedSeats([...selectedSeats, s])
    }
  }

  // Getting the movie instance for today
  const GettingInstance = async () => {
    try {
      const date = dates[instaceDate]
      const instance = await axios.get(
        `http://localhost:5000/api/v1/instance/getInstance/${
          date.toISOString().split("T")[0]
        }/${movId.movId}`
      )
      setInstanceRes(instance?.data)
      console.log("ins",instance?.data)
      console.log("this insres", instanceRes?.data)
      console.log("this seat", instance.data.instance[0].bookedSeats.length)
    } catch (error) {
      console.log("Can't get the instance of movie", error)
    }
  }

  useEffect(() => {
    GettingInstance()
    setSelectedSeats([])
  }, [instaceDate])


  const handleClickpayment = async () => {
    try {
      const showId = instanceRes?.instance?.[0]?._id
      const seatnumber = selectedSeats
      const userId = auth.user.email
      console.log(showId, seatnumber, userId)
      const book = await axios.post('http://localhost:5000/api/v1/instance/bookMovie', {
        showId: showId,
        seatNumber: seatnumber,
        userId : userId
      })
      console.log("book",book)
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div className='w-screen h-screen flex flex-col justify-evenly items-center'>
      <div className='text-3xl'>🎥 Choose the Date:</div>
      <div className='w-full flex justify-center'>
        {dates.map((m, i) => (
          <div
            key={i}
            className={`w-20 aspect-square m-2 rounded-2xl text-1xl font-bold text-gray-600 ${
              i == instaceDate ? "bg-purple-400 text-white" : "bg-gray-200 "
            }  flex flex-col justify-center items-center`}
            onClick={() => setInstanceDate(i)}
          >
            <div>{m.toLocaleDateString("en-US", { weekday: "short" })}</div>
            <div className='text-center'>
              {m.getDate()} {m.toLocaleDateString("en-US", { month: "short" })}
            </div>
          </div>
        ))}
      </div>


    <div className="w-full flex flex-col flex-wrap items-start  gap-5">
      <div>show timing :- {instanceRes?.instance[instaceDate]?.slotTime} 9:00 - 11:00</div>

      <div className='w-full flex justify-between flex-wrap '>
        <div className='w-[30rem] h-[6rem] bg-gray-100 flex mb-3'>
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
          <div className='w-[60%] h-5 bg-gray-400 rounded-t-full  text-center flex justify-center'></div>
          <div className='grid grid-cols-10 gap-4 bg-[#F8F3F3] p-4 rounded'>
            {instanceRes?.instance?.[0] ? (
              Array.from({
                length: instanceRes.instance[0].bookedSeats.length,
              }).map((s, index) => {
                const booked = instanceRes.instance[0].bookedSeats.map(
                  (seat) => seat
                )
               // const isBooked = booked.includes(index)
                const isSelected = selectedSeats.includes(booked[index].seatNumber)

                return (
                  <div
                    key={index}
                    onClick={() => {
                      if (booked[index].isBooked == false ) {
                       // booked.includes
                        handleSeatClick(index, booked[index].seatNumber)
                      }
                    }}
                    className={`w-8 h-8 rounded-md cursor-pointer text-center
                        
                        ${
                          booked[index].isBooked == true
                            ? " border-2 border-red-600 text-red-500 cursor-not-allowed"
                            : isSelected
                            ? "border-2 border-yellow-300 text-yellow-300"
                            : "border-2 border-green-600 text-green-500"
                        }
                      `}
                  >
                    {booked[index].seatNumber}
                  </div>
                )
              })
            ) : (
              <div className="text-center">No instance</div>
            )
              
            }
          </div>
        </div>
      </div>
      

      <div className='w-full'>
        <div 
          onClick={() => {handleClickpayment()}}
          className='w-80 h-10 border-1 text-center p-1  -top-10 hover:bg-black hover:text-white'>
          Proceed to Payment
        </div>
      </div>

      </div>

      <div className='w-[80%] h-0.5 bg-black ' />
    </div>
  )
}

export default SeatBooking
