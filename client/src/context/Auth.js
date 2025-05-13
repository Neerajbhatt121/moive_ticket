import axios from 'axios'
import { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext()

const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState({
        user:null,
        token:''
    });

// axios default so the every api call include this 
    axios.defaults.headers.common['Authorization'] = auth?.token

    useEffect(() => {
        const data = localStorage.getItem('movie-auth')
        if(data){
            const parseData = JSON.parse(data);
            setAuth({
                ...auth,
                user: parseData.user,
                token: parseData.token
            });
        }
    },[])

    const login = async (userData) => {
      //  const location = useLocation();
        try {
            const response = await axios.post(`/api/v1/auth/login`, {
                email: userData.data.email,
                password: userData.data.password
            })
            console.log(response)

            if(response && response.success){
                const {user, token} = response.data;
                setAuth({
                   user,
                   token
                })
                localStorage.setItem("moive-auth", JSON.stringify(response.data))
               // navigate(location.state  || "/");
            }
        } catch (error) {
            console.log("login error in authContext file",error)
        }
    }

    const logout = () => {
        setAuth({user: null, token:''})
        localStorage.removeItem('moive-auth')
    }

    return (
        <AuthContext.Provider value={{auth, setAuth, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

// custom hook 
const useAuth = () => useContext(AuthContext);
export { AuthProvider, useAuth }

