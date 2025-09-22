import axios from "axios";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate()
  

  const handleSubmit = async () => {
    if(!name) return (
      console.log("name required"),
      toast.error("name requred")
    )
    if(!email) return (
      console.log("email required"),
      toast.error("name requred")
    )
    if(!password) return (
      console.log("password required"),
      toast.error("name requred")
    )
      const data = await axios.post('/api/v1/auth/register', {
        name, email, password
      })
      console.log("register", data)
      toast.success("Account created sucssfully")
      navigate('/Login')

  }


  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div><Toaster/></div>
      <div className="w-110 h-[75%] bg-[#F5F4F4] flex flex-col justify-center items-center p-8 py-15 rounded-2xl">
        <h1 className="text-4xl font-sans font-extrabold text-purple-500">
          Sign Up
        </h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit()
          }}
          action=""
          type="submit"
          className="w-110 h-[100%] flex flex-col justify-evenly items-center"
        >
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Eg:- Krishna Kumar"
            className="w-90 h-10 bg-white text-gray-600 border p-2 border-gray-400 rounded-2xl drop-shadow-2xl focus:outline-none"
          />
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
              onClick={()=> {navigate('/Login')}}
              className="w-[40%] h-full bg-gray-200 rounded-3xl text-black font-bold">
              Login
            </button>
            <button 
              type="submit"
              className="w-[40%] h-full bg-purple-600 rounded-3xl text-white font-bold">
              Signup
            </button>
          </div>
          <span>or</span>
          <hr className="w-[80%] h-2 border-gray-400 px-15" />
        </form>
        <Link
          className="w-85 h-10 bg-black text-white flex items-center justify-center gap-2 rounded-2xl"
          to={
            "https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A5000%2Fapi%2Fv1%2Fauth%2Fgoogle%2Fcallback&scope=profile%20email&client_id=910239328277-ugmh5k5i19r1jftmqtqm2dd4u6c0cmn2.apps.googleusercontent.com&service=lso&o2v=2&flowName=GeneralOAuthFlow"
          }
        >
          <FcGoogle className="text-xl" />
          Continue with Google
        </Link>
      </div>
    </div>
  );
};

export default Signup;
