import axios from "axios";
import { useEffect, useState } from "react";
import toast, { Toaster } from 'react-hot-toast';

const CreateInstance = () => {
  const [movies, setMovies] = useState([])
  const [seletedMovie, setSelectedMovie] = useState()
  const [selectDate, setSelectedDate] = useState()
  const [slotetime, setSlottime] = useState()

  const dates = []
  for (let i = 0; i < 7; i++) {
    const date = new Date()
    date.setDate(date.getDate() + i)
    dates.push(date)
  }

  const getMoive = async () => {
    try {
      const res = await axios.get("/api/v1/moive/getAllmoives")
      setMovies(res.data.movie)
      console.log(res.data.movie)
      console.log(movies)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getMoive()
    console.log(movies)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const date = dates[selectDate]
    console.log(seletedMovie, date.toISOString().split("T")[0], slotetime)

    const preInsanse = await axios.get(`http://localhost:5000/api/v1/instance/getInstance/${date.toISOString().split("T")[0]}/${seletedMovie}/${slotetime}`)

    if (preInsanse?.data && preInsanse?.data?.instance?.length > 0) {
        toast.error("Slot already booked");
        console.log("existing instance found");
    return;
}

    const instance = await axios.post(`http://localhost:5000/api/v1/instance/createInstance`,{
        movie:seletedMovie,
        date:date.toISOString().split("T")[0],
        slotTime:slotetime
    })

    if(instance){
      console.log(instance)
    }

    if(instance?.data?.success === true){
      toast.success("Instance Created Successfully")
    } else {
      toast.error("Instance not Created Successfully")
    }
  }

  return (
    <div className='w-full h-full bg-white flex flex-col justify-center items-center mx-auto rounded-2xl'>
      <div><Toaster/></div>
      <h2 className='text-2xl font-bold mb-6'>🎬 Create Show Instance</h2>

      <form onSubmit={handleSubmit} className='flex flex-col gap-6 '>
        <label htmlFor=''>Select Movie</label>
        <select
          name=''
          id=''
          value={seletedMovie}
          onChange={(e) => setSelectedMovie(e.target.value)}
          className='w-full p-2 border border-gray-500 rounded'
        >
          <option value=''>--- Select a movie ---</option>
          {movies?.map((movie) => (
            <option key={movie._id} value={movie._id}>
              {movie.name}
            </option>
          ))}
        </select>

        {/* date selection */}

        <div className=''>
          <label className='block mb-2 font-semibold'>Select Date</label>
          <div className='flex'>
            {dates.map((m, i) => (
              <div
                key={i}
                className={`w-10 aspect-square m-2 rounded-xl text-1xl font-medium text-gray-600 ${
                  i == selectDate
                    ? "bg-purple-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }  flex flex-col justify-center items-center`}
                onClick={() => setSelectedDate(i)}
              >
                <div>{m.toLocaleDateString("en-US", { weekday: "short" })}</div>
                <div className='text-center'>{m.getDate()} </div>
              </div>
            ))}
          </div>
        </div>

        {/* Slot Time */}
        <div>
          <label className='block mb-2 font-semibold'>Select Slot Time</label>
          <select
            value={slotetime}
            onChange={(e) => setSlottime(e.target.value)}
            className='w-full p-2 border border-gray-300 rounded'
          >
            <option value='0'>Select Time</option>
            <option value='morning'>9:00 AM - 11:00 AM</option>
            <option value='afternoon'>12:00 PM - 2:00 PM</option>
            <option value='evening'>3:00 PM - 5:00 PM</option>
            <option value='night'>9:00 PM - 11:00 PM</option>
          </select>
        </div>

        <button
          type='submit'
          className='w-full overflow-hidden bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition'
        >
          ➕ Create Instance
        </button>
      </form>
    </div>
  )
}

export default CreateInstance
