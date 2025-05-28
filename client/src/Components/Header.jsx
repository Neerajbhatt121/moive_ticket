import { useNavigate } from "react-router-dom";
import profileImg from "../assets/profile.png";
import { useAuth } from "../context/Auth.jsx";

const Header = () => {
  const {auth} = useAuth();
  const ProfileImage = auth?.user?.profilePic ? (auth?.user?.profilePic) : (profileImg)
  const navigate = useNavigate()

  return (
    <div className='w-full h-[4rem] bg-gray-200 flex justify-between p-2 overflow-x-hidden items-center '>
      <div className='w-2.5'>TEXMIX</div>

      <div className='w-1/6 flex justify-between bg-gray-300 p-2 px-4 rounded-3xl shadow-xl'>
        <div
          onClick={() => {
            navigate("/Login")
          }}
          className='cursor-default'
        >
          Login
        </div>
        <div
          onClick={() => {
            navigate("/Signup")
          }}
          className='cursor-default'
        >
          Register
        </div>
        <div>
          <img className='w-7 h-7 rounded-full' src={ProfileImage} alt={profileImg} />
        </div>
      </div>
    </div>
  )
}

export default Header
