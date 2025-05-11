import { FcGoogle } from "react-icons/fc"
import { Link, useNavigate } from "react-router-dom"

const Signup = () => {
  const navigation = useNavigate()

  return (
    <div className='w-screen h-screen flex justify-center items-center'>
      <div className='w-110 h-[80%] bg-[#F5F4F4] flex flex-col justify-center items-center p-5 rounded-2xl'>
        <form
          action=''
          className='w-110 h-[100%] flex flex-col justify-evenly items-center'
        >
          <input
            type='text'
            placeholder='Username'
            className='w-90 h-9 bg-white text-gray-600 border border-gray-400 rounded-xl drop-shadow-2xl'
          />
          <input
            type='text'
            placeholder='Username'
            className='w-90 h-9 bg-white text-gray-600 border border-gray-400 rounded-xl'
          />
          <input
            type='text'
            placeholder='Username'
            className='w-90 h-9 bg-white text-gray-600 border border-gray-400 rounded-xl'
          />
          <input
            type='text'
            placeholder='Username'
            className='w-90 h-9 bg-white text-gray-600 border border-gray-400 rounded-xl'
          />
        </form>
          <Link 
            className='w-85 h-10 bg-black text-white flex items-center justify-center gap-2 rounded-2xl'
            to={"https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A5000%2Fapi%2Fv1%2Fauth%2Fgoogle%2Fcallback&scope=profile%20email&client_id=910239328277-ugmh5k5i19r1jftmqtqm2dd4u6c0cmn2.apps.googleusercontent.com&service=lso&o2v=2&flowName=GeneralOAuthFlow"}>
            <FcGoogle className='text-xl' />
            Continue with Google
          </Link>
      </div>
    </div>
  )
}

export default Signup
