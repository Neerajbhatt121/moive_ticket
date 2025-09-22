import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  })

  // axios default so the every api call include this
  useEffect(() => {
    axios.defaults.headers.common["Authorization"] = auth?.token
  }, [auth?.token])

  useEffect(() => {
    const data = localStorage.getItem("movie-auth")
    if (data) {
      const parseData = JSON.parse(data)
      setAuth({
        ...auth,
        user: parseData.user,
        token: parseData.token,
      })
    //  axios.defaults.headers.common["Authorization"] = auth?.token
    }
  }, [])

  const login = async (userData) => {
    console.log("started here", userData)

    try {
      console.log("started here", userData)
      const response = await axios.post(
        `/api/v1/auth/login`,
        {
          email: userData.email,
          password: userData.password,
        }
      )
      console.log("response  >>>>>>>", response)

      if (response && response.data.success) {
        console.log("response")
        const { user, token } = response.data
        setAuth({
          user,
          token,
        })
        localStorage.setItem("movie-auth", JSON.stringify(response.data))
        return response.data
      } else {
        return { success: false }
      }
    } catch (error) {
      alert("login failed")
      console.log("login error in authContext file", error)
    }
  }

  const logout = () => {
    setAuth({ user: null, token: "" })
    localStorage.removeItem("movie-auth")
    delete axios.defaults.headers.common["Authorization"]
  }

  return (
    <AuthContext.Provider value={{ auth, setAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// custom hook
const useAuth = () => useContext(AuthContext)
export { AuthProvider, useAuth };

