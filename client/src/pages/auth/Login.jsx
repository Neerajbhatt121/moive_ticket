import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/Auth.jsx";

const Login = () => {
  const {login} = useAuth()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    if(!email) return (
      console.log("name required"),
      toast.error("name requred")
    )
    if(!password) return (
      console.log("password required"),
      toast.error("name requred")
    )

   // const isAcc = await axios.get('')

    console.log("login call")
      const result = await login({email, password});
      if(result.success){
        console.log("success here")
        navigate('/')
      } else {
        alert("login failed")
      }
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div><Toaster/></div>
      <div className="w-110 h-[75%] bg-[#F5F4F4] flex flex-col justify-center items-center p-8 py-15 rounded-2xl">
        <h1 className="text-4xl font-sans font-extrabold text-purple-500">
           Login
        </h1>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleLogin();
          }}
          className="w-110 h-[100%] flex flex-col justify-evenly items-center"
        >
          
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Eg:- example@gmail.com"
            className="w-90 h-10 bg-white text-gray-600 border p-2 border-gray-400 rounded-2xl drop-shadow-2xl focus:outline-none"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Eg:- ********"
            className="w-90 h-10 bg-white text-gray-600 border p-2 border-gray-400 rounded-2xl drop-shadow-2xl focus:outline-none"
          />
          <div className="w-full h-10 flex justify-evenly">
            <button 
              onClick={()=> {navigate('/Signup')}}
              className="w-[40%] h-full bg-gray-200 rounded-3xl text-black font-bold">
              Signup
            </button>
            <button 
                type="submit"
                className="w-[40%] h-full bg-purple-600 rounded-3xl text-white font-bold">
              Login
            </button>
          </div>
          <span>or</span>
          <hr className="w-[80%] h-2 border-gray-400 px-15" />
        </form>
        <Link
          className="w-85 h-10 bg-black text-white flex items-center justify-center gap-2 rounded-2xl"
          to={
           `${import.meta.env.VITE_BASE_URL_API_URL}/api/v1/auth/google`
          }
        >
          <FcGoogle className="text-xl" />
          Continue with Google
        </Link>
      </div>
    </div>
  )
}

export default Login
