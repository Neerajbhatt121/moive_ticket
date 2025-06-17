import { useState } from "react"
import { IoSunny } from "react-icons/io5"
import { RiMoonClearFill } from "react-icons/ri"
import profileImg from "../assets/profile.png"
import { useAuth } from "../context/Auth.jsx"
import { useTheme } from "../context/Theme.jsx"

const Header = () => {
  const { auth } = useAuth()
  const { theme, setTheme } = useTheme()
  const ProfileImage = auth?.user?.profilePic ?? profileImg
  console.log(ProfileImage)
  const [isnight, SetIsnight] = useState(0)

  return (
    <div
      className={`${
        theme === "night" ? "bg-gray-800 text-white" : "bg-gray-100 text-black"
      }  w-full h-[4rem] flex justify-between p-2 overflow-x-hidden items-center `}
    >
      <div className='w-2.5'>TEXMIX</div>

      <div className=' w-auto flex justify-between items-center text-gray-700 bg-gray-400 p-2 px-4 gap-5 rounded-3xl shadow-xl'>
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
          />
        ) : (
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
        )}
      </div>
    </div>
  )
}

export default Header
