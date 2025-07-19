import axios from 'axios'
import { useState } from "react"
import toast from 'react-hot-toast'

const AddMovies = () => {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [duration, setDuration] = useState("")
  const [posterURL, setPosterURL] = useState("")
  const [price, setPrice] = useState(500) // default
  const [genre, setGenre] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()

    formData.append("name", name)
    formData.append("description", description)
    formData.append("duration", Number(duration))
    formData.append("price", Number(price))
    formData.append("genre", genre.split(","));

    formData.append("posterURL", posterURL)

    console.log("Form Data:", formData, name, genre.split(","))

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL_API_URL}/api/v1/moive/createmoive`,
        formData
      )
      console.log("api called")
      if (!response) {
        console.log("can't uploaded movie")
      }
      toast.success("Added Successfully")
      setName("")
      setDescription("")
      setDuration("")
      setPosterURL("")
      setPrice("")
      setGenre("")
    } catch (error) {
      console.log("xxxxxxxxxxxxxxxxxxxxxx", error)
    }
  }

  return (
    <div className='flex flex-col w-full min-w-100vh h-full justify-center items-center'>

      <div className='w-full h-full overflow-y-auto'>
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
