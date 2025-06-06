import { FaFilm, FaMoneyBillWave, FaUsers } from "react-icons/fa"
import { Link, Outlet } from "react-router-dom"

const Movies = () => {
  return (
    <div className=" w-full">
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 w-full'>
              <Link 
                to={'/dashboard/movie'}
                className='bg-white p-4 rounded-xl shadow-md flex items-center space-x-4'>
                <FaFilm className='text-3xl text-purple-600' />
                <div>
                  <p className='text-gray-600'>Add Movie</p>
                  <h2 className='text-2xl font-bold'>120</h2>
                </div>
              </Link>
      
              <Link
                to={'/dashboard/createInstance'}
                className='bg-white p-4 rounded-xl shadow-md flex items-center space-x-4'>
                <FaUsers className='text-3xl text-green-600' />
                <div>
                  <p className='text-gray-600'>Create Instance</p>
                  <h2 className='text-2xl font-bold'>350</h2>
                </div>
              </Link>
      
              <Link 

                className='bg-white p-4 rounded-xl shadow-md flex items-center space-x-4'>
                <FaMoneyBillWave className='text-3xl text-blue-600' />
                <div>
                  <p className='text-gray-600'>Revenue</p>
                  <h2 className='text-2xl font-bold'>$12K</h2>
                </div>
              </Link>
            </div>

        <div className="flex p-4 w-full bg-gray-100">
            <Outlet/>
        </div> 
    </div>
  )
}

export default Movies
