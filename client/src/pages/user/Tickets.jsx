import axios from 'axios'
import { useEffect, useState } from "react"
import { useAuth } from '../../context/Auth'

const Tickets = () => {
  const [tickets, setTickets] = useState([])
  const {auth} = useAuth()
  const [UserId, setUserId] = useState()

  const getUserId = async () => {
    try {
      console.log(`"RESPONSE..........>", ${auth?.user?.email}`)
      const uId = await axios.get(`/api/v1/auth/findBymail/${auth?.user?.email}`)
      console.log("uid", uId?.data?.response[0]._id)
      setUserId(uId?.data?.response[0]._id)
    } catch (error) {
      console.log(error)
    }
  }

  const GetTickets = async () => {
    try {
      // console.log("RESPONSE.........." , auth?.user?.email) // 67f760e68d132c463829b458
      const response = await axios.get(`/api/v1/tickets/ticketAll/${UserId}`)
      if(response){
        console.log(response?.data?.tickets)
      }
      setTickets(response?.data?.tickets)
    } catch (error) {
      console.log("error", error)
    }
  }

  useEffect(() => {
    if (auth?.user?.email) {
    getUserId();
   // GetTickets();
  }
  },[auth?.user?.email])

  useEffect(() => {
    GetTickets()
  },[UserId])

  return (
    <div className='w-full h-full min-h-screen flex justify-evenly mt bg-gray-100 pt-10 flex-wrap'>
      
    
       <div className='w-[95%]  overflow-y-scroll  sm:w-[70%] h-[70vh] bg-gray-200 rounded-3xl flex flex-col items-center gap-4 pt-2 justify-start'>
        Your History {tickets.length}
        {tickets.length > 0 && tickets.map((e) => (
            <div className='w-[100%] sm:w-[93%] h-20 bg-gray-300 rounded-3xl flex justify-around items-center'>
              <div>
                <img 
                  className='w-14 h-14 rounded-2xl'
                  src={e.showId.movie.posterURL} alt="#" />
              </div>
              <div>
                  <p>Amount Paid:   {e.price}</p>
                  <p>Seat Numebers:   {e.seatNumbers}</p>
                  <p>Date:   {e.showId.date.split("T")[0]}</p>
              </div>
            </div>
            
        ) )}
          <p>Load more...</p>
      </div>

        <div className='w-[100%] sm:w-[25%] h-[100%] bg-gray-200'>
          Total Amount: $3043
          <div>
            
          </div>
        </div>

    </div>
  )
}

export default Tickets
