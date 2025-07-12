import { useState } from "react"
import { CgProfile } from "react-icons/cg"
import { IoSunny } from "react-icons/io5"
import { LuTicketSlash } from "react-icons/lu"
import { RiLogoutCircleRLine, RiMoonClearFill } from "react-icons/ri"
import { NavLink, useNavigate } from "react-router-dom"
import profileImg from "../assets/profile.png"
import { useAuth } from "../context/Auth.jsx"
import { useTheme } from "../context/Theme.jsx"
import SearchForm from "../pages/user/Form/SearchForm.jsx"

const Header = () => {
  const { auth, logout } = useAuth()
  const { theme, setTheme } = useTheme()
  const ProfileImage = auth?.user?.profilePic ?? profileImg
  console.log(ProfileImage)
  const [isnight, SetIsnight] = useState(0)
  const [menu, setMenu] = useState(1)
  const navigate = useNavigate ();
  console.log(auth?.user?.role)


  const handlelogout = () => {
    logout()
    navigate('/Login')
  }

  return (
    <div
      className={`${
        theme === "night" ? "bg-black text-white " : "bg-white text-black "
      }  w-full h-[4rem] flex justify-between p-2 overflow-x-hidden items-center `}
    >
      <div className='w-auto' 
        onClick={()=> navigate('/')}
      >TEXMIX</div>

      <div className='w-[75%] h-[95%] mx-2'>
        <SearchForm/>
      </div>

      <div className=' w-auto flex justify-evenly items-center text-gray-700 bg-gray-400 p-1.5 px-4 gap-2 rounded-3xl shadow-xl'>
        <div
          onClick={() => {
            SetIsnight(!isnight)
            console.log(theme)
            setTheme(theme === "light" ? "night" : "light")
          }}
          className='cursor-default'
        >
          {isnight ? (
            <RiMoonClearFill className='size-6' />
          ) : (
            <IoSunny className='size-6' />
          )}
        </div>
        {auth?.token ? (
          <img
            className='w-7 h-7 rounded-full'
            src={ProfileImage}
            alt={profileImg}
            onClick={() => {
              setMenu(!menu)
            }}
          />
        ) : (
          <NavLink to={"/Login"}>Login</NavLink>
        )}
      </div>

      {!menu ? (
        <div
          className='fixed w-screen h-500  z-100 bg-transparent'
          onClick={() => {
            setMenu(!menu)
            console.log("clicked")
          }}
        >
          <ul className='fixed right-0 top-14 z-999 w-50 h-auto [&>*]:h-15 [&>*]:flex [&>*]:items-center [&>*]:border-b-1 [&>*]:gap-5 [&>*]:pl-5  bg-gray-300 text-black flex flex-col justify-around text-center'>
            <li
              onClick={(e) => {
                e.stopPropagation()
              }}
            >
              <CgProfile /> Profile
            </li>
            {auth?.user?.role === 1 && (
              <NavLink to="/dashboard">
                    <CgProfile /> Dashboard
              </NavLink>
                    
            )}
            <li
              onClick={(e) => {
                e.stopPropagation()
              }}
            >
              <LuTicketSlash /> myTickets
            </li>
            <li
              onClick={(e) => {
                e.stopPropagation()
                handlelogout()
              }}
            >
              <RiLogoutCircleRLine /> Logout
            </li>
          </ul>
        </div>
      ) : (
        <div className='fixed'></div>
      )}
    </div>
  )
}

export default Header
