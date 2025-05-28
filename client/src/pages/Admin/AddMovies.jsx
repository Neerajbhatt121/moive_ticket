import axios from 'axios'
import { useState } from "react"
import { FaFilm, FaMoneyBillWave, FaUsers } from "react-icons/fa"

const AddMovies = () => {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [duration, setDuration] = useState("")
  const [posterURL, setPosterURL] = useState("")
  const [price, setPrice] = useState(500) // default
  const [genre, setGenre] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()

    formData.append("name", name)
    formData.append("description", description)
    formData.append("duration", Number(duration))
    formData.append("price", Number(price))
    formData.append("genre", genre) 

    formData.append("posterURL", posterURL)

    console.log("Form Data:", formData)

    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/moive/createmoive",
        formData
      )
      console.log("api called")
      if (!response) {
        console.log("can't uploaded movie")
      }
    } catch (error) {
      console.log("xxxxxxxxxxxxxxxxxxxxxx", error)
    }
  }

  return (
    <div className='flex flex-col justify-center items-center'>
      {/* Cards */}

      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 w-full'>
        <div className='bg-white p-4 rounded-xl shadow-md flex items-center space-x-4'>
          <FaFilm className='text-3xl text-purple-600' />
          <div>
            <p className='text-gray-600'>Add Movie</p>
            <h2 className='text-2xl font-bold'>120</h2>
          </div>
        </div>

        <div className='bg-white p-4 rounded-xl shadow-md flex items-center space-x-4'>
          <FaUsers className='text-3xl text-green-600' />
          <div>
            <p className='text-gray-600'>Create Instance</p>
            <h2 className='text-2xl font-bold'>350</h2>
          </div>
        </div>

        <div className='bg-white p-4 rounded-xl shadow-md flex items-center space-x-4'>
          <FaMoneyBillWave className='text-3xl text-blue-600' />
          <div>
            <p className='text-gray-600'>Revenue</p>
            <h2 className='text-2xl font-bold'>$12K</h2>
          </div>
        </div>
      </div>

      <div className='w-[35rem] h-[50rem]'>
        <form
          onSubmit={handleSubmit}
          className='flex flex-col gap-4 w-96 mx-auto p-4'
        >
          <input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='Name (e.g., Krishna Kumar)'
            className='input-style w-90 h-10 bg-white text-gray-600 border p-2 border-gray-400 rounded-2xl drop-shadow-2xl focus:outline-none'
          />

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder='Description'
            className=' w-90 h-30 bg-white text-gray-600 border p-2 border-gray-400 rounded-2xl drop-shadow-2xl focus:outline-none'
          />

          <input
            type='number'
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            placeholder='Duration in minutes'
            className='input-style w-90 h-10 bg-white text-gray-600 border p-2 border-gray-400 rounded-2xl drop-shadow-2xl focus:outline-none'
          />

          <div className='flex flex-col'>
            <label className='text-gray-600 mb-1'>Upload Poster</label>

            <input
              type='file'
              id='posterUpload'
              accept='image/*'
              onChange={(e) => setPosterURL(e.target.files[0])}
              className='hidden'
            />

            <label
              htmlFor='posterUpload'
              className='cursor-pointer bg-gray-500 text-white px-2 py-1 rounded-2xl shadow-lg w-fit hover:bg-gray-400 transition'
            >
              📁 Choose Poster
            </label>

            {posterURL && (
              <p className='text-sm text-gray-500 mt-2'>
                Selected: {posterURL.name}
              </p>
            )}
          </div>

          <input
            type='number'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder='Price'
            className='input-style w-90 h-10 bg-white text-gray-600 border p-2 border-gray-400 rounded-2xl drop-shadow-2xl focus:outline-none'
          />

          <input
            type='text'
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            placeholder='Genres (comma-separated)'
            className='input-style w-90 h-10 bg-white text-gray-600 border p-2 border-gray-400 rounded-2xl drop-shadow-2xl focus:outline-none'
          />

          <button
            type='submit'
            className='bg-white text-black border-1 py-2 rounded-2xl shadow-xl hover:bg-black hover:text-white transition'
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddMovies
