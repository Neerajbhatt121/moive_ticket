import axios from "axios"
import { useEffect, useState } from "react"
import toast, { Toaster } from "react-hot-toast"
import { useParams } from "react-router-dom"
import { useAuth } from "../../context/Auth"
import { useTheme } from "../../context/Theme"
import { socket } from "../socket"

const SeatBooking = () => {
  // const movId = useParams();
  const [resMov, setResMov] = useState()
  const [selectedSeats, setSelectedSeats] = useState([])
  const [instanceRes, setInstanceRes] = useState()
  const [liveLockedSeats, setLiveLockedSeats] = useState([])
  const { auth } = useAuth()
  const { theme } = useTheme()
  const [instaceSlotIdx, setInstanceSlotIdx] = useState(0)
  const [instaceSlot] = useState("morning")
  let { slotTime, Mdate, movId } = useParams()
  const [instacneList, setInstanceList] = useState([])

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
        `http://localhost:5000/api/v1/moive/getMovieById/${movId}`
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

  // socket
  useEffect(() => {
    if (!instanceRes?._id) return

    // Join specific room for this movie instance
    socket.emit("joinInstance", instanceRes._id)

    // Receive real-time updates of selected seats
    socket.on("seatSelected", ({ seatNumber }) => {
      setLiveLockedSeats((prev) => [...new Set([...prev, seatNumber])])
    })

    socket.on("seatUnselected", ({ seatNumber }) => {
      setLiveLockedSeats((prev) => prev.filter((s) => s !== seatNumber))
    })

    return () => {
      socket.off("seatSelected")
      socket.off("seatUnselected")
      socket.emit("leaveInstance", instanceRes._id)
    }
  }, [instanceRes])

  //   uI Seat
  const handleSeatClick = (index, s) => {
    if (selectedSeats.includes(s)) {
      // Deselect the seat
      setSelectedSeats(selectedSeats.filter((seat) => seat !== s))
      socket.emit("unselectSeat", {
        seatNumber: s,
        instanceId: instanceRes._id,
      })
    } else {
      // Select the seat
      setSelectedSeats([...selectedSeats, s])
      socket.emit("selectSeat", {
        seatNumber: s,
        instanceId: instanceRes._id,
        userId: auth.user.email,
      })
    }
  }

  // Getting the movie instance for today
  const GettingInstance = async (date, slot) => {
    try {
      // const mMdate = Mdate? Mdate : [instaceSlotIdx]
      console.log("movid", movId, date, instaceSlot)
      const instance = await axios.get(
        `/api/v1/instance/getInstance/${date}/${movId}/${slot}`
      )
      console.log("Curr instance ", instance?.data?.instance)
      setInstanceRes(instance?.data?.instance[0])
    } catch (error) {
      console.log("Can't get the instance of movie", error)
    }
  }

  useEffect(() => {
    GettingInstance()
    setSelectedSeats([])
    if(Mdate && slotTime){
     // const formattedDate
      GettingInstance(Mdate.split("T")[0], slotTime)
      console.log("Getting ......... " , Mdate)
    }
  }, [])

  const handleClickpayment = async () => {
    try {
      const showId = instanceRes?._id
      const seatnumber = selectedSeats
      const userId = auth.user.email
      console.log(showId, seatnumber, userId)
      if (seatnumber.length == 0) {
        toast.error("select seat first")
        console.log("Seat not selected")
        return
      }
      const book = await axios.post(
        "http://localhost:5000/api/v1/instance/bookMovie",
        {
          showId: showId,
          seatNumber: seatnumber,
          userId: userId,
        }
      )
      if(book) toast.success("Check your mail for recipt/ticket")
      console.log("book", book)
    } catch (error) {
      console.log(error)
    }
  }

  const GettingInstanceAll = async () => {
    try {
      console.log("movid", movId)
      const instance = await axios.get(`/api/v1/instance/getInstance/${movId}`)
      console.log("Curr instance Allllll", instance?.data?.instance)
      setInstanceList(instance?.data?.instance)
    } catch (error) {
      console.log("Can't get the instance of movie", error)
    }
  }

  useEffect(() => {
    GettingInstanceAll()
  }, [])

  return (
    <div
      className={` ${
        theme === "night" ? "bg-gray-700 text-white" : "bg-gray-100 text-black"
      }  h-[100vh] w-screen p-2 sm:p-4 flex items-center justify-center `}
    >
      <Toaster />
      <div
        className={`  ${
          theme === "night" ? "bg-gray-800 text-white" : "bg-gray-100 text-black"
        } w-full h-[90%] flex flex-col justify-evenly items-center  rounded-2xl shadow-2xl shadow-black`}
      >
        <div
          className={`${
            theme === "night" ? " text-white" : " text-black"
          } text-2xl sm:text-3xl mb-15`}
        >
          🎥 Choose the Date:
        </div>

        <div className='w-full flex flex-col flex-wrap items-center  gap-5 mb-15 '>
          <div className=''>
            <span>
              show timing :-
              {instanceRes?.slotTime
                ? instanceRes?.slotTime
                : "No instnce found"}
            </span>

            <div className='w-full flex justify-center flex-wrap'>
              {instacneList?.map((m, i) => (
                <div
                  key={i}
                  className={`w-17 aspect-video m-2 rounded-[14px] text-[8px] font-medium text-gray-700 
                ${
                  theme === "light"
                    ? i == instaceSlotIdx
                      ? "bg-purple-400 text-white"
                      : "bg-gray-100 shadow-2xl"
                    : i == instaceSlotIdx
                    ? "border-purple-400 border-2 text-purple-500"
                    : "border-gray-400 border-2 text-white shadow-2xl"
                }
              flex flex-col justify-center items-center`}
                  onClick={() => {
                    console.log("clicked")
                    setInstanceSlotIdx(i)
                    GettingInstance(new Date(m.date).toISOString().split("T")[0], m.slotTime)
                  }}
                >
                  <div>{new Date(m.date).toISOString().split("T")[0]}</div>
                  <div>
                    {new Date(m.date).toLocaleDateString("en-US", {
                      month: "short",
                    })}
                  </div>
                  <div>{m.slotTime}</div>
                </div>
              ))}
            </div>
          </div>

          <div className='w-full flex justify-around flex-wrap '>
            {/* Details */}
            <div
              className={` ${
                theme === "night" ? "bg-black  " : " bg-gray-100"
              } w-[30rem] h-[6rem]  flex mb-3 rounded-2xl shadow-2xl`}
            >
              <img
                className='w-[5rem] h-[5rem] rounded-2xl m-2'
                src={resMov?.posterURL}
                alt='#'
                srcSet=''
              />
              <div
                className={` ${
                  theme === "night" ? "bg-black" : " bg-gray-100"
                } w-full  flex flex-col p-2 justify-around  rounded-2xl shadow-2xl`}
              >
                <div className='font-sans font-bold text-2xl'>
                  {resMov?.name}
                </div>
                <div className='font-sans font-light text-1xl truncate line-clamp-1 whitespace-break-spaces'>
                  {resMov?.genre}
                </div>
                <div className='font-sans font-light text-1xl'>⭐⭐⭐⭐⭐</div>
              </div>
            </div>

            <div className='flex flex-col items-center mt-15'>
              <div className='w-[60%] h-5 bg-gray-500 rounded-t-full  text-center flex justify-center'>Screen</div>
              <div
                className={` ${
                  theme === "night" ? "bg-gray-950 " : "bg-[#F8F3F3]"
                } grid grid-cols-10 gap-3 sm:gap-4 sm:p-2 rounded `}
              >
                {instanceRes ? (
                  instanceRes?.bookedSeats?.map((s, index) => {
                    const booked = instanceRes.bookedSeats
                   // const isBooked = booked.includes(index)
                    const isSelected = selectedSeats.includes(s.seatNumber)
                    const isLiveLocked = liveLockedSeats.includes(s.seatNumber)

                    return (
                      <div
                        key={index}
                        onClick={() => {
                           if (!s.isBooked && !isLiveLocked) {
                              handleSeatClick(index, s.seatNumber)
                            }
                        }}
                        className={`w-7 h-7 sm:w-8 sm:h-8 rounded-md cursor-pointer text-center
                            ${
                              booked[index].isBooked
                                ? "border-2 border-red-400 text-red-400 cursor-not-allowed"
                                : isSelected
                                ? "border-2 border-yellow-500 text-yellow-500"
                                : isLiveLocked
                                ? "border-2 border-blue-500 text-blue-500 cursor-not-allowed"
                                : "border-2 border-green-800 text-green-500"
                            }
                          `}
                      >
                        {s.seatNumber}
                      </div>
                    )
                  })
                ) : (
                  <div className='text-center w-70 '>
                    No instance This Date and slot
                  </div>
                )}
              </div>
            </div>
          </div>

          <div
            className={`  w-full flex justify-center md:justify-center lg:justify-start lg:pl-25  mt-10`}
          >
            <div
              onClick={() => {
                handleClickpayment()
              }}
              className={` ${
                theme === "night"
                  ? " border-purple-500 text-purple-500 bg-gray-950"
                  : " bg-purple-600 text-white"
              } w-80 h-10 border-1 text-center p-1 md:mx-35  rounded-xl   -top-10 hover:bg-black `}
            >
              Proceed to Payment
            </div>
          </div>
        </div>

        <div className='w-[80%] h-0.5 mt-5 bg-black ' />
      </div>
    </div>
  )
}

export default SeatBooking
