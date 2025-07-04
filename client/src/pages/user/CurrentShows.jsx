import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useTheme } from '../../context/Theme'


const CurrentShows = () => {
    const [currMov, setCurrMov] = useState([])
    const {theme} = useTheme()
    const navigate = useNavigate()
    const {date} = useParams()
    
    const getCurrShows = async () => {
            try {
                const response = await axios.get(`/api/v1/instance/getInstanceWeak/${date}`)
                console.log("current shows",response.data)
                setCurrMov(response.data.result)
            } catch (error) {
                console.log(error)
            }
    }
    
    useEffect(() => {
        getCurrShows()
    },[])


  return (
    <div>
        {currMov.length > 0 && (
          <div
            className={`${
              theme === "night"
                ? "bg-black text-amber-100"
                : "bg-white text-black"
            } w-full   mt-10 " id="main-container`}
          >
            <div className='  text-2xl font-sans font-bold ml-5 '>
              This weak shows
            </div>
            <div className='w-[100%] pb-10 flex justify-start items-center gap-1 px-4 overflow-x-auto no-scrollbar'>
              {currMov.map((m, i) => (
                <div
                  key={i}
                  onClick={() => navigate(`/moiveDetails/${m.movie}`)}
                  className=' w-[14rem] h-[11rem] sm:w-[18rem] sm:h-[14rem]  flex flex-col mb-5 justify-between p-1 transform hover:scale-105 transition-transform duration-300 ease-in-out'
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
    </div>
  )
}

export default CurrentShows
