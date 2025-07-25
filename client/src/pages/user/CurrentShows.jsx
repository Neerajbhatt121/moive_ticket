import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CalenderBox from '../../Components/CalenderBox'
import { useTheme } from '../../context/Theme'


const CurrentShows = () => {
    const [currMov, setCurrMov] = useState([])
    const {theme} = useTheme()
    const navigate = useNavigate()
    const date = new Date
    
    const getCurrShows = async () => {
            try {
              console.log("Date ",date.toISOString().split("T")[0])
                const response = await axios.get(`/api/v1/instance/getInstanceWeak/${date.toISOString().split("T")[0]}`)
                console.log("current shows",response.data)
                setCurrMov(response.data.filtered)
            } catch (error) {
                console.log(error)
            }
    }
    
    useEffect(() => {
        getCurrShows()
    },[])


  return (
    <div>
        {currMov.length >= 0 && (
          <div
            className={`${
              theme === "night"
                ? "bg-black text-amber-100"
                : "bg-white text-black"
            } w-full   mt-10 " id="main-container`}
          >
            <div className=' text-1xl sm:text-2xl font-sans font-bold ml-5 '>
              This weak calender
            </div>
            <div className='w-[100%] pb-5 flex justify-start items-center gap-1 px-4 overflow-x-auto no-scrollbar'>
              <CalenderBox/>
              {currMov.map((m, i) => (
                <div
                  key={i}
                  onClick={() =>{ navigate(`/booking/${m.movie}/${m.date.split("T")[0]}/${m.slotTime}`)
                     console.log(`${m.movie}/${m.date}/${m.slotTime})}`)}}
                  className=' w-[10rem] h-[8rem] sm:w-[14rem] sm:h-[10rem]  flex flex-col  justify-between p-1 transform hover:scale-105 transition-transform duration-300 ease-in-out'
                >
                  <img
                    className='w-[100%] h-[100%]   object-cover overflow-y-hidden  rounded-2xl'
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
    </div>
  )
}

export default CurrentShows
