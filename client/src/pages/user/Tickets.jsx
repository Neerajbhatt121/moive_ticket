import axios from 'axios';
import { useEffect, useState } from "react";
import { CiViewBoard } from "react-icons/ci";
import { IoMdDownload } from "react-icons/io";
import { useAuth } from '../../context/Auth';

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
    <div className='w-full h-full min-h-screen flex justify-evenly  bg-gray-100 pt-10 flex-wrap'>
      
      <div className='flex flex-col w-[95%]   sm:w-[70%] '>
       <div className='w-[100%]  overflow-y-scroll  h-[70vh] bg-gray-200 rounded-3xl flex flex-col items-center gap-4 pt-2 justify-start'>
        Your History {tickets.length}
        {tickets.length > 0 && tickets.map((e) => (
            <div className='w-[95%] sm:w-[90%] h-20 bg-gray-300 rounded-3xl flex justify-around gap-5 items-center'>
              {/* <div> */}
                <img 
                  className='w-14 h-14 rounded-2xl'
                  src={e.showId.movie.posterURL} alt="#"/>
              {/* </div> */}
              <div className='text-[10px] sm:text-[15px]'>
                  <p>Amount Paid:   {e.price}</p>
                  <p>Seat Numebers:   {e.seatNumbers}</p>
                  <p>Date:   {e.showId.date.split("T")[0]}</p>
              </div>
              <div className='w-[15%] flex justify-evenly items-center '>
                <CiViewBoard className='size-7'/>
                <div className='w-auto h-auto rounded-2xl p-2 bg-gray-400 text-[8px] sm:text-[15px]'>
                  <div className='sm:block hidden'>Download</div>
                  <div className='sm:hidden block'><IoMdDownload className='size-4' /></div>
                </div>
              </div>
            </div>
            
        ) )}
          <p>Load more...</p>
      </div> 

      <div className='w-[100%] p-5 gap-5  flex overflow-x-scroll mt-5 mb-5 justify-evenly '>
          <div className='w-60 h-40 min-w-50'>
            <img 
              className='overflow-hidden w-60 h-40'
              src="https://as1.ftcdn.net/v2/jpg/11/87/92/78/1000_F_1187927857_Kg6jRyoMenjRtMI2mjMsroT3y8ZSbqtP.jpg" alt="" />
            <p>Claim Now...</p>
          </div>
          <div className='w-60 h-40 min-w-50 '>
            <img 
              className='overflow-hidden w-60 h-40'
            src="https://as1.ftcdn.net/v2/jpg/14/36/17/36/1000_F_1436173665_D5TdhffCGmYTexaXPESy8qgx3ganigKs.jpg" alt="" />
            <p>Claim Now...</p>
          </div>
          <div className='w-60 h-40 min-w-50 '>
            <img 
            className='overflow-hidden w-60 h-40'
            src='https://as1.ftcdn.net/v2/jpg/12/57/96/76/1000_F_1257967685_g6RcpNYj1yLNRmKF4FuaAc4xOQPHEWfd.jpg'
            />
            <p>Claim Now...</p>
          </div>
          <div className='w-60 h-40 min-w-50 '>
            <img 
            className='overflow-hidden w-60 h-40'
            src="https://imgs.search.brave.com/qyaV920pfNfZcH3xiN6hy98KBaMPtYoS_W_FMEo0Vpw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuZnJlZWltYWdl/cy5jb20vdmFyaWFu/dHMvVlg5djlLR1VI/QzdGeVpMVW51Y3Y1/aG5ILzYyNGYwZGMx/ZGZmOWJkY2NhYjAz/MmY5M2MzM2U3OWRl/Nzg0ODE3NzBlNzll/MjFkM2IwNDY5ZGFm/NTFmMDI3OTc" alt="" />
            <p>Claim Now...</p>
          </div>
      </div>  

      </div>

        <div className='w-[90%] sm:w-[25%] h-[90vh] rounded-3xl p-5 bg-gray-200 flex flex-col justify-center items-center'>
          Total Amount: $3043
          <div>
            Not Enough Data To Show
          </div>
        </div>

    </div>
  )
}

export default Tickets
